
CREATE OR REPLACE FUNCTION public.admin_lookup_email(p_email text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_result jsonb;
  v_user_id uuid;
  v_user_email text;
  v_user_created_at timestamptz;
  v_has_account boolean := false;
  v_products jsonb := '[]'::jsonb;
  v_billing_events jsonb := '[]'::jsonb;
  v_is_premium boolean := false;
  v_plan_type text;
  v_clean_email text;
BEGIN
  IF NOT is_admin() THEN
    RETURN jsonb_build_object('error', 'unauthorized');
  END IF;

  v_clean_email := LOWER(TRIM(p_email));

  SELECT id, email, created_at INTO v_user_id, v_user_email, v_user_created_at
  FROM auth.users
  WHERE LOWER(TRIM(email)) = v_clean_email
  LIMIT 1;

  IF v_user_id IS NOT NULL THEN
    v_has_account := true;

    SELECT COALESCE(upa.is_premium, false), COALESCE(upa.plan_type, 'free')
    INTO v_is_premium, v_plan_type
    FROM user_premium_access upa
    WHERE upa.user_id = v_user_id;

    SELECT COALESCE(jsonb_agg(jsonb_build_object(
      'product_type', upa.product_type,
      'product_id', upa.product_id,
      'is_active', upa.is_active,
      'granted_at', upa.granted_at
    )), '[]'::jsonb)
    INTO v_products
    FROM user_product_access upa
    WHERE upa.user_id = v_user_id;
  END IF;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'event_type', bel.event_type,
    'status', bel.status,
    'processed', bel.processed,
    'created_at', bel.created_at
  ) ORDER BY bel.created_at DESC), '[]'::jsonb)
  INTO v_billing_events
  FROM billing_event_logs bel
  WHERE LOWER(TRIM(bel.email)) = v_clean_email;

  v_result := jsonb_build_object(
    'has_account', v_has_account,
    'user_id', v_user_id,
    'email', v_user_email,
    'created_at', v_user_created_at,
    'is_premium', v_is_premium,
    'plan_type', COALESCE(v_plan_type, 'free'),
    'products', v_products,
    'billing_events', v_billing_events
  );

  RETURN v_result;
END;
$function$;
