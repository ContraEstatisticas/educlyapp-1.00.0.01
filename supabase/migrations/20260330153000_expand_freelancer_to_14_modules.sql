ALTER TABLE public.freelancer_module_progress
  DROP CONSTRAINT IF EXISTS freelancer_module_progress_module_number_check;

ALTER TABLE public.freelancer_module_progress
  ADD CONSTRAINT freelancer_module_progress_module_number_check
  CHECK (module_number BETWEEN 1 AND 14);

UPDATE public.freelancer_medals
SET
  description = 'Complete todos os 14 modulos',
  unlock_condition = jsonb_set(
    COALESCE(unlock_condition, '{}'::jsonb),
    '{count}',
    to_jsonb(14),
    true
  )
WHERE slug = 'master';
