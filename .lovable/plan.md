

## Plano: Automacao de Lembretes de Acesso (6h + 2 dias)

### Diagnostico: Por que nao funcionou

A Edge Function `send-unopened-welcome-reminders` esta correta em logica, mas tem **3 problemas criticos**:

1. **Sem cron job configurado** - A funcao nunca e executada automaticamente. Nao existe nenhum `cron.job` no banco que a invoque. As outras automacoes (push-scheduler, reconcile, etc.) todas tem cron jobs.

2. **Depende de metadata muito especifica** - A funcao filtra por `metadata.source === "welcome_flow"` E `metadata.welcome_reminder.eligible === true` E `resend_email_id` presente. Se o `send-welcome-email` nao gravar esses campos exatamente, o candidato e ignorado. Atualmente o `send-welcome-email` grava esses campos apenas nos modos `legacy` e `magic_link` (linhas 457-463), o que esta correto, mas qualquer email enviado antes dessa logica existir nao tera esses campos.

3. **So cobre o cenario de 6h** - Nao ha logica para o lembrete de 2 dias. A funcao atual so envia 1 lembrete apos `REMINDER_DELAY_HOURS = 6`.

4. **Verifica abertura via Resend API, nao via sessao real** - O usuario pode ter aberto o email mas nao ter acessado a plataforma. O ideal e checar `user_sessions` para saber se o usuario realmente logou.

### Solucao Proposta

#### 1. Corrigir build errors pre-existentes (3 arquivos)
- `push-scheduler/index.ts`: tipar `error` como `Error` e `user` corretamente
- `send-push/index.ts`: cast `Uint8Array` para `BufferSource` nos `importKey`
- `send-welcome-email/index.ts`: corrigir tipo do `supabaseAdmin` e o `data?.user_id`

#### 2. Refatorar `send-unopened-welcome-reminders` para 2 cenarios

Reescrever a logica principal para:

**Cenario A - Lembrete 6h**: Usuarios que receberam welcome email ha mais de 6h, nao tem nenhuma sessao em `user_sessions`, e nao receberam reminder ainda.

**Cenario B - Lembrete 2 dias**: Usuarios que receberam welcome email ha mais de 48h, nao tem sessao nos ultimos 2 dias em `user_sessions`, e nao receberam reminder de 2 dias ainda.

A logica sera:
```text
1. Buscar email_logs (welcome/magic_link) dos ultimos 14 dias
2. Para cada email, verificar se o user_id tem sessao em user_sessions
3. Se nao tem sessao (6h) -> enviar reminder tipo "6h"
4. Se ultima sessao > 2 dias atras -> enviar reminder tipo "48h"  
5. Gravar no email_logs como "welcome_reminder_6h" ou "welcome_reminder_48h"
6. Deduplicar: nao enviar se ja enviou esse tipo de reminder para esse email
```

Diferenca chave da versao atual: em vez de checar Resend API para saber se abriu o email, checar `user_sessions` para saber se realmente acessou a plataforma.

#### 3. Criar cron job no banco

Dois cron jobs via SQL INSERT (nao migration):
- **A cada hora**: invocar `send-unopened-welcome-reminders` para processar lembretes de 6h e 48h

```sql
SELECT cron.schedule(
  'welcome-reminder-hourly',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://dqlcxpbfemhzzetwaxsa.supabase.co/functions/v1/send-unopened-welcome-reminders',
    headers := '{"Content-Type":"application/json","Authorization":"Bearer <service_role_key>"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);
```

#### 4. Deploy da Edge Function

Fazer deploy da funcao atualizada via ferramenta de deploy.

### Resumo das mudancas

| Arquivo | Acao |
|---------|------|
| `supabase/functions/send-unopened-welcome-reminders/index.ts` | Reescrever para checar `user_sessions` e suportar 6h + 48h |
| `supabase/functions/push-scheduler/index.ts` | Fix build: tipar `error` e `user` |
| `supabase/functions/send-push/index.ts` | Fix build: cast Uint8Array |
| `supabase/functions/send-welcome-email/index.ts` | Fix build: tipo do supabaseAdmin e user_id |
| Banco (INSERT via tool) | Criar cron job hourly |

