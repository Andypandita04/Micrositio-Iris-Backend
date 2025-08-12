# Guía de Pruebas - API de Usuarios con Postman

## Descripción
Esta guía te ayudará a probar todos los endpoints del módulo de usuarios usando Postman.

## Archivos Incluidos
- `Usuarios.postman_collection.json` - Colección completa de endpoints
- `Usuarios.postman_environment.json` - Variables de entorno

## Configuración Inicial

### 1. Importar en Postman
1. Abre Postman
2. Haz clic en "Import"
3. Importa ambos archivos:
   - `Usuarios.postman_collection.json`
   - `Usuarios.postman_environment.json`

### 2. Configurar Environment
1. Selecciona el environment "Usuarios API Environment"
2. Verifica que las variables estén configuradas:
   - `base_url`: http://localhost:3000
   - `token`: (se llenará automáticamente tras login)
   - `usuario_id`: (se llenará automáticamente tras crear usuario)
   - `empleado_id`: 1 (ajustar según tu base de datos)

## Flujo de Pruebas Recomendado

### Paso 1: Autenticación
**Endpoint**: `POST /auth/login`
```json
{
  "alias": "admin",
  "password": "admin123"
}
```
- Este endpoint guarda automáticamente el token en las variables de entorno
- **Importante**: Asegúrate de tener un usuario administrador en tu base de datos

### Paso 2: Verificar Funcionalidad Básica

#### 2.1 Obtener Todos los Usuarios
**Endpoint**: `GET /usuarios`
- Debería devolver lista de usuarios existentes
- Incluye filtros opcionales: `?activo=true&tipo=EDITOR`

#### 2.2 Obtener Estadísticas
**Endpoint**: `GET /usuarios/estadisticas`
- Muestra resumen de usuarios por tipo y estado

### Paso 3: Crear Usuarios

#### 3.1 Crear Usuario EDITOR
**Endpoint**: `POST /usuarios`
```json
{
  "alias": "editor_test",
  "password": "Password123",
  "tipo": "EDITOR",
  "id_empleado": 1,
  "activo": true
}
```
- **Requisito**: El empleado con ID 1 debe existir y estar activo
- Guarda automáticamente el `usuario_id` para pruebas posteriores

#### 3.2 Crear Usuario VISITANTE
**Endpoint**: `POST /usuarios`
```json
{
  "alias": "visitante_test",
  "password": "Password123",
  "tipo": "VISITANTE",
  "activo": true
}
```
- **Nota**: Los VISITANTE no requieren `id_empleado`

### Paso 4: Consultas Específicas

#### 4.1 Obtener Usuario por ID
**Endpoint**: `GET /usuarios/{id}`
- Usa la variable `{{usuario_id}}` que se guardó automáticamente

#### 4.2 Obtener Usuarios por Empleado
**Endpoint**: `GET /usuarios/empleado/{id_empleado}`
- Usa la variable `{{empleado_id}}`

### Paso 5: Actualizaciones

#### 5.1 Actualizar Usuario
**Endpoint**: `PATCH /usuarios/{id}`
```json
{
  "alias": "editor_actualizado",
  "activo": true
}
```

#### 5.2 Cambiar Contraseña
**Endpoint**: `PATCH /usuarios/{id}/password`
```json
{
  "password_actual": "Password123",
  "password_nueva": "NewPassword456"
}
```

### Paso 6: Gestión de Estado

#### 6.1 Dar de Baja
**Endpoint**: `PATCH /usuarios/{id}/baja`
- Cambia `activo` a `false`

#### 6.2 Dar de Alta
**Endpoint**: `PATCH /usuarios/{id}/alta`
- Cambia `activo` a `true`

### Paso 7: Eliminación
**Endpoint**: `DELETE /usuarios/{id}`
- **Importante**: Solo funciona si el usuario está inactivo

## Casos de Error - Pruebas de Validación

La colección incluye casos de error para verificar las validaciones:

### Errores de Validación
1. **Usuario sin alias**: Falta campo requerido
2. **Alias duplicado**: Violación de unicidad
3. **EDITOR sin empleado**: Violación de regla de negocio
4. **VISITANTE con empleado**: Violación de regla de negocio
5. **Contraseña débil**: No cumple criterios de seguridad

### Errores de Autenticación
1. **Sin token**: Error 401
2. **Token inválido**: Error 401
3. **Permisos insuficientes**: Error 403

### Errores de Recursos
1. **Usuario inexistente**: Error 404
2. **Empleado inexistente**: Error 404

## Códigos de Respuesta Esperados

- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **400**: Datos inválidos
- **401**: No autenticado
- **403**: Sin permisos
- **404**: Recurso no encontrado
- **500**: Error interno del servidor

## Estructura de Respuestas

### Respuesta Exitosa
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    "id_usuario": "uuid",
    "alias": "string",
    "tipo": "EDITOR|VISITANTE",
    "id_empleado": "number|null",
    "activo": "boolean",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Código del error"
}
```

## Preparación de Datos de Prueba

Antes de ejecutar las pruebas, asegúrate de tener:

1. **Usuario Administrador**:
   ```sql
   INSERT INTO usuarios (alias, password_hash, tipo, activo) 
   VALUES ('admin', '$2b$12$hashed_password', 'EDITOR', true);
   ```

2. **Empleado de Prueba**:
   ```sql
   INSERT INTO empleado (nombre_pila, apellido_paterno, correo, numero_empleado, activo) 
   VALUES ('Juan', 'Pérez', 'juan@test.com', '123456', true);
   ```

## Automatización de Pruebas

La colección incluye scripts de prueba automática que:
- Guardan tokens y IDs automáticamente
- Validan códigos de respuesta
- Verifican estructura de respuestas

Para ejecutar todas las pruebas:
1. Selecciona la colección
2. Haz clic en "Run collection"
3. Configura el orden y delays según sea necesario

## Solución de Problemas

### Error 500 "Usuario no encontrado"
- Verifica que el usuario admin existe en la BD
- Revisa la configuración de la base de datos

### Error 404 "Empleado no encontrado"
- Asegúrate de que existe un empleado con el ID especificado
- Verifica que el empleado esté activo

### Error de Conexión
- Confirma que el servidor esté corriendo en el puerto 3000
- Verifica la variable `base_url` en el environment

### Token Expirado
- Ejecuta nuevamente el endpoint de login
- El token se renovará automáticamente

## Notas Importantes

1. **Orden de Ejecución**: Algunos endpoints dependen de otros (ej: actualizar requiere crear primero)
2. **Limpieza**: Elimina usuarios de prueba después de las pruebas
3. **Datos Sensibles**: No uses contraseñas reales en las pruebas
4. **Logs**: Revisa la consola de Postman para mensajes de debug

## Variables de Entorno Adicionales

Puedes agregar más variables según tus necesidades:
```json
{
  "test_employee_id": "2",
  "admin_token": "backup_token",
  "test_db_url": "alternative_db"
}
```
