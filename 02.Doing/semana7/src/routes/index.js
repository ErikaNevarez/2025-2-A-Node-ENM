const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuariosRoutes');
const estadoRoutes = require('./estadoRoutes');
const municipioRoutes = require('./municipioRoutes');

router.use('/estados', estadoRoutes);
router.use('/municipios', municipioRoutes);
router.use('/usuarios', usuariosRoutes);

module.exports = router;