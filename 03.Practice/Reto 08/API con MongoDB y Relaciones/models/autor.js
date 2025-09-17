import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  imagesUrl: [{
    type: String,
    default: 'https://placehold.co/800x600.png',
    trim: true,
  }],
  
});

const Autor = mongoose.model('Autor', AutorSchema);

export default Autor;
