const express = require('express');
const router = express.Router();
const encontrarMayor = require('./encontrarMayor');

router.get('/mayor', (req, res) => {
  const numerosParam = req.query.numeros;

  if (!numerosParam) {
    return res.status(400).json({ error: 'Falta el parámetro "numeros"' });
  }

  const numeros = numerosParam.split(',').map(Number);

  if (numeros.some(isNaN)) {
    return res.status(400).json({ error: 'El parámetro "numeros" debe contener solo números válidos separados por comas' });
  }

  const mayor = encontrarMayor(numeros);
  res.json({ mayor });
});

module.exports = router;
