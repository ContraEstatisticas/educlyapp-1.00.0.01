-- Item 9/20 - Safer production variant for slow-query indexes
-- Prefer running this through a direct Postgres client (psql, Supabase-linked CLI, or another tool
-- that does not wrap statements in a transaction).
-- CREATE INDEX CONCURRENTLY cannot run inside a transaction block.
-- Supabase SQL Editor may wrap execution in a transaction and fail with SQLSTATE 25001.
-- If you need to execute from Supabase SQL Editor, use the transaction-safe migration:
-- supabase/migrations/20260324193000_item9_slow_query_exact_indexes.sql

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_email_norm_status_processed_created
ON public.billing_event_logs ((LOWER(RTRIM(email, '.'))), status, processed, created_at);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_bel_email_norm_event_type
ON public.billing_event_logs ((LOWER(RTRIM(email, '.'))), UPPER(event_type));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_created_at
ON public.profiles (created_at);
