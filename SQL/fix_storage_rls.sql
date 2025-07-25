-- Deshabilitar RLS para el storage bucket temporalmente
UPDATE storage.buckets 
SET public = true 
WHERE id = 'testing-card-docs';

-- También puedes crear políticas más específicas si prefieres mantener seguridad:
-- INSERT INTO storage.policies (id, bucket_id, command, definition)
-- VALUES (
--   'allow_all_operations',
--   'testing-card-docs', 
--   'SELECT',
--   'true'
-- );
