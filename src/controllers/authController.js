import AuthService from '../services/authService.js';
import ApiError from '../utils/ApiError.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Maneja el login de usuarios
   */
  async login(req, res, next) {
    try {
      const { alias, password } = req.body;

      if (!alias || !password) {
        throw new ApiError('Alias y password son requeridos', 400);
      }

      const resultado = await this.authService.login(alias, password);

      res.json({
        success: true,
        message: 'Login exitoso',
        data: resultado
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Maneja el registro de nuevos usuarios
   */
  async registro(req, res, next) {
    try {
      const resultado = await this.authService.registro(req.body);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: resultado
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Verifica si el token es válido
   */
  async verificarToken(req, res, next) {
    try {
      // El middleware ya verificó el token y agregó req.user
      res.json({
        success: true,
        message: 'Token válido',
        data: {
          usuario: req.user
        }
      });

    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;