import express from 'express';
import routes from './src/routes/index.js';
import userRoutes from './src/routes/userRoutes.js';
import {logger} from './src/middleware/logger.js';


const PORT=3000;
const app=express();



app.use(express.json());
app.use(taskRoutes);
app.use(userRoutes);
app.use(logger);

app.listen(PORT, ()=>{
    console.log(`Server is running on: http://localhost:${PORT}`); 
});


