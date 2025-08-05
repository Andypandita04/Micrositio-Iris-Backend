import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwtConfig.js';

class JWTUtils {
  /**
   * Genera un JWT con información del usuario
   */
  static generarToken(usuario, proyectos = null) {
    const payload = {
      user_id: usuario.id_usuario,
      alias: usuario.alias,
      tipo: usuario.tipo,
      id_empleado: usuario.id_empleado,
      proyectos: proyectos,
      iat: Math.floor(Date.now() / 1000)
    };

    return jwt.sign(payload, JWT_CONFIG.secret, {
      expiresIn: JWT_CONFIG.expiresIn,
      algorithm: JWT_CONFIG.algorithm
    });
  }

  /**
   * Verifica y decodifica un JWT
   */
  static verificarToken(token) {
    try {
      return jwt.verify(token, JWT_CONFIG.secret);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  /**
   * Extrae token del header Authorization
   */
  static extraerTokenDelHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Token no proporcionado');
    }
    return authHeader.substring(7);
  }
}

export default JWTUtils;