-- Item 9/20 - Fixes directly aligned with slow queries found in the snapshot.

-- billing_event_logs:
-- match the exact normalization used by check_purchase_exists/process_pending_billing_events
CREATE INDEX IF NOT EXISTS idx_bel_email_norm_status_processed_created
ON public.billing_event_logs ((LOWER(RTRIM(email, '.'))), status, processed, created_at);

CREATE INDEX IF NOT EXISTS idx_bel_email_norm_event_type
ON public.billing_event_logs ((LOWER(RTRIM(email, '.'))), UPPER(event_type));

-- profiles:
-- supports admin analytics that filter/order on created_at
CREATE INDEX IF NOT EXISTS idx_profiles_created_at
ON public.profiles (created_at);
