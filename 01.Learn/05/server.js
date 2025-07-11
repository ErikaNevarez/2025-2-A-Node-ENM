const http = require('http');

function logEvents (req, res, next){
    const hora = new Date().toLocaleTimeString();
    console.log(`${hora} Alguien vino a ${req.url}`); 
    next(); 
}

const server = http.createServer((req, res) => {
   logEvents(req,res,()=> {
    if (req.url==='/biblioteca'){
        res.end('¡Bienvenido a la biblioteca!');
   }else{
    res.end('¡Ups! Lo siento no conozco esa ruta');
   }
  }); 
}); 

server.listen(3000, ()=> {
console.log('Servidor escuchando en el puerto 3000'); 

}); 






