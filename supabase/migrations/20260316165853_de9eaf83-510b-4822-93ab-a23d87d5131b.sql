
CREATE TABLE public.user_access_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(token)
);

ALTER TABLE public.user_access_tokens ENABLE ROW LEVEL SECURITY;

-- No public policies — only service role can access
-- This is intentional: tokens are managed exclusively by edge functions
CREATE INDEX idx_user_access_tokens_token ON public.user_access_tokens(token);
