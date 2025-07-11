const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true,
    maxLength: 140,
    minLength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Por favor ingresa un email válido'
    ]
  },
  municipioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Municipio',
    required: true
  }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;