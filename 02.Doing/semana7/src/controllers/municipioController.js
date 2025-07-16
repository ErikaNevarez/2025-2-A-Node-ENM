const Municipio = require('../models/municipio');

async function obtenerMunicipios(req, res) {
  const municipios = await Municipio.find()
  .populate({path: 'estadoId' ,
              select: 'nombre'})
  .sort({ nombre: 1 });
  res.json(municipios);
}

async function obtenerMunicipio(req, res) {
  const municipio = await Municipio.findById(req.params.id)
    .populate({path: 'estadoId',
              select: 'nombre'}) 
  if (!municipio) {
    return res.status(400).json({ error: 'Municipio no encontrado' });
  }
  res.json(municipio);
}

async function obtenerMunicipiosEstado (req, res) {
    const estadoId=req.params.id;

    const municipios=await Municipio.find({estadoId})
    .populate({
        path:'estadoId',
        select:'nombre'
    })
    .sort ({nombre: 1 });
    const total =municipios.length;
    res.json({total, municipios});
}


async function crearMunicipio(req, res) {
  try {
    const { nombre, estadoId } = req.body;

    if (!nombre || !estadoId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newMunicipio = await Municipio.create({ nombre, estadoId });
    res.json(newMunicipio);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function actualizarMunicipio(req, res) {
  try {
    const { nombre, estadoId } = req.body;

    if (!nombre || !estadoId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const updatedMunicipio = await Municipio.findByIdAndUpdate(req.params.id, { nombre, estadoId });

    if (!updatedMunicipio) {
      return res.status(400).json({ error: 'Municipio no encontrado' });
    }
    res.json(updatedMunicipio);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function eliminarMunicipio(req, res) {
  try {
    const deletedMunicipio = await Municipio.findByIdAndDelete(req.params.id);

    if (deletedMunicipio) {
      return res.status(204);
    } else {
      return res.status(400).json({ error: 'Municipio no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  actualizarMunicipio,
  crearMunicipio,
  eliminarMunicipio,
  obtenerMunicipio,
  obtenerMunicipios, 
  obtenerMunicipiosEstado
}