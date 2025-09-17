import express from 'express'; 
import dotenv from 'dotenv'; 

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json()); 
//app.use('/api'); 

app.get('/api', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`); 
}); 

