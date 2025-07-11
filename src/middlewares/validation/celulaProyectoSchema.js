// src/middlewares/validation/celulaProyectoSchema.js
/**
 * Módulo de esquemas de validación para célula_proyecto usando Zod.
 * @module middlewares/validation/celulaProyectoSchema
 */

import { z } from 'zod';

/**
 * Esquema para la creación de relaciones célula-proyecto.
 */
const celulaProyectoCreateSchema = z.object({
  id_empleados: z.array(z.number().int().positive('El ID del empleado debe ser un número positivo')),
  id_proyecto: z.number().int().positive('El ID del proyecto debe ser un número positivo'),
  activo: z.boolean().optional().default(true)
});

/**
 * Esquema para la actualización de relaciones célula-proyecto.
 */
const celulaProyectoUpdateSchema = z.object({
  activo: z.boolean()
});

export { celulaProyectoCreateSchema, celulaProyectoUpdateSchema };