import express from 'express';
import supabase from '../config/supabaseClient.js';

const router = express.Router();

// Endpoint de prueba para verificar conexión con Supabase
router.get('/test-connection', async (req, res) => {
  try {
    console.log('🔍 Probando conexión con Supabase...');
    
    // Verificar si podemos leer de otra tabla
    const { data: testingCards, error: selectError } = await supabase
      .from('testing_card')
      .select('id_testing_card')
      .limit(1);
    
    console.log('📊 Testing cards query:', { testingCards, selectError });    // Intentar un insert directo muy simple
    const testData = {
      testing_card_id: 11,
      document_name: 'test_connection.txt',
      document_url: 'https://example.com/test.txt',
      document_type: 'text'
    };

    console.log('🔍 Intentando insertar:', testData);

    const { data: insertData, error: insertError } = await supabase
      .from('testing_card_documents')
      .insert(testData)
      .select('*')
      .single();

    console.log('📊 Insert result:', { insertData, insertError });

    res.json({
      success: true,
      selectResult: { data: testingCards, error: selectError },
      insertResult: { data: insertData, error: insertError }
    });

  } catch (error) {
    console.error('❌ Error en test:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack
    });
  }
});

export default router;
