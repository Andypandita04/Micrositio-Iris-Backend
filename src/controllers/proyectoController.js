class ProyectoController {
  /**
   * @param {ProyectoService} proyectoService - Inyectamos el servicio.
   */
  constructor(proyectoService) {
    this.proyectoService = proyectoService;
  }

  /**
   * Maneja la creación de un proyecto (POST /proyectos).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   */
  async crearProyecto(req, res) {
    try {
      const proyecto = await this.proyectoService.crearProyecto(req.body);
      res.status(201).json({
        success: true,
        data: proyecto,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * Maneja la obtención de un proyecto (GET /proyectos/:id).
   * @param {Object} req - Request de Express.
   * @param {Object} res - Response de Express.
   */
  async obtenerProyecto(req, res) {
    try {
      const proyecto = await this.proyectoService.obtenerProyecto(req.params.id);
      
      if (!proyecto) {
        return res.status(404).json({
          success: false,
          message: 'Proyecto no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        data: proyecto,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
      });
    }
  }
}

module.exports = ProyectoController;