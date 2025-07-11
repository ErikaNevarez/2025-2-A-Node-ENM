// 🧠 Ejercicio 1: Suma de Dos Números y Ejercicio 2: Convertir un Número a Texto

const { ask } = require('../helpers/input');

async function main() {
  const a = Number(await ask('Ingresa el primer número: '));
  const b = Number(await ask('Ingresa el segundo número: '));

  const suma = (a + b);


  console.log('Suma:', suma);

  console.log(`La suma de ${a} + ${b} es :`, suma);


  const numCambia = Number(await ask('Ingresa un número a convertir a texto: '));
  const resultado = numberToString(numCambia);
  
  console.log(resultado);
}

function numberToString(a) {
  return a.toString();
}

main();