import express from 'express';
const router = express.Router();
import encontrarMayor from './utils/encontrarMayor.js';

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

export default router;
