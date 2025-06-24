// Importar el SDK de Firebase Admin para interactuar con Firestore
const admin = require('firebase-admin');

// Inicializar Firebase (asegúrate de que ya está inicializado en app.js)
const db = admin.firestore();

class ProyectoRepository {
  /**
   * Crea un nuevo proyecto en Firestore.
   * @param {Object} proyectoData - Datos del proyecto { nombre, descripcion }.
   * @returns {Promise<Object>} - Retorna el proyecto creado con su ID generado por Firestore.
   */
  async crearProyecto(proyectoData) {
    try {
      // Agrega un documento a la colección 'proyectos'. Firestore genera el ID automáticamente.
      const docRef = await db.collection('proyectos').add(proyectoData);
      
      // Retorna el objeto proyecto con el ID asignado por Firestore
      return { 
        id: docRef.id, 
        nombre: proyectoData.nombre, 
        descripcion: proyectoData.descripcion 
      };
    } catch (error) {
      console.error('Error en ProyectoRepository.crearProyecto:', error);
      throw new Error('Error al crear el proyecto en Firestore');
    }
  }

  /**
   * Obtiene un proyecto por su ID.
   * @param {string} proyectoId - ID del proyecto a buscar.
   * @returns {Promise<Object|null>} - Retorna el proyecto o null si no existe.
   */
  async obtenerProyectoPorId(proyectoId) {
    try {
      const doc = await db.collection('proyectos').doc(proyectoId).get();
      
      // Si el documento no existe, retorna null
      if (!doc.exists) {
        return null;
      }
      
      // Retorna el proyecto con sus datos y ID
      return { 
        id: doc.id, 
        ...doc.data() 
      };
    } catch (error) {
      console.error('Error en ProyectoRepository.obtenerProyectoPorId:', error);
      throw new Error('Error al obtener el proyecto de Firestore');
    }
  }
}

module.exports = ProyectoRepository;