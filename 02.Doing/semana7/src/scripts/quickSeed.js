/**
 * Script para poblar base de datos
 */

const fs = require('fs');
const mongoose = require('mongoose');
const Estado = require('../models/estado');
const Municipio = require('../models/municipio');
const Usuario = require('../models/usuario');

async function quickSeed() {
  try {
    // Conectar
    await mongoose.connect('mongodb://localhost:27017/semana7_db');
    console.log('Conectado a MongoDB');

    // Limpiar
    await Usuario.deleteMany({});
    console.log('Delete user');
    await Municipio.deleteMany({});
    console.log('Delete municipio');
    await Estado.deleteMany({});
    console.log('Delete Estado');

    // Leer CSV
    const csv = fs.readFileSync('./src/data/AGEEML_2025414144269.csv', 'utf-8');
    const lines = csv.split('\n').slice(1); // Sin header

    const estados = new Map();
    const municipios = [];

    // Procesar líneas
    for (const line of lines) {
      if (!line.trim()) continue;

      const cols = line.split(',').map(col => col.replace(/"/g, ''));
      const [, cveEnt, nomEnt, , , nomMun] = cols;

      if (nomEnt && nomMun) {
        estados.set(cveEnt, nomEnt);
        municipios.push({ cveEnt, nomMun });
      }
    }

    // Crear estados
    const estadosCreados = [];
    for (const [clave, nombre] of estados) {
      const estado = await Estado.create({ nombre });
      estadosCreados.push({ clave, _id: estado._id });
    }

    // Crear municipios
    for (const { cveEnt, nomMun } of municipios) {
      const estado = estadosCreados.find(e => e.clave === cveEnt);
      if (estado) {
        await Municipio.create({
          nombre: nomMun,
          estadoId: estado._id
        });
      }
    }

    const mun = await Municipio.findOne({ nombre: 'Aguascalientes' });

    await Usuario.create({
      nombreCompleto: 'Rodrigo',
      email: 'rodrigo@inadaptados.mx',
      municipioId: mun._id
    });

    console.log(`✅ Creados ${estados.size} estados y ${municipios.length} municipios`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

quickSeed();