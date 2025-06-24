const express = require('express');
const admin = require('firebase-admin');

// Inicializa Firebase Admin SDK (usa tus credenciales reales)
const serviceAccount = require('./bd-micrositio-iris-firebase-adminsdk-fbsvc-87bd7e3157.json'); // Descarga esto desde Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: "https://mi-proyecto-12345.firebaseio.com" // Usa TU URL aquí
});

admin.firestore().listCollections().then(collections => {
  console.log("Conexión exitosa a Firestore. Colecciones:", collections.map(c => c.id));
}).catch(error => {
  console.error("Error conectando a Firestore:", error);
});


// Inicializa Express
const app = express();
app.use(express.json()); // Para parsear JSON en las requests

// Inyección de Dependencias
const ProyectoRepository = require('./repositories/proyectoRepository');
const ProyectoService = require('./services/proyectoService');
const ProyectoController = require('./controllers/proyectoController');

const proyectoRepository = new ProyectoRepository();
const proyectoService = new ProyectoService(proyectoRepository);
const proyectoController = new ProyectoController(proyectoService);

// Rutas
app.post('/proyectos', (req, res) => proyectoController.crearProyecto(req, res));
app.get('/proyectos/:id', (req, res) => proyectoController.obtenerProyecto(req, res));

// Manejo de errores genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Algo salió mal!' });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});