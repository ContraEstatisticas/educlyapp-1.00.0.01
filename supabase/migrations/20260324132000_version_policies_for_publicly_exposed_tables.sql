-- Checklist 2/20: nenhuma tabela exposta publicamente sem politica
-- de acesso definida.
--
-- Contexto:
-- - O schema tipado atual expõe tabelas publicas que nao tinham
--   policies versionadas no repositorio.
-- - Parte delas ja apresenta comportamento de acesso no ambiente,
--   o que indica drift de versionamento.
-- - Esta migration cria a linha de base explicita para as tabelas
--   expostas auditadas neste item.

ALTER TABLE IF EXISTS public.email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_bugs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.password_reset_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_access_tokens ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF to_regclass('public.email_logs') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'email_logs'
         AND policyname = 'Admins can view email logs'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Admins can view email logs"
      ON public.email_logs
      FOR SELECT
      USING (public.is_admin())
    $policy$;
  END IF;

  IF to_regclass('public.error_logs') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'error_logs'
         AND policyname = 'Admins can view error logs'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Admins can view error logs"
      ON public.error_logs
      FOR SELECT
      USING (public.is_admin())
    $policy$;
  END IF;

  IF to_regclass('public.user_bugs') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'user_bugs'
         AND policyname = 'Admins can view user bugs'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Admins can view user bugs"
      ON public.user_bugs
      FOR SELECT
      USING (public.is_admin())
    $policy$;
  END IF;

  IF to_regclass('public.user_bugs') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'user_bugs'
         AND policyname = 'Anon and authenticated can insert user bugs'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Anon and authenticated can insert user bugs"
      ON public.user_bugs
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true)
    $policy$;
  END IF;

  IF to_regclass('public.webhook_logs') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'webhook_logs'
         AND policyname = 'Admins can view webhook logs'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Admins can view webhook logs"
      ON public.webhook_logs
      FOR SELECT
      USING (public.is_admin())
    $policy$;
  END IF;

  IF to_regclass('public.password_reset_attempts') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'password_reset_attempts'
         AND policyname = 'Deny direct access to password reset attempts'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Deny direct access to password reset attempts"
      ON public.password_reset_attempts
      FOR ALL
      TO anon, authenticated
      USING (false)
      WITH CHECK (false)
    $policy$;
  END IF;

  IF to_regclass('public.user_access_tokens') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'user_access_tokens'
         AND policyname = 'Deny direct access to user access tokens'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Deny direct access to user access tokens"
      ON public.user_access_tokens
      FOR ALL
      TO anon, authenticated
      USING (false)
      WITH CHECK (false)
    $policy$;
  END IF;
END
$$;
