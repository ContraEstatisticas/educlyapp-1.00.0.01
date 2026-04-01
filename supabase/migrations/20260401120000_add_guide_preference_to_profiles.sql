ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS preferred_guide text,
ADD COLUMN IF NOT EXISTS guide_preference_completed boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS guide_preference_updated_at timestamp with time zone;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_preferred_guide_check'
  ) THEN
    ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_preferred_guide_check
    CHECK (preferred_guide IS NULL OR preferred_guide IN ('robot', 'edi'));
  END IF;
END $$;

UPDATE public.profiles
SET
  guide_preference_completed = true,
  guide_preference_updated_at = COALESCE(guide_preference_updated_at, updated_at, created_at, now())
WHERE preferred_guide IS NOT NULL;
