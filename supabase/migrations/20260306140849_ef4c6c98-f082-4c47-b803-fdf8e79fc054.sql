ALTER TABLE public.pending_thank_you_emails 
ADD COLUMN retry_count integer NOT NULL DEFAULT 0,
ADD COLUMN last_error text;