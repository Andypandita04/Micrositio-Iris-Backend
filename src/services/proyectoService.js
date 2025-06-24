class ProyectoService {
  /**
   * @param {ProyectoRepository} proyectoRepository - Inyectamos el repositorio como dependencia.
   */
  constructor(proyectoRepository) {
    this.proyectoRepository = proyectoRepository;
  }

  /**
   * Crea un nuevo proyecto después de validar los datos.
   * @param {Object} proyectoData - Datos del proyecto { nombre, descripcion }.
   * @returns {Promise<Object>} - Proyecto creado con ID.
   * @throws {Error} - Si los datos son inválidos.
   */
  async crearProyecto(proyectoData) {
    // Validación básica (puedes agregar más reglas)
    if (!proyectoData.nombre || !proyectoData.descripcion) {
      throw new Error('Nombre y descripción son campos requeridos');
    }

    // Llama al repositorio para guardar en Firestore
    return await this.proyectoRepository.crearProyecto(proyectoData);
  }

  /**
   * Obtiene un proyecto por su ID.
   * @param {string} proyectoId - ID del proyecto.
   * @returns {Promise<Object|null>} - Proyecto encontrado o null.
   */
  async obtenerProyecto(proyectoId) {
    return await this.proyectoRepository.obtenerProyectoPorId(proyectoId);
  }
}

module.exports = ProyectoService;