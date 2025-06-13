import inquirer from 'inquirer';
import chalk from 'chalk';
import saludar from './saludo.js';
import figlet from 'figlet';

inquirer.prompt([
  {
    type: 'input',
    name: 'nombre',
    message: '¿Cuál es tu nombre?'
  },
  {
    type: 'input',
    name: 'edad',
    message: '¿Cuál es tu edad?'
  },
  {
    type: 'list',
    name: 'color',
    message: '¿Cuál es tu color favorito?',
    choices: ['red', 'blue', 'yellow', 'green', 'cyan']
  }
]).then(answers => {
  let msjToShow = saludar(answers.nombre, answers.edad);

  figlet(answers.nombre, function (err, data) {
    if (err) {
      console.log("Algo salió mal...");
      return;
    }
    console.log(chalk[answers.color](data));
  });

  console.log(chalk[answers.color](msjToShow));
});