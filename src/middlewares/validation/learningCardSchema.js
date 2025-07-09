import { z } from 'zod';

export const learningCardCreateSchema = z.object({
  id_testing_card: z.number().int().positive('El ID de testing card debe ser un número positivo'),
  resultado: z.string().optional(),
  hallazgo: z.string().optional()
});

export const learningCardUpdateSchema = z.object({
  resultado: z.string().optional(),
  hallazgo: z.string().optional()
});