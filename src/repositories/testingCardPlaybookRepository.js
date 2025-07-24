import supabase from '../config/supabaseClient.js';

class TestingCardPlaybookRepository {
  async listarTodos() {
    const { data, error } = await supabase
      .from('testing_card_playbook')
      .select('*');
    if (error) throw error;
    return data;
  }

  async obtenerPorPagina(pagina) {
    const { data, error } = await supabase
      .from('testing_card_playbook')
      .select('*')
      .eq('pagina', pagina)
      .single();
    if (error) {
      console.error('Error en obtenerPorPagina:', error);
      throw error;
    }
    return data;
  }

  async buscarPorCampo(campo) {
    const { data, error } = await supabase
      .from('testing_card_playbook')
      .select('*')
      .eq('campo', campo);
    if (error) throw error;
    return data;
  }

   async buscarPorTipo(tipo) {
    const { data, error } = await supabase
      .from('testing_card_playbook')
      .select('*')
      .eq('tipo', tipo);
    if (error) throw error;
    return data;
  }
}

export default TestingCardPlaybookRepository;