import mongoose from 'mongoose';

const resenaSchema = new mongoose.Schema({
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  reseña: {
    type: String,
    required: true,
    trim: true,
  },
  rankesena: [{
    type: Number, 
    min: 1, 
    max:5, 
    required: true,
  }],

});

const Resena = mongoose.model('Resena', resenaSchema);

export default Resena;
