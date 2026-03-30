ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS professional_area TEXT,
ADD COLUMN IF NOT EXISTS big_action_trail_baseline INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS big_action_challenge_day_baseline INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS big_action_specialized_module_baseline INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.ai_trail_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_slug TEXT NOT NULL,
  total_modules INTEGER NOT NULL CHECK (total_modules > 0),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT ai_trail_completions_user_tool_key UNIQUE (user_id, tool_slug)
);

CREATE INDEX IF NOT EXISTS idx_ai_trail_completions_user_id
  ON public.ai_trail_completions (user_id, completed_at DESC);

ALTER TABLE public.ai_trail_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own ai trail completions" ON public.ai_trail_completions;
CREATE POLICY "Users can view own ai trail completions"
ON public.ai_trail_completions
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own ai trail completions" ON public.ai_trail_completions;
CREATE POLICY "Users can insert own ai trail completions"
ON public.ai_trail_completions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own ai trail completions" ON public.ai_trail_completions;
CREATE POLICY "Users can update own ai trail completions"
ON public.ai_trail_completions
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE ON public.ai_trail_completions TO authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'update_ai_trail_completions_updated_at'
  ) THEN
    CREATE TRIGGER update_ai_trail_completions_updated_at
    BEFORE UPDATE ON public.ai_trail_completions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_big_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  progress_source TEXT NOT NULL DEFAULT 'specialized_module',
  unlock_at_trail_count INTEGER NOT NULL CHECK (unlock_at_trail_count > 0),
  completed_trail_count_snapshot INTEGER NOT NULL DEFAULT 0 CHECK (completed_trail_count_snapshot >= 0),
  status TEXT NOT NULL DEFAULT 'needs_area' CHECK (
    status IN ('needs_area', 'pending_generation', 'ready', 'generation_error', 'completed')
  ),
  professional_area TEXT,
  title TEXT,
  what_to_create TEXT,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  ready_prompt TEXT,
  generation_language TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  error_message TEXT,
  generated_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT user_big_actions_user_unlock_target_key UNIQUE (user_id, progress_source, unlock_at_trail_count)
);

ALTER TABLE public.user_big_actions
ADD COLUMN IF NOT EXISTS progress_source TEXT NOT NULL DEFAULT 'specialized_module';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'user_big_actions_progress_source_check'
  ) THEN
    ALTER TABLE public.user_big_actions
    ADD CONSTRAINT user_big_actions_progress_source_check CHECK (
      progress_source IN ('challenge_day', 'specialized_module')
    );
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_big_actions_user_id
  ON public.user_big_actions (user_id, created_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_big_actions_one_active_per_user
  ON public.user_big_actions (user_id)
  WHERE completed_at IS NULL;

ALTER TABLE public.user_big_actions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own big actions" ON public.user_big_actions;
CREATE POLICY "Users can view own big actions"
ON public.user_big_actions
FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own big actions" ON public.user_big_actions;
CREATE POLICY "Users can insert own big actions"
ON public.user_big_actions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own big actions" ON public.user_big_actions;
CREATE POLICY "Users can update own big actions"
ON public.user_big_actions
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE ON public.user_big_actions TO authenticated;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'update_user_big_actions_updated_at'
  ) THEN
    CREATE TRIGGER update_user_big_actions_updated_at
    BEFORE UPDATE ON public.user_big_actions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.complete_user_big_action(p_action_id UUID)
RETURNS public.user_big_actions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_action public.user_big_actions%ROWTYPE;
  v_completed_progress_total INTEGER := 0;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT *
  INTO v_action
  FROM public.user_big_actions
  WHERE id = p_action_id
    AND user_id = auth.uid()
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Big action not found';
  END IF;

  IF v_action.progress_source = 'challenge_day' THEN
    SELECT COUNT(*)
    INTO v_completed_progress_total
    FROM public.user_day_progress
    WHERE user_id = auth.uid()
      AND completed = true;
  ELSE
    SELECT COUNT(*)
    INTO v_completed_progress_total
    FROM public.ai_trail_module_progress
    WHERE user_id = auth.uid();
  END IF;

  UPDATE public.user_big_actions
  SET
    status = 'completed',
    completed_at = COALESCE(completed_at, now()),
    error_message = NULL,
    metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object(
      'completed_total_progress',
      v_completed_progress_total,
      'progress_source',
      v_action.progress_source
    )
  WHERE id = p_action_id
  RETURNING *
  INTO v_action;

  IF v_action.progress_source = 'challenge_day' THEN
    UPDATE public.profiles
    SET
      big_action_challenge_day_baseline = GREATEST(
        COALESCE(big_action_challenge_day_baseline, 0),
        COALESCE(v_action.unlock_at_trail_count, 0)
      ),
      updated_at = now()
    WHERE id = auth.uid();
  ELSE
    UPDATE public.profiles
    SET
      big_action_specialized_module_baseline = GREATEST(
        COALESCE(big_action_specialized_module_baseline, 0),
        COALESCE(v_action.unlock_at_trail_count, 0)
      ),
      updated_at = now()
    WHERE id = auth.uid();
  END IF;

  RETURN v_action;
END;
$$;

REVOKE ALL ON FUNCTION public.complete_user_big_action(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.complete_user_big_action(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_user_big_action(UUID) TO service_role;

WITH trail_targets (tool_slug, total_modules) AS (
  VALUES
    ('midjourney', 6),
    ('gemini', 7),
    ('chatgpt', 8),
    ('deepseek', 6),
    ('lovable', 6),
    ('grok', 6),
    ('claude', 7),
    ('gamma', 4)
)
INSERT INTO public.ai_trail_completions (
  user_id,
  tool_slug,
  total_modules,
  completed_at,
  created_at,
  updated_at
)
SELECT
  progress.user_id,
  progress.tool_slug,
  targets.total_modules,
  MAX(progress.completed_at) AS completed_at,
  MAX(progress.completed_at) AS created_at,
  MAX(progress.completed_at) AS updated_at
FROM public.ai_trail_module_progress AS progress
JOIN trail_targets AS targets
  ON targets.tool_slug = progress.tool_slug
GROUP BY progress.user_id, progress.tool_slug, targets.total_modules
HAVING COUNT(DISTINCT progress.module_number) >= targets.total_modules
ON CONFLICT (user_id, tool_slug) DO NOTHING;
