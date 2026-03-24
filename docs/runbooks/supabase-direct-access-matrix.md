# Matriz de acesso direto ao banco - Educly

Data base: 24/03/2026

Objetivo: registrar quem e o que possui acesso direto ou privilegiado ao banco do Educly, com foco em credencial, finalidade e risco.

## Legenda de risco

- `Alto`: pode ler ou alterar dados amplamente, operar Auth, restore, backup ou contornar controles se mal configurado
- `Medio`: acesso restrito a operacoes especificas, mas com impacto relevante se usado indevidamente
- `Baixo`: acesso limitado por RLS, publishable key ou escopo de leitura controlada

## Matriz resumida

| Tipo | Agente/Servico | Arquivo ou origem | Credencial principal | Escopo | Finalidade | Risco |
| --- | --- | --- | --- | --- | --- | --- |
| Usuario final | App web | `src/integrations/supabase/client.ts` | chave publishable/anon | API publica com RLS | leitura e escrita do proprio usuario | Baixo |
| Usuario admin | Front + sessao autenticada | `src/components/AdminGuard.tsx` e telas admin | sessao autenticada + `is_admin()` | dados administrativos via policies e RPCs | operacao do painel admin | Medio |
| Edge function admin | `admin-grant-access` | `supabase/functions/admin-grant-access/index.ts` | JWT do admin + `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | conceder acesso manual | Alto |
| Edge function admin | `admin-revoke-access` | `supabase/functions/admin-revoke-access/index.ts` | JWT do admin + `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | revogar acesso manual | Alto |
| Edge function admin | `bulk-grant-access` | `supabase/functions/bulk-grant-access/index.ts` | JWT do admin + `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | concessao em lote | Alto |
| Edge function admin | `send-signup-invite` | `supabase/functions/send-signup-invite/index.ts` | JWT do admin + `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | convites administrativos | Alto |
| Edge function admin | `send-pending-welcome-batch` | `supabase/functions/send-pending-welcome-batch/index.ts` | admin check + `SUPABASE_SERVICE_ROLE_KEY` | banco + chamadas internas | automacao de onboarding | Alto |
| Edge function admin | `resend-dashboard` | `supabase/functions/resend-dashboard/index.ts` | JWT do admin + `SUPABASE_SERVICE_ROLE_KEY` | logs e operacao de email | painel operacional | Alto |
| Edge function publica sensivel | `auto-create-account` | `supabase/functions/auto-create-account/index.ts` | `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | criar conta automaticamente | Alto |
| Edge function publica sensivel | `resend-magic-link` | `supabase/functions/resend-magic-link/index.ts` | `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | reenviar magic link | Alto |
| Edge function publica sensivel | `magic-login` | `supabase/functions/magic-login/index.ts` | `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | login via token | Alto |
| Edge function publica sensivel | `pending-signup` | `supabase/functions/pending-signup/index.ts` | `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | fluxo de cadastro pendente | Alto |
| Edge function publica sensivel | `confirm-signup-email` | `supabase/functions/confirm-signup-email/index.ts` | `SUPABASE_SERVICE_ROLE_KEY` | Auth + banco | confirmar signup | Alto |
| Webhook | `paddle-webhook` | `supabase/functions/paddle-webhook/index.ts` | assinatura do webhook + `SUPABASE_SERVICE_ROLE_KEY` | billing + banco | eventos de pagamento | Alto |
| Webhook | `primer-webhook` | `supabase/functions/primer-webhook/index.ts` | HMAC/secret + `SUPABASE_SERVICE_ROLE_KEY` | billing + banco | eventos externos | Alto |
| Job protegido | `retry-failed-webhooks` | `supabase/functions/retry-failed-webhooks/index.ts` | `CRON_SECRET` ou `SUPABASE_SERVICE_ROLE_KEY` | banco + webhooks | retry operacional | Alto |
| Job protegido | `send-bulk-emails` | `supabase/functions/send-bulk-emails/index.ts` | `BULK_EMAIL_SECRET` + `SUPABASE_SERVICE_ROLE_KEY` | email logs + banco | envio operacional | Alto |
| Job protegido | `resend-pending-emails` | `supabase/functions/resend-pending-emails/index.ts` | `BULK_EMAIL_SECRET` + `SUPABASE_SERVICE_ROLE_KEY` | email logs + banco | reenvio operacional | Alto |
| Job protegido | `debug-billing` | `supabase/functions/debug-billing/index.ts` | `DEBUG_TOKEN` + `SUPABASE_SERVICE_ROLE_KEY` | billing + banco | depuracao operacional | Alto |
| Script operacional | notificacao de bugfix | `send-bugfix-notification.ps1` | `SUPABASE_SERVICE_ROLE_KEY` | Auth + `profiles` | notificacao operacional | Alto |
| Automacao CI | backup complementar | `.github/workflows/db_backup.yml` | `SUPABASE_ACCESS_TOKEN` | backup/schema e metadata de projeto | snapshot complementar | Alto |

## Observacoes importantes

- Os acessos mais perigosos estao concentrados em edge functions com `SUPABASE_SERVICE_ROLE_KEY`.
- Os fluxos mais sensiveis do ponto de vista arquitetural sao os que combinam `service_role` com `verify_jwt = false`.
- A revisao operacional do item 17 confirmou que apenas pessoas autorizadas permanecem com acesso ao painel do Supabase em producao.
- A confirmacao operacional do item 18 informou que credenciais de banco nao sao compartilhadas por WhatsApp nem por e-mail comum sem criptografia.

## Pendencias que ainda precisam de fechamento

- Confirmar no GitHub quem pode:
  - ler ou alterar `SUPABASE_ACCESS_TOKEN`
  - disparar workflows
  - baixar artifacts
  - administrar secrets
- Revisar em staging a necessidade de endurecer as functions com `verify_jwt = false`
- Atualizar esta matriz quando houver nova edge function com `service_role`
