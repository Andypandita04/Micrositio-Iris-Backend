import { z } from 'zod';

export const learningCardCreateSchema = z.object({
  id_testing_card: z.number().int().positive('El ID de testing card debe ser un número positivo'),
  resultado: z.string().optional(),
  hallazgo: z.string().optional()
});

export const learningCardUpdateSchema = z.object({
  id_learning_card: z.number().int().positive().optional(),
  resultado: z.string().optional(),
  hallazgo: z.string().optional()
}).refine(data => data.resultado !== undefined || data.hallazgo !== undefined, {
  message: 'Debe proporcionar al menos resultado o hallazgo para actualizar'
});