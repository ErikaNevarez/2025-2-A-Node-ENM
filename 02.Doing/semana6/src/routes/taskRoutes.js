import express from 'express';
import { obtenerTareas, crearTarea, obtenerTareasById, actualizarTarea, deleteTarea} from '../controllers/taskController.js';



const router =express.Router();


//obtener todas las taereas 
// http://localhost:3000/task?completada=true&titulo=nuevaTarea
router.get('/task', obtenerTareas);
router.get('/task', obtenerTareasById);
router.post('/task', crearTarea);
router.put('/task/:id', actualizarTarea)
router.delete('/task/:id', deleteTarea);

export default router; 



