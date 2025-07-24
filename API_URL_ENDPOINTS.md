# API Endpoints para URL Testing Card y URL Learning Card

## URL Testing Card

### Base URL: `/url_testing_card`

#### 1. Obtener URLs por Testing Card
- **Endpoint:** `GET /url_testing_card/t`
- **Query Parameters:** 
  - `id_testing_card` (required): ID de la testing card
- **Descripción:** Obtiene todas las URLs asociadas a una testing card específica
- **Validaciones:** 
  - Verifica que existe la testing card
  - Retorna error si no tiene URLs asociadas

#### 2. Obtener URL por ID
- **Endpoint:** `GET /url_testing_card/u`
- **Query Parameters:** 
  - `id_url_tc` (required): ID de la URL
- **Descripción:** Obtiene una URL específica por su ID

#### 3. Obtener todas las URLs
- **Endpoint:** `GET /url_testing_card`
- **Descripción:** Obtiene todas las URLs de testing cards en el sistema

#### 4. Crear URL
- **Endpoint:** `POST /url_testing_card`
- **Body Parameters:**
  - `id_testing_card` (required): ID de la testing card
  - `url` (required): URL válida
- **Descripción:** Crea una nueva URL asociada a una testing card
- **Validaciones:** 
  - Verifica que existe la testing card
  - Valida formato de URL

#### 5. Actualizar URL
- **Endpoint:** `PATCH /url_testing_card`
- **Body Parameters:**
  - `id_url_tc` (required): ID de la URL a actualizar
  - `url` (optional): Nueva URL
- **Descripción:** Actualiza una URL existente

#### 6. Eliminar URL
- **Endpoint:** `DELETE /url_testing_card`
- **Body Parameters:**
  - `id_url_tc` (required): ID de la URL a eliminar
- **Descripción:** Elimina una URL del sistema

## URL Learning Card

### Base URL: `/url_learning_card`

#### 1. Obtener URLs por Learning Card
- **Endpoint:** `GET /url_learning_card/l`
- **Query Parameters:** 
  - `id_learning_card` (required): ID de la learning card
- **Descripción:** Obtiene todas las URLs asociadas a una learning card específica
- **Validaciones:** 
  - Verifica que existe la learning card
  - Retorna error si no tiene URLs asociadas

#### 2. Obtener URL por ID
- **Endpoint:** `GET /url_learning_card/u`
- **Query Parameters:** 
  - `id_url_lc` (required): ID de la URL
- **Descripción:** Obtiene una URL específica por su ID

#### 3. Obtener todas las URLs
- **Endpoint:** `GET /url_learning_card`
- **Descripción:** Obtiene todas las URLs de learning cards en el sistema

#### 4. Crear URL
- **Endpoint:** `POST /url_learning_card`
- **Body Parameters:**
  - `id_learning_card` (required): ID de la learning card
  - `url` (required): URL válida
- **Descripción:** Crea una nueva URL asociada a una learning card
- **Validaciones:** 
  - Verifica que existe la learning card
  - Valida formato de URL

#### 5. Actualizar URL
- **Endpoint:** `PATCH /url_learning_card`
- **Body Parameters:**
  - `id_url_lc` (required): ID de la URL a actualizar
  - `url` (optional): Nueva URL
- **Descripción:** Actualiza una URL existente

#### 6. Eliminar URL
- **Endpoint:** `DELETE /url_learning_card`
- **Body Parameters:**
  - `id_url_lc` (required): ID de la URL a eliminar
- **Descripción:** Elimina una URL del sistema

## Estructura de Respuesta

### URL Testing Card
```json
{
  "id_url_tc": 1,
  "id_testing_card": 1,
  "url": "https://ejemplo.com/test",
  "creado": "2023-07-24T10:00:00.000Z",
  "actualizado": "2023-07-24T10:00:00.000Z"
}
```

### URL Learning Card
```json
{
  "id_url_lc": 1,
  "id_learning_card": 1,
  "url": "https://ejemplo.com/learning",
  "creado": "2023-07-24T10:00:00.000Z",
  "actualizado": "2023-07-24T10:00:00.000Z"
}
```

## Códigos de Error

- **400**: Bad Request - Datos inválidos o parámetros faltantes
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error del servidor

## Archivos Implementados

### URL Testing Card
- `src/models/UrlTestingCard.js`
- `src/middlewares/validation/urlTestingCardSchema.js`
- `src/repositories/urlTestingCardRepository.js`
- `src/services/urlTestingCardService.js`
- `src/controllers/urlTestingCardController.js`
- `src/routes/urlTestingCardRoutes.js`
- `Postman/urlTestingCard`

### URL Learning Card
- `src/models/UrlLearningCard.js`
- `src/middlewares/validation/urlLearningCardSchema.js`
- `src/repositories/urlLearningCardRepository.js`
- `src/services/urlLearningCardService.js`
- `src/controllers/urlLearningCardController.js`
- `src/routes/urlLearningCardRoutes.js`
- `Postman/urlLearningCard`
