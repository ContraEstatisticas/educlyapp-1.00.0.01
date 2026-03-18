CREATE OR REPLACE FUNCTION public.mark_level_reward_popup_seen(p_reward_key TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  v_user_id := auth.uid();

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  UPDATE public.user_level_rewards
  SET
    metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object('popup_seen_at', NOW()),
    updated_at = NOW()
  WHERE user_id = v_user_id
    AND reward_key = p_reward_key;

  RETURN FOUND;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_level_reward_popup_seen(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.mark_level_reward_popup_seen(TEXT) TO authenticated;
