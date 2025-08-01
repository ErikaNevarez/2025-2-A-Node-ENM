import { Municipio } from "../models/municipio.js";
import { Estado } from "../models/estado.js";

async function obtenerMunicipios(req, res) {
  try {
    const municipios = await Municipio.findAll({
      include: [{ model: Estado, attributes: ['id', 'nombre'] }],
      order: [['nombre', 'ASC']]
    });
    res.json(municipios);
  } catch (error) {
    res.status(500).json({ error: 'Error getting municipios' });
  }
}

async function obtenerMunicipio(req, res) {
  try {
    const municipio = await Municipio.findByPk(req.params.id, {
      include: [{ model: Estado, attributes: ['id', 'nombre'] }]
    });
    if (!municipio) {
      return res.status(404).json({ error: 'Municipio not found' });
    }
    res.json(municipio);
  } catch (error) {
    res.status(500).json({ error: 'Error getting municipio' });
  }
}

async function crearMunicipio(req, res) {
  try {
    const { nombre, estado_id } = req.body;
    if (!nombre || !estado_id) {
      return res.status(400).json({ error: 'nombre and estado_id are required' });
    }
    const municipio = await Municipio.create({ nombre, estado_id });
    res.status(201).json(municipio);
  } catch (error) {
    res.status(500).json({ error: 'Error creating municipio' });
  }
}

async function actualizarMunicipio(req, res) {
  try {
    const { nombre, estado_id } = req.body;
    const [updatedRowsCount] = await Municipio.update(
      { nombre, estado_id },
      { where: { id: req.params.id } }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Municipio not found' });
    }
    const updatedMunicipio = await Municipio.findByPk(req.params.id);
    res.json(updatedMunicipio);
  } catch (error) {
    res.status(500).json({ error: 'Error updating municipio' });
  }
}

async function eliminarMunicipio(req, res) {
  try {
    const deletedRowsCount = await Municipio.destroy({
      where: { id: req.params.id }
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: 'Municipio not found' });
    }
    res.json({ message: 'Municipio deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting municipio' });
  }
}

export {
  obtenerMunicipios,
  obtenerMunicipio,
  crearMunicipio,
  actualizarMunicipio,
  eliminarMunicipio
};