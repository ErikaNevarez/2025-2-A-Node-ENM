import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Municipio } from './municipio.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  municipio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Municipio,
      key: 'id',
    }
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
});

// Relación: Un usuario pertenece a un municipio
Usuario.belongsTo(Municipio, { foreignKey: 'municipio_id' });
// Relación: Un municipio tiene muchos usuarios
Municipio.hasMany(Usuario, { foreignKey: 'municipio_id' });

export { Usuario };