UPDATE public.newsletter_subscriptions ns
SET
  is_active = EXISTS (
    SELECT 1
    FROM public.user_product_access upa
    WHERE upa.user_id = ns.user_id
      AND upa.product_type = 'freelancer'
      AND upa.is_active = true
      AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
      AND upa.revoked_at IS NULL
  ),
  updated_at = NOW()
WHERE ns.source = 'xp_level_reward';

INSERT INTO public.newsletter_subscriptions (user_id, email, source, is_active, subscribed_at)
SELECT
  ulr.user_id,
  au.email,
  'xp_level_reward',
  true,
  NOW()
FROM public.user_level_rewards ulr
JOIN auth.users au
  ON au.id = ulr.user_id
WHERE ulr.reward_key = 'newsletter_access'
  AND EXISTS (
    SELECT 1
    FROM public.user_product_access upa
    WHERE upa.user_id = ulr.user_id
      AND upa.product_type = 'freelancer'
      AND upa.is_active = true
      AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
      AND upa.revoked_at IS NULL
  )
ON CONFLICT (user_id) DO UPDATE SET
  email = EXCLUDED.email,
  source = EXCLUDED.source,
  is_active = true,
  updated_at = NOW();

UPDATE public.user_level_rewards ulr
SET
  metadata = CASE
    WHEN EXISTS (
      SELECT 1
      FROM public.user_product_access upa
      WHERE upa.user_id = ulr.user_id
        AND upa.product_type = 'freelancer'
        AND upa.is_active = true
        AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
        AND upa.revoked_at IS NULL
    ) THEN jsonb_build_object(
      'email',
      COALESCE(ulr.metadata->>'email', au.email),
      'status',
      'active'
    )
    ELSE jsonb_build_object(
      'email',
      COALESCE(ulr.metadata->>'email', au.email),
      'status',
      'requires_freelancer',
      'cta_path',
      '/freelancer'
    )
  END,
  updated_at = NOW()
FROM auth.users au
WHERE au.id = ulr.user_id
  AND ulr.reward_key = 'newsletter_access';

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
        AND metadata IS DISTINCT FROM v_reward_metadata
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

  IF p_current_level >= 5 THEN
    IF NOT EXISTS (
      SELECT 1
      FROM public.user_level_rewards ulr
      WHERE ulr.user_id = p_user_id
        AND ulr.source_level = 5
    ) THEN
      SELECT EXISTS (
        SELECT 1
        FROM public.user_product_access upa
        WHERE upa.user_id = p_user_id
          AND upa.product_type = 'ai_hub'
          AND upa.is_active = true
          AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
          AND upa.revoked_at IS NULL
      )
      INTO v_has_ai_hub;

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
END;
$$;
