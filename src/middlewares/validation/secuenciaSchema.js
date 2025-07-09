// src/middlewares/validation/secuenciaSchema.js
import { z } from 'zod';

/**
 * Esquema para la creación de secuencias
 */
const secuenciaCreateSchema = z.object({
  id_proyecto: z.number().int().positive('El ID de proyecto debe ser un número positivo'),
  id_testing_card_padre: z.number().int().positive('El ID de testing card debe ser un número positivo'),
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres'),
  descripcion: z.string().optional()
});

/**
 * Esquema para la actualización de secuencias
 */
const secuenciaUpdateSchema = z.object({
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres')
    .optional(),
  descripcion: z.string().optional(),
  id_testing_card_padre: z.number()
    .int()
    .positive('El ID de testing card debe ser un número positivo')
    .optional()
});

export { secuenciaCreateSchema, secuenciaUpdateSchema };