import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import proyectoRoutes from './routes/proyectoRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
 
 
 
 
// Configurar dotenv
dotenv.config();
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(cors())
// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/proyectos', proyectoRoutes);
 
// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});
 
// Manejo de errores
app.use(errorHandler);
 
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});