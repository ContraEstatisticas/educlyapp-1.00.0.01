-- Item 8/20 - Hot column indexes
-- Read-only verification script for Supabase SQL Editor.

SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname IN (
    'idx_bel_user_id_created_at',
    'idx_bel_status_created_at',
    'idx_bel_created_at_desc',
    'idx_email_logs_recipient_type_created',
    'idx_email_logs_status_created',
    'idx_email_logs_created_desc',
    'idx_email_logs_recipient_trgm',
    'idx_billing_event_logs_email',
    'idx_password_reset_attempts_email_created_at',
    'idx_pending_emails_email',
    'idx_webhook_failure_logs_status',
    'idx_webhook_failure_logs_source',
    'idx_user_sessions_user_started_at',
    'idx_user_access_tokens_token',
    'idx_newsletter_subscriptions_email'
  )
ORDER BY tablename, indexname;
