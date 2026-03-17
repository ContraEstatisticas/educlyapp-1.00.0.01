-- MVP rewards for XP levels
CREATE TABLE IF NOT EXISTS public.user_level_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  reward_key TEXT NOT NULL,
  source_level INTEGER NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT user_level_rewards_user_reward_unique UNIQUE (user_id, reward_key),
  CONSTRAINT user_level_rewards_user_level_unique UNIQUE (user_id, source_level)
);

ALTER TABLE public.user_level_rewards ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_level_rewards'
      AND policyname = 'Users can view own level rewards'
  ) THEN
    CREATE POLICY "Users can view own level rewards"
    ON public.user_level_rewards
    FOR SELECT
    USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'update_user_level_rewards_updated_at'
  ) THEN
    CREATE TRIGGER update_user_level_rewards_updated_at
    BEFORE UPDATE ON public.user_level_rewards
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_user_level_rewards_user_id
ON public.user_level_rewards(user_id, granted_at DESC);

CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  source TEXT NOT NULL DEFAULT 'xp_level_reward',
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'newsletter_subscriptions'
      AND policyname = 'Users can view own newsletter subscription'
  ) THEN
    CREATE POLICY "Users can view own newsletter subscription"
    ON public.newsletter_subscriptions
    FOR SELECT
    USING (auth.uid() = user_id);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'update_newsletter_subscriptions_updated_at'
  ) THEN
    CREATE TRIGGER update_newsletter_subscriptions_updated_at
    BEFORE UPDATE ON public.newsletter_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email
ON public.newsletter_subscriptions(lower(coalesce(email, '')));

CREATE OR REPLACE FUNCTION public.check_product_access(p_product_type TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_product_access
    WHERE user_id = auth.uid()
      AND product_type = p_product_type
      AND is_active = true
      AND (expires_at IS NULL OR expires_at > NOW())
      AND revoked_at IS NULL
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_products()
RETURNS TABLE(product_type TEXT, is_active BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT upa.product_type, upa.is_active
  FROM user_product_access upa
  WHERE upa.user_id = auth.uid()
    AND upa.is_active = true
    AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
    AND upa.revoked_at IS NULL;
END;
$$;

CREATE OR REPLACE FUNCTION public.apply_level_rewards(p_user_id UUID, p_current_level INTEGER)
RETURNS TABLE(reward_key TEXT, source_level INTEGER, metadata JSONB)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_email TEXT;
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
    IF NOT EXISTS (
      SELECT 1
      FROM public.user_level_rewards ulr
      WHERE ulr.user_id = p_user_id
        AND ulr.reward_key = 'newsletter_access'
    ) THEN
      INSERT INTO public.newsletter_subscriptions (user_id, email, source, is_active, subscribed_at)
      VALUES (p_user_id, v_user_email, 'xp_level_reward', true, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        email = EXCLUDED.email,
        source = EXCLUDED.source,
        is_active = true;

      v_reward_metadata := jsonb_build_object(
        'email', v_user_email,
        'status', 'active'
      );

      INSERT INTO public.user_level_rewards (user_id, reward_key, source_level, metadata)
      VALUES (p_user_id, 'newsletter_access', 3, v_reward_metadata)
      ON CONFLICT (user_id, source_level) DO NOTHING
      RETURNING * INTO v_inserted_row;

      IF v_inserted_row.id IS NOT NULL THEN
        RETURN QUERY
        SELECT 'newsletter_access'::TEXT, 3::INTEGER, v_reward_metadata;
      END IF;
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
