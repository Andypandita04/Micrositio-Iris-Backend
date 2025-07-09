import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import proyectoRoutes from './routes/proyectoRoutes.js';
import empleadoProyectoRoutes from './routes/empleadoProyectoRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js'; 
import secuenciaRoutes from './routes/secuenciaRoutes.js';
import categotiaRoutes from './routes/categoriaRoutes.js'
//import testingCardRoutes from './routes/testingCardRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import bodyParser from 'body-parser'; 
 
 
 
// Configurar dotenv
dotenv.config();
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(cors())
// Middleware para parsear JSON
app.use(bodyParser.json()); 
app.use(express.json());

// Rutas
app.use('/proyectos', proyectoRoutes);
app.use('/', empleadoProyectoRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/secuencias', secuenciaRoutes);
app.use('/categorias', categotiaRoutes)
//app.use('/testing_card', testingCardRoutes)

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