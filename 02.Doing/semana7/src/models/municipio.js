const mongoose = require('mongoose');

const MunicipioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    maxLength: 250,
    required: true
  },
  estadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estado',
    required: true
  }
});

const Municipio = mongoose.model('Municipio', MunicipioSchema);

module.exports = Municipio;