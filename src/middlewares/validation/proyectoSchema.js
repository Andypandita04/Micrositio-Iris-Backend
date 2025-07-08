// src/middlewares/validation/proyectoSchema.js
import { z } from 'zod';

/**
 * Esquema para creación de proyectos
 */
export const proyectoCreateSchema = z.object({
  titulo: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(50, 'El título no puede exceder los 50 caracteres'),
  descripcion: z.string().optional(),
  estado: z.enum(['ACTIVO', 'INACTIVO', 'COMPLETADO'])
    .optional()
    .default('ACTIVO'),
  fecha_inicio: z.coerce.date().optional(),
  fecha_fin_estimada: z.coerce.date().optional(),
  id_categoria: z.number().int().positive('El ID de categoría debe ser un número positivo'),
  id_lider: z.number().int().positive('El ID de líder debe ser un número positivo').optional()
}).refine(data => {
  if (data.fecha_inicio && data.fecha_fin_estimada) {
    return data.fecha_fin_estimada >= data.fecha_inicio;
  }
  return true;
}, {
  message: 'La fecha de fin no puede ser anterior a la fecha de inicio',
  path: ['fecha_fin_estimada']
});

/**
 * Esquema para actualización de proyectos
 */
export const proyectoUpdateSchema = z.object({
  titulo: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(50, 'El título no puede exceder los 50 caracteres')
    .optional(),
  descripcion: z.string().optional(),
  estado: z.enum(['ACTIVO', 'INACTIVO', 'COMPLETADO']).optional(),
  fecha_inicio: z.coerce.date().optional(),
  fecha_fin_estimada: z.coerce.date().optional(),
  id_categoria: z.number().int().positive('El ID de categoría debe ser un número positivo').optional(),
  id_lider: z.number().int().positive('El ID de líder debe ser un número positivo').optional()
}).refine(data => {
  if (data.fecha_inicio && data.fecha_fin_estimada) {
    return data.fecha_fin_estimada >= data.fecha_inicio;
  }
  return true;
}, {
  message: 'La fecha de fin no puede ser anterior a la fecha de inicio',
  path: ['fecha_fin_estimada']
});