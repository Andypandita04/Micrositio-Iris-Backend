// src/middlewares/validation/urlTestingCardSchema.js
import { z } from 'zod';

const urlTestingCardCreateSchema = z.object({
  id_testing_card: z.number().int().positive('El ID de testing card debe ser un número positivo'),
  url: z.string()
    .url('Debe ser una URL válida')
    .min(1, 'La URL es requerida')
});

const urlTestingCardUpdateSchema = z.object({
  url: z.string()
    .url('Debe ser una URL válida')
    .min(1, 'La URL es requerida')
    .optional()
});

export { urlTestingCardCreateSchema, urlTestingCardUpdateSchema };
