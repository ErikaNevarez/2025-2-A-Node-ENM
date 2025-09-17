import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import dbConnection from './src/config/database.js';
import logger from './src/middlewares/logger.js';

dotenv.config();

const app = express();
dbConnection();
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('WELCOME!');
});

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});