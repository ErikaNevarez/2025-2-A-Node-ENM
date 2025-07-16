import express from 'express';

const PORT=3000;
const app=express();

const { mayorRoute } = require('./routes');

app.use('/', mayorRoute);

app.use(express.json());

const server = http.createServer((req, res) => {
  manejarRutas(req, res);
});


app.listen(PORT, ()=>{
    console.log(`Server is running on: http://localhost:${PORT}`); 
});

