import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sinopsis: {
    type: String,
    required: true,
    trim: true,
  },
  imagesUrl: [{
    type: String,
    default: 'https://placehold.co/800x600.png',
    trim: true,
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const Libro = mongoose.model('Libro', libroSchema);

export default Libro;
