export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'tu-clave-secreta-muy-segura',
  expiresIn: '24h',
  algorithm: 'HS256'
};