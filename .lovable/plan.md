

## Plano refinado: Sistema de acesso automático via magic link

### Correções dos 4 pontos levantados

**1. Fallback cirúrgico no webhook (não mais "cai no legado")**

A edge function `auto-create-account` retornará um campo `account_created: boolean` junto com o resultado. O webhook seguirá esta lógica:

- Se `auto-create-account` retornou `account_created: true` + `magic_link`: envia email com magic link. Fim.
- Se `auto-create-account` retornou `already_existed: true`: usuario já existe, apenas processa billing. Decisão: **envia magic link novo** para o usuário existente (facilita re-acesso). Email diferente: "Nova compra ativada, clique para acessar".
- Se `auto-create-account` falhou **antes** de criar a conta (ex: erro de rede, RPC falhou): cai no fluxo legado (enfileira email com link `/cadastro`).
- Se `auto-create-account` falhou **depois** de criar a conta mas antes de gerar magic link: a conta já existe, então enfileira email com magic link gerado por retry (a função `send-pending-thanks` tentará gerar o magic link na hora do envio se não tiver um).

**2. Tela de magic link expirado**

Criar uma página `/magic-link-expired` (ou tratar na `Auth.tsx`) que:
- Detecta o erro de token expirado/inválido no `onAuthStateChange` ou via query param de erro do Supabase
- Mostra mensagem amigável: "Seu link expirou"
- Tem campo de email pre-preenchido + botão "Enviar novo link"
- Chama a edge function `resend-magic-link` que gera novo magic link e envia por email
- Traduzido nos 7 idiomas existentes

**3. Senha não persiste no banco**

A senha gerada **não será salva** em nenhuma tabela. O fluxo:
- `auto-create-account` gera a senha, cria a conta, e retorna a senha na resposta
- O webhook passa a senha diretamente para a função de envio de email no mesmo request
- A coluna `generated_password` **não será criada** em `pending_thank_you_emails`
- Se o email falhar e precisar de retry, a senha já não estará disponível — nesse caso o email de retry **não inclui a senha**, apenas o magic link (que é suficiente para acessar)

**4. Usuário existente recebe magic link**

Decisão explícita: **sim, envia magic link novo**. Quando o comprador já tem conta:
- Processa billing normalmente (novos produtos ativados)
- Gera magic link via `auth.admin.generateLink({ type: 'magiclink' })`
- Envia email variante: "Sua nova compra foi ativada! Clique para acessar" (sem senha, sem pedir cadastro)
- Dedup: verifica em `email_logs` se já enviou `magic_link` para esse email nos últimos 5 minutos

---

### Etapas de implementação (ordem)

**Etapa 1 — Edge Function `auto-create-account`**
- Recebe: `email`, `buyer_name`, `language`
- Verifica se usuário existe (`check_user_exists_by_email` RPC)
- Se não existe: gera senha (16 chars, crypto.getRandomValues), cria via `auth.admin.createUser`, processa billing
- Gera magic link via `auth.admin.generateLink({ type: 'magiclink', email, options: { redirectTo } })`
- Retorna: `{ user_id, magic_link_url, generated_password?, already_existed, account_created }`
- Senha retornada apenas na resposta, nunca persistida

**Etapa 2 — Edge Function `resend-magic-link`**
- Recebe: `email` (autenticado ou não — usa service role)
- Verifica se o email existe como usuário
- Gera magic link via admin API
- Envia email com o link
- Rate limit: máximo 1 por email a cada 60 segundos (checado via `email_logs`)

**Etapa 3 — Adaptar template de email**
- Modificar `send-welcome-email` para aceitar um mode: `legacy` vs `magic_link`
- Mode `magic_link`: CTA aponta para o magic link URL, mostra credenciais de referência (email + senha)
- Mode `magic_link_existing`: CTA com magic link, sem senha, texto "nova compra ativada"
- Mode `legacy`: mantém comportamento atual (link para `/cadastro`)

**Etapa 4 — Modificar `paddle-webhook`**
- No bloco `enqueueWelcomeEmail` (linha ~662-687):
  - Chamar `auto-create-account` internamente (fetch para a edge function ou lógica inline)
  - Baseado no resultado, enfileirar email correto ou enviar direto
  - Fallback cirúrgico conforme regras do ponto 1

**Etapa 5 — Modificar `primer-webhook`**
- Mesma adaptação da etapa 4 para o fluxo Hotmart/Funnelfox

**Etapa 6 — Adaptar `send-pending-thanks` / batch**
- Se o pending email não tem magic link URL (retry/fallback): gerar magic link na hora do envio
- Nunca incluir senha no retry (já não existe mais)

**Etapa 7 — Tela de magic link expirado (frontend)**
- Tratar na `Auth.tsx`: detectar `error=access_denied` ou `error_code=otp_expired` nos query params
- Mostrar UI de "link expirado" com botão para reenviar
- Chamar `resend-magic-link`

**Etapa 8 — Alterar senha via modal interno (já existe parcialmente)**
- O `Profile.tsx` já tem um dialog de "Alterar Senha" (linha 604-662), mas hoje ele envia email de reset externo
- Refatorar: trocar para campos de nova senha + confirmação inline
- Chamar `supabase.auth.updateUser({ password })` direto
- Após sucesso, chamar `resend-magic-link` para enviar novo link de acesso por email

### Sem alterações de schema no banco
- Nenhuma coluna nova em `pending_thank_you_emails`
- Nenhuma tabela nova
- Novo `email_type` em `email_logs`: `magic_link` (campo texto livre, sem migração)

### Compatibilidade retroativa
- `Auth.tsx` login/signup: mantido intacto
- `purchased-signup`, `pending-signup`, `SignupFromEmail.tsx`: mantidos
- Usuários antigos não são afetados

### Arquivos criados/modificados

| Arquivo | Ação |
|---|---|
| `supabase/functions/auto-create-account/index.ts` | Criar |
| `supabase/functions/resend-magic-link/index.ts` | Criar |
| `supabase/functions/send-welcome-email/index.ts` | Modificar (template magic link) |
| `supabase/functions/paddle-webhook/index.ts` | Modificar (chamar auto-create) |
| `supabase/functions/primer-webhook/index.ts` | Modificar (chamar auto-create) |
| `supabase/functions/send-pending-thanks/index.ts` | Modificar (gerar magic link no retry) |
| `supabase/config.toml` | Adicionar `auto-create-account` e `resend-magic-link` |
| `src/pages/Auth.tsx` | Modificar (detectar magic link expirado) |
| `src/pages/Profile.tsx` | Modificar (modal de troca de senha inline) |

