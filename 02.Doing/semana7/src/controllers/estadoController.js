const Estado = require('../models/estado');

async function obtenerEstados(req, res) {
  const estados = await Estado.find().sort({ nombre: 1 });
  res.json(estados);
}

async function obtenerEstado(req, res) {
  const estado = await Estado.findById(req.params.id);
  if (!estado) {
    return res.status(400).json({ error: 'Estado no encontrado' });
  }
  res.json(estado);
}

async function crearEstado(req, res) {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newEstado = await Estado.create(req.body);
    res.json(newEstado);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function actualizarEstado(req, res) {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const updatedEstado = await Estado.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedEstado) {
      return res.status(400).json({ error: 'Estado no encontrado' });
    }
    res.json(updatedEstado);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function eliminarEstado(req, res) {
  try {
    const deletedEstado = await Estado.findByIdAndDelete(req.params.id);

    if (deletedEstado) {
      return res.status(204);
    } else {
      return res.status(400).json({ error: 'Estado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  actualizarEstado,
  crearEstado,
  eliminarEstado,
  obtenerEstado,
  obtenerEstados
}