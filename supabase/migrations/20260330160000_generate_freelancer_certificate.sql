CREATE OR REPLACE FUNCTION public.generate_freelancer_certificate(
  p_user_full_name text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_user_id uuid;
  v_completed_modules integer;
  v_certificate_id uuid;
  v_safe_full_name text;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;

  v_safe_full_name := COALESCE(NULLIF(BTRIM(p_user_full_name), ''), 'Student');

  SELECT COUNT(DISTINCT module_number)
  INTO v_completed_modules
  FROM public.freelancer_module_progress
  WHERE user_id = v_user_id
    AND completed = true
    AND module_number BETWEEN 1 AND 14;

  IF v_completed_modules < 14 THEN
    RETURN NULL;
  END IF;

  INSERT INTO public.user_certificates (
    user_id,
    tool_slug,
    certificate_type,
    user_full_name
  )
  VALUES (
    v_user_id,
    'freelancer',
    'freelancer_completion',
    v_safe_full_name
  )
  ON CONFLICT DO NOTHING
  RETURNING id INTO v_certificate_id;

  IF v_certificate_id IS NULL THEN
    SELECT id
    INTO v_certificate_id
    FROM public.user_certificates
    WHERE user_id = v_user_id
      AND tool_slug = 'freelancer'
      AND certificate_type = 'freelancer_completion'
      AND challenge_id IS NULL
    LIMIT 1;
  END IF;

  RETURN v_certificate_id;
END;
$function$;

REVOKE ALL ON FUNCTION public.generate_freelancer_certificate(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.generate_freelancer_certificate(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_freelancer_certificate(text) TO service_role;
