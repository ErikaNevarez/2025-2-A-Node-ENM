# Práctica 02: Servidor Express con CLI

## Objetivo

Aprender a utilizar Node.js como una interfaz de línea de comandos (CLI) y a configurar un servidor Express según los parámetros proporcionados.

## Instrucciones

1. Clona este repositorio en tu máquina local:

   ```sh
   git clone https://github.com/Inadaptados/2025-2-A-Node.git
   ```

2. Navega a la carpeta de la práctica:

   ```sh
   cd 01.Learn/02
   ```

3. Instala las dependencias necesarias:

   ```sh
   npm install
   ```

4. Inicia el servidor con el modo deseado y la longitud de la contraseña (opcional):

   ```sh
   node server.js --dev --generate-password 10
   ```

   Los modos disponibles son:

   - `--dev`: Modo desarrollo (puerto 3000)
   - `--qa`: Modo QA (puerto 3001)
   - `--production`: Modo producción (puerto 3002)

   El parámetro `--generate-password <length>` es opcional y se utiliza para generar una contraseña de la longitud especificada.

5. Abre tu navegador y navega a `http://localhost:<puerto>` para ver el mensaje de bienvenida.

## Endpoints

- `GET /`: Muestra el mensaje "¡Hola estudiantes de ISC07!".
- `GET /admin`: Muestra el mensaje "Hola, admin!".
- `GET /generatePassword`: Genera y muestra una contraseña si se proporciona el parámetro `--generate-password`.

## Dependencias

- [Express](https://expressjs.com/): Framework web para Node.js.
- [Commander](https://github.com/tj/commander.js/): Librería para crear interfaces de línea de comandos.

## Notas

- Asegúrate de tener Node.js y npm instalados en tu máquina.
- Puedes cambiar el puerto del servidor modificando los valores de las variables `portDev`, `portQA` y `portProduction` en el archivo `server.js`.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](../../LICENSE) para más detalles.
