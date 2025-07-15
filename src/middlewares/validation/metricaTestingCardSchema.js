// src/middlewares/validation/metricaTestingCardSchema.js
import { z } from 'zod';

const operadoresValidos = ['=', '!=', '>', '<', '>=', '<=', 'contains', 'not_contains'];

const metricaCreateSchema = z.object({
  id_testing_card: z.number().int().positive('El ID de testing card debe ser un número positivo'),
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(20, 'El nombre no puede exceder los 20 caracteres'),
  operador: z.string()
    .min(1, 'El operador es requerido')
    .refine(val => operadoresValidos.includes(val)),
  criterio: z.string().min(1, 'El criterio es requerido')
});

const metricaUpdateSchema = z.object({
  nombre: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(20, 'El nombre no puede exceder los 20 caracteres')
    .optional(),
  operador: z.string()
    .min(1, 'El operador es requerido')
    .refine(val => operadoresValidos.includes(val))
    .optional(),
  criterio: z.string().min(1, 'El criterio es requerido').optional()
});

export { metricaCreateSchema, metricaUpdateSchema };