-- Reset first-login analytics to the interaction-only rollout.
-- Only users created after this rollout should enter the metric so older
-- passive-tracking data does not keep inflating the average.

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
  v_resume_window interval := interval '30 seconds';
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
        client_session_key = COALESCE(public.user_sessions.client_session_key, p_client_session_key)
    WHERE id = p_existing_session_id
      AND user_id = v_user_id
      AND ended_at IS NULL
      AND GREATEST(COALESCE(last_ping_at, started_at), started_at) >= v_started_at - v_resume_window
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
      AND us.ended_at IS NULL
      AND GREATEST(COALESCE(us.last_ping_at, us.started_at), us.started_at) >= v_started_at - v_resume_window
    ORDER BY GREATEST(COALESCE(us.last_ping_at, us.started_at), us.started_at) DESC,
             us.started_at DESC
    LIMIT 1;

    IF v_session_id IS NOT NULL THEN
      UPDATE public.user_sessions
      SET last_ping_at = GREATEST(COALESCE(last_ping_at, v_started_at), v_started_at)
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

DROP VIEW IF EXISTS public.user_session_details;

CREATE VIEW public.user_session_details
WITH (security_invoker=on) AS
WITH rollout AS (
  SELECT TIMESTAMPTZ '2026-03-19 17:09:17-03' AS tracking_rollout_at
),
eligible_users AS (
  SELECT
    u.id AS user_id,
    u.email,
    u.created_at AS account_created_at,
    p.full_name
  FROM auth.users u
  LEFT JOIN public.profiles p
    ON p.id = u.id
  CROSS JOIN rollout r
  WHERE u.id IS NOT NULL
    AND u.created_at IS NOT NULL
    AND u.created_at >= r.tracking_rollout_at
    AND lower(coalesce(u.email, '')) <> 'ferramentasdigitais1000@gmail.com'
),
first_sessions AS (
  SELECT
    eu.user_id,
    eu.email,
    eu.full_name,
    eu.account_created_at,
    us.started_at,
    GREATEST(
      COALESCE(us.last_ping_at, us.started_at),
      COALESCE(us.ended_at, us.started_at)
    ) AS session_ended_at,
    row_number() OVER (PARTITION BY eu.user_id ORDER BY us.started_at ASC) AS session_rank
  FROM eligible_users eu
  JOIN public.user_sessions us
    ON us.user_id = eu.user_id
  WHERE us.started_at IS NOT NULL
    AND us.started_at >= eu.account_created_at
    AND GREATEST(
      COALESCE(us.last_ping_at, us.started_at),
      COALESCE(us.ended_at, us.started_at)
    ) > us.started_at
)
SELECT
  fs.full_name AS nome,
  fs.email,
  fs.started_at AS inicio,
  fs.session_ended_at AS ultimo_sinal,
  round((EXTRACT(epoch FROM (fs.session_ended_at - fs.started_at)) / 60)::numeric, 2) AS minutos_ativos
FROM first_sessions fs
WHERE fs.session_rank = 1;

CREATE OR REPLACE FUNCTION public.get_avg_first_session_minutes()
RETURNS numeric
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH rollout AS (
    SELECT TIMESTAMPTZ '2026-03-19 17:09:17-03' AS tracking_rollout_at
  ),
  eligible_users AS (
    SELECT
      u.id AS user_id,
      u.created_at AS account_created_at
    FROM auth.users u
    CROSS JOIN rollout r
    WHERE u.id IS NOT NULL
      AND u.created_at IS NOT NULL
      AND u.created_at >= r.tracking_rollout_at
      AND lower(coalesce(u.email, '')) <> 'ferramentasdigitais1000@gmail.com'
  ),
  first_sessions AS (
    SELECT
      eu.user_id,
      us.started_at,
      GREATEST(
        COALESCE(us.last_ping_at, us.started_at),
        COALESCE(us.ended_at, us.started_at)
      ) AS session_ended_at,
      row_number() OVER (PARTITION BY eu.user_id ORDER BY us.started_at ASC) AS session_rank
    FROM eligible_users eu
    JOIN public.user_sessions us
      ON us.user_id = eu.user_id
    WHERE us.started_at IS NOT NULL
      AND us.started_at >= eu.account_created_at
      AND GREATEST(
        COALESCE(us.last_ping_at, us.started_at),
        COALESCE(us.ended_at, us.started_at)
      ) > us.started_at
  )
  SELECT COALESCE(
    AVG(EXTRACT(EPOCH FROM (fs.session_ended_at - fs.started_at)) / 60),
    0
  )::NUMERIC
  FROM first_sessions fs
  WHERE fs.session_rank = 1;
$$;
