CREATE OR REPLACE FUNCTION public.apply_level_rewards(p_user_id UUID, p_current_level INTEGER)
RETURNS TABLE(reward_key TEXT, source_level INTEGER, metadata JSONB)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_email TEXT;
  v_has_freelancer BOOLEAN := false;
  v_has_ai_hub BOOLEAN := false;
  v_reward_metadata JSONB;
  v_inserted_row user_level_rewards%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT au.email
  INTO v_user_email
  FROM auth.users au
  WHERE au.id = p_user_id;

  IF p_current_level >= 3 THEN
    SELECT EXISTS (
      SELECT 1
      FROM public.user_product_access upa
      WHERE upa.user_id = p_user_id
        AND upa.product_type = 'freelancer'
        AND upa.is_active = true
        AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
        AND upa.revoked_at IS NULL
    )
    INTO v_has_freelancer;

    IF v_has_freelancer THEN
      INSERT INTO public.newsletter_subscriptions (user_id, email, source, is_active, subscribed_at)
      VALUES (p_user_id, v_user_email, 'xp_level_reward', true, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        email = EXCLUDED.email,
        source = EXCLUDED.source,
        is_active = true,
        updated_at = NOW();

      v_reward_metadata := jsonb_build_object(
        'email', v_user_email,
        'status', 'active'
      );
    ELSE
      UPDATE public.newsletter_subscriptions
      SET
        is_active = false,
        updated_at = NOW()
      WHERE user_id = p_user_id
        AND source = 'xp_level_reward';

      v_reward_metadata := jsonb_build_object(
        'email', v_user_email,
        'status', 'requires_freelancer',
        'cta_path', '/freelancer'
      );
    END IF;

    v_inserted_row := NULL;

    IF EXISTS (
      SELECT 1
      FROM public.user_level_rewards ulr
      WHERE ulr.user_id = p_user_id
        AND ulr.reward_key = 'newsletter_access'
    ) THEN
      UPDATE public.user_level_rewards
      SET
        metadata = v_reward_metadata,
        updated_at = NOW()
      WHERE user_id = p_user_id
        AND reward_key = 'newsletter_access'
        AND (COALESCE(metadata, '{}'::jsonb) - 'popup_seen_at') IS DISTINCT FROM v_reward_metadata
      RETURNING * INTO v_inserted_row;
    ELSE
      INSERT INTO public.user_level_rewards (user_id, reward_key, source_level, metadata)
      VALUES (p_user_id, 'newsletter_access', 3, v_reward_metadata)
      ON CONFLICT (user_id, source_level) DO NOTHING
      RETURNING * INTO v_inserted_row;
    END IF;

    IF v_inserted_row.id IS NOT NULL THEN
      RETURN QUERY
      SELECT 'newsletter_access'::TEXT, 3::INTEGER, v_reward_metadata;
    END IF;
  END IF;

  SELECT
    EXISTS (
      SELECT 1
      FROM public.user_product_access upa
      WHERE upa.user_id = p_user_id
        AND upa.product_type = 'ai_hub'
        AND upa.is_active = true
        AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
        AND upa.revoked_at IS NULL
    )
    OR LOWER(COALESCE(v_user_email, '')) IN (
      'ferramentasdigitais1000@gmail.com',
      'felip@gmailcom',
      'acess@nuvei.com'
    )
  INTO v_has_ai_hub;

  IF p_current_level >= 5 THEN
    IF NOT EXISTS (
      SELECT 1
      FROM public.user_level_rewards ulr
      WHERE ulr.user_id = p_user_id
        AND ulr.source_level = 5
    ) THEN
      IF v_has_ai_hub THEN
        v_reward_metadata := jsonb_build_object(
          'download_url', '/rewards/educly-ai-prompts-guide.pdf',
          'status', 'available'
        );

        v_inserted_row := NULL;

        INSERT INTO public.user_level_rewards (user_id, reward_key, source_level, metadata)
        VALUES (p_user_id, 'prompt_guide_pdf', 5, v_reward_metadata)
        ON CONFLICT (user_id, source_level) DO NOTHING
        RETURNING * INTO v_inserted_row;

        IF v_inserted_row.id IS NOT NULL THEN
          RETURN QUERY
          SELECT 'prompt_guide_pdf'::TEXT, 5::INTEGER, v_reward_metadata;
        END IF;
      ELSE
        v_reward_metadata := jsonb_build_object(
          'expires_at', NOW() + INTERVAL '1 day',
          'cta_path', '/assistentes',
          'status', 'active'
        );

        INSERT INTO public.user_product_access (
          user_id,
          product_id,
          product_type,
          is_active,
          granted_at,
          expires_at,
          revoked_at
        )
        VALUES (
          p_user_id,
          'level_reward_ai_hub_day_pass',
          'ai_hub',
          true,
          NOW(),
          NOW() + INTERVAL '1 day',
          NULL
        )
        ON CONFLICT (user_id, product_id) DO UPDATE SET
          product_type = EXCLUDED.product_type,
          is_active = true,
          granted_at = NOW(),
          expires_at = EXCLUDED.expires_at,
          revoked_at = NULL;

        v_inserted_row := NULL;

        INSERT INTO public.user_level_rewards (user_id, reward_key, source_level, metadata)
        VALUES (p_user_id, 'ai_hub_day_pass', 5, v_reward_metadata)
        ON CONFLICT (user_id, source_level) DO NOTHING
        RETURNING * INTO v_inserted_row;

        IF v_inserted_row.id IS NOT NULL THEN
          RETURN QUERY
          SELECT 'ai_hub_day_pass'::TEXT, 5::INTEGER, v_reward_metadata;
        END IF;
      END IF;
    END IF;
  END IF;

  IF p_current_level >= 7 THEN
    IF v_has_ai_hub THEN
      v_reward_metadata := jsonb_build_object(
        'status', 'active',
        'cta_path', '/assistentes',
        'extra_messages', 20,
        'extra_images', 5,
        'total_messages', 70,
        'total_images', 15
      );
    ELSE
      v_reward_metadata := jsonb_build_object(
        'status', 'requires_ai_hub',
        'cta_path', '/assistentes',
        'extra_messages', 20,
        'extra_images', 5,
        'total_messages', 70,
        'total_images', 15
      );
    END IF;

    v_inserted_row := NULL;

    IF EXISTS (
      SELECT 1
      FROM public.user_level_rewards ulr
      WHERE ulr.user_id = p_user_id
        AND ulr.reward_key = 'ai_hub_bonus_limits'
    ) THEN
      UPDATE public.user_level_rewards
      SET
        metadata = v_reward_metadata,
        updated_at = NOW()
      WHERE user_id = p_user_id
        AND reward_key = 'ai_hub_bonus_limits'
        AND (COALESCE(metadata, '{}'::jsonb) - 'popup_seen_at') IS DISTINCT FROM v_reward_metadata
      RETURNING * INTO v_inserted_row;
    ELSE
      INSERT INTO public.user_level_rewards (user_id, reward_key, source_level, metadata)
      VALUES (p_user_id, 'ai_hub_bonus_limits', 7, v_reward_metadata)
      ON CONFLICT (user_id, source_level) DO NOTHING
      RETURNING * INTO v_inserted_row;
    END IF;

    IF v_inserted_row.id IS NOT NULL THEN
      RETURN QUERY
      SELECT 'ai_hub_bonus_limits'::TEXT, 7::INTEGER, v_reward_metadata;
    END IF;
  END IF;
END;
$$;

INSERT INTO public.user_level_rewards (user_id, reward_key, source_level, metadata)
SELECT
  ul.user_id,
  'ai_hub_bonus_limits',
  7,
  CASE
    WHEN (
      EXISTS (
        SELECT 1
        FROM public.user_product_access upa
        WHERE upa.user_id = ul.user_id
          AND upa.product_type = 'ai_hub'
          AND upa.is_active = true
          AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
          AND upa.revoked_at IS NULL
      )
      OR LOWER(COALESCE(au.email, '')) IN (
        'ferramentasdigitais1000@gmail.com',
        'felip@gmailcom',
        'acess@nuvei.com'
      )
    ) THEN jsonb_build_object(
      'status', 'active',
      'cta_path', '/assistentes',
      'extra_messages', 20,
      'extra_images', 5,
      'total_messages', 70,
      'total_images', 15
    )
    ELSE jsonb_build_object(
      'status', 'requires_ai_hub',
      'cta_path', '/assistentes',
      'extra_messages', 20,
      'extra_images', 5,
      'total_messages', 70,
      'total_images', 15
    )
  END
FROM public.user_levels ul
LEFT JOIN auth.users au
  ON au.id = ul.user_id
WHERE ul.current_level >= 7
  AND NOT EXISTS (
    SELECT 1
    FROM public.user_level_rewards ulr
    WHERE ulr.user_id = ul.user_id
      AND ulr.reward_key = 'ai_hub_bonus_limits'
  );
