-- ============================================================
-- RESET DIRETO: Apagar todo progresso do desafio iniciante-ia
-- Cole e execute direto no SQL Editor do Supabase
-- ============================================================

-- 1. Apaga todos os registros de dias completados
DELETE FROM user_day_progress
WHERE challenge_day_id IN (
  'c6a53196-f5db-4659-8a06-ecf055e4b9f9',
  '7ba3b16a-a1fb-464c-94cd-de8894dd6040',
  'e1502f54-bbf4-45b8-842c-be2666b86df6',
  'e566ade3-f2ca-4134-ae85-f3537e625fb7',
  'ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1',
  'e8b3843e-eacc-40d3-99bd-16d8781867bc',
  'f417f5c3-33c9-426d-b8ae-e4acf4cdf642',
  'f8609d72-4e87-4b64-9424-b7a16c8440fa',
  '9dbd536f-cf83-431f-8c5a-4f7fcc957ff3',
  '676ed71a-7f88-495a-a09c-9f04c94bb9e1',
  'b5243402-6874-4948-96c7-e03976d8aa22',
  '23ddffa8-6992-4afc-9704-473ebf7e5bde',
  '490b6622-ba5e-4f18-beb8-c12f46ab59cd',
  '33bca1f8-ca8e-4a79-86a4-a5f88c7a083d',
  '8ed220b2-5603-4ed7-9fce-b53cd361e74c',
  '2aa47580-d3b7-49dc-a36a-442b2c265ab5',
  '927719a9-7473-4853-bb03-6854f4d8b3e1',
  'f05afd89-0de1-4e38-b7a5-86c5163979e4',
  'c0936215-f5ef-4746-a116-6704c7485f7a',
  '52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4',
  'e2fd9f11-7e72-47fb-8de3-c181cd7e557c',
  'a78378eb-5fef-46b5-bb27-c4c8c5929091',
  '0f9c2367-4dee-496d-a706-b878c57b3504',
  '66f23261-4215-4131-b1b5-d51303792e83',
  '20c07f69-c0a3-424d-977f-a778ee71f36e',
  '2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6',
  '4cdc62e5-1f39-47ad-9a51-19664ac08620',
  'c038e903-6a34-4983-9862-adfbc331716a'
);

-- 2. Apaga progresso de steps/lições dos mesmos dias
DELETE FROM user_step_progress
WHERE step_id IN (
  SELECT id FROM lesson_steps
  WHERE challenge_day_id IN (
    'c6a53196-f5db-4659-8a06-ecf055e4b9f9',
    '7ba3b16a-a1fb-464c-94cd-de8894dd6040',
    'e1502f54-bbf4-45b8-842c-be2666b86df6',
    'e566ade3-f2ca-4134-ae85-f3537e625fb7',
    'ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1',
    'e8b3843e-eacc-40d3-99bd-16d8781867bc',
    'f417f5c3-33c9-426d-b8ae-e4acf4cdf642',
    'f8609d72-4e87-4b64-9424-b7a16c8440fa',
    '9dbd536f-cf83-431f-8c5a-4f7fcc957ff3',
    '676ed71a-7f88-495a-a09c-9f04c94bb9e1',
    'b5243402-6874-4948-96c7-e03976d8aa22',
    '23ddffa8-6992-4afc-9704-473ebf7e5bde',
    '490b6622-ba5e-4f18-beb8-c12f46ab59cd',
    '33bca1f8-ca8e-4a79-86a4-a5f88c7a083d',
    '8ed220b2-5603-4ed7-9fce-b53cd361e74c',
    '2aa47580-d3b7-49dc-a36a-442b2c265ab5',
    '927719a9-7473-4853-bb03-6854f4d8b3e1',
    'f05afd89-0de1-4e38-b7a5-86c5163979e4',
    'c0936215-f5ef-4746-a116-6704c7485f7a',
    '52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4',
    'e2fd9f11-7e72-47fb-8de3-c181cd7e557c',
    'a78378eb-5fef-46b5-bb27-c4c8c5929091',
    '0f9c2367-4dee-496d-a706-b878c57b3504',
    '66f23261-4215-4131-b1b5-d51303792e83',
    '20c07f69-c0a3-424d-977f-a778ee71f36e',
    '2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6',
    '4cdc62e5-1f39-47ad-9a51-19664ac08620',
    'c038e903-6a34-4983-9862-adfbc331716a'
  )
);

