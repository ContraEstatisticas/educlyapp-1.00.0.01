

## Analise do caso Rose Reine (rose.reine@gmail.com)

### Timeline completa

| Hora (Mar 22-23) | Evento |
|---|---|
| 18:29:39 | Conta criada via `auto-create-account` |
| 18:29:41 | Welcome email enviado (aberto 3s depois) |
| 18:47:43 | Segunda compra (Combo Premium + AI Pack) processada |
| 18:53:03 | 1o resend-magic-link enviado (ela pediu novo link) |
| 23:59:47 | 2o resend-magic-link enviado (ela pediu de novo!) |
| 00:00:12 | Finalmente conseguiu entrar (last_sign_in_at) |

### Problema identificado

Rose abriu o welcome email em **3 segundos** mas mesmo assim precisou pedir **2 reenvios** antes de conseguir entrar. O fluxo atual tem uma fragilidade:

1. Usuario clica no botao "Acceder" no email
2. Vai para `/magic-login?token=UUID` (token permanente - OK)
3. Edge function `magic-login` gera um OTP Supabase temporario (24h)
4. Redireciona para o `action_link` do Supabase (ex: `https://PROJECT.supabase.co/auth/v1/verify?token=...`)
5. Supabase verifica o OTP → redireciona para `/auth#access_token=...&refresh_token=...`
6. `Auth.tsx` processa os tokens do hash

**O problema esta no passo 4-5**: O magic link OTP do Supabase e de **uso unico**. Se qualquer coisa consumir ou corromper esse link antes do usuario:
- Pre-fetch de clientes de email (Outlook, Gmail, antivirus corporativo)
- Link scanners de seguranca (particularmente comum em email corporativo)
- O usuario clica, o browser abre, mas a pagina demora e ele clica de novo

O link e "queimado" e o usuario ve "Link expirado" mesmo tendo acabado de receber.

### Solucao proposta

Mudar o fluxo do `magic-login` para **nao redirecionar para o action_link do Supabase**. Em vez disso, extrair o `access_token` e `refresh_token` do OTP no servidor e retorna-los direto para o frontend, que faz `setSession()`.

**Fluxo novo:**
1. Usuario clica "Acceder" → `/magic-login?token=UUID`
2. `MagicLogin.tsx` chama a edge function `magic-login`
3. Edge function gera o OTP **E** troca ele por uma sessao no servidor (usando `verifyOtp` ou extraindo tokens do `action_link`)
4. Retorna `access_token` + `refresh_token` para o frontend
5. `MagicLogin.tsx` faz `supabase.auth.setSession(...)` e redireciona para `/dashboard`

Isso elimina o redirect chain que e vulneravel a pre-fetchers.

### Alternativa mais simples (recomendada)

Manter a arquitetura atual mas adicionar **retry automatico** no `MagicLogin.tsx`: se o primeiro `action_link` falhar (OTP consumido por pre-fetch), gerar um segundo imediatamente sem interacao do usuario.

E no `Auth.tsx`, quando detectar `otp_expired`, em vez de mostrar UI de erro, tentar automaticamente chamar `resend-magic-link` no background e informar o usuario que esta gerando um novo link.

### Arquivos a modificar

| Arquivo | Mudanca |
|---|---|
| `supabase/functions/magic-login/index.ts` | Extrair tokens do action_link no servidor em vez de retornar o link |
| `src/pages/MagicLogin.tsx` | Receber tokens e chamar `setSession()` direto |

### Impacto

Zero mudanca para o usuario - o botao no email continua identico. A diferenca e que o processo fica 100% controlado (sem depender de redirects do Supabase que podem ser interceptados).

