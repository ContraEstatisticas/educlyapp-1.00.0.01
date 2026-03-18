-- Clean first-session analytics by ignoring sessions captured before the
-- new tracking rollout. Cutoff: March 18, 2026 at 11:00:00 America/Sao_Paulo.

DROP VIEW IF EXISTS public.user_session_details;

CREATE VIEW public.user_session_details
WITH (security_invoker=on) AS
WITH cutoff AS (
  SELECT TIMESTAMPTZ '2026-03-18 11:00:00-03' AS first_session_cutoff
),
first_sessions AS (
  SELECT
    us.user_id,
    us.started_at,
    us.last_ping_at,
    row_number() OVER (PARTITION BY us.user_id ORDER BY us.started_at) AS session_rank
  FROM public.user_sessions us
  CROSS JOIN cutoff c
  WHERE us.user_id IS NOT NULL
    AND us.started_at IS NOT NULL
    AND us.last_ping_at IS NOT NULL
    AND us.last_ping_at > us.started_at
    AND us.started_at >= c.first_session_cutoff
)
SELECT
  p.full_name AS nome,
  u.email,
  fs.started_at AS inicio,
  fs.last_ping_at AS ultimo_sinal,
  round((EXTRACT(epoch FROM (fs.last_ping_at - fs.started_at)) / 60)::numeric, 2) AS minutos_ativos
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
    SELECT TIMESTAMPTZ '2026-03-18 11:00:00-03' AS first_session_cutoff
  )
  SELECT COALESCE(
    AVG(EXTRACT(EPOCH FROM (fs.last_ping_at - fs.started_at)) / 60),
    0
  )::NUMERIC
  FROM (
    SELECT DISTINCT ON (user_id)
      user_id,
      started_at,
      last_ping_at
    FROM public.user_sessions
    CROSS JOIN cutoff c
    WHERE user_id IS NOT NULL
      AND started_at IS NOT NULL
      AND last_ping_at IS NOT NULL
      AND last_ping_at > started_at
      AND started_at >= c.first_session_cutoff
    ORDER BY user_id, started_at ASC
  ) fs;
$$;
