CREATE TABLE IF NOT EXISTS public.ai_trail_completion_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tool_slug TEXT NOT NULL,
  xp_awarded INTEGER NOT NULL,
  total_modules INTEGER NOT NULL,
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT ai_trail_completion_rewards_user_tool_key UNIQUE (user_id, tool_slug)
);

CREATE INDEX IF NOT EXISTS idx_ai_trail_completion_rewards_user_id
  ON public.ai_trail_completion_rewards (user_id);

ALTER TABLE public.ai_trail_completion_rewards ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own ai trail completion rewards" ON public.ai_trail_completion_rewards;
CREATE POLICY "Users can view own ai trail completion rewards"
ON public.ai_trail_completion_rewards
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own ai trail completion rewards" ON public.ai_trail_completion_rewards;
CREATE POLICY "Users can insert own ai trail completion rewards"
ON public.ai_trail_completion_rewards
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own ai trail completion rewards" ON public.ai_trail_completion_rewards;
CREATE POLICY "Users can delete own ai trail completion rewards"
ON public.ai_trail_completion_rewards
FOR DELETE
USING (auth.uid() = user_id);

GRANT SELECT, INSERT, DELETE ON public.ai_trail_completion_rewards TO authenticated;
