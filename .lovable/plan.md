## Sistema de Acesso Automático via Token Permanente — Implementado ✅

### Fluxo principal (compras após deploy)

1. **Compra chega** → webhook insere `billing_event_logs`
2. **`auto-create-account`** cria conta com senha aleatória + confirma email + processa billing + gera token permanente em `user_access_tokens`
3. **`send-welcome-email` (mode=magic_link)** envia email dark theme com link permanente + credenciais (email + senha)
4. Usuário clica no link → `/magic-login?token=UUID` → edge function gera magic link fresco → redirect → autenticado
5. Troca de senha via modal interno no `Profile.tsx` → `refreshSession()` + `updateUser({ password })`
6. Após troca, `resend-magic-link` envia novo link de acesso por email (dark theme, com email do usuário)

### Token permanente

- Tabela `user_access_tokens` (user_id UNIQUE, token UUID UNIQUE)
- Link no email: `https://educly.app/magic-login?token=UUID` (nunca expira)
- Edge function `magic-login` valida token → `auth.admin.generateLink({ type: 'magiclink' })` → redirect
- Rate limit: 10 requests/min por token

### Design dos emails (dark theme) ✅

- Fundo escuro (#07080f), card (#0f1120), bordas sutis
- Logo Educly com ícone gradiente + ponto laranja
- Headline em #e8eaf0, subtítulo em #6b7280
- Botão CTA gradiente azul/indigo (#4f6ef7 → #6366f1)
- Bloco de credenciais dark (email + senha para contas novas)
- Footer minimalista (© 2025, Help, Privacy)
- 7 idiomas: pt, en, es, fr, de, it, ru

### Batch processing ✅

- `send-pending-welcome-batch` busca billing_event_logs pendentes
- Para cada: chama `auto-create-account` + `send-welcome-email`
- Rate limit: 1 email a cada 5s, batch de 15
- Admin-only (verifica is_admin via RPC)

### Compatibilidade retroativa

- `Auth.tsx` login/signup: mantido intacto
- `purchased-signup`, `pending-signup`, `SignupFromEmail.tsx`: mantidos
- Usuários antigos continuam acessando normalmente

### Arquivos

| Arquivo | Status |
|---|---|
| `user_access_tokens` (tabela) | ✅ Criada |
| `supabase/functions/magic-login/index.ts` | ✅ Criado |
| `supabase/functions/auto-create-account/index.ts` | ✅ Modificado |
| `supabase/functions/resend-magic-link/index.ts` | ✅ Redesign dark theme |
| `supabase/functions/send-welcome-email/index.ts` | ✅ Redesign dark theme + credenciais |
| `supabase/functions/send-pending-welcome-batch/index.ts` | ✅ Usa auto-create-account + send-welcome-email |
| `supabase/functions/paddle-webhook/index.ts` | ✅ Passa token permanente |
| `supabase/functions/primer-webhook/index.ts` | ✅ Passa token permanente |
| `src/pages/MagicLogin.tsx` | ✅ Criado |
| `src/pages/Profile.tsx` | ✅ refreshSession antes de updateUser |
| `src/pages/Auth.tsx` | ✅ Expired magic link UI |
