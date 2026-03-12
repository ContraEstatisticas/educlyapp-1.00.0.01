-- ============================================================================
-- Atualizar: process_pending_billing_events
-- Missão: Revogar acesso de forma automática em caso de CHARGEBACK / REEMBOLSO
-- ============================================================================

CREATE OR REPLACE FUNCTION public.process_pending_billing_events(p_user_id uuid, p_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_event RECORD;
  v_product_type TEXT;
  v_product_id TEXT;
  v_normalized_email TEXT;
BEGIN
  v_normalized_email := LOWER(RTRIM(p_email, '.'));
  
  FOR v_event IN 
    SELECT * FROM billing_event_logs 
    WHERE LOWER(RTRIM(email, '.')) = v_normalized_email
      AND (status = 'pending' OR status = 'USER_NOT_FOUND')
      AND processed = false
      AND UPPER(event_type) IN (
        -- Eventos Positivos
        'SETTLED', 'STARTING_TRIAL', 'SUBSCRIPTION_SETTLED', 
        'SUBSCRIPTION_TRIAL_STARTED', 'GRANTED',
        'CONVERTION', 'RENEWING', 'RESUMING', 'RECOVERING', 'RECOVERING_AUTORENEW',
        'PURCHASE_COMPLETE', 'PURCHASE_APPROVED', 'PURCHASE_PROTEST', 'PURCHASE_DELAYED',
        
        -- Eventos Negativos (Revogação)
        'SUBSCRIPTION_CANCELLATION', 'PAUSING',
        'CANCELED', 'CANCELED_ADVANCED',
        'REFUNDED', 'REFUNDED_ADVANCED',
        'CHARGEBACK', 'CHARGEBACK_ADVANCED',
        'OVERDUE', 'EXPIRED'
      )
    ORDER BY created_at ASC
  LOOP
    -- Extract product_id from payload (multiple provider paths)
    v_product_id := COALESCE(
      v_event.payload->>'product_id',
      v_event.payload->'data'->'product'->>'id',
      v_event.payload->'oneoff'->>'product_id',
      v_event.payload->'data'->'items'->0->'price'->>'product_id',
      REPLACE(
        v_event.payload->'subscription'->'price_point'->'features'->0->>'ident',
        'product_', ''
      )
    );
    
    -- Look up product type from product_definitions
    SELECT product_type INTO v_product_type 
    FROM product_definitions 
    WHERE product_id = v_product_id;
    
    IF v_product_type IS NULL THEN
      v_product_type := 'base';
    END IF;
    
    -- Verificar se é um evento de REVOGAÇÃO/CHARGEBACK
    IF UPPER(v_event.event_type) IN (
        'SUBSCRIPTION_CANCELLATION', 'PAUSING',
        'CANCELED', 'CANCELED_ADVANCED',
        'REFUNDED', 'REFUNDED_ADVANCED',
        'CHARGEBACK', 'CHARGEBACK_ADVANCED',
        'OVERDUE', 'EXPIRED'
    ) THEN
        
        -- Revogar product_access
        IF v_product_type = 'combo_freelancer_ai' THEN
          UPDATE user_product_access 
          SET is_active = false
          WHERE user_id = p_user_id AND product_id IN (v_product_id, COALESCE(v_product_id, 'unknown') || '_ai_hub');
        ELSE
          UPDATE user_product_access 
          SET is_active = false
          WHERE user_id = p_user_id AND product_id = COALESCE(v_product_id, 'unknown');
        END IF;

        -- Desativa o `is_premium` caso o usuário não tenha mais NENHUM produto ativo na grade (perdeu o acesso a tudo)
        UPDATE user_premium_access 
        SET is_premium = false, plan_updated_at = NOW()
        WHERE user_id = p_user_id 
          AND NOT EXISTS (
            SELECT 1 FROM user_product_access 
            WHERE user_id = p_user_id AND is_active = true
          );

    ELSE
        -- Eventos de COMPRA/APROVAÇÃO (Mantido Fluxo Original)
        
        -- Grant premium access global flag
        INSERT INTO user_premium_access (user_id, is_premium, plan_type, purchased_at, plan_updated_at)
        VALUES (p_user_id, true, 'premium', NOW(), NOW())
        ON CONFLICT (user_id) DO UPDATE SET 
          is_premium = true, 
          plan_updated_at = NOW();
        
        -- Grant product access specific
        IF v_product_type = 'combo_freelancer_ai' THEN
          INSERT INTO user_product_access (user_id, product_id, product_type, is_active, granted_at)
          VALUES (p_user_id, COALESCE(v_product_id, 'unknown'), 'freelancer', true, NOW())
          ON CONFLICT (user_id, product_id) DO UPDATE SET 
            is_active = true, 
            product_type = 'freelancer',
            granted_at = NOW();
          
          INSERT INTO user_product_access (user_id, product_id, product_type, is_active, granted_at)
          VALUES (p_user_id, COALESCE(v_product_id, 'unknown') || '_ai_hub', 'ai_hub', true, NOW())
          ON CONFLICT (user_id, product_id) DO UPDATE SET 
            is_active = true, 
            product_type = 'ai_hub',
            granted_at = NOW();
        ELSE
          INSERT INTO user_product_access (user_id, product_id, product_type, is_active, granted_at)
          VALUES (p_user_id, COALESCE(v_product_id, 'unknown'), v_product_type, true, NOW())
          ON CONFLICT (user_id, product_id) DO UPDATE SET 
            is_active = true, 
            granted_at = NOW();
        END IF;

    END IF; -- Fim if revogação ou concessão
    
    -- Mark evento como processado de qualquer forma, resolvendo o pending dele
    UPDATE billing_event_logs 
    SET processed = true, 
        processed_at = NOW(), 
        status = 'success',
        user_id = p_user_id,
        is_premium_set = true,
        email = v_normalized_email
    WHERE id = v_event.id;
  END LOOP;
END;
$$;
