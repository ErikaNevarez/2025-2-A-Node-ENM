import { Estado } from "../models/estado.js";

async function obtenerEstados(req, res) {
  try {
    const estados = await Estado.findAll({
      order: [['nombre', 'ASC']]
    });
    res.json(estados);
  } catch (error) {
    res.status(500).json({ error: 'Error getting states' });
  }
}

async function obtenerEstado(req, res) {
  try {
    const estado = await Estado.findByPk(req.params.id);
    if (!estado) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json(estado);
  } catch (error) {
    res.status(500).json({ error: 'Error getting state' });
  }
}

async function crearEstado(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: 'The nombre param is required' });
    }
    const newState = await Estado.create({ nombre });
    res.status(201).json(newState);
  } catch (error) {
    res.status(500).json({ error: 'Error creating state' });
  }
}

async function actualizarEstado(req, res) {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: 'The nombre param is required' });
    }
    const [updatedRowsCount] = await Estado.update(
      { nombre },
      {
        where: { id: req.params.id },
      }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'State not found' });
    }
    const updatedEstado = await Estado.findByPk(req.params.id);
    res.json(updatedEstado);
  } catch (error) {
    res.status(500).json({ error: 'Error updating state' });
  }
}

async function eliminarEstado(req, res) {
  try {
    const deletedRowsCount = await Estado.destroy({
      where: { id: req.params.id }
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting state' });
  }
}

export {
  obtenerEstados,
  obtenerEstado,
  crearEstado,
  actualizarEstado,
  eliminarEstado
};