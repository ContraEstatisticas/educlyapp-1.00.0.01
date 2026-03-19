INSERT INTO storage.buckets (id, name, public)
VALUES ('generated-images', 'generated-images', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Generated images are public to read'
  ) THEN
    CREATE POLICY "Generated images are public to read"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'generated-images');
  END IF;
END $$;
