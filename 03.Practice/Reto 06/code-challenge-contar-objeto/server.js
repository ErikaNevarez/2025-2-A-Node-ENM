import express from 'express';
import logger from './middleware/logger.js';
import router from './routes/contarRoutes.js';



const PORT=3000;
const app=express();

app.use(express.json());
app.use(logger);

app.use("/",router); 


app.listen(PORT, ()=>{
    console.log(`Server is running on: http://localhost:${PORT}`); 
}
)


