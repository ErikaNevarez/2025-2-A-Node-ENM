export default function contarObjetos(req, res){

let objetos=req.body; 

if (!objetos || typeof objetos !== "object" || Array.isArray(objetos)){
   return res.status(400).json({error:'No existen parámetros a contar'}); 
}



const cantidad = Object.keys(objetos).length;

return res.status(200).json({cantidad}); 

}; 
