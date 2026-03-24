-- Item 7/20 - Performance
-- Run these read-only queries in Supabase SQL Editor after applying the item 7 migration.

-- 1) Confirm the relevant indexes exist
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND (
    tablename IN ('billing_event_logs', 'user_product_access', 'user_premium_access', 'email_logs')
    OR indexname IN (
      'idx_bel_email_lc_processed_type_created',
      'idx_bel_payload_gin',
      'idx_bel_event_type_trgm',
      'idx_bel_unprocessed_created',
      'idx_upa_user_active_type',
      'idx_upa_active_type_user',
      'idx_uprem_active_true',
      'idx_email_logs_recipient_type_created',
      'idx_email_logs_status_created',
      'idx_email_logs_created_desc',
      'idx_email_logs_recipient_trgm'
    )
  )
ORDER BY tablename, indexname;

-- 2) Table sizes of the hottest tables
SELECT
  relname AS table_name,
  n_live_tup AS est_rows,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
  pg_size_pretty(pg_relation_size(relid)) AS table_size,
  pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS index_size
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND relname IN (
    'billing_event_logs',
    'email_logs',
    'user_product_access',
    'user_premium_access',
    'pending_thank_you_emails',
    'webhook_failure_logs',
    'password_reset_attempts',
    'user_access_tokens'
  )
ORDER BY pg_total_relation_size(relid) DESC;

-- 3) Index usage for those same tables
SELECT
  s.relname AS table_name,
  i.indexrelname AS index_name,
  i.idx_scan,
  pg_size_pretty(pg_relation_size(i.indexrelid)) AS index_size
FROM pg_stat_user_indexes i
JOIN pg_stat_user_tables s
  ON s.relid = i.relid
WHERE s.schemaname = 'public'
  AND s.relname IN (
    'billing_event_logs',
    'email_logs',
    'user_product_access',
    'user_premium_access',
    'pending_thank_you_emails',
    'webhook_failure_logs',
    'password_reset_attempts',
    'user_access_tokens'
  )
ORDER BY s.relname, i.idx_scan DESC, pg_relation_size(i.indexrelid) DESC;

-- 4) Top queries by total execution time
-- If this fails, pg_stat_statements is not available in the current environment.
SELECT
  calls,
  ROUND(total_exec_time::numeric, 2) AS total_ms,
  ROUND(mean_exec_time::numeric, 2) AS mean_ms,
  rows,
  LEFT(REGEXP_REPLACE(query, '\s+', ' ', 'g'), 220) AS sample_query
FROM pg_stat_statements
WHERE query ILIKE '%billing_event_logs%'
   OR query ILIKE '%email_logs%'
   OR query ILIKE '%user_product_access%'
   OR query ILIKE '%user_premium_access%'
   OR query ILIKE '%password_reset_attempts%'
ORDER BY total_exec_time DESC
LIMIT 20;

-- 5) Quick health snapshot of autovacuum / analyze recency
SELECT
  relname AS table_name,
  n_live_tup,
  n_dead_tup,
  last_vacuum,
  last_autovacuum,
  last_analyze,
  last_autoanalyze
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND relname IN (
    'billing_event_logs',
    'email_logs',
    'user_product_access',
    'user_premium_access',
    'pending_thank_you_emails',
    'webhook_failure_logs',
    'password_reset_attempts',
    'user_access_tokens'
  )
ORDER BY n_dead_tup DESC, n_live_tup DESC;
