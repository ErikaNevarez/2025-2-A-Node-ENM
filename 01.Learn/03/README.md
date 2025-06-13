# Práctica 03: Interacción con el Usuario

## Objetivo

Aprender a crear una aplicación interactiva en la línea de comandos con Node.js, solicitando datos al usuario y mostrando resultados personalizados usando módulos externos.

## Instrucciones

1. Clona este repositorio en tu máquina local:

   ```sh
   git clone https://github.com/Inadaptados/2025-2-A-Node.git
   ```

2. Navega a la carpeta de la práctica:

   ```sh
   cd 01.Learn/03
   ```

3. Instala las dependencias necesarias:

   ```sh
   npm install
   ```

4. Ejecuta la aplicación:

   ```sh
   node server.mjs
   ```

5. Sigue las instrucciones en la terminal para ingresar tu nombre y seleccionar tu color favorito. El programa mostrará un saludo personalizado y el color elegido.

## Archivos principales

- **saludo.js**: Exporta una función que genera un saludo personalizado usando el nombre proporcionado.
- **server.mjs**: Lógica principal de la aplicación. Solicita datos al usuario con [inquirer](https://www.npmjs.com/package/inquirer), muestra el saludo usando [chalk](https://www.npmjs.com/package/chalk) y el color seleccionado.

## Dependencias

- [Chalk](https://www.npmjs.com/package/chalk): Para estilizar la salida en la consola.
- [Inquirer](https://www.npmjs.com/package/inquirer): Para crear preguntas interactivas en la terminal.

## Notas

- Asegúrate de tener Node.js y npm instalados en tu máquina.
- Si usas módulos ES (import/export), asegúrate de tener `"type": "module"` en tu `package.json`.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
