// src/middlewares/validation/experimentoTipoSchema.js
/**
 * Módulo de esquemas de validación para experimento_tipo usando Zod.
 * @module middlewares/validation/experimentoTipoSchema
 */

import { z } from 'zod';

const tiposPermitidos = ['DESCUBRIMIENTO', 'VALIDACION'] ;

/**
 * Esquema para la creación de tipos de experimento.
 */
const experimentoTipoCreateSchema = z.object({
  tipo: z.enum(tiposPermitidos, {
    message: `El tipo debe ser uno de: ${tiposPermitidos.join(', ')}`
  }),
  nombre: z.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres'),
  icono: z.string()
    .max(50, 'El icono no puede exceder los 50 caracteres')
    .optional()
});

/**
 * Esquema para la actualización de tipos de experimento.
 */
const experimentoTipoUpdateSchema = experimentoTipoCreateSchema.partial();

export { experimentoTipoCreateSchema, experimentoTipoUpdateSchema };