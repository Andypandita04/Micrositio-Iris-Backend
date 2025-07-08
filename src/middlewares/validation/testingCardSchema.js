// src/middlewares/validation/testingCardSchema.js
import { z } from 'zod';

/**
 * Esquema para creación de testing cards
 */
// Esquema simplificado para creación
export const testingCardCreateSchema = z.object({
  id_secuencia: z.number().int().positive('El ID de secuencia debe ser un número positivo'),
  titulo: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(300, 'El título no puede exceder los 300 caracteres'),
  padre_id: z.number().int().nonnegative('El ID padre debe ser un número positivo o cero').optional(),
  // Hacer todos los demás campos opcionales
  hipotesis: z.string().optional(),
  id_experimento_tipo: z.number().int().positive().optional(),
  descripcion: z.string().optional(),
  dia_inicio: z.coerce.date().optional(),
  dia_fin: z.coerce.date().optional(),
  anexo_url: z.string().url().optional(),
  id_empleado: z.number().int().positive().optional(),
  status: z.enum(['En desarrollo', 'En validación', 'En ejecución', 'Cancelado', 'Terminado'])
    .optional()
    .default('En desarrollo')
}).refine(data => {
  // Validación condicional de fechas si vienen ambas
  if (data.dia_inicio && data.dia_fin) {
    return data.dia_fin >= data.dia_inicio;
  }
  return true;
}, {
  message: 'La fecha de fin no puede ser anterior a la fecha de inicio',
  path: ['dia_fin']
});

/**
 * Esquema para actualización de testing cards
 */
export const testingCardUpdateSchema = z.object({
  titulo: z.string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(300, 'El título no puede exceder los 300 caracteres')
    .optional(),
  hipotesis: z.string().min(1, 'La hipótesis no puede estar vacía').optional(),
  id_experimento_tipo: z.number().int().positive('El ID de tipo de experimento debe ser un número positivo').optional(),
  descripcion: z.string().min(1, 'La descripción no puede estar vacía').optional(),
  dia_inicio: z.coerce.date().optional(),
  dia_fin: z.coerce.date().optional(),
  anexo_url: z.string().url('URL inválida').optional(),
  id_empleado: z.number().int().positive('El ID de empleado debe ser un número positivo').optional(),
  status: z.enum(['En desarrollo', 'En validación', 'En ejecución', 'Cancelado', 'Terminado']).optional()
}).refine(data => {
  if (data.dia_inicio && data.dia_fin) {
    return data.dia_fin >= data.dia_inicio;
  }
  return true;
}, {
  message: 'La fecha de fin no puede ser anterior a la fecha de inicio',
  path: ['dia_fin']
});