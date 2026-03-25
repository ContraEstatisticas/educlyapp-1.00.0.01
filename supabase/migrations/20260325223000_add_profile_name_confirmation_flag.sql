ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS name_confirmation_completed boolean NOT NULL DEFAULT false;

UPDATE public.profiles
SET name_confirmation_completed = CASE
  WHEN NULLIF(BTRIM(COALESCE(full_name, '')), '') IS NULL THEN false
  WHEN lower(
    regexp_replace(
      translate(BTRIM(full_name), 'ÁÀÂÃÄáàâãäÉÈÊËéèêëÍÌÎÏíìîïÓÒÔÕÖóòôõöÚÙÛÜúùûüÇç', 'AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuCc'),
      '\s+',
      ' ',
      'g'
    )
  ) IN ('aluno', 'student', 'estudiante', 'etudiant', 'usuario', 'user') THEN false
  ELSE true
END;
