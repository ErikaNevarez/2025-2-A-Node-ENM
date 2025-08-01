import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import { sequelize } from './src/config/database.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', routes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to database', error);
  });