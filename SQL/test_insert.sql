-- Test directo de inserción en la tabla
INSERT INTO testing_card_documents (
    testing_card_id,
    document_name,
    document_url,
    document_type
) VALUES (
    1,
    'test_document.txt',
    'https://example.com/test.txt',
    'text'
);

-- Verificar si se insertó
SELECT * FROM testing_card_documents WHERE document_name = 'test_document.txt';
