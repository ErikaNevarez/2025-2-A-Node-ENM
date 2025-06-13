/**
 * Servidor Express con generación de contraseñas, codificación de mensajes y configuración por entorno.
 *
 * Funcionalidades:
 * - http://localhost:{port}/                : Responde con un saludo.
 * - http://localhost:{port}/home            : Responde con un saludo desde home.
 * - http://localhost:{port}/password        : Genera una contraseña aleatoria de 6 caracteres.
 * - http://localhost:{port}/generatePassword: Genera una contraseña aleatoria de longitud configurable (por línea de comandos).
 * - http://localhost:{port}/enigma?mensaje= : Codifica el mensaje recibido (invierte, reemplaza vocales y añade caracteres especiales).
 *
 * El puerto se define según el argumento de entorno:
 *   --dev        : Puerto 3000 (desarrollo)
 *   --qa         : Puerto 3001 (QA)
 *   --production : Puerto 3002 (producción)
 *
 * Para ejecutar el servidor:
 *   node server.js --dev
 *   node server.js --qa
 *   node server.js --production
 *   node server.js --dev --generate-password 10
 */

// Importa el módulo Express para crear el servidor web.
const express = require('express');

// Importa el módulo commander para gestionar argumentos de línea de comandos.
const { program } = require("commander");

// Importa el módulo crypto para generación segura de contraseñas aleatorias.
const crypto = require("crypto");

// Crea una instancia de la aplicación Express.
const app = express();

// Definición de puertos para cada entorno.
let port = 0;
const portDev = 3000;
const portQA = 3001;
const portProd = 3002;
const args = process.argv;

// Configuración de opciones de línea de comandos usando commander.
program.option("--dev", "Modo desarrollo");
program.option("--qa", "Modo QA");
program.option("--production", "Modo producción");
program.option("--generate-password <length>", "Genera una contraseña", parseInt);

// Selección del puerto según el entorno especificado.
program.parse(process.argv);
const options = program.opts();

if (options.dev) { port = portDev; }
else if (options.qa) { port = portQA; }
else if (options.production) { port = portProd; }

/// Función para codificar un mensaje: invierte, reemplaza vocales y añade caracteres especiales.
function codificar(mensaje) {
  const reemplazos = {
    "a": "4",
    "e": "3",
    "i": "1",
    "o": "0",
    "u": "_",
  }

  const invertido = mensaje.split("").reverse().join("");
  const convertido = invertido
    .replace(/[aeiou]/gi, letra => reemplazos[letra.toLowerCase()] || letra);
  const caracteresExtra = "!@#$%^&*";
  const extra1 = caracteresExtra[Math.floor(Math.random() * caracteresExtra.length)];
  const extra2 = caracteresExtra[Math.floor(Math.random() * caracteresExtra.length)];

  return convertido + extra1 + extra2;
}

// Función para generar una contraseña aleatoria de 6 caracteres.
function generatePassword() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const limiteCarecteres = 6;

  let password = "";
  for (let i = 0; i < limiteCarecteres; i++) {
    let random = Math.floor(Math.random() * caracteres.length);
    password = password + caracteres[random];
  }
  return password;
}

// Endpoint principal: responde con un saludo.
app.get("/", (req, res) => {
  res.send("HOLA!");
});

// Endpoint /home: responde con un saludo desde home.
app.get("/home", (req, res) => {
  res.send("HOLA desde el home!");
});

// Endpoint /password: genera una contraseña aleatoria de 6 caracteres.
app.get("/password", (req, res) => {
  res.send(generatePassword());
});

// Endpoint /generatePassword: genera una contraseña aleatoria de longitud configurable.
// Utiliza el valor proporcionado por la opción --generate-password en la CLI.
app.get("/generatePassword", (req, res) => {
  const length = options.generatePassword;
  const password = crypto.randomBytes(length).toString('hex').slice(0, length);
  console.log("Generate password", password);

  res.send(password);
});

// Endpoint /enigma: codifica el mensaje recibido por query string (?mensaje=).
// Aplica inversión, reemplazo de vocales y añade caracteres especiales al final.
app.get("/enigma", (req, res) => {
  console.log(req.query);
  res.send(codificar(req.query.mensaje));
});

// Endpoint /par-impar/:numero: indica si el número es par o impar.
// Si se pasa el query ?double=true, también muestra el doble del número.
app.get("/par-impar/:numero", (req, res) => {
  const numero = parseInt(req.params.numero);
  const double = req.query.double;

  if (isNaN(numero)) {
    res.send("El parámetro no es un número");
  }
  const resultado = numero % 2 === 0 ? "Par" : "Impar";
  const incluirDouble = double === 'true' ? true : false;

  if (incluirDouble) { res.send(`El ${numero} es ${resultado} el doble es: ${numero * 2}`); }
  else { res.send(`El ${numero} es ${resultado}`); }

});

// Inicia el servidor en el puerto seleccionado e imprime los argumentos de línea de comandos.
app.listen(port, () => {
  console.log("Servidor iniciado");
});