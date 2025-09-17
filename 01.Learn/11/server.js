const express =require ('express');
const jwt=require('jsonwebtoken'); 

const connectDB= require ('.src/config/database');
const tasksRoutes =require ('.src/routes/TaskRoutes'); 
const port =3000; 

//user data
const user={
    id:123, 
    name:'Ana', 
    role: 'admin'
}

//Generate token
const token=jwt.sign(usuario, 'clave_secreta', {expiresIn: '1h'});
console.log('Token jwt= ', token);

const validateToken=(()=>{
    try{
        const data =jwt.verify(token, 'clave_secreta'); 
        console.log('Token validate: ', data); 
    }catch(err){
        console.log('Invalid token', err); 
    }
}); 

const app=express(); 

connectDB(app); 

app.use (express.json()); 

app.get ('/', (req, res)=>{
    res.send ('Welcome to Tasks API'); 
}); 

app.use ('/api', tasksRoutes); 

app.listen(port, () =>{
    console.log ('Sever is running'); 
}); 