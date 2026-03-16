

## Plano Definitivo: Sistema de Acesso Permanente via Token Custom

Este plano unifica tudo que já foi implementado com a nova solução de token permanente que resolve o problema de expiração do magic link do Supabase.

### Problema central

O magic link do Supabase expira em 24h (limite máximo). O link no email é o acesso permanente do lead — não pode expirar.

### Solução: Token permanente + magic link gerado sob demanda

O email do usuário conterá um link permanente (`https://educly.app/magic-login?token=UUID`). Ao clicar, uma edge function valida o token, gera um magic link fresco do Supabase na hora, e redireciona automaticamente. O usuário nunca vê que houve dois passos.

```text
Email → https://educly.app/magic-login?token=abc123
  → Página React chama edge function "magic-login"
    → Valida token na tabela user_access_tokens
      → auth.admin.generateLink({ type: 'magiclink' })
        → Redirect para action_link do Supabase
          → Supabase processa OTP → redireciona para /auth#access_token=...
            → onAuthStateChange SIGNED_IN → /dashboard
```

---

### Etapas de implementação

**1. Criar tabela `user_access_tokens`**

```sql
CREATE TABLE public.user_access_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(token)
);

ALTER TABLE public.user_access_tokens ENABLE ROW LEVEL SECURITY;

-- Nenhuma policy pública — só service role acessa
```

**2. Criar edge function `magic-login`**

- Recebe `?token=UUID` via GET
- Busca `user_access_tokens` pelo token → obtém `user_id` → obtém email do `auth.users` via admin API
- Gera magic link fresco: `auth.admin.generateLink({ type: 'magiclink', email, options: { redirectTo: 'https://educly.app/auth' } })`
- Retorna JSON com `action_link` (a página React fará o redirect)
- Rate limit simples: máx 10 requests por token por minuto (via contagem em memória ou log)
- Se token inválido: retorna erro 404

**3. Criar página `/magic-login` no React**

- Rota simples que lê `?token=` da URL
- Chama a edge function `magic-login` com o token
- Se sucesso: `window.location.href = action_link` (redirect para o magic link fresco do Supabase)
- Se erro: mostra mensagem "Link inválido" com botão para ir ao login
- Enquanto carrega: mostra spinner "Preparando seu acesso..."

**4. Modificar `auto-create-account`**

- Após criar conta (ou encontrar existente): gerar token em `user_access_tokens` (INSERT ... ON CONFLICT DO NOTHING)
- Retornar `access_token` (o UUID permanente) na resposta junto com `user_id`
- Remover `magic_link_url` da resposta (não será mais usado diretamente)
- Manter `generated_password` na resposta para o email inicial

**5. Modificar `resend-magic-link`**

- Em vez de enviar magic link do Supabase no email, buscar/criar token em `user_access_tokens`
- Enviar link permanente no email: `https://educly.app/magic-login?token=UUID`
- Remover texto "válido por 24 horas" das 7 traduções

**6. Modificar `send-welcome-email`**

- O CTA do email aponta para `https://educly.app/magic-login?token=UUID` (recebido como parâmetro)
- Remover `linkExpiry` de todas as traduções
- Manter credenciais de referência para contas novas

**7. Modificar webhooks (`paddle-webhook`, `primer-webhook`)**

- Após chamar `auto-create-account`, usar o `access_token` retornado para compor a URL permanente
- Passar essa URL para `send-welcome-email` em vez do magic link direto

**8. Modificar `send-pending-thanks`**

- No retry, buscar token do usuário em `user_access_tokens` para compor URL permanente
- Se não existir token, criar um

**9. Corrigir troca de senha no `Profile.tsx`**

- Adicionar `await supabase.auth.refreshSession()` antes de `updateUser({ password })`
- Se refresh falhar, mostrar toast pedindo re-login
- Após troca de senha, o `resend-magic-link` já enviará link permanente (que nunca expira)

**10. Auth.tsx — manter listener + simplificar UI de expirado**

- O `onAuthStateChange` SIGNED_IN → `/dashboard` já está implementado e continua funcionando
- A UI de "link expirado" pode ser simplificada: com tokens permanentes, o único cenário de expiração é se o magic link intermediário (gerado pela edge function) expirar entre o redirect e o processamento — raro mas possível. Manter a UI como fallback.

---

### O que NÃO muda

- Login/signup manual em `Auth.tsx`: intacto
- Fluxos legados (`purchased-signup`, `pending-signup`, `SignupFromEmail.tsx`): intactos
- Usuários antigos: continuam acessando normalmente
- `supabase/config.toml`: adicionar apenas `magic-login` (verify_jwt = false)

### Arquivos criados/modificados

| Arquivo | Ação |
|---|---|
| Tabela `user_access_tokens` | Criar (migração SQL) |
| `supabase/functions/magic-login/index.ts` | Criar |
| `src/pages/MagicLogin.tsx` | Criar (rota `/magic-login`) |
| `src/App.tsx` | Adicionar rota `/magic-login` |
| `supabase/functions/auto-create-account/index.ts` | Modificar (gerar token permanente) |
| `supabase/functions/resend-magic-link/index.ts` | Modificar (usar token permanente, remover "24h") |
| `supabase/functions/send-welcome-email/index.ts` | Modificar (CTA com token permanente, remover `linkExpiry`) |
| `supabase/functions/paddle-webhook/index.ts` | Modificar (passar token para email) |
| `supabase/functions/primer-webhook/index.ts` | Modificar (passar token para email) |
| `supabase/functions/send-pending-thanks/index.ts` | Modificar (buscar/criar token) |
| `src/pages/Profile.tsx` | Modificar (refreshSession antes de updateUser) |
| `supabase/config.toml` | Adicionar `magic-login` |
| `.lovable/plan.md` | Atualizar com plano definitivo |

### Segurança

- Token UUID v4 = 122 bits de entropia (criptograficamente seguro)
- Tabela sem RLS público — só service role acessa
- Token não dá acesso direto — apenas gera magic link que passa pela auth do Supabase
- Um token por usuário (UNIQUE user_id) — pode ser revogado/regenerado
- Rate limit na edge function para prevenir brute force

