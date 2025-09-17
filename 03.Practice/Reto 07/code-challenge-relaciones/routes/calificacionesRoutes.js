const express = require('express');
const { obtenerCalificaciones, validarIntegridad } = require('../controllers/calificacionesController');

const router = express.Router();

// Ruta principal para obtener calificaciones
router.get('/', obtenerCalificaciones);

// Ruta bonus para validar integridad
router.get('/validar', validarIntegridad);

module.exports = router;