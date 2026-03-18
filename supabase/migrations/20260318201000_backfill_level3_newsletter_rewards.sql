WITH eligible_users AS (
  SELECT
    ul.user_id,
    au.email,
    EXISTS (
      SELECT 1
      FROM public.user_product_access upa
      WHERE upa.user_id = ul.user_id
        AND upa.product_type = 'freelancer'
        AND upa.is_active = true
        AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
        AND upa.revoked_at IS NULL
    ) AS has_freelancer
  FROM public.user_levels ul
  JOIN auth.users au
    ON au.id = ul.user_id
  WHERE ul.current_level >= 3
)
INSERT INTO public.newsletter_subscriptions (
  user_id,
  email,
  source,
  is_active,
  subscribed_at
)
SELECT
  eu.user_id,
  eu.email,
  'xp_level_reward',
  true,
  NOW()
FROM eligible_users eu
WHERE eu.has_freelancer
ON CONFLICT (user_id) DO UPDATE
SET
  email = EXCLUDED.email,
  source = EXCLUDED.source,
  is_active = true,
  updated_at = NOW();

WITH eligible_users AS (
  SELECT
    ul.user_id,
    EXISTS (
      SELECT 1
      FROM public.user_product_access upa
      WHERE upa.user_id = ul.user_id
        AND upa.product_type = 'freelancer'
        AND upa.is_active = true
        AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
        AND upa.revoked_at IS NULL
    ) AS has_freelancer
  FROM public.user_levels ul
  WHERE ul.current_level >= 3
)
UPDATE public.newsletter_subscriptions ns
SET
  is_active = false,
  updated_at = NOW()
FROM eligible_users eu
WHERE ns.user_id = eu.user_id
  AND ns.source = 'xp_level_reward'
  AND eu.has_freelancer = false;

WITH eligible_users AS (
  SELECT
    ul.user_id,
    au.email,
    EXISTS (
      SELECT 1
      FROM public.user_product_access upa
      WHERE upa.user_id = ul.user_id
        AND upa.product_type = 'freelancer'
        AND upa.is_active = true
        AND (upa.expires_at IS NULL OR upa.expires_at > NOW())
        AND upa.revoked_at IS NULL
    ) AS has_freelancer
  FROM public.user_levels ul
  JOIN auth.users au
    ON au.id = ul.user_id
  WHERE ul.current_level >= 3
)
INSERT INTO public.user_level_rewards (
  user_id,
  reward_key,
  source_level,
  metadata
)
SELECT
  eu.user_id,
  'newsletter_access',
  3,
  CASE
    WHEN eu.has_freelancer THEN jsonb_build_object(
      'email', eu.email,
      'status', 'active'
    )
    ELSE jsonb_build_object(
      'email', eu.email,
      'status', 'requires_freelancer',
      'cta_path', '/freelancer'
    )
  END
FROM eligible_users eu
ON CONFLICT (user_id, reward_key) DO UPDATE
SET
  source_level = EXCLUDED.source_level,
  metadata = EXCLUDED.metadata,
  updated_at = NOW();
