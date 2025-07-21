import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TestingCardPlaybook = sequelize.define('TestingCardPlaybook', {
  pagina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  campo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  costo: {
    type: DataTypes.INTEGER
  },
  tiempo_preparacion: {
    type: DataTypes.INTEGER
  },
  tiempo_ejecucion: {
    type: DataTypes.INTEGER
  },
  fuerza_evidencia: {
    type: DataTypes.INTEGER
  },
  tipo_riesgo: {
    type: DataTypes.STRING
  },
  deseabilidad: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  factibilidad: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  viabilidad: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  adaptabilidad: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  equipo: {
    type: DataTypes.STRING
  },
  habilidades: {
    type: DataTypes.STRING
  },
  herramientas: {
    type: DataTypes.JSONB
  },
  metricas: {
    type: DataTypes.JSONB
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'testing_card_playbook',
  schema: 'public',
  timestamps: false
});

export default TestingCardPlaybook;