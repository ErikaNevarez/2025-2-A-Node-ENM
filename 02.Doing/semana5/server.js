import express from 'express';
import { logger } from './src/middlewares/logger.js';
import { loadData } from './src/storage.js';
import usersRouter from './src/routers/usersRouters.js'; 

const PORT = 3000;
await loadData();

const app = express();

app.use(express.json());

app.get('/:name', logger, (req, res) => {
  //http://localhost:3000/Rodrigo?isAdmin=true
  if (req.query.isAdmin === 'true') {
    res.end(`Welcome Admin ${req.params.name} to your API`);
  }
  else {
    res.end(`Welcome ${req.params.name}`);
  }

});

app.use('/api', usersRouter);
// app.use('/api', productsRouter);

//ruta: http://localhost:3000/saludo/Rodrigo
app.get('/saludo/:name', logger, (req, res)=>{
    const {name}= req.params; 
    res.json({mensaje:`Hola ${name}` });    
}); 


//ruta: http://localhost:3000/api/edad?anioNacimiento=2000
app.get('/api/edad', logger, (req, res)=>{
    const anioNacimiento= parseInt(req.query.anioNacimiento);  //las llaves se ponen por el deconstructuring
    const actual=new Date().getFullYear();
        if (!anioNacimiento || anioNacimiento>= actual) {
            return res.status(400).json({mensaje:'Año inválido'}); 
        }
    const edad=actual-anioNacimiento;
    res.json({anioNacimiento, edad });    
}); 

//ruta: http://localhost:3000/suma/4/8
// GET /suma/5/3 ... resultado 8
app.get('/suma/:a/:b', logger, (req, res)=>{
    const {a,b}=req.params; 
    const suma =Number(a) + Number(b)
    if (isNaN(suma)){
        return res.status(400).json ({mensaje: 'Parámetros inválidos'});
    }
    res.json({suma});    
}); 

//ruta: http://localhost:3000/perfil/Rodrigo?lang=es
app.get('/perfil/:usuario', logger, (req, res)=>{
    const {usuario}=req.params; 
    const {lang}=req.query;
    let mensaje=`Welcome ${usuario}`;
    if (lang==='es'){
        mensaje=`Bienvenido ${usuario}`;
    }
    if (lang==='fr'){
        mensaje=`Bienvenue ${usuario}`;
    }       
    res.json({mensaje, language:lang || 'default'});  
});

//ruta: http://localhost:3000/api/buscar?producto=teclado&categoria=hardware
app.get('/api/buscar', logger, (req, res)=>{
    const {producto, categoria}=req.query; 
    if(!producto || !categoria){
        return res.status(400).json({mensaje:'Faltan parámetros en la ruta'});
    }
    res.json ({
        busqueda:producto, 
        categoria:categoria, 
        mensaje: `Buscando ${producto} en la categoría ${categoria}...`
    });
});   


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});