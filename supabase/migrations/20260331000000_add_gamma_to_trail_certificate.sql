-- Add Gamma to generate_trail_certificate function
-- Gamma has 4 modules

CREATE OR REPLACE FUNCTION public.generate_trail_certificate(
  p_tool_slug text,
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
  v_expected_modules integer;
  v_certificate_id uuid;
  v_safe_full_name text;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;

  v_expected_modules := CASE p_tool_slug
    WHEN 'midjourney' THEN 6
    WHEN 'gemini' THEN 7
    WHEN 'chatgpt' THEN 8
    WHEN 'deepseek' THEN 6
    WHEN 'claude' THEN 7
    WHEN 'lovable' THEN 6
    WHEN 'grok' THEN 6
    WHEN 'gamma' THEN 4
    ELSE NULL
  END;

  IF v_expected_modules IS NULL THEN
    RETURN NULL;
  END IF;

  v_safe_full_name := COALESCE(NULLIF(BTRIM(p_user_full_name), ''), 'Student');

  SELECT COUNT(DISTINCT module_number)
  INTO v_completed_modules
  FROM public.ai_trail_module_progress
  WHERE user_id = v_user_id
    AND tool_slug = p_tool_slug
    AND module_number BETWEEN 1 AND v_expected_modules;

  IF v_completed_modules < v_expected_modules THEN
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
    p_tool_slug,
    'trail_completion',
    v_safe_full_name
  )
  ON CONFLICT DO NOTHING
  RETURNING id INTO v_certificate_id;

  IF v_certificate_id IS NULL THEN
    SELECT id
    INTO v_certificate_id
    FROM public.user_certificates
    WHERE user_id = v_user_id
      AND tool_slug = p_tool_slug
      AND certificate_type = 'trail_completion'
      AND challenge_id IS NULL
    LIMIT 1;
  END IF;

  RETURN v_certificate_id;
END;
$function$;

REVOKE ALL ON FUNCTION public.generate_trail_certificate(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.generate_trail_certificate(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_trail_certificate(text, text) TO service_role;
