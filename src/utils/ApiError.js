// src/utils/ApiError.js
/**
 * Clase personalizada para manejar errores de la API.
 * Extiende la clase Error nativa de JavaScript.
 * @class
 * @extends Error
 */
class ApiError extends Error {
  /**
   * Crea una instancia de ApiError.
   * @param {string} message - Mensaje descriptivo del error.
   * @param {number} statusCode - Código de estado HTTP asociado al error.
   */
  constructor(message, statusCode) {
    super(message);
    
    /**
     * Código de estado HTTP
     * @type {number}
     */
    this.statusCode = statusCode;
    
    /**
     * Estado del error (fail para 4xx, error para 5xx)
     * @type {string}
     */
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    /**
     * Indica si el error es operacional (errores esperados)
     * @type {boolean}
     */
    this.isOperational = true;

    // Captura el stack trace para mejor debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;