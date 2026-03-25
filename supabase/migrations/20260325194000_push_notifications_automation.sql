-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 1. Automate Daily Reminders (Every day at 9:00 AM UTC/America/Sao_Paulo 6:00 AM)
-- Brazil is UTC-3, so 9:00 UTC is 6:00 AM.
SELECT cron.unschedule('daily-push-reminder') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'daily-push-reminder');
SELECT cron.schedule(
  'daily-push-reminder',
  '0 9 * * *',
  $$
  SELECT net.http_post(
    url := 'https://dqlcxpbfemhzzetwaxsa.supabase.co/functions/v1/push-scheduler',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbGN4cGJmZW1oenpldHdheHNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY4NTE5MCwiZXhwIjoyMDgwMjYxMTkwfQ.mtROIpVO45WOOAV9g-CMEaWYxdipK2siBwfFsy1qRlQ'
    ),
    body := '{"type": "daily_reminder"}'::jsonb
  );
  $$
);

-- 2. Automate Streak at Risk Warnings (Every day at 9:00 PM UTC/America/Sao_Paulo 6:00 PM)
-- This gives users time to study before midnight.
SELECT cron.unschedule('streak-at-risk-push') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'streak-at-risk-push');
SELECT cron.schedule(
  'streak-at-risk-push',
  '0 21 * * *',
  $$
  SELECT net.http_post(
    url := 'https://dqlcxpbfemhzzetwaxsa.supabase.co/functions/v1/push-scheduler',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbGN4cGJmZW1oenpldHdheHNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY4NTE5MCwiZXhwIjoyMDgwMjYxMTkwfQ.mtROIpVO45WOOAV9g-CMEaWYxdipK2siBwfFsy1qRlQ'
    ),
    body := '{"type": "streak_at_risk"}'::jsonb
  );
  $$
);

-- 3. Trigger for Level Up Notifications
CREATE OR REPLACE FUNCTION public.notify_push_on_level_up()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_lang TEXT;
  v_title TEXT;
  v_body TEXT;
BEGIN
  -- Get user language
  SELECT preferred_language INTO v_lang FROM public.profiles WHERE id = NEW.user_id;
  v_lang := COALESCE(v_lang, 'pt');

  -- Define message based on language
  CASE v_lang
    WHEN 'en' THEN
      v_title := 'Amazing! Level Up! 🚀';
      v_body := 'Amazing! You reached level ' || NEW.source_level || '! Keep evolving!';
    WHEN 'es' THEN
      v_title := '¡Increíble! ¡Subida de nivel! 🚀';
      v_body := '¡Increíble! ¡Alcanzaste el nivel ' || NEW.source_level || '! ¡Sigue evolucionando!';
    WHEN 'fr' THEN
      v_title := 'Incroyable ! Niveau supérieur ! 🚀';
      v_body := 'Incroyable ! Vous avez atteint le niveau ' || NEW.source_level || ' ! Continuez à évoluer !';
    ELSE
      v_title := 'Incrível! Novo Nível! 🚀';
      v_body := 'Incrível! Você alcançou o nível ' || NEW.source_level || '! Continue evoluindo!';
  END CASE;

  -- Call send-push edge function
  PERFORM net.http_post(
    url := 'https://dqlcxpbfemhzzetwaxsa.supabase.co/functions/v1/send-push',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbGN4cGJmZW1oenpldHdheHNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY4NTE5MCwiZXhwIjoyMDgwMjYxMTkwfQ.mtROIpVO45WOOAV9g-CMEaWYxdipK2siBwfFsy1qRlQ'
    ),
    body := jsonb_build_object(
      'user_ids', ARRAY[NEW.user_id::TEXT],
      'title', v_title,
      'body', v_body,
      'tag', 'level-up',
      'url', '/perfil'
    )
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_push_on_level_up ON public.user_level_rewards;
CREATE TRIGGER tr_push_on_level_up
AFTER INSERT ON public.user_level_rewards
FOR EACH ROW
WHEN (NEW.reward_key IS NOT NULL) -- We assume level rewards indicate a level up moment
EXECUTE FUNCTION public.notify_push_on_level_up();


-- 4. Trigger for Medal Notifications
CREATE OR REPLACE FUNCTION public.notify_push_on_medal()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_lang TEXT;
  v_title TEXT;
  v_body TEXT;
  v_medal_name TEXT;
BEGIN
  -- Get user language
  SELECT preferred_language INTO v_lang FROM public.profiles WHERE id = NEW.user_id;
  v_lang := COALESCE(v_lang, 'pt');

  -- Get medal name
  SELECT name INTO v_medal_name FROM public.freelancer_medals WHERE id = NEW.medal_id;

  -- Define message based on language
  CASE v_lang
    WHEN 'en' THEN
      v_title := 'New Achievement Unlocked! 🏅';
      v_body := 'Congratulations! You unlocked the "' || COALESCE(v_medal_name, 'medal') || '" medal!';
    WHEN 'es' THEN
      v_title := '¡Nuevo logro desbloqueado! 🏅';
      v_body := '¡Felicidades! ¡Desbloqueaste la medalla "' || COALESCE(v_medal_name, 'medalla') || '"!';
    WHEN 'fr' THEN
      v_title := 'Nouveau succès débloqué ! 🏅';
      v_body := 'Félicitations ! Vous avez débloqué la médaille "' || COALESCE(v_medal_name, 'médaille') || '" !';
    ELSE
      v_title := 'Nova Conquista Desbloqueada! 🏅';
      v_body := 'Parabéns! Você desbloqueou a medalha "' || COALESCE(v_medal_name, 'medalha') || '"!';
  END CASE;

  -- Call send-push edge function
  PERFORM net.http_post(
    url := 'https://dqlcxpbfemhzzetwaxsa.supabase.co/functions/v1/send-push',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbGN4cGJmZW1oenpldHdheHNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY4NTE5MCwiZXhwIjoyMDgwMjYxMTkwfQ.mtROIpVO45WOOAV9g-CMEaWYxdipK2siBwfFsy1qRlQ'
    ),
    body := jsonb_build_object(
      'user_ids', ARRAY[NEW.user_id::TEXT],
      'title', v_title,
      'body', v_body,
      'tag', 'new-achievement',
      'url', '/perfil'
    )
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tr_push_on_medal ON public.user_freelancer_medals;
CREATE TRIGGER tr_push_on_medal
AFTER INSERT ON public.user_freelancer_medals
FOR EACH ROW
EXECUTE FUNCTION public.notify_push_on_medal();
