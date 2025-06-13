// 🧠 Ejercicio 1: Suma de Dos Números

const { ask } = require('../helpers/input');

async function main() {
  const a = Number(await ask('Ingresa el primer número: '));
  const b = Number(await ask('Ingresa el segundo número: '));

  const suma = (a+b); 


  console.log('Suma:', suma);

  console.log(`La suma de ${a} + ${b} es :`, suma);


  const numCambia = Number(await ask('Ingresa un número a convertir a texto: '));

  
function numberToString () {
  return numCambia.numberToString();
}

let resultado = numberToString();
console.log(resultado); 

}

main();