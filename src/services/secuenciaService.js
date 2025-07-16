// src/services/secuenciaService.js
import ApiError from '../utils/ApiError.js';

class SecuenciaService {
  constructor(secuenciaRepository, proyectoRepository, testingCardRepository, experimentoTipoRepository) {
    this.secuenciaRepository = secuenciaRepository;
    this.proyectoRepository = proyectoRepository;
    this.testingCardRepository = testingCardRepository;
    this.experimentoTipoRepository = experimentoTipoRepository; // <-- Esto es clave
  }

  async obtenerPorProyecto(id_proyecto) {
    if (!id_proyecto) {
      throw new ApiError('id_proyecto es requerido', 400);
    }

    // Verificar que el proyecto existe
    const proyectoExiste = await this.proyectoRepository.obtenerPorId(id_proyecto);
    if (!proyectoExiste) {
      throw new ApiError('El proyecto especificado no existe', 404);
    }

    return await this.secuenciaRepository.obtenerPorProyecto(id_proyecto);
  }

  async obtenerPorId(id_secuencia) {
    if (!id_secuencia) {
      throw new ApiError('id_secuencia es requerido', 400);
    }

    const secuencia = await this.secuenciaRepository.obtenerPorId(id_secuencia);
    if (!secuencia) {
      throw new ApiError('Secuencia no encontrada', 404);
    }

    return secuencia;
  }

  async obtenerTodas() {
    return await this.secuenciaRepository.obtenerTodas();
  }

  async crear(secuenciaData) {
    // Verificar que el proyecto existe
    const proyectoExiste = await this.proyectoRepository.obtenerPorId(secuenciaData.id_proyecto);
    if (!proyectoExiste) {
      throw new ApiError('El proyecto especificado no existe', 404);
    }

    return await this.secuenciaRepository.crear(secuenciaData);
  }

  /**
   * 🔥 NUEVO: Crea una secuencia y automáticamente crea una testing card asociada
   * @param {Object} secuenciaData - Datos de la secuencia
   * @returns {Object} - Objeto con secuencia y testing_card creadas
   */
  async crearConTestingCard(secuenciaData) {
    try {
      // 1. Verificar que el proyecto existe
      const proyectoExiste = await this.proyectoRepository.obtenerPorId(secuenciaData.id_proyecto);
      if (!proyectoExiste) {
        throw new ApiError('El proyecto especificado no existe', 404);
      }

      // 2. Crear la secuencia
      const nuevaSecuencia = await this.secuenciaRepository.crear(secuenciaData);

      // 3. Obtener un id_experimento_tipo válido
      const tipoExperimento = await this.experimentoTipoRepository.obtenerPrimero();
      if (!tipoExperimento) {
        throw new ApiError('No hay tipos de experimento disponibles', 400);
      }
      const id_experimento_tipo = tipoExperimento.id_experimento_tipo;

      // 4. Crear la testing card asociada con valores por defecto
      const testingCardData = {
        id_secuencia: nuevaSecuencia.id_secuencia, // Asegúrate de que este valor no sea null o undefined
        titulo: `Testing Card - ${nuevaSecuencia.nombre}`,
        hipotesis: '',
        descripcion: '',
        status: 'En desarrollo',
        id_experimento_tipo,
        padre_id: null,
        dia_inicio: null,
        dia_fin: null,
        anexo_url: null,
        id_responsable: null
      };

      const nuevaTestingCard = await this.testingCardRepository.crear(testingCardData);

      // 5. (Opcional) Actualizar la secuencia con el id_testing_card_padre
      if (nuevaTestingCard && nuevaTestingCard.id_testing_card) {
        await this.secuenciaRepository.actualizar(nuevaSecuencia.id_secuencia, {
          id_testing_card_padre: nuevaTestingCard.id_testing_card
        });
        // Obtener la secuencia actualizada
        const secuenciaActualizada = await this.secuenciaRepository.obtenerPorId(nuevaSecuencia.id_secuencia);
        return {
          secuencia: secuenciaActualizada,
          testing_card: nuevaTestingCard,
          mensaje: 'Secuencia y Testing Card creadas exitosamente'
        };
      }
      return {
        secuencia: nuevaSecuencia,
        testing_card: nuevaTestingCard,
        mensaje: 'Secuencia y Testing Card creadas exitosamente'
      };
    } catch (error) {
      throw new ApiError(`Error al crear secuencia con testing card: ${error.message}`, 500);
    }
  }

  async actualizar(id_secuencia, secuenciaData) {
    if (!id_secuencia) {
      throw new ApiError('id_secuencia es requerido', 400);
    }

    // Verificar que la secuencia existe
    const secuenciaExiste = await this.secuenciaRepository.obtenerPorId(id_secuencia);
    if (!secuenciaExiste) {
      throw new ApiError('Secuencia no encontrada', 404);
    }

    // Si se está actualizando el proyecto, verificar que existe
    if (secuenciaData.id_proyecto) {
      const proyectoExiste = await this.proyectoRepository.obtenerPorId(secuenciaData.id_proyecto);
      if (!proyectoExiste) {
        throw new ApiError('El proyecto especificado no existe', 404);
      }
    }

    return await this.secuenciaRepository.actualizar(id_secuencia, secuenciaData);
  }

  async eliminar(id_secuencia) {
    if (!id_secuencia) {
      throw new ApiError('id_secuencia es requerido', 400);
    }

    // Verificar que la secuencia existe
    const secuenciaExiste = await this.secuenciaRepository.obtenerPorId(id_secuencia);
    if (!secuenciaExiste) {
      throw new ApiError('Secuencia no encontrada', 404);
    }

    return await this.secuenciaRepository.eliminar(id_secuencia);
  }
}

export default SecuenciaService;