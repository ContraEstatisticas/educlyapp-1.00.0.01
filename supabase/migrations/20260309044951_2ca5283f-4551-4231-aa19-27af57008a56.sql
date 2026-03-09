CREATE OR REPLACE FUNCTION public.get_avg_first_session_minutes()
RETURNS numeric
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT COALESCE(
    PERCENTILE_CONT(0.5) WITHIN GROUP (
      ORDER BY LEAST(
        EXTRACT(EPOCH FROM (fs.last_ping_at - fs.started_at)) / 60,
        10
      )
    ), 0
  )::NUMERIC
  FROM (
    SELECT DISTINCT ON (user_id)
      user_id, started_at, last_ping_at
    FROM user_sessions
    WHERE last_ping_at > started_at
    ORDER BY user_id, started_at ASC
  ) fs;
$$;