-- Item 9/20 - Verification of the exact slow-query indexes
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname IN (
    'idx_bel_email_norm_status_processed_created',
    'idx_bel_email_norm_event_type',
    'idx_profiles_created_at'
  )
ORDER BY tablename, indexname;
