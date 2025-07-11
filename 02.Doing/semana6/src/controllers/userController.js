let usuarios=[
    {
        id:1,
        nombre:'Jorge Castañeda', 
        correo:'j.castaneda@gmail.com',
    }
];
let contadorId=1;


export function obtenerUsuarios(req, res){
    const {nombre}=req.query;
    let resultado=[...usuarios];

    if(nombre!=undefined && nombre!=null){
        resultado=resultado.filter(t=> t.nombre.toLocaleLowerCase().includes(nombre.toLocaleLowerCase)===nombre);
    } 

    res.json(resultado);
}


export function obtenerUsuariosById(req, res){
    const getId= parseInt(req.params.id);
    const usuario=usuarios.find(t=> usuario.id===id);  
    
    if(!usuario){
        return res.status(400).json({ error:'Usuario no encontrado'});
    }
    res.json(usuario);
}


export function crearUsuario(req, res){
    const {id, nombre, correo}=req.body;
    if(!nombre || !nombre.trim===''){
        return res.status(400).json({error: 'El nombre es obligatorio'});
    }

    let existe=usuarios.find(t=> titulo.t===titulo.trim());
    if (existe){
        return res.status(400).json ({error: 'El usuario ya existe'});
    }
    const nuevoUsuario={
        id:contadorId++, 
        nombre: nombre.trim(), 
        correo: correo.trim()
    }

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario); 
}


export function actualizarUsuario(req, res){
    const getId= parseInt(req.params.id);
    const {id, nombre, correo}=req.body;
    const usuario=usuarios.find(t=> usuario.id===id); 

    if(!usuario){
        return res.status(400).json({ error:'Usuario no encontrado'});
    }
    if(!nombre || !nombre.trim===''){
        return res.status(401).json({error: 'El nombre es obligatorio'});
    }

    usuario.nombre=nombre.trim();
    usuario.correo=correo;

    res.json(usuario);
    }


export function deleteUsuario(req, res){
    const getId= parseInt(req.params.id);
    const usuario=usuarios.find(t=> usuario.id===id); 
    if(!usuario){
        return res.status(400).json({ error:'Usuario no encontrado'});
    }
    usuario=usuarios.filter(t=>t.id!==id);
    res.status(204).send('Usuario eliminado');     
}


