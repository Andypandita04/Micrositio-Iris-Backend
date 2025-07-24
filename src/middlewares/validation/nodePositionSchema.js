import { z } from 'zod';

export const upsertNodePositionSchema = z.object({
  id_secuencia: z.number().int().positive('El ID de secuencia debe ser un número positivo'),
  node_type: z.enum(['testing', 'learning'], { required_error: 'El tipo de nodo es requerido' }),
  node_id: z.number().int().positive('El ID del nodo debe ser un número positivo'),
  position_x: z.number({ required_error: 'La posición X es requerida' }),
  position_y: z.number({ required_error: 'La posición Y es requerida' }),
});

export default (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      mensaje: result.error.errors.map(e => e.message).join(', ')
    });
  }
  next();
};