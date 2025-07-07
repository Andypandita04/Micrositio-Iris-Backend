// src/middlewares/validation/secuenciaSchema.js
import { z } from 'zod';

/**
 * Esquema para creación de secuencias
 */
export const secuenciaCreateSchema = z.object({
  id_proyecto: z.number().int().positive('El ID de proyecto debe ser un número positivo'),
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres'),
  descripcion: z.string().optional()
});

/**
 * Esquema para actualización de secuencias
 */
export const secuenciaUpdateSchema = z.object({
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres')
    .optional(),
  descripcion: z.string().optional()
}).refine(data => data.nombre || data.descripcion, {
  message: 'Debe proporcionar al menos un campo para actualizar'
});