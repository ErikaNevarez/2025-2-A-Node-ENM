const express = require('express');
const router = express.Router();

// Importar controladores
const {
  obtenerEstados,
  obtenerEstado,
  crearEstado,
  actualizarEstado,
  eliminarEstado
} = require('../controllers/estadoController.js');

// ===== RUTAS DE ESTADOS =====

router.get('/', obtenerEstados);
router.get('/:id', obtenerEstado);
router.post('/', crearEstado);
router.put('/:id', actualizarEstado);
router.delete('/:id', eliminarEstado);

module.exports = router;