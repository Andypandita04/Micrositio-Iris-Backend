# 📋 INFORME TÉCNICO: IMPLEMENTACIÓN DE ENDPOINTS DE DOCUMENTOS

## 🎯 RESUMEN EJECUTIVO

Se han implementado **3 endpoints RESTful** para la gestión de documentos asociados a Testing Cards. El sistema permite **subir, consultar y eliminar** archivos con validaciones de seguridad y límites de tamaño.

---

## 🔗 ENDPOINTS DISPONIBLES

### 📌 URL Base
```
http://localhost:3000/api
```

### 1. 📤 **SUBIR DOCUMENTO**
```http
POST /testing-card/{testingCardId}/documents
```

**Parámetros:**
- `testingCardId` (número, requerido): ID de la Testing Card

**Body:** 
- Tipo: `multipart/form-data`
- Campo: `document` (archivo)

**Restricciones:**
- ⚠️ **Tamaño máximo:** 50MB
- ⚠️ **Tipos permitidos:**
  - Imágenes: JPG, PNG, GIF, WebP, SVG
  - Documentos: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV
  - Videos: MP4, MPEG, QuickTime, AVI, WebM
  - Audio: MP3, WAV, OGG

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Documento subido exitosamente",
  "data": {
    "id": "uuid-generado",
    "testing_card_id": 123,
    "document_name": "archivo.pdf",
    "document_url": "https://supabase-url/archivo.pdf",
    "document_type": "pdf",
    "created_at": "2025-07-25T10:30:00Z",
    "updated_at": "2025-07-25T10:30:00Z"
  }
}
```

**Respuestas de Error:**
```json
// 413 - Archivo muy grande
{
  "success": false,
  "message": "El archivo excede el tamaño máximo permitido de 50MB"
}

// 400 - Tipo no permitido
{
  "success": false,
  "message": "Tipo de archivo no permitido: {mimetype}. Solo se permiten imágenes, documentos, videos y audios."
}

// 400 - Sin archivo
{
  "success": false,
  "message": "No se ha proporcionado ningún archivo"
}
```

### 2. 📥 **OBTENER DOCUMENTOS**
```http
GET /testing-card/{testingCardId}/documents
```

**Parámetros:**
- `testingCardId` (número, requerido): ID de la Testing Card

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "testing_card_id": 123,
      "document_name": "documento.pdf",
      "document_url": "https://supabase-url/documento.pdf",
      "document_type": "pdf",
      "created_at": "2025-07-25T10:30:00Z",
      "updated_at": "2025-07-25T10:30:00Z"
    }
  ]
}
```

### 3. 🗑️ **ELIMINAR DOCUMENTO**
```http
DELETE /documents/{documentId}
```

**Parámetros:**
- `documentId` (UUID, requerido): ID único del documento

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Documento eliminado exitosamente"
}
```

**Respuesta de Error (404):**
```json
{
  "success": false,
  "message": "Documento no encontrado"
}
```

---

## 💻 CÓDIGO JAVASCRIPT PARA EL FRONTEND

### 🔧 **Servicio Base (JavaScript Vanilla/React)**

```javascript
const API_BASE_URL = 'http://localhost:3000/api';

class DocumentService {
  // Subir documento
  static async uploadDocument(testingCardId, file) {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch(`${API_BASE_URL}/testing-card/${testingCardId}/documents`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Error al subir documento');
    }

    return result;
  }

  // Obtener documentos
  static async getDocuments(testingCardId) {
    const response = await fetch(`${API_BASE_URL}/testing-card/${testingCardId}/documents`);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Error al obtener documentos');
    }

