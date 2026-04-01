ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS challenge_day1_variant text NOT NULL DEFAULT 'atual';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_challenge_day1_variant_check'
  ) THEN
    ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_challenge_day1_variant_check
    CHECK (challenge_day1_variant IN ('atual', 'guilherme', 'sidney'));
  END IF;
END $$;

UPDATE public.profiles
SET challenge_day1_variant = 'atual'
WHERE challenge_day1_variant IS NULL;

CREATE TABLE IF NOT EXISTS public.challenge_day_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  challenge_day_id uuid NOT NULL REFERENCES public.challenge_days(id) ON DELETE CASCADE,
  challenge_day_number integer NOT NULL CHECK (challenge_day_number > 0),
  day_variant text NOT NULL CHECK (day_variant IN ('atual', 'guilherme', 'sidney')),
  star_rating integer NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
  opinion_text text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT challenge_day_feedback_user_day_variant_key UNIQUE (user_id, challenge_day_id, day_variant)
);

CREATE INDEX IF NOT EXISTS idx_challenge_day_feedback_user_id
ON public.challenge_day_feedback (user_id);

CREATE INDEX IF NOT EXISTS idx_challenge_day_feedback_variant
ON public.challenge_day_feedback (day_variant, challenge_day_number);

ALTER TABLE public.challenge_day_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own challenge day feedback" ON public.challenge_day_feedback;
CREATE POLICY "Users can view own challenge day feedback"
ON public.challenge_day_feedback
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own challenge day feedback" ON public.challenge_day_feedback;
CREATE POLICY "Users can insert own challenge day feedback"
ON public.challenge_day_feedback
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own challenge day feedback" ON public.challenge_day_feedback;
CREATE POLICY "Users can update own challenge day feedback"
ON public.challenge_day_feedback
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all challenge day feedback" ON public.challenge_day_feedback;
CREATE POLICY "Admins can view all challenge day feedback"
ON public.challenge_day_feedback
FOR SELECT
TO authenticated
USING (public.is_admin());
