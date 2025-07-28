-- Verificar si la tabla existe y su estado de RLS
SELECT 
    schemaname,
    tablename, 
    rowsecurity,
    hasrls
FROM pg_tables t
LEFT JOIN pg_class c ON c.relname = t.tablename
LEFT JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE tablename = 'testing_card_documents';

-- Verificar las políticas existentes
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
WHERE tablename = 'testing_card_documents';

-- Verificar la estructura de la tabla
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'testing_card_documents'
ORDER BY ordinal_position;
