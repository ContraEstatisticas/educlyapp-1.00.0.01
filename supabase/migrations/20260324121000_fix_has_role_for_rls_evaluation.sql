-- Ajuste pos-validacao do checklist 1/20.
--
-- Problema encontrado:
-- a policy "Admins can view all roles" usa public.has_role(...).
-- Depois da migration anterior, a funcao ficou executavel apenas por
-- authenticated. Em consultas anonimas ao PostgREST, a avaliacao da
-- policy passou a falhar com "permission denied for function has_role"
-- em vez de simplesmente retornar zero linhas.
--
-- Correcao:
-- - permitir execucao da funcao por anon e authenticated
-- - restringir a funcao para so responder sobre o proprio usuario logado
--   e retornar false para chamadas anonimas ou para qualquer _user_id
--   diferente de auth.uid()

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id uuid := auth.uid();
BEGIN
  IF v_caller_id IS NULL THEN
    RETURN false;
  END IF;

  IF _user_id IS NULL OR _user_id <> v_caller_id THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
END;
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
