import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Estado } from './estado.js';

const Municipio = sequelize.define('Municipio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  estado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Estado,
      key: 'id',
    }
  }
}, {
  tableName: 'municipios',
  timestamps: false,
});

// Relación: Un municipio pertenece a un estado
Municipio.belongsTo(Estado, { foreignKey: 'estado_id' });
// Relación: Un estado tiene muchos municipios
Estado.hasMany(Municipio, { foreignKey: 'estado_id' });

export { Municipio };