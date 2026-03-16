

## Plano: Redesign dos emails + credenciais + disparo em massa

### 3 problemas a resolver

1. **Email `resend-magic-link` não inclui email/senha** — o template atual (`getMagicLinkEmailHtml`) é minimalista e não recebe nem mostra credenciais
2. **Design dos emails está feio** — o screenshot mostra o template atual (azul escuro com texto escuro, sem personalidade). O usuário forneceu um HTML de referência com design dark/moderno que deve ser a base
3. **Usuários com compra pendente precisam receber email com link de acesso** — há dezenas de `billing_event_logs` com `status=pending` e `processed=false` para emails sem conta criada

---

### Etapa 1: Novo template HTML base (dark design)

Converter o HTML fornecido pelo usuário em um template email-safe (tabelas, inline styles, sem CSS vars, sem animations, sem pseudo-elements) que funcione em todos os clientes de email. O design mantém:

- Fundo escuro (#07080f)
- Card com borda sutil e gradiente accent
- Logo Educly com ícone
- Headline em gradiente
- Botão CTA com gradiente azul/indigo
- Bloco de credenciais (email + senha) com estilo dark
- Footer minimalista

Esse template será usado em **ambas** as edge functions:
- `send-welcome-email` (email de boas-vindas após compra)
- `resend-magic-link` (reenvio de link de acesso)

### Etapa 2: Modificar `resend-magic-link`

- Buscar as credenciais do usuário (email já temos, senha não é armazenada)
- Como a senha não é persistida, o bloco de credenciais no resend mostrará **apenas o email** com nota "Use sua senha cadastrada ou clique no botão para entrar direto"
- Aplicar o novo template dark no `getMagicLinkEmailHtml`

### Etapa 3: Modificar `send-welcome-email`

- Substituir `getEmailHtml` pelo novo template dark
- Manter o bloco de credenciais (email + senha) para contas novas (`mode === 'magic_link'` com `generatedPassword`)
- Para contas existentes (`magic_link_existing`), mostrar apenas email
- Manter tracking pixel e dedup

### Etapa 4: Criar edge function `send-pending-welcome-batch`

Uma edge function que:
1. Busca todos os emails com `billing_event_logs` pendentes (`PURCHASE_COMPLETE`, `PURCHASE_APPROVED`, etc.) que **não têm conta** em `auth.users`
2. Para cada email: chama `auto-create-account` (cria conta + token permanente)
3. Envia `send-welcome-email` com credenciais e link permanente
4. Marca os eventos como processados
5. Rate limit: 1 email a cada 5 segundos para não estourar o Resend

**Nota:** A função `send-pending-welcome-batch` já existe na pasta `supabase/functions`. Vou verificar e reutilizar/atualizar.

### Arquivos modificados

| Arquivo | Ação |
|---|---|
| `supabase/functions/send-welcome-email/index.ts` | Redesign completo do template HTML (dark theme) |
| `supabase/functions/resend-magic-link/index.ts` | Redesign do template + incluir email no corpo |
| `supabase/functions/send-pending-welcome-batch/index.ts` | Atualizar para usar auto-create-account + send-welcome-email com link permanente |

### O que NÃO muda

- `auto-create-account` — já retorna `access_token` e `generated_password`
- `paddle-webhook` / `primer-webhook` — já passam as credenciais para `send-welcome-email`
- `magic-login` edge function — intacta
- Frontend (Auth.tsx, MagicLogin.tsx) — intacto

