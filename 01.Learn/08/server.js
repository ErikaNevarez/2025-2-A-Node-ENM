const mongoose=require('mongoose');

const Usuario=require('./src/models/user.js');

mongoose.connect('mongodb://localhost:27017/usuarios', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then( () => {
    console.log('MongoDB is connected'); 
}).catch ((error)=> console.log (error)); 