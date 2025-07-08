// src/middlewares/validation/empleadoProyectoSchema.js
/**
 * Módulo de esquemas de validación para empleado_proyecto usando Zod.
 * @module middlewares/validation/empleadoProyectoSchema
 */

import { z } from 'zod';

/**
 * Esquema para la creación de relaciones empleado-proyecto.
 */
const empleadoProyectoCreateSchema = z.object({
  id_empleado: z.number().int().positive('El ID del empleado debe ser un número positivo'),
  id_proyecto: z.number().int().positive('El ID del proyecto debe ser un número positivo'),
  fecha_asignacion: z.coerce.date().optional().default(new Date()),
  rol: z.string().max(50, 'El rol no puede exceder los 50 caracteres').optional()
});

export { empleadoProyectoCreateSchema };