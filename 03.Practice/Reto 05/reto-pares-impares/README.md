📖 Descripción del Reto
En este reto, vamos a crear un servidor Express que recibe una lista de números a través de un query parameter y devuelve dos arrays: uno con los números pares y otro con los impares.

🎯 Objetivo
Crear un servidor Express que reciba una lista de números por query parameter y devuelva dos arrays separados: uno con los números pares y otro con los impares.

📋 Requisitos Técnicos
Framework: Express.js
Método HTTP: GET
Input: Query parameter numeros con valores separados por comas
Output: JSON con arrays original, pares e impares
🧪 Ejemplos de Uso
✅ Caso Básico
Request:

GET http://localhost:3000/filtrar?numeros=1,2,3,4,5,6
Response:

{
  "original": [1, 2, 3, 4, 5, 6],
  "pares": [2, 4, 6],
  "impares": [1, 3, 5]
}
✅ Con Números Negativos
Request:

GET http://localhost:3000/filtrar?numeros=-3,-2,-1,0,1,2,3
Response:

{
  "original": [-3, -2, -1, 0, 1, 2, 3],
  "pares": [-2, 0, 2],
  "impares": [-3, -1, 1, 3]
}
✅ Casos de Error
Request sin parámetros:

GET http://localhost:3000/filtrar
Response (400 Bad Request):

{
  "error": "El parámetro 'numeros' es requerido",
  "ejemplo": "?numeros=1,2,3,4,5"
}
📦 Estructura del Proyecto
reto-pares-impares/
├── server.js                    # Servidor Express principal
├── utils/
│   └── separarParesImpares.js  # Lógica de filtrado
├── package.json                # Dependencias del proyecto
└── README.md                   # Este archivo
🛠️ Implementación
utils/separarParesImpares.js
/**
 * Separa un array de números en pares e impares
 * @param {number[]} numeros - Array de números a separar
 * @returns {Object} Objeto con arrays pares e impares
 */
export function separarParesImpares(numeros) {
  // Filtra números pares (resto de división por 2 es 0)
  // Filtra números impares (resto de división por 2 no es 0)
}
server.js
import express from "express";
import {
  separarParesImpares,
  validarNumeros,
} from "./utils/separarParesImpares.js";

const app = express();
const PORT = 3000;

app.get("/filtrar", (req, res) => {
  // Validar que el parámetro existe
  // Convertir string a array
  // Validar que todos sean números
  // Convertir a números
  // Separar pares e impares
  // Respuesta exitosa
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
Pasos
Clonar o crear el proyecto:
mkdir reto-pares-impares
cd reto-pares-impares
Inicializar package.json:
npm init -y
Instalar dependencias:
npm install express
npm install nodemon
Ejecutar el servidor:
npm start
🌟 Extras Opcionales
1. Filtro Específico (only)
Request:

GET http://localhost:3000/filtrar?numeros=1,2,3,4,5,6&only=pares
Response:

{
  "original": [1, 2, 3, 4, 5, 6],
  "pares": [2, 4, 6]
}
2. Eliminar Duplicados (unique=true)
Request:

GET http://localhost:3000/filtrar?numeros=1,2,2,3,3,4&unique=true
Response:

{
  "original": [1, 2, 3, 4],
  "pares": [2, 4],
  "impares": [1, 3]
}
🌍 Retos Similares
Plataforma	Nombre del Reto	Dificultad
Codewars	Even or Odd	8 kyu
LeetCode	Find All Even Numbers	Easy
HackerRank	Odd Numbers	Easy
🔍 Conceptos Aprendidos
✅ Query Parameters en Express
✅ Array.filter() para filtrado de datos
✅ Operador módulo (%) para determinar paridad
✅ Validación de entrada de datos
✅ Manejo de errores HTTP
✅ Modularización de código
📝 Notas Técnicas
Determinación de Paridad
// Un número es par si el resto de dividirlo entre 2 es 0
n % 2 === 0; // Par
n % 2 !== 0; // Impar
Manejo de Números Negativos
Los números negativos siguen las mismas reglas:

-4 % 2 === 0 → Par
-3 % 2 !== 0 → Impar
