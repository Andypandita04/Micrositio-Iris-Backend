-- Crear políticas para el storage bucket testing-card-docs

-- Política para permitir INSERT (subir archivos)
INSERT INTO storage.policies (id, bucket_id, command, definition)
VALUES (
  'allow_insert_testing_card_docs',
  'testing-card-docs',
  'INSERT',
  'true'
);

-- Política para permitir SELECT (leer archivos)
INSERT INTO storage.policies (id, bucket_id, command, definition)  
VALUES (
  'allow_select_testing_card_docs',
  'testing-card-docs',
  'SELECT', 
  'true'
);

-- Política para permitir UPDATE (actualizar archivos)
INSERT INTO storage.policies (id, bucket_id, command, definition)
VALUES (
  'allow_update_testing_card_docs',
  'testing-card-docs',
  'UPDATE',
  'true'
);

-- Política para permitir DELETE (eliminar archivos)
INSERT INTO storage.policies (id, bucket_id, command, definition)
VALUES (
  'allow_delete_testing_card_docs', 
  'testing-card-docs',
  'DELETE',
  'true'
);
