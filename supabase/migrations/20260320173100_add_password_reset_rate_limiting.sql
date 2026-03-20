-- Create table to track password reset attempts for rate limiting
CREATE TABLE IF NOT EXISTS public.password_reset_attempts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Index for efficient counting within time windows
CREATE INDEX IF NOT EXISTS idx_password_reset_attempts_email_created_at 
ON public.password_reset_attempts (email, created_at);

-- RLS (Row Level Security) - Only accessible via service role for better security
ALTER TABLE public.password_reset_attempts ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.password_reset_attempts TO service_role;
