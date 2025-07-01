-- Trigger para updated_at (ejemplo para empleado)
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_empleado_timestamp
BEFORE UPDATE ON empleado
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Función genérica para actualizar el timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para cada tabla que tenga campo updated_at

-- empleado
--CREATE TRIGGER update_empleado_timestamp
--BEFORE UPDATE ON empleado
--FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- proyecto
CREATE TRIGGER update_proyecto_timestamp
BEFORE UPDATE ON proyecto
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- experimento tipo
CREATE TRIGGER update_experimento_tipo_timestamp
BEFORE UPDATE ON experimento_tipo
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Métricas tipo
CREATE TRIGGER update_metrica_tipo_timestamp
BEFORE UPDATE ON metrica_tipo
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- secuencia
CREATE TRIGGER update_secuencia_timestamp
BEFORE UPDATE ON secuencia
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Testing card
CREATE TRIGGER update_testing_card_timestamp
BEFORE UPDATE ON testing_card
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Learning card
CREATE TRIGGER update_learning_card_timestamp
BEFORE UPDATE ON learning_card
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- empleado proyecto
CREATE TRIGGER update_empleado_proyecto_timestamp
BEFORE UPDATE ON empleado_proyecto
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Testing Métricas
CREATE TRIGGER update_testing_metrica_timestamp
BEFORE UPDATE ON testing_metrica
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Testing Criterios
CREATE TRIGGER update_testing_criterios_timestamp
BEFORE UPDATE ON testing_criterios
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
