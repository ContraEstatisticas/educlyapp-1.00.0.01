DROP VIEW IF EXISTS public.user_session_details;

CREATE VIEW public.user_session_details
WITH (security_invoker=on) AS
WITH first_sessions AS (
  SELECT
    user_sessions.user_id,
    user_sessions.started_at,
    user_sessions.last_ping_at,
    row_number() OVER (PARTITION BY user_sessions.user_id ORDER BY user_sessions.started_at) AS session_rank
  FROM public.user_sessions
  WHERE user_sessions.user_id IS NOT NULL
    AND user_sessions.started_at IS NOT NULL
    AND user_sessions.last_ping_at IS NOT NULL
    AND user_sessions.last_ping_at > user_sessions.started_at
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
    WHERE user_id IS NOT NULL
      AND started_at IS NOT NULL
      AND last_ping_at IS NOT NULL
      AND last_ping_at > started_at
    ORDER BY user_id, started_at ASC
  ) fs;
$$;
