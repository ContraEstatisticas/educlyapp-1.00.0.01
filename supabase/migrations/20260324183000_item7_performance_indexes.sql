-- Item 7/20 - Performance
-- Safe baseline indexes for the hottest query patterns identified in the audit.

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA extensions;

-- billing_event_logs:
-- 1) many functions query LOWER(email) + processed + event_type + created_at
-- 2) paddle-webhook dedupes with payload @> {"event_id": ...}
-- 3) admin dashboards filter event_type with ILIKE '%...%'
-- 4) internal jobs read unprocessed rows ordered by created_at
CREATE INDEX IF NOT EXISTS idx_bel_email_lc_processed_type_created
ON public.billing_event_logs ((LOWER(email)), processed, event_type, created_at);

CREATE INDEX IF NOT EXISTS idx_bel_payload_gin
ON public.billing_event_logs
USING gin (payload jsonb_path_ops);

CREATE INDEX IF NOT EXISTS idx_bel_event_type_trgm
ON public.billing_event_logs
USING gin (event_type extensions.gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_bel_unprocessed_created
ON public.billing_event_logs (created_at)
WHERE processed = false;

-- user_product_access:
-- frequent filters by user_id/is_active/product_type and admin counts by active product_type
CREATE INDEX IF NOT EXISTS idx_upa_user_active_type
ON public.user_product_access (user_id, is_active, product_type);

CREATE INDEX IF NOT EXISTS idx_upa_active_type_user
ON public.user_product_access (product_type, user_id)
WHERE is_active = true;

-- user_premium_access:
-- operational jobs and admin counts often only care about active premium users
CREATE INDEX IF NOT EXISTS idx_uprem_active_true
ON public.user_premium_access (user_id)
WHERE is_premium = true;

-- email_logs:
-- this table exists in the current project but its original DDL is not fully versioned.
-- Guard the indexes to keep migration replay safe in fresh environments.
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
