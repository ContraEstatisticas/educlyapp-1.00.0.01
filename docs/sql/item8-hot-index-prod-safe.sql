-- Item 8/20 - Hot column indexes
-- Safer production variant.
-- Prefer running this through a direct Postgres client (psql, Supabase-linked CLI, or another tool
-- that does not wrap statements in a transaction).
--
-- Notes:
-- 1) CREATE INDEX CONCURRENTLY reduces lock impact on writes, but can take longer.
-- 2) CREATE INDEX CONCURRENTLY cannot run inside a transaction block.
--    Supabase SQL Editor may wrap execution in a transaction and fail with SQLSTATE 25001.
-- 3) If you need to execute from Supabase SQL Editor, use the transaction-safe migration:
--    supabase/migrations/20260324190000_item8_hot_column_indexes.sql
-- 4) The validation script remains: docs/sql/item8-hot-index-check.sql

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA extensions;

-- billing_event_logs
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_user_id_created_at
ON public.billing_event_logs (user_id, created_at DESC)
WHERE user_id IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_status_created_at
ON public.billing_event_logs (status, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_created_at_desc
ON public.billing_event_logs (created_at DESC);

-- email_logs
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
