CREATE TABLE IF NOT EXISTS public.ai_trail_module_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_slug text NOT NULL,
  module_number integer NOT NULL CHECK (module_number > 0),
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ai_trail_module_progress_user_tool_module_key UNIQUE (user_id, tool_slug, module_number)
);

CREATE INDEX IF NOT EXISTS idx_ai_trail_module_progress_user_tool
  ON public.ai_trail_module_progress (user_id, tool_slug);

ALTER TABLE public.ai_trail_module_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own ai trail module progress" ON public.ai_trail_module_progress;
CREATE POLICY "Users can view own ai trail module progress"
ON public.ai_trail_module_progress
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own ai trail module progress" ON public.ai_trail_module_progress;
CREATE POLICY "Users can insert own ai trail module progress"
ON public.ai_trail_module_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own ai trail module progress" ON public.ai_trail_module_progress;
CREATE POLICY "Users can update own ai trail module progress"
ON public.ai_trail_module_progress
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
