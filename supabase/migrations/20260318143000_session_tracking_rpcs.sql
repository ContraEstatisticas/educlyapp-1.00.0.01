-- Make session tracking reliable by routing writes through RPCs tied to auth.uid().

CREATE OR REPLACE FUNCTION public.start_user_session(
  p_started_at timestamptz DEFAULT now()
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_started_at timestamptz := COALESCE(p_started_at, now());
  v_session_id uuid;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  INSERT INTO public.user_sessions (
    user_id,
    started_at,
    last_ping_at
  )
  VALUES (
    v_user_id,
    v_started_at,
    v_started_at
  )
  RETURNING id INTO v_session_id;

  RETURN v_session_id;
END;
$$;

REVOKE ALL ON FUNCTION public.start_user_session(timestamptz) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.start_user_session(timestamptz) TO authenticated;

CREATE OR REPLACE FUNCTION public.ping_user_session(
  p_session_id uuid,
  p_ping_at timestamptz DEFAULT now()
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_ping_at timestamptz := COALESCE(p_ping_at, now());
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  IF p_session_id IS NULL THEN
    RETURN false;
  END IF;

  UPDATE public.user_sessions
  SET last_ping_at = GREATEST(COALESCE(last_ping_at, v_ping_at), v_ping_at)
  WHERE id = p_session_id
    AND user_id = v_user_id;

  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.ping_user_session(uuid, timestamptz) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ping_user_session(uuid, timestamptz) TO authenticated;
