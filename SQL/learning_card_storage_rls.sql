
-- ====================================
-- CONFIGURACIÓN RLS PARA LEARNING CARD DOCUMENTS
-- ====================================

-- 1. Verificar y crear bucket si no existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'learning-card-docs', 
  'learning-card-docs', 
  true, 
  52428800, -- 50MB en bytes
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ]::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Deshabilitar RLS temporalmente para storage.objects en el bucket learning-card-docs
-- Crear política para permitir acceso público (para simplificar el desarrollo)
DROP POLICY IF EXISTS "learning_card_docs_public_access" ON storage.objects;

CREATE POLICY "learning_card_docs_public_access" ON storage.objects
  FOR ALL
  USING (bucket_id = 'learning-card-docs');

-- 3. Opcional: Deshabilitar RLS completamente para testing rápido
-- NOTA: Solo para desarrollo, en producción usar políticas específicas
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- 4. Verificar configuración
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id = 'learning-card-docs';

-- 5. Verificar políticas activas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
  AND policyname LIKE '%learning_card%';

-- ====================================
-- CONFIGURACIÓN RLS PARA TABLA learning_card_documents
-- ====================================

-- Deshabilitar RLS para la tabla learning_card_documents (para desarrollo)
ALTER TABLE learning_card_documents DISABLE ROW LEVEL SECURITY;

-- Verificar estado RLS de la tabla
SELECT 
  schemaname,
  tablename,
  rowsecurity,
  forcerowsecurity
FROM pg_tables 
WHERE tablename = 'learning_card_documents';

-- ====================================
-- POLÍTICAS DE PRODUCCIÓN (COMENTADAS)
-- ====================================

/*
-- Para producción, usar estas políticas más restrictivas:

-- Habilitar RLS
ALTER TABLE learning_card_documents ENABLE ROW LEVEL SECURITY;

-- Política para leer documentos
CREATE POLICY "learning_card_docs_select" ON learning_card_documents
  FOR SELECT
  USING (true); -- Ajustar según lógica de negocio

-- Política para insertar documentos  
CREATE POLICY "learning_card_docs_insert" ON learning_card_documents
  FOR INSERT
  WITH CHECK (true); -- Ajustar según lógica de negocio

-- Política para actualizar documentos
CREATE POLICY "learning_card_docs_update" ON learning_card_documents
  FOR UPDATE
  USING (true) -- Ajustar según lógica de negocio
  WITH CHECK (true);

-- Política para eliminar documentos
CREATE POLICY "learning_card_docs_delete" ON learning_card_documents
  FOR DELETE
  USING (true); -- Ajustar según lógica de negocio

-- Políticas de storage más restrictivas para producción:
DROP POLICY IF EXISTS "learning_card_docs_public_access" ON storage.objects;

CREATE POLICY "learning_card_docs_select" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'learning-card-docs');

CREATE POLICY "learning_card_docs_insert" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'learning-card-docs');

CREATE POLICY "learning_card_docs_update" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'learning-card-docs')
  WITH CHECK (bucket_id = 'learning-card-docs');

CREATE POLICY "learning_card_docs_delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'learning-card-docs');
*/
