export function esPrimo(n) {
  // TODO: funcionalidad para verificar si un número es primo


  function esPrimo(numero) {
  if (numero <= 1) return false; // 0 y 1 no son primos
  if (numero === 2) return true; // 2 es el único número primo par
  if (numero % 2 === 0) return false; // descarta pares

  // Solo revisa hasta la raíz cuadrada del número
  for (let i = 3; i <= Math.sqrt(numero); i += 2) {
    if (numero % i === 0) return false;
  }

  return true;
}


}