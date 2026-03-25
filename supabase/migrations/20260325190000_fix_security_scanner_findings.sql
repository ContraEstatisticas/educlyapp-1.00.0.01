-- Fix Supabase security scanner findings related to:
-- - exposed auth.users data through a public view
-- - direct client-side writes to public.user_roles

-- Remove the public view that joins auth.users and replace it with an
-- admin-only RPC. This keeps the export feature without exposing a public
-- relation in the REST API surface.
DROP VIEW IF EXISTS public.user_session_details;

CREATE OR REPLACE FUNCTION public.admin_export_first_session_details()
RETURNS TABLE (
  nome text,
  email text,
  inicio timestamptz,
  ultimo_sinal timestamptz,
  minutos_ativos numeric
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  RETURN QUERY
  WITH rollout AS (
    SELECT TIMESTAMPTZ '2026-03-19 17:30:00-03' AS tracking_rollout_at
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
  WHERE fs.session_rank = 1
  ORDER BY fs.started_at DESC;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_export_first_session_details() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_export_first_session_details() TO authenticated;

-- Lock down direct writes to user_roles for anon/authenticated clients.
-- Legitimate writes happen through service-role powered admin functions.
ALTER TABLE IF EXISTS public.user_roles ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  v_policy record;
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL THEN
    FOR v_policy IN
      SELECT policyname
      FROM pg_policies
      WHERE schemaname = 'public'
        AND tablename = 'user_roles'
        AND cmd IN ('INSERT', 'UPDATE', 'DELETE', 'ALL')
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.user_roles', v_policy.policyname);
    END LOOP;
  END IF;
END
$$;

DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'user_roles'
         AND policyname = 'No direct writes to user roles'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "No direct writes to user roles"
      ON public.user_roles
      FOR ALL
      TO anon, authenticated
      USING (false)
      WITH CHECK (false)
    $policy$;
  END IF;
END
$$;

DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL THEN
    EXECUTE 'REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.user_roles FROM anon, authenticated';
  END IF;
END
$$;
