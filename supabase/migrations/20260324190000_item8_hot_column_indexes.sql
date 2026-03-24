-- Item 8/20 - Indices nas colunas mais consultadas
-- Scope: user_id, email, status, created_at on the hottest operational tables.

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA extensions;

-- billing_event_logs
-- Used by user billing history (user_id + created_at), admin health/status filters, and latest-first admin tables.
CREATE INDEX IF NOT EXISTS idx_bel_user_id_created_at
ON public.billing_event_logs (user_id, created_at DESC)
WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bel_status_created_at
ON public.billing_event_logs (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bel_created_at_desc
ON public.billing_event_logs (created_at DESC);

-- email_logs
-- This table exists in the live project but its original DDL is not fully versioned in the repo.
-- Guard the indexes to keep replay safe in fresh environments.
DO $$
BEGIN
  IF to_regclass('public.email_logs') IS NOT NULL THEN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_email_logs_recipient_type_created
             ON public.email_logs (recipient_email, email_type, created_at DESC)';

    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_email_logs_status_created
             ON public.email_logs (status, created_at DESC)';

    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_email_logs_created_desc
             ON public.email_logs (created_at DESC)';

    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_email_logs_recipient_trgm
             ON public.email_logs
             USING gin (recipient_email extensions.gin_trgm_ops)';
  END IF;
END $$;