-- 3. Apaga tentativas de quiz/lições
DELETE FROM user_lesson_attempts
WHERE step_id IN (
  SELECT id FROM lesson_steps
  WHERE challenge_day_id IN (
    'c6a53196-f5db-4659-8a06-ecf055e4b9f9',
    '7ba3b16a-a1fb-464c-94cd-de8894dd6040',
    'e1502f54-bbf4-45b8-842c-be2666b86df6',
    'e566ade3-f2ca-4134-ae85-f3537e625fb7',
    'ccb45c1c-dda0-4e08-a6d4-8bde4f6f85d1',
    'e8b3843e-eacc-40d3-99bd-16d8781867bc',
    'f417f5c3-33c9-426d-b8ae-e4acf4cdf642',
    'f8609d72-4e87-4b64-9424-b7a16c8440fa',
    '9dbd536f-cf83-431f-8c5a-4f7fcc957ff3',
    '676ed71a-7f88-495a-a09c-9f04c94bb9e1',
    'b5243402-6874-4948-96c7-e03976d8aa22',
    '23ddffa8-6992-4afc-9704-473ebf7e5bde',
    '490b6622-ba5e-4f18-beb8-c12f46ab59cd',
    '33bca1f8-ca8e-4a79-86a4-a5f88c7a083d',
    '8ed220b2-5603-4ed7-9fce-b53cd361e74c',
    '2aa47580-d3b7-49dc-a36a-442b2c265ab5',
    '927719a9-7473-4853-bb03-6854f4d8b3e1',
    'f05afd89-0de1-4e38-b7a5-86c5163979e4',
    'c0936215-f5ef-4746-a116-6704c7485f7a',
    '52e1361a-e12a-4dd9-a2eb-276e6aa6d1e4',
    'e2fd9f11-7e72-47fb-8de3-c181cd7e557c',
    'a78378eb-5fef-46b5-bb27-c4c8c5929091',
    '0f9c2367-4dee-496d-a706-b878c57b3504',
    '66f23261-4215-4131-b1b5-d51303792e83',
    '20c07f69-c0a3-424d-977f-a778ee71f36e',
    '2a5eea8b-5ec5-4e80-b31c-7c468a08d6c6',
    '4cdc62e5-1f39-47ad-9a51-19664ac08620',
    'c038e903-6a34-4983-9862-adfbc331716a'
  )
);

-- 4. Reseta current_day para 1 E apaga completed_at em todos os usuários do desafio
-- challenge_id = dfb76f1b-d272-4e4d-96b2-0bc4d3392489 (iniciante-ia)
UPDATE user_challenge_progress
SET current_day = 1,
    completed_at = NULL,
    is_active = true
WHERE challenge_id = 'dfb76f1b-d272-4e4d-96b2-0bc4d3392489';

-- 5. Apaga certificados do desafio
DELETE FROM user_certificates
WHERE challenge_id = 'dfb76f1b-d272-4e4d-96b2-0bc4d3392489';

-- 6. Confirmar resultado (ambos devem retornar 0)
SELECT
  (SELECT COUNT(*) FROM user_day_progress
   WHERE challenge_day_id = 'c6a53196-f5db-4659-8a06-ecf055e4b9f9') AS day_progress_restante,
  (SELECT COUNT(*) FROM user_challenge_progress
   WHERE challenge_id = 'dfb76f1b-d272-4e4d-96b2-0bc4d3392489'
     AND current_day > 1) AS challenge_progress_acima_dia1;

