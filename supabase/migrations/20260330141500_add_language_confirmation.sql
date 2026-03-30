ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language_confirmation_completed BOOLEAN NOT NULL DEFAULT false;
