-- Harden session tracking by reusing the same session row per browser tab,
-- recording explicit session endings, and restarting first-session analytics
-- from a clean cutoff after the new rollout.

ALTER TABLE public.user_sessions
ADD COLUMN IF NOT EXISTS client_session_key text;

ALTER TABLE public.user_sessions
ADD COLUMN IF NOT EXISTS ended_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_started_at
ON public.user_sessions(user_id, started_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_client_key
ON public.user_sessions(user_id, client_session_key, started_at DESC);

CREATE OR REPLACE FUNCTION public.start_or_resume_user_session(
  p_client_session_key text DEFAULT NULL,
  p_started_at timestamptz DEFAULT now(),
  p_existing_session_id uuid DEFAULT NULL
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
  v_recent_window interval := interval '12 hours';
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  IF p_client_session_key IS NOT NULL AND btrim(p_client_session_key) = '' THEN
    p_client_session_key := NULL;
  END IF;

  IF p_existing_session_id IS NOT NULL THEN
    UPDATE public.user_sessions
    SET last_ping_at = GREATEST(COALESCE(last_ping_at, v_started_at), v_started_at),
        ended_at = NULL,
        client_session_key = COALESCE(public.user_sessions.client_session_key, p_client_session_key)
    WHERE id = p_existing_session_id
      AND user_id = v_user_id
      AND started_at >= v_started_at - v_recent_window
    RETURNING id INTO v_session_id;

    IF v_session_id IS NOT NULL THEN
      RETURN v_session_id;
    END IF;
  END IF;

  IF p_client_session_key IS NOT NULL THEN
    SELECT us.id
    INTO v_session_id
    FROM public.user_sessions us
    WHERE us.user_id = v_user_id
      AND us.client_session_key = p_client_session_key
      AND us.started_at >= v_started_at - v_recent_window
    ORDER BY GREATEST(COALESCE(us.ended_at, us.started_at), COALESCE(us.last_ping_at, us.started_at)) DESC,
             us.started_at DESC
    LIMIT 1;

    IF v_session_id IS NOT NULL THEN
      UPDATE public.user_sessions
      SET last_ping_at = GREATEST(COALESCE(last_ping_at, v_started_at), v_started_at),
          ended_at = NULL
      WHERE id = v_session_id;

      RETURN v_session_id;
    END IF;
  END IF;

  INSERT INTO public.user_sessions (
    user_id,
    client_session_key,
    started_at,
    last_ping_at,
    ended_at
  )
  VALUES (
    v_user_id,
    p_client_session_key,
    v_started_at,
    v_started_at,
    NULL
  )
  RETURNING id INTO v_session_id;

  RETURN v_session_id;
END;
$$;

REVOKE ALL ON FUNCTION public.start_or_resume_user_session(text, timestamptz, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.start_or_resume_user_session(text, timestamptz, uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.start_user_session(
  p_started_at timestamptz DEFAULT now()
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.start_or_resume_user_session(NULL, p_started_at, NULL);
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

CREATE OR REPLACE FUNCTION public.finish_user_session(
  p_session_id uuid,
  p_ended_at timestamptz DEFAULT now()
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid;
  v_ended_at timestamptz := COALESCE(p_ended_at, now());
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  IF p_session_id IS NULL THEN
    RETURN false;
  END IF;

  UPDATE public.user_sessions
  SET last_ping_at = GREATEST(COALESCE(last_ping_at, v_ended_at), v_ended_at),
      ended_at = GREATEST(COALESCE(ended_at, v_ended_at), v_ended_at)
  WHERE id = p_session_id
    AND user_id = v_user_id;

  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.finish_user_session(uuid, timestamptz) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.finish_user_session(uuid, timestamptz) TO authenticated;

DROP VIEW IF EXISTS public.user_session_details;

CREATE VIEW public.user_session_details
WITH (security_invoker=on) AS
WITH cutoff AS (
  SELECT TIMESTAMPTZ '2026-03-18 11:20:00-03' AS first_session_cutoff
),
first_sessions AS (
  SELECT
    us.user_id,
    us.started_at,
    GREATEST(COALESCE(us.last_ping_at, us.started_at), COALESCE(us.ended_at, us.started_at)) AS session_ended_at,
    row_number() OVER (PARTITION BY us.user_id ORDER BY us.started_at) AS session_rank
  FROM public.user_sessions us
  CROSS JOIN cutoff c
  WHERE us.user_id IS NOT NULL
    AND us.started_at IS NOT NULL
    AND GREATEST(COALESCE(us.last_ping_at, us.started_at), COALESCE(us.ended_at, us.started_at)) > us.started_at
    AND us.started_at >= c.first_session_cutoff
)
SELECT
  p.full_name AS nome,
  u.email,
  fs.started_at AS inicio,
  fs.session_ended_at AS ultimo_sinal,
  round((EXTRACT(epoch FROM (fs.session_ended_at - fs.started_at)) / 60)::numeric, 2) AS minutos_ativos
FROM first_sessions fs
JOIN public.profiles p
  ON fs.user_id = p.id
JOIN auth.users u
  ON fs.user_id = u.id
WHERE fs.session_rank = 1
  AND fs.started_at >= p.created_at;

CREATE OR REPLACE FUNCTION public.get_avg_first_session_minutes()
RETURNS numeric
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH cutoff AS (
    SELECT TIMESTAMPTZ '2026-03-18 11:20:00-03' AS first_session_cutoff
  )
  SELECT COALESCE(
    AVG(EXTRACT(EPOCH FROM (fs.session_ended_at - fs.started_at)) / 60),
    0
  )::NUMERIC
  FROM (
    SELECT DISTINCT ON (user_id)
      user_id,
      started_at,
      GREATEST(COALESCE(last_ping_at, started_at), COALESCE(ended_at, started_at)) AS session_ended_at
    FROM public.user_sessions
    CROSS JOIN cutoff c
    WHERE user_id IS NOT NULL
      AND started_at IS NOT NULL
      AND GREATEST(COALESCE(last_ping_at, started_at), COALESCE(ended_at, started_at)) > started_at
      AND started_at >= c.first_session_cutoff
    ORDER BY user_id, started_at ASC
  ) fs;
$$;
