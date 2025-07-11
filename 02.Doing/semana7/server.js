const express = require('express');
const mongoose = require('mongoose');

// Importar rutas principales
const apiRoutes = require('./src/routes/index');

const app = express();
const PORT = 3000;

// ===== MIDDLEWARE GLOBAL =====
// Parser de JSON
app.use(express.json());

// ===== CONEXIÓN A MONGODB =====

mongoose.connect('mongodb://localhost:27017/semana7_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// ===== RUTAS =====

// Ruta raíz de bienvenida
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de Gestión de Usuarios',
    version: '1.0.0',
    api: '/api',
  });
});

// Todas las rutas de la API bajo el prefijo /api
app.use('/api', apiRoutes);

// ===== INICIAR SERVIDOR =====

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
