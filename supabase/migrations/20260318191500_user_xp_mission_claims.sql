CREATE TABLE IF NOT EXISTS public.user_xp_mission_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  mission_key TEXT NOT NULL,
  mission_group TEXT NOT NULL DEFAULT 'elite',
  period_key TEXT NOT NULL DEFAULT 'lifetime',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  claimed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT user_xp_mission_claims_user_period_unique UNIQUE (user_id, mission_key, period_key)
);

ALTER TABLE public.user_xp_mission_claims ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_xp_mission_claims'
      AND policyname = 'Users can view own XP mission claims'
  ) THEN
    CREATE POLICY "Users can view own XP mission claims"
    ON public.user_xp_mission_claims
    FOR SELECT
    USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_xp_mission_claims'
      AND policyname = 'Users can insert own XP mission claims'
  ) THEN
    CREATE POLICY "Users can insert own XP mission claims"
    ON public.user_xp_mission_claims
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_xp_mission_claims'
      AND policyname = 'Users can delete own XP mission claims'
  ) THEN
    CREATE POLICY "Users can delete own XP mission claims"
    ON public.user_xp_mission_claims
    FOR DELETE
    USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_xp_mission_claims_user_period
ON public.user_xp_mission_claims(user_id, period_key, claimed_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_xp_mission_claims_group
ON public.user_xp_mission_claims(user_id, mission_group, claimed_at DESC);
