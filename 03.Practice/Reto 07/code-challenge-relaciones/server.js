const express = require ('express');
const routes = require ('./routes/index');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Usar las rutas principales
app.use('/', routes);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    rutas_disponibles: [
      "GET /",
      "GET /calificaciones",
      "GET /calificaciones/validar"
    ]
  });
});

// Manejo de errores globales
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    error: "Error interno del servidor",
    mensaje: error.message
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📋 Información del API: http://localhost:${PORT}`);
  console.log(`📋 Calificaciones: http://localhost:${PORT}/calificaciones`);
  console.log('\n🔗 Ejemplos de filtros:');
  console.log(`   - Por curso: http://localhost:${PORT}/calificaciones?curso=Matemáticas`);
  console.log(`   - Por estudiante: http://localhost:${PORT}/calificaciones?estudiante=Ana`);
  console.log(`   - Calificación mínima: http://localhost:${PORT}/calificaciones?minima=90`);
});