-- Item 7/20 - Performance
-- Safer production variant.
-- Prefer running this through a direct Postgres client (psql, Supabase-linked CLI, or another tool
-- that does not wrap statements in a transaction).
--
-- Notes:
-- 1) CREATE INDEX CONCURRENTLY reduces lock impact on writes, but can take longer.
-- 2) CREATE INDEX CONCURRENTLY cannot run inside a transaction block.
--    Supabase SQL Editor may wrap execution in a transaction and fail with SQLSTATE 25001.
-- 3) If you need to execute from Supabase SQL Editor, use the transaction-safe migration:
--    supabase/migrations/20260324183000_item7_performance_indexes.sql
-- 4) CREATE EXTENSION may still take a brief lock; if pg_trgm already exists, that step is cheap.
-- 5) The validation script remains: docs/sql/item7-performance-check.sql
-- 6) Run the email_logs section only if public.email_logs exists in the target environment.

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA extensions;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_email_lc_processed_type_created
ON public.billing_event_logs ((LOWER(email)), processed, event_type, created_at);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_payload_gin
ON public.billing_event_logs
USING gin (payload jsonb_path_ops);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_event_type_trgm
ON public.billing_event_logs
USING gin (event_type extensions.gin_trgm_ops);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_unprocessed_created
ON public.billing_event_logs (created_at)
WHERE processed = false;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_upa_user_active_type
ON public.user_product_access (user_id, is_active, product_type);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_upa_active_type_user
ON public.user_product_access (product_type, user_id)
WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_uprem_active_true
ON public.user_premium_access (user_id)
WHERE is_premium = true;

-- Run this section only if public.email_logs exists in the target environment.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_email_logs_recipient_type_created
ON public.email_logs (recipient_email, email_type, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_email_logs_status_created
ON public.email_logs (status, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_email_logs_created_desc
ON public.email_logs (created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_email_logs_recipient_trgm
ON public.email_logs
USING gin (recipient_email extensions.gin_trgm_ops);
