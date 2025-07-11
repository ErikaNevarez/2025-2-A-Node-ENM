import express from 'express';
import { obtenerUsuarios, crearUsuario, obtenerUsuariosById, actualizarUsuario, deleteUsuario} from '../controllers/userController.js';



const router =express.Router();


//obtener todas los usuarios 
// http://localhost:3000/task?completada=true&titulo=nuevaTarea
router.get('/user', obtenerUsuarios);
router.get('/user', obtenerUsuariosById);
router.post('/user', crearUsuario);
router.put('/user/:id', actualizarUsuario); 
router.delete('/user/:id', deleteUsuario);

export default router; 



