CREATE OR REPLACE FUNCTION public.get_admin_product_counts()
RETURNS TABLE (
  base_users bigint,
  freelancer_users bigint,
  ai_hub_users bigint
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY
  SELECT
    (
      SELECT COUNT(DISTINCT user_id)
      FROM public.user_product_access
      WHERE product_type = 'base'
    ) AS base_users,
    (
      SELECT COUNT(DISTINCT user_id)
      FROM public.user_product_access
      WHERE product_type = 'freelancer'
    ) AS freelancer_users,
    (
      SELECT COUNT(DISTINCT user_id)
      FROM public.user_product_access
      WHERE product_type = 'ai_hub'
    ) AS ai_hub_users;
END;
$$;

REVOKE ALL ON FUNCTION public.get_admin_product_counts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_admin_product_counts() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_product_counts() TO service_role;
