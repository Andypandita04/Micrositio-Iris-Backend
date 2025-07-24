// src/middlewares/validation/urlLearningCardSchema.js
import { z } from 'zod';

const urlLearningCardCreateSchema = z.object({
  id_learning_card: z.number().int().positive('El ID de learning card debe ser un número positivo'),
  url: z.string()
    .url('Debe ser una URL válida')
    .min(1, 'La URL es requerida')
});

const urlLearningCardUpdateSchema = z.object({
  url: z.string()
    .url('Debe ser una URL válida')
    .min(1, 'La URL es requerida')
    .optional()
});

export { urlLearningCardCreateSchema, urlLearningCardUpdateSchema };
