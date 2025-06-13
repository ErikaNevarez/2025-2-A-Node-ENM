/**
 * Servidor Express con configuración de entorno por línea de comandos.
 *
 * - http://localhost:{port}/        : Responde con un saludo general.
 * - http://localhost:{port}/admin   : Responde con un saludo para el administrador.
 *
 * El puerto se define según el argumento de entorno:
 *   --dev        : Puerto 3000 (desarrollo)
 *   --qa         : Puerto 3001 (QA)
 *   --production : Puerto 3002 (producción)
 * Si no se especifica argumento, usa el puerto 3000 por defecto.
 *
 * Para ejecutar el servidor:
 *   node server.js --dev
 *   node server.js --qa
 *   node server.js --production
 */

// Importa el módulo Express, un framework minimalista para aplicaciones web en Node.js.
const express = require('express');

// Variable para almacenar el puerto según el entorno.
let port = 0;

// Obtiene el argumento de entorno desde la línea de comandos.
const enviroment = process.argv[2];

// Asigna el puerto según el entorno especificado.
if (enviroment === '--dev') {
  port = 3000; // Modo desarrollo
}
else if (enviroment === '--qa') {
  port = 3001; // Modo QA
}
else if (enviroment === '--production') {
  port = 3002; // Modo producción
} else {
  port = 3000; // Valor por defecto
}

// Crea una instancia de la aplicación Express.
const app = express();

/**
 * Ruta principal.
 * Responde con un mensaje de saludo general.
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * Ruta /admin.
 * Responde con un mensaje de saludo para el administrador.
 */
app.get('/admin', (req, res) => {
  res.send('Hello Administrator!');
});

/**
 * Inicia el servidor en el puerto especificado.
 * Imprime en consola el puerto y los argumentos de línea de comandos.
 */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log('Argumentos de línea de comandos:', process.argv);
});