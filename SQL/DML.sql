-- Tablas básicas
CREATE TABLE empleado (
  id_empleado INTEGER PRIMARY KEY UNIQUE,
  nombre_pila VARCHAR(40) NOT NULL,
  apellido_paterno VARCHAR(20) NOT NULL,
  apellido_materno VARCHAR(20),
  celular VARCHAR(20) UNIQUE, 
  correo VARCHAR(40) NOT NULL UNIQUE,
  numero_empleado VARCHAR(6) NOT NULL UNIQUE,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE proyecto (
  id_proyecto SERIAL PRIMARY KEY,
  titulo VARCHAR(50) NOT NULL,
  descripcion TEXT,
  estado VARCHAR(10) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo', 'completado')),
  fecha_inicio DATE,
  fecha_fin_estimada DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tablas de tipos (ENUMs implícitos)
CREATE TABLE experimento_tipo (
  id_experimento_tipo SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  icono VARCHAR(100)
);

CREATE TABLE metrica_tipo (
  id_metrica_tipo SERIAL PRIMARY KEY,
  nombre VARCHAR(20) NOT NULL UNIQUE,
  unidad VARCHAR(20)
);

-- Tabla secuencia (corregida relación padre)
CREATE TABLE secuencia (
  id_secuencia INTEGER PRIMARY KEY,
  id_proyecto INTEGER NOT NULL REFERENCES proyecto(id_proyecto) ON DELETE CASCADE,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testing Cards (árbol jerárquico)
CREATE TABLE testing_card (
  id_testing_card INTEGER PRIMARY KEY,
  id_secuencia INTEGER NOT NULL REFERENCES secuencia(id_secuencia) ON DELETE CASCADE,
  padre_id INTEGER REFERENCES testing_card(id_testing_card) ON DELETE CASCADE,
  titulo VARCHAR(300) NOT NULL,
  hipotesis TEXT NOT NULL,
  id_experimento_tipo INTEGER NOT NULL REFERENCES experimento_tipo(id_experimento_tipo),
  descripcion TEXT NOT NULL,
  dia_inicio DATE NOT NULL,
  dia_fin DATE NOT NULL,
  anexo_url VARCHAR(500),
  id_empleado INTEGER NOT NULL REFERENCES empleado(id_empleado),
  status VARCHAR(30) DEFAULT 'En desarrollo' CHECK (
    status IN ('En desarrollo', 'En validación', 'En ejecución', 'Cancelado', 'Terminado')
  ),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE secuencia
ADD COLUMN id_padre INTEGER REFERENCES testing_card(id_testing_card) ON DELETE CASCADE;

-- Learning Cards (relación 1:1 con TC)
CREATE TABLE learning_card (
  id SERIAL PRIMARY KEY,
  id_secuencia INTEGER REFERENCES secuencia(id_secuencia) ON DELETE CASCADE,
  id_testing_card INTEGER NOT NULL REFERENCES testing_card(id_testing_card) ON DELETE CASCADE,
  id_experimento_tipo INTEGER NOT NULL REFERENCES experimento_tipo(id_experimento_tipo),
  titulo VARCHAR(300) NOT NULL,
  descripcion TEXT NOT NULL,
  insights TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tablas de relación
CREATE TABLE empleado_proyecto (
  id SERIAL PRIMARY KEY,
  id_empleado INTEGER NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
  id_proyecto INTEGER NOT NULL REFERENCES proyecto(id_proyecto) ON DELETE CASCADE,
  rol VARCHAR(100),
  fecha_incorporacion DATE DEFAULT NOW(),
  activo BOOLEAN DEFAULT TRUE,
  UNIQUE (id_empleado, id_proyecto)
);

-- Tablas de métricas y criterios
CREATE TABLE testing_metrica (
  id SERIAL PRIMARY KEY,
  id_testing_card INTEGER NOT NULL REFERENCES testing_card(id_testing_card) ON DELETE CASCADE,
  id_metrica_tipo INTEGER NOT NULL REFERENCES metrica_tipo(id_metrica_tipo),
  valor_objetivo DECIMAL,
  unidad_tiempo VARCHAR(20) NOT NULL
);

CREATE TABLE testing_criterios (
  id SERIAL PRIMARY KEY,
  id_testing_card INTEGER NOT NULL REFERENCES testing_card(id_testing_card) ON DELETE CASCADE,
  id_metrica_tipo INTEGER NOT NULL REFERENCES metrica_tipo(id_metrica_tipo),
  operador VARCHAR(10) NOT NULL CHECK (operador IN ('=', '>', '<', '>=', '<=')),
  valor_esperado DECIMAL NOT NULL
);

