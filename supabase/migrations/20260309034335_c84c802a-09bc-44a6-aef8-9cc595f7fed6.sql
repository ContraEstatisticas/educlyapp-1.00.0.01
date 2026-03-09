CREATE TABLE public.ai_hub_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  messages_today integer NOT NULL DEFAULT 0,
  images_today integer NOT NULL DEFAULT 0,
  last_message_at timestamptz DEFAULT now(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(user_id, date)
);

ALTER TABLE public.ai_hub_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage" ON public.ai_hub_usage FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage" ON public.ai_hub_usage FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage" ON public.ai_hub_usage FOR UPDATE TO authenticated USING (auth.uid() = user_id);