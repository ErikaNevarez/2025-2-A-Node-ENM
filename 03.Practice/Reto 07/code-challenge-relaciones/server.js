import express from 'express';
import router from './src/routes/contarRoutes.js';


const PORT=3000;
const app=express();

app.use(express.json());


app.use("/",router); /// cambiar esto 


app.listen(PORT, ()=>{
    console.log(`Server is running on: http://localhost:${PORT}`); 
}
)


