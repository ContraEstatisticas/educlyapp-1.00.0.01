CREATE OR REPLACE FUNCTION public.get_avg_first_session_minutes()
RETURNS numeric
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT COALESCE(
    AVG(
      LEAST(
        EXTRACT(EPOCH FROM (fs.last_ping_at - fs.started_at)) / 60,
        30
      )
    ), 0
  )::NUMERIC
  FROM (
    SELECT DISTINCT ON (s.user_id)
      s.user_id, s.started_at, s.last_ping_at
    FROM user_sessions s
    JOIN profiles p ON p.id = s.user_id
    WHERE s.last_ping_at > s.started_at
      AND p.created_at >= NOW() - INTERVAL '30 days'
    ORDER BY s.user_id, s.started_at ASC
  ) fs;
$$;