-- IMPORTANT:
-- Run this migration before publishing the new module order.
-- It assumes every existing row with module_number = 8 belongs to the old final module,
-- which now lives at module 14.

INSERT INTO public.freelancer_module_progress (
  user_id,
  module_number,
  step_index,
  total_steps,
  completed,
  completed_at,
  created_at,
  updated_at
)
SELECT
  user_id,
  14,
  step_index,
  total_steps,
  completed,
  completed_at,
  created_at,
  now()
FROM public.freelancer_module_progress
WHERE module_number = 8
ON CONFLICT (user_id, module_number) DO UPDATE
SET
  step_index = GREATEST(public.freelancer_module_progress.step_index, EXCLUDED.step_index),
  total_steps = GREATEST(public.freelancer_module_progress.total_steps, EXCLUDED.total_steps),
  completed = COALESCE(public.freelancer_module_progress.completed, false) OR COALESCE(EXCLUDED.completed, false),
  completed_at = COALESCE(public.freelancer_module_progress.completed_at, EXCLUDED.completed_at),
  updated_at = now();

DELETE FROM public.freelancer_module_progress
WHERE module_number = 8;
