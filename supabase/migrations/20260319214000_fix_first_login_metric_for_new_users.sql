-- Restrict first-login analytics to truly new users created after the
-- tracking rollout, and only measure the first valid session after signup.

DROP VIEW IF EXISTS public.user_session_details;

CREATE VIEW public.user_session_details
WITH (security_invoker=on) AS
WITH rollout AS (
  SELECT TIMESTAMPTZ '2026-03-18 11:20:00-03' AS tracking_rollout_at
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
    SELECT TIMESTAMPTZ '2026-03-18 11:20:00-03' AS tracking_rollout_at
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
