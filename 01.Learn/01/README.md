# Práctica 01: Servidor Básico con Express

## Objetivo

Aprender a crear un servidor básico utilizando el framework Express en Node.js.

## Instrucciones

1. Clona este repositorio en tu máquina local:

   ```sh
   git clone https://github.com/Inadaptados/2025-2-A-Node.git
   ```

2. Navega a la carpeta de la práctica:

   ```sh
   cd 01.Learn/01
   ```

3. Instala las dependencias necesarias:

   ```sh
   npm install
   ```

4. Inicia el servidor:

   ```sh
   node server.js
   ```

5. Abre tu navegador y navega a [http://localhost:3000](http://localhost:3000) para ver el mensaje de bienvenida.

## Endpoints

- `GET /`: Muestra el mensaje "¡Hola inadaptados!".
- `GET /admin`: Muestra el mensaje "Hola, admin!".

## Dependencias

- [Express](https://expressjs.com/): Framework web para Node.js.

## Notas

- Asegúrate de tener Node.js y npm instalados en tu máquina.
- El servidor utiliza el puerto `3000` por defecto. Puedes cambiarlo modificando la variable `port` en el archivo `server.js`.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](../../LICENSE) para más detalles.
