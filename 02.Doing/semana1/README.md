# Ejercicios Semana 1 - NodeJS

En esta carpeta encontrarás los ejercicios prácticos correspondientes a la **Semana 1** del curso de NodeJS. El archivo principal es `server.js`, que implementa un servidor Express con diferentes endpoints para practicar conceptos básicos y utilidades en NodeJS.

## Funcionalidades implementadas

1. **Servidor Express básico**
   - Responde en `/` y `/home` con mensajes de saludo.
2. **Generación de contraseñas**
   - Endpoint `/password`: genera una contraseña aleatoria de 6 caracteres.
   - Endpoint `/generatePassword`: genera una contraseña aleatoria de longitud configurable usando la línea de comandos.
3. **Codificación de mensajes**
   - Endpoint `/enigma?mensaje=...`: invierte el mensaje, reemplaza vocales por números/símbolos y añade caracteres especiales al final.
4. **Configuración por entorno**
   - El puerto del servidor se define según el argumento de entorno (`--dev`, `--qa`, `--production`).

## ¿Cómo ejecutar el ejercicio?

1. Instala las dependencias necesarias:
   ```sh
   npm install
   ```
2. Ejecuta el servidor en el modo deseado:

   ```sh
   node server.js --dev
   ```

   Puedes usar también `--qa` o `--production`.
   Para generar una contraseña de longitud personalizada:

   ```sh
   node server.js --dev --generate-password 10
   ```

3. Accede a los endpoints desde tu navegador o usando herramientas como Postman o curl:
   - `GET /`
   - `GET /home`
   - `GET /password`
   - `GET /generatePassword`
   - `GET /enigma?mensaje=tu_mensaje`

## Recomendaciones

- Explora y modifica el código para entender cómo funcionan los endpoints y la generación de contraseñas.
- Consulta la documentación oficial de Node.js y Express si tienes dudas.
- Si necesitas ayuda, utiliza los canales de comunicación del curso.

---

¡Mucho éxito con los ejercicios de la semana 1!
