-- Habilitar Row Level Security
ALTER TABLE testing_card_documents ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT (crear documentos)
CREATE POLICY "Enable insert for testing_card_documents" ON testing_card_documents
    FOR INSERT 
    WITH CHECK (true);

-- Política para permitir SELECT (leer documentos)
CREATE POLICY "Enable select for testing_card_documents" ON testing_card_documents
    FOR SELECT 
    USING (true);

-- Política para permitir UPDATE (actualizar documentos)
CREATE POLICY "Enable update for testing_card_documents" ON testing_card_documents
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Política para permitir DELETE (eliminar documentos)
CREATE POLICY "Enable delete for testing_card_documents" ON testing_card_documents
    FOR DELETE 
    USING (true);

-- Verificar las políticas creadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'testing_card_documents';
