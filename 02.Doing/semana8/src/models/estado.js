import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Estado= sequelize.define('Estado', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement:true, 
    }, 
    nombre:{
        type: DataTypes, 
        allowNull: false
    }
}, {
    tableName:'estados', 
    timestamps: false,
}); 

export {Estado}; 