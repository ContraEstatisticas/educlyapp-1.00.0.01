UPDATE user_product_access SET is_active = false, revoked_at = NOW()
WHERE user_id = (SELECT id FROM auth.users WHERE LOWER(email) = 'alejoegasm@gmail.com')
AND product_type = 'freelancer';

UPDATE user_premium_access SET is_premium = false, plan_updated_at = NOW()
WHERE user_id = (SELECT id FROM auth.users WHERE LOWER(email) = 'alejoegasm@gmail.com');