// src/middlewares/validation/categoriaSchema.js
/**
 * Módulo de esquemas de validación para categorías usando Zod.
 * @module middlewares/validation/categoriaSchema
 */

import { z } from 'zod';

/**
 * Esquema para la creación de categorías.
 */
const categoriaCreateSchema = z.object({
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres')
});

/**
 * Esquema para la actualización de categorías.
 */
const categoriaUpdateSchema = categoriaCreateSchema.partial();

export { categoriaCreateSchema, categoriaUpdateSchema };