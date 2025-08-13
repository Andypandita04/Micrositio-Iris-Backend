// src/middlewares/validation/usuarioProyectoSchema.js
/**
 * Esquemas de validación Zod para usuario_proyecto.
 * @module validation/usuarioProyectoSchema
 */

import { z } from 'zod';

/**
 * Schema para validar UUID de usuario.
 */
const uuidSchema = z.string().uuid('ID de usuario debe ser un UUID válido');

/**
 * Schema para validar ID de proyecto.
 */
const proyectoIdSchema = z.number().int().positive('ID de proyecto debe ser un número entero positivo');

/**
 * Schema para crear relación usuario-proyecto.
 */
export const usuarioProyectoCreateSchema = z.object({
  id_usuario: uuidSchema,
  id_proyecto: proyectoIdSchema
});

/**
 * Schema para parámetros de consulta por usuario.
 */
export const usuarioProyectoQuerySchema = z.object({
  id_usuario: uuidSchema.optional()
});

/**
 * Schema para validar UUID en parámetros de ruta.
 */
export const usuarioIdParamSchema = z.object({
  id_usuario: uuidSchema
});

/**
 * Schema para validar múltiples relaciones usuario-proyecto.
 */
export const usuarioProyectoMultipleSchema = z.object({
  id_usuario: uuidSchema,
  proyectos: z.array(proyectoIdSchema).min(1, 'Debe incluir al menos un proyecto')
});

/**
 * Función de validación middleware.
 * @param {Object} schema - Schema de validación Zod.
 * @returns {Function} Middleware de validación.
 */
export default function validar(schema) {
  return (req, res, next) => {
    try {
      const dataToValidate = { ...req.body, ...req.params, ...req.query };
      req.validatedData = schema.parse(dataToValidate);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: errorMessages
        });
      }
      next(error);
    }
  };
}
