import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import proyectoRoutes from './routes/proyectoRoutes.js';
import celulaProyectoRoutes from './routes/celulaProyectoRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js'; 
import secuenciaRoutes from './routes/secuenciaRoutes.js';
import categotiaRoutes from './routes/categoriaRoutes.js'
import experimentosTipoRoutes from './routes/experimentoTipoRoutes.js'
import testingCardRoutes from './routes/testingCardRoutes.js';
import learningCardRoutes from './routes/learningCardRoutes.js';
import metricaTestingCardRoutes from './routes/metricaTestingCardRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import bodyParser from 'body-parser'; 
import nodePositionRoutes from './routes/nodePositionRoutes.js';
 
 
 
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
app.use('/celula_proyecto', celulaProyectoRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/secuencias', secuenciaRoutes);
app.use('/categorias', categotiaRoutes);
app.use('/experimento_tipo', experimentosTipoRoutes);
app.use('/testing_card', testingCardRoutes)
app.use('/learning_card', learningCardRoutes)
app.use('/metrica_testing_card', metricaTestingCardRoutes)
app.use('/flow-positions', nodePositionRoutes)

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