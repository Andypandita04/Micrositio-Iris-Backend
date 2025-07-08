-- Tablas básicas

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
);

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
  estado VARCHAR(10) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO', 'COMPLETADO')),
  fecha_inicio DATE,
  fecha_fin_estimada DATE,
  id_categoria INTEGER NOT NULL,
  id_lider INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Restricción para categoría
  CONSTRAINT fk_proyecto_categoria
    FOREIGN KEY (id_categoria)
    REFERENCES categoria(id_categoria)
    ON DELETE RESTRICT,
    
  -- Restricción para líder (empleado)
  CONSTRAINT fk_proyecto_lider
    FOREIGN KEY (id_lider)
    REFERENCES empleado(id_empleado)
    ON DELETE SET NULL,
    
  -- Restricción adicional para fechas
  CONSTRAINT chk_fechas_validas
    CHECK (fecha_fin_estimada IS NULL OR fecha_inicio IS NULL OR fecha_fin_estimada >= fecha_inicio)
);

CREATE TABLE experimento_tipo (
    id_experimento_tipo SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('DESCUBRIMIENTO', 'VALIDACION')),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    icono VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
);



-- Tabla secuencia (corregida relación padre)
CREATE TABLE secuencia (
  id_secuencia INTEGER PRIMARY KEY,
  id_proyecto INTEGER NOT NULL REFERENCES proyecto(id_proyecto) ON DELETE CASCADE,
  id_testing_card_padre INTERGER NOT NULL REFERENCES testing_card(id_testing_card) ON CASCADE;
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
  id_responsable INTEGER NOT NULL REFERENCES empleado(id_empleado),
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
  id_secuencia INTEGER  REFERENCES secuencia(id_secuencia) ON DELETE CASCADE,
  id_testing_card INTEGER NOT NULL REFERENCES testing_card(id_testing_card) ON DELETE CASCADE,
  resultado TEXT,
  hallazgo,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tablas de relación
CREATE TABLE celula_proyecto (
  id SERIAL PRIMARY KEY,
  id_empleado INTEGER NOT NULL REFERENCES empleado(id_empleado) ON DELETE CASCADE,
  id_proyecto INTEGER NOT NULL REFERENCES proyecto(id_proyecto) ON DELETE CASCADE,
  activo BOOLEAN DEFAULT TRUE,
  UNIQUE (id_empleado, id_proyecto)
);




CREATE TABLE metrica_testing_card (
    id_metrica SERIAL PRIMARY KEY,
    id_testing_card INTEGER NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    operador VARCHAR(10) NOT NULL,
    criterio TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_testing_card 
        FOREIGN KEY (id_testing_card) 
        REFERENCES testing_card(id_testing_card)
        ON DELETE CASCADE  -- Opcional: borra métricas si se borra la testing card
);

