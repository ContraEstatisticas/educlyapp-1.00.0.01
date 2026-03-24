-- Checklist 1/20: garantir RLS explicitamente habilitado
-- em todas as tabelas com dados de usuario.
--
-- Contexto:
-- - public.user_roles e public.user_sessions existem no projeto atual
--   e aparecem no schema tipado da aplicacao.
-- - O repositorio, porem, nao tinha uma migration explicita versionando
--   o ENABLE ROW LEVEL SECURITY dessas duas tabelas.

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

ALTER TABLE IF EXISTS public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_sessions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'user_roles'
         AND policyname = 'Users can view own role'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Users can view own role"
      ON public.user_roles
      FOR SELECT
      USING (auth.uid() = user_id)
    $policy$;
  END IF;

  IF to_regclass('public.user_roles') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'user_roles'
         AND policyname = 'Admins can view all roles'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Admins can view all roles"
      ON public.user_roles
      FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'::public.app_role))
    $policy$;
  END IF;

  IF to_regclass('public.user_sessions') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'user_sessions'
         AND policyname = 'Users can view own sessions'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Users can view own sessions"
      ON public.user_sessions
      FOR SELECT
      USING (auth.uid() = user_id)
    $policy$;
  END IF;

  IF to_regclass('public.user_sessions') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM pg_policies
       WHERE schemaname = 'public'
         AND tablename = 'user_sessions'
         AND policyname = 'Admins can view all sessions'
     ) THEN
    EXECUTE $policy$
      CREATE POLICY "Admins can view all sessions"
      ON public.user_sessions
      FOR SELECT
      USING (public.is_admin())
    $policy$;
  END IF;
END
$$;
