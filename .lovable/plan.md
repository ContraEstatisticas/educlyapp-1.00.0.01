## Sistema de Acesso Automático via Magic Link — Implementado ✅

### Novo fluxo (compras após deploy)

1. **Compra chega** → webhook insere `billing_event_logs` (sem mudança)
2. **`auto-create-account`** cria conta com senha aleatória + confirma email + processa billing + gera magic link
3. **`send-welcome-email` (mode=magic_link)** envia email com magic link + credenciais de referência
4. Usuário clica no link → entra direto no dashboard, autenticado
5. Troca de senha via modal interno no `Profile.tsx` → `supabase.auth.updateUser({ password })`
6. Após troca, `resend-magic-link` envia novo link de acesso por email

### Fallback cirúrgico

- Se `auto-create-account` falha **antes** de criar conta → fluxo legado (link `/cadastro`)
- Se falha **depois** de criar conta → enfileira para retry (sem senha, só magic link)
- Usuário existente → processa billing + envia magic link (mode=`magic_link_existing`)

### Magic link expirado

- `Auth.tsx` detecta `error=access_denied` / `error_code=otp_expired` no hash
- Mostra UI de "link expirado" com campo de email + botão para reenviar
- Chama `resend-magic-link` (rate limit: 1/min)

### Senha NÃO persiste no banco

- Gerada em memória, passada diretamente ao email, nunca salva em tabela
- Retries não incluem senha (apenas magic link)

### Compatibilidade retroativa

- `Auth.tsx` login/signup: mantido intacto
- `purchased-signup`, `pending-signup`, `SignupFromEmail.tsx`: mantidos
- Usuários antigos continuam acessando normalmente

### Arquivos criados/modificados

| Arquivo | Ação |
|---|---|
| `supabase/functions/auto-create-account/index.ts` | ✅ Criado |
| `supabase/functions/resend-magic-link/index.ts` | ✅ Criado |
| `supabase/functions/send-welcome-email/index.ts` | ✅ Modificado (3 modes) |
| `supabase/functions/paddle-webhook/index.ts` | ✅ Modificado |
| `supabase/functions/primer-webhook/index.ts` | ✅ Modificado |
| `supabase/functions/send-pending-thanks/index.ts` | ✅ Modificado |
| `supabase/config.toml` | ✅ Novas functions registradas |
| `src/pages/Auth.tsx` | ✅ Expired magic link UI |
| `src/pages/Profile.tsx` | ✅ Modal de troca de senha inline |
