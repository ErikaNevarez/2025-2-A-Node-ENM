const express=require('express');
const app=express(); 
const port=3000; 

app.use(express.json());

let tareas = [
    {id:1, texto:"Aprender Node.js", completada:"false"}
];

app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.post("/tareas", (req, res) => {
    const nuevaTarea={
    id:tareas.length+1, 
    texto: req.body.texto, 
    completada: false
    }

    tareas.push(nuevaTarea)
    res.status(201).json(nuevaTarea); 
}); 

app.put('/tareas/:id', (req, res)=>{
    const id=parseInt(req.params.id);
    const tarea=tareas.find(t => t.id===id);
    if(!tarea){
        return res.status(404).json({error:"Tarea no encontrada"});
}

tarea.texto=req.body.texto;
tarea.completada=req.body.completada; 

res.json(tarea);
}); 

app.delete('/tareas/:id', (req, res)=>{
    const id=parseInt(req.params.id);
    const tarea=tareas.find(t => t.id===id);
    if(!tarea){
        return res.status(404).json({error:"Tarea no encontrada"});
}

tareas=tareas.filter(t=> t.id!==id);
res.status(204).send();
});


app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});
