import express from 'express';
import contarObjetos from '../controllers/contarController.js'; 

const router =express.Router();

router.post('/contar', contarObjetos);


export default router; 



