ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS challenge_day1_variant_assigned_at timestamp with time zone;

CREATE OR REPLACE FUNCTION public.normalize_day1_experiment_variant(p_variant text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path TO 'public'
AS $$
  SELECT CASE lower(trim(coalesce(p_variant, '')))
    WHEN 'atual' THEN 'atual'
    WHEN 'guilherme' THEN 'guilherme'
    WHEN 'sidney' THEN 'sidney'
    ELSE NULL
  END;
$$;

CREATE OR REPLACE FUNCTION public.get_next_day1_experiment_variant()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_variant text;
BEGIN
  PERFORM pg_advisory_xact_lock(20260401, 1);

  WITH available_variants AS (
    SELECT *
    FROM (
      VALUES
        ('atual'::text, 1),
        ('guilherme'::text, 2),
        ('sidney'::text, 3)
    ) AS v(variant, sort_order)
  ),
  variant_counts AS (
    SELECT
      p.challenge_day1_variant AS variant,
      COUNT(*)::bigint AS total
    FROM public.profiles p
    WHERE p.challenge_day1_variant_assigned_at IS NOT NULL
    GROUP BY p.challenge_day1_variant
  )
  SELECT av.variant
  INTO v_variant
  FROM available_variants av
  LEFT JOIN variant_counts vc ON vc.variant = av.variant
  ORDER BY COALESCE(vc.total, 0), av.sort_order
  LIMIT 1;

  RETURN COALESCE(v_variant, 'atual');
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_requested_variant text;
  v_resolved_variant text;
BEGIN
  v_requested_variant := public.normalize_day1_experiment_variant(
    NEW.raw_user_meta_data ->> 'challenge_day1_variant'
  );

  v_resolved_variant := COALESCE(
    v_requested_variant,
    public.get_next_day1_experiment_variant()
  );

  INSERT INTO public.profiles (
    id,
    full_name,
    challenge_day1_variant,
    challenge_day1_variant_assigned_at
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    v_resolved_variant,
    now()
  );

  RETURN NEW;
END;
$$;
