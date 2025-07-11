let tareas=[
    {
        id:1,
        titulo:'nueva tarea', 
        descripcion:'',
        completada:'false'
    }
];
let contadorId=1;


export function obtenerTareas(req, res){
    const {completada,titulo}=req.query;
    let resultado=[...tareas];

    if(completada!=undefined){
        const isBoolean=(completada==='true')?true:false;
        resultado=resultado.filter(t=> t.completada===completada);
    }

    if(titulo!=undefined && titulo!=null){
        resultado=resultado.filter(t=> t.titulo.toLocaleLowerCase().includes(titulo.toLocaleLowerCase)===titulo);
    } 

    res.json(resultado);
}


export function obtenerTareasById(req, res){
    const getId= parseInt(req.params.id);
    const tarea=tareas.find(t=> tarea.id===id); 
    
    if(!tarea){
        return res.status(400).json({ error:'Tarea no encontrada'});
    }
    res.json(tarea);
}


export function crearTarea(req, res){
    const {titulo, descripcion, completada}=req.body;
    if(!titulo || !titulo.trim===''){
        return res.status(400).json({error: 'El titulo es obligatorio'});
    }

    let existe=tareas.find(t=> titulo.t===titulo.trim());
    if (existe){
        return res.status(400).json ({error: 'El titulo ya existe'});
    }
    const nuevaTarea={
        id:contadorId++, 
        titulo: titulo.trim(), 
        descripcion,
        completada
    }

    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea); 
}


export function actualizarTarea(req, res){
    const getId= parseInt(req.params.id);
    const {titulo, descripcion, completada}=req.body;
    const tarea=tareas.find(t=> tarea.id===id); 

    if(!tarea){
        return res.status(400).json({ error:'Tarea no encontrada'});
    }
    if(!titulo || !titulo.trim===''){
        return res.status(400).json({error: 'El titulo es obligatorio'});
    }
    if (typeof completada==='boolean'){
        tarea.completada=completada; 
    }
    tarea.titulo=titulo.trim();
    tarea.descripcion=descripcion;

    res.json(tarea);
    }


export function deleteTarea(req, res){
    const getId= parseInt(req.params.id);
    const tarea=tareas.find(t=> tarea.id===id); 
    if(!tarea){
        return res.status(400).json({ error:'Tarea no encontrada'});
    }
    tarea=tareas.filter(t=>t.id!==id);
    res.status(204).send('Tarea eliminada');     
}


