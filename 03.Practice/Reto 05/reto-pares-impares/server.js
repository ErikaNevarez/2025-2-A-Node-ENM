import express from "express";
import separarParesImpares from './utils/separarParesImpares.js';

const app = express();
app.use (express.json()); 
const PORT = 3000;

app.get("/filtrar", (req, res) => {
  let numeros=req.query.numeros; 
  if(!numeros){
    res.status(400).json({error: 'No se encontraron números o parámetros válidos en la URL'}); 
  }else{
        
    const num = numeros.slice(1).split(',');

    const numero = num
        .map(num => Number(num))
        .filter(num => !isNaN(num));
             
    const separar=separarParesImpares(numero); 
res.status(200).json({separar}); 
  }
  
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});