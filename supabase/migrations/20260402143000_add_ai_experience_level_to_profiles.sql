ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS ai_experience_level text,
ADD COLUMN IF NOT EXISTS ai_experience_level_updated_at timestamp with time zone;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_ai_experience_level_check'
  ) THEN
    ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_ai_experience_level_check
    CHECK (
      ai_experience_level IS NULL
      OR ai_experience_level IN ('none', 'some', 'intermediate', 'advanced')
    );
  END IF;
END $$;

UPDATE public.profiles
SET ai_experience_level_updated_at = COALESCE(ai_experience_level_updated_at, updated_at, created_at, now())
WHERE ai_experience_level IS NOT NULL;
