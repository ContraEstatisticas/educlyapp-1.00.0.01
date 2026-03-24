-- Item 9/20 - Snapshot auxiliar de performance
-- Read-only. Useful as supporting evidence when reviewing Supabase Query Performance / Index Advisor.

SELECT
  calls,
  ROUND(total_exec_time::numeric, 2) AS total_ms,
  ROUND(mean_exec_time::numeric, 2) AS mean_ms,
  rows,
  LEFT(REGEXP_REPLACE(query, '\s+', ' ', 'g'), 260) AS sample_query
FROM pg_stat_statements
WHERE query ILIKE '%billing_event_logs%'
   OR query ILIKE '%email_logs%'
   OR query ILIKE '%user_product_access%'
   OR query ILIKE '%user_premium_access%'
   OR query ILIKE '%password_reset_attempts%'
   OR query ILIKE '%pending_thank_you_emails%'
   OR query ILIKE '%webhook_failure_logs%'
ORDER BY total_exec_time DESC
LIMIT 25;
