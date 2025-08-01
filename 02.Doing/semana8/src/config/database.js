import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import mysql from 'mysql2'

dotenv.config();

async function ensureDateBaseExist() {
    
}

await ensureDateBaseExist(); 

const sequelize=new Sequelize(
    'semana8_ORM',
    'root', 
    'password',  // null
    {
        host: '127.0.0.1',  //servidor
        dialect:'mysql', 
        logging:false, 
        pool:{
            max:5, 
            min:0, 
            acquire: 30000, //es el tiempo que hay que esperar para identificar si hubo un error en una petición , en este caso son 30mil milisegundos

            idle: 100000,  //es el tiempo que hay que esperar para que haya peticiones a ejecutar, en este caso son 100mil milisegundos, si no se ejecuta nada, se queda en standby para ahorro de recursos
        }
    }

); 

async function testConnection() {
    try {
        await sequeliz.authenticate(); 
        await sequelize.sync();
        console.log('Connection test'); 
    }catch (error){
        console.error('Cannot be conectend to Mysql');
    }
    
}

testConnection();

export{sequelize};

