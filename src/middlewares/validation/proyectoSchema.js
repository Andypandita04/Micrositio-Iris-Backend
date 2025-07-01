// src/middlewares/validation/proyectoSchema.js
/**
 * Módulo de esquemas de validación para proyectos usando Zod.
 * @module middlewares/validation/proyectoSchema
 */

import { z } from 'zod';

/**
 * Esquema para la creación de proyectos.
 * Define las reglas de validación para los datos de un nuevo proyecto.
 */
const proyectoCreateSchema = z.object({
  titulo: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(50, 'El título no puede exceder los 50 caracteres'),
  descripcion: z.string().optional(),
  fecha_inicio: z.coerce.date().optional(),
  fecha_fin_estimada: z.coerce.date().optional(),
  estado: z.enum(['activo', 'inactivo', 'completado'])
    .optional()
    .default('activo')
});

/**
 * Esquema para la actualización de proyectos.
 * Similar a proyectoCreateSchema pero todos los campos son opcionales.
 */
const proyectoUpdateSchema = proyectoCreateSchema.partial();

export { proyectoCreateSchema, proyectoUpdateSchema };