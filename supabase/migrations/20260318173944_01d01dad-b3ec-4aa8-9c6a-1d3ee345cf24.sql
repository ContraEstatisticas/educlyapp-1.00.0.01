CREATE OR REPLACE FUNCTION public.check_and_expire_access()
 RETURNS TABLE(expired_premium_count integer, expired_product_count integer, expired_events_count integer, details jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_expired_premium INTEGER := 0;
  v_expired_product INTEGER := 0;
  v_expired_events INTEGER := 0;
  v_details JSONB := '{"expired_users": [], "expired_events": []}'::JSONB;
  v_user RECORD;
  v_event RECORD;
BEGIN
  FOR v_user IN 
    SELECT upa.user_id, au.email
    FROM user_premium_access upa
    LEFT JOIN auth.users au ON au.id = upa.user_id
    WHERE upa.is_premium = true 
      AND upa.expires_at IS NOT NULL 
      AND upa.expires_at < NOW()
  LOOP
    UPDATE user_premium_access
    SET is_premium = false, plan_updated_at = NOW()
    WHERE user_id = v_user.user_id;
    
    UPDATE user_product_access
    SET is_active = false, revoked_at = NOW()
    WHERE user_id = v_user.user_id AND is_active = true;
    
    v_expired_premium := v_expired_premium + 1;
    
    v_details := jsonb_set(
      v_details,
      '{expired_users}',
      v_details->'expired_users' || jsonb_build_object(
        'user_id', v_user.user_id,
        'email', v_user.email,
        'expired_at', NOW()
      )
    );
  END LOOP;

  FOR v_event IN
    SELECT id, email, event_type, created_at
    FROM billing_event_logs
    WHERE status = 'USER_NOT_FOUND'
      AND processed = false
      AND created_at < NOW() - INTERVAL '30 days'
  LOOP
    UPDATE billing_event_logs
    SET status = 'expired_no_signup',
        processed = true,
        processed_at = NOW(),
        error_message = 'Auto-expired: user did not register within 30 days'
    WHERE id = v_event.id;
    
    v_expired_events := v_expired_events + 1;
    
    v_details := jsonb_set(
      v_details,
      '{expired_events}',
      v_details->'expired_events' || jsonb_build_object(
        'event_id', v_event.id,
        'email', v_event.email,
        'event_type', v_event.event_type,
        'created_at', v_event.created_at
      )
    );
  END LOOP;

  SELECT COUNT(*) INTO v_expired_product
  FROM user_product_access
  WHERE is_active = true
    AND expires_at IS NOT NULL
    AND expires_at < NOW();

  UPDATE user_product_access
  SET is_active = false, revoked_at = NOW()
  WHERE is_active = true
    AND expires_at IS NOT NULL
    AND expires_at < NOW();

  RETURN QUERY SELECT v_expired_premium, v_expired_product, v_expired_events, v_details;
END;
$function$;