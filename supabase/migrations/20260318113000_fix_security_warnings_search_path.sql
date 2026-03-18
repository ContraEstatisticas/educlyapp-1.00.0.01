-- Fix Supabase linter warnings for mutable function search_path
-- and overly permissive RLS policy on pending_thank_you_emails.

ALTER FUNCTION public.update_webhook_failure_updated_at()
SET search_path = pg_catalog;

ALTER FUNCTION public.handle_updated_at()
SET search_path = pg_catalog;

CREATE OR REPLACE FUNCTION public.calculate_next_retry_at(current_retry_count integer)
RETURNS timestamptz
LANGUAGE plpgsql
STABLE
SET search_path = pg_catalog
AS $$
BEGIN
  RETURN now() + (POWER(4, LEAST(current_retry_count, 4)) * 30 || ' seconds')::interval;
END;
$$;

DROP POLICY IF EXISTS "Service role full access"
ON public.pending_thank_you_emails;