    return result.data;
  }

  // Eliminar documento
  static async deleteDocument(documentId) {
    const response = await fetch(`${API_BASE_URL}/documents/${documentId}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Error al eliminar documento');
    }

    return result;
  }

  // Validar archivo
  static validateFile(file) {
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    const ALLOWED_TYPES = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain', 'text/csv',
      'video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm',
      'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg'
    ];

    if (file.size > MAX_SIZE) {
      return { valid: false, error: 'El archivo excede el tamaño máximo de 50MB' };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: 'Tipo de archivo no permitido' };
    }

    return { valid: true };
  }
}
```

### 🎯 **Hook para React**

```javascript
import { useState, useEffect } from 'react';

export const useDocuments = (testingCardId) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const docs = await DocumentService.getDocuments(testingCardId);
      setDocuments(docs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file) => {
    const validation = DocumentService.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    setLoading(true);
    try {
      const result = await DocumentService.uploadDocument(testingCardId, file);
      await loadDocuments(); // Recargar lista
      return result;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId) => {
    setLoading(true);
    try {
      await DocumentService.deleteDocument(documentId);
      await loadDocuments(); // Recargar lista
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testingCardId) {
      loadDocuments();
    }
  }, [testingCardId]);

  return {
    documents,
    loading,
    error,
    uploadDocument,
    deleteDocument,
    refetch: loadDocuments
  };
};
```

---

## 📊 ESTRUCTURA DE DATOS

### 🏷️ **Modelo de Documento**
```typescript
interface Document {
  id: string;              // UUID único
  testing_card_id: number; // ID de la Testing Card
  document_name: string;   // Nombre original del archivo
  document_url: string;    // URL pública para acceso
  document_type: string;   // Tipo: 'pdf', 'image', 'video', etc.
  created_at: string;      // ISO timestamp
  updated_at: string;      // ISO timestamp
}
```

### 🎨 **Tipos de Documento**
| Tipo | Descripción | Ejemplos |
|------|-------------|----------|
| `image` | Archivos de imagen | JPG, PNG, GIF |
| `pdf` | Documentos PDF | .pdf |
| `document` | Documentos Office | DOC, DOCX |
| `spreadsheet` | Hojas de cálculo | XLS, XLSX |
| `presentation` | Presentaciones | PPT, PPTX |
| `video` | Archivos de video | MP4, AVI |
| `audio` | Archivos de audio | MP3, WAV |
| `other` | Otros tipos | TXT, CSV |

---

## 🔒 VALIDACIONES Y RESTRICCIONES

### ⚡ **Validaciones del Cliente (Recomendadas)**
```javascript
function validateBeforeUpload(file) {
  // 1. Verificar tamaño
  if (file.size > 50 * 1024 * 1024) {
    throw new Error('Archivo muy grande (máximo 50MB)');
  }

  // 2. Verificar tipo
  const allowedTypes = [/* lista completa arriba */];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Tipo de archivo no permitido');
  }

  // 3. Verificar nombre
  if (!file.name || file.name.length > 255) {
    throw new Error('Nombre de archivo inválido');
  }

  return true;
}
```

### 🛡️ **Validaciones del Servidor (Automáticas)**
- ✅ Tamaño máximo: 50MB
- ✅ Tipos MIME permitidos
- ✅ Límite de archivos por request: 1
- ✅ Validación de Testing Card existente

---

## 🚨 MANEJO DE ERRORES

### 📋 **Códigos de Estado HTTP**
| Código | Significado | Acción Recomendada |
|--------|-------------|-------------------|
| `201` | Documento subido | Mostrar éxito |
| `200` | Operación exitosa | Continuar |
| `400` | Error de validación | Mostrar mensaje al usuario |
| `404` | Documento no encontrado | Actualizar lista |
| `413` | Archivo muy grande | Informar límite de tamaño |
| `500` | Error del servidor | Reintentar más tarde |

### 🎯 **Ejemplo de Manejo de Errores**
```javascript
try {
  await DocumentService.uploadDocument(testingCardId, file);
  // Mostrar éxito
  showSuccessMessage('Documento subido exitosamente');
} catch (error) {
  // Manejo específico por tipo de error
  if (error.message.includes('50MB')) {
    showErrorMessage('El archivo es muy grande. Máximo 50MB.');
  } else if (error.message.includes('no permitido')) {
    showErrorMessage('Tipo de archivo no permitido.');
  } else {
    showErrorMessage('Error al subir documento: ' + error.message);
  }
}
```

---

## 🧪 TESTING Y VALIDACIÓN

### 📝 **Casos de Prueba Recomendados**
1. **Subida exitosa**: Archivo PDF de 5MB
2. **Error de tamaño**: Archivo de 60MB
3. **Error de tipo**: Archivo .exe
4. **Testing Card inexistente**: ID inválido
5. **Eliminación exitosa**: Documento existente
6. **Eliminación fallida**: Documento inexistente

### 🔍 **Postman Collection**
Se incluye una colección completa de Postman en:
```
/Postman/TestingCardDocuments.postman_collection.json
/Postman/TestingCardDocuments.postman_environment.json
```

---

## 📈 CONSIDERACIONES DE RENDIMIENTO

### ⚡ **Optimizaciones**
- Los archivos se almacenan en **Supabase Storage** (CDN global)
- URLs públicas para acceso directo sin proxy
- Validación en cliente reduce carga del servidor
- Compresión automática de respuestas JSON

### 📊 **Límites Recomendados**
- **Archivos simultáneos**: 1 por request
- **Timeout de subida**: 120 segundos
- **Reintento automático**: 2 intentos máximo

---

## 🔐 SEGURIDAD

### 🛡️ **Medidas Implementadas**
- ✅ Validación de tipos MIME
- ✅ Límite de tamaño de archivo
- ✅ URLs pre-firmadas para storage
- ✅ Eliminación en cascada (storage + BD)
- ✅ Validación de Testing Card existente

### ⚠️ **Consideraciones Adicionales**
- Los archivos son **públicos** una vez subidos
- No hay autenticación de usuario implementada
- Considerar agregar escaneo de virus para producción

---

## 📞 CONTACTO Y SOPORTE

Para dudas técnicas sobre la implementación:
- Revisar documentación de endpoints
- Usar Postman collection para pruebas
- Verificar logs del servidor en caso de errores 500

---

**Fecha del informe:** 25 de Julio, 2025  
**Versión:** 1.0  
**Backend URL:** http://localhost:3000
