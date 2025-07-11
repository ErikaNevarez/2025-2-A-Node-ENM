const express =require ('express');
const app = express(); 

app.get('/', (req, res)=>{
  res.send ('Bienvenido a Express! 🚀');
});

app.get('/memes', (req, res)=>{
    res.json(
        {
           imagen:'🚀', description:'Cuando tu código funciona a la primera'}
        ); 
})

app.get('/libros/:id', (req, res)=>{
    const libroId=req.params.id;
    res.send('Estás viendo el libro número: '+ libroId);
}); 

app.listen(3000, ()=>{
    console.log ('Server running on port: 3000');
}); 