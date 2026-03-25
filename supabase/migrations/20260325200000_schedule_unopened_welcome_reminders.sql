CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "supabase_vault";

SELECT cron.unschedule('send-unopened-welcome-reminders-hourly')
WHERE EXISTS (
  SELECT 1
  FROM cron.job
  WHERE jobname = 'send-unopened-welcome-reminders-hourly'
);

SELECT cron.schedule(
  'send-unopened-welcome-reminders-hourly',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://dqlcxpbfemhzzetwaxsa.supabase.co/functions/v1/send-unopened-welcome-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || COALESCE(
        (
          SELECT decrypted_secret
          FROM vault.decrypted_secrets
          WHERE name = 'cron_secret'
          LIMIT 1
        ),
        ''
      )
    ),
    body := '{}'::jsonb
  );
  $$
);
