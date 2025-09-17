import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import dbConnection from './src/config/database.js';
import logger from './src/middlewares/logger.js';
import setupGlobalErrorHandlers from './src/middlewares/globalErrorHandler.js';
import errorHandler from './src/middlewares/errorHandler.js'; // Importar errorHandler

dotenv.config();

// Configurar manejadores globales ANTES de crear la app
setupGlobalErrorHandlers();

const app = express();
dbConnection();

// Middlewares en el orden correcto
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('WELCOME!');
});

app.use('/api', routes);

// El errorHandler debe ir AL FINAL, después de todas las rutas
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});