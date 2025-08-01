import { Usuario } from "../models/usuario.js";
import { Municipio } from "../models/municipio.js";
import { Estado } from "../models/estado.js";

async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      include: [{
        model: Municipio,
        attributes: ['id', 'nombre'],
        include: [{
          model: Estado,
          attributes: ['id', 'nombre']
        }]
      }],
      order: [['nombre', 'ASC']]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error getting usuarios' });
  }
}

async function obtenerUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [{
        model: Municipio,
        attributes: ['id', 'nombre'],
        include: [{
          model: Estado,
          attributes: ['id', 'nombre']
        }]
      }]
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario not found' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error getting usuario' });
  }
}

async function crearUsuario(req, res) {
  try {
    const { nombre, municipio_id } = req.body;
    if (!nombre || !municipio_id) {
      return res.status(400).json({ error: 'nombre and municipio_id are required' });
    }
    const usuario = await Usuario.create({ nombre, municipio_id });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error creating usuario' });
  }
}

async function actualizarUsuario(req, res) {
  try {
    const { nombre, municipio_id } = req.body;
    const [updatedRowsCount] = await Usuario.update(
      { nombre, municipio_id },
      { where: { id: req.params.id } }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Usuario not found' });
    }
    const updatedUsuario = await Usuario.findByPk(req.params.id);
    res.json(updatedUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error updating usuario' });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const deletedRowsCount = await Usuario.destroy({
      where: { id: req.params.id }
    });
    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: 'Usuario not found' });
    }
    res.json({ message: 'Usuario deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting usuario' });
  }
}

export {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};