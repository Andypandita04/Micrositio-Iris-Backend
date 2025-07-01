// src/middlewares/errorHandler.js
/**
 * Middleware para manejo centralizado de errores.
 * @param {Error} err - Objeto de error.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 */
const errorHandler = (err, req, res, next) => {
  // Establecer valores por defecto si no están definidos
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Respuesta detallada en desarrollo
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  } else {
    // Respuesta simplificada en producción
    const response = {
      status: err.status,
      message: err.message
    };

    // Solo incluir el mensaje personalizado para errores operacionales
    if (!err.isOperational) {
      response.message = 'Algo salió mal';
    }

    res.status(err.statusCode).json(response);
  }
};

export default errorHandler;