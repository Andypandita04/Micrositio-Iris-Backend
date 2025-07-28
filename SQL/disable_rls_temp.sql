-- Desactivar Row Level Security temporalmente para desarrollo
ALTER TABLE testing_card_documents DISABLE ROW LEVEL SECURITY;

-- Si quieres reactivarlo después con políticas, usa:
-- ALTER TABLE testing_card_documents ENABLE ROW LEVEL SECURITY;
