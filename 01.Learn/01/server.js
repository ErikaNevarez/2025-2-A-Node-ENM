/**
 * Servidor básico con Express para responder a rutas simples.
 *
 * - http://localhost:{port}/        : Responde con un saludo general.
 * - http://localhost:{port}/admin   : Responde con un saludo para el administrador.
 *
 * El servidor escucha en el puerto 3000.
 */

// Importa el módulo Express, un framework minimalista para aplicaciones web en Node.js.
const express = require('express');

// Crea una instancia de la aplicación Express.
const app = express();

// Define el puerto en el que el servidor escuchará las peticiones.
const port = 3000;

/**
 * Ruta principal.
 * Responde con un mensaje de saludo general.
 */
app.get('/', (req, res) => {
  res.send('¡Hola inadaptados!');
});

/**
 * Ruta /admin.
 * Responde con un mensaje de saludo para el administrador.
 */
app.get('/admin', (req, res) => {
  res.send('Hola, admin!');
});

/**
 * Inicia el servidor en el puerto especificado.
 * Cuando el servidor esté listo, se imprimirá un mensaje en la consola.
 * Puedes acceder al servidor en http://localhost:3000
 * Puedes cambiar el puerto modificando la variable `port`.
 * Si el puerto 3000 está ocupado, puedes cambiarlo a otro puerto, por ejemplo, 3001.
 * Asegúrate de que el puerto que elijas no esté siendo utilizado por otro servicio.
 * Para ejecutar el servidor, usa el comando `node server.js` en la terminal.
 * Puedes detener el servidor presionando `Ctrl + C` en la terminal.
 * Puedes probar las rutas accediendo a http://localhost:3000/ y http://localhost:3000/admin en tu navegador.
 */
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});