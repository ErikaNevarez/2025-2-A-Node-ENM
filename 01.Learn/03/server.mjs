/**
 * Aplicación interactiva en consola que solicita al usuario su nombre y color favorito,
 * genera un saludo personalizado y muestra el resultado coloreado usando chalk.
 *
 * - Utiliza inquirer para la entrada de datos por consola.
 * - Utiliza chalk para colorear la salida.
 * - Usa la función saludar para generar el mensaje de saludo.
 */

import saludar from './saludo.js'
import chalk from 'chalk';
import inquirer from 'inquirer';

// Solicita el nombre y color favorito al usuario.
inquirer.prompt([
  {
    type: 'input',
    name: 'nombre',
    message: '¿Cuál es tu nombre?'
  },
  {
    type: 'list',
    message: '¿Cuál es tu color favorito?',
    name: 'color',
    choices: ['Rojo', 'Azul', 'Amarillo', 'Verde']
  }
]).then(respuestas => {
  // Muestra el saludo personalizado en color rojo.
  console.log(chalk.red(saludar(respuestas.nombre)));
  // Muestra el color favorito seleccionado.
  console.log(`Tu color favorito es: ${respuestas.color}`);
});