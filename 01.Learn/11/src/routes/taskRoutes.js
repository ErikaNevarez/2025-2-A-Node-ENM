const express=require('express'); 
const taskController =require('../controllers/TaskController'); 

const  router=express.Router(); 

router.get('tasks', taskController.getTask); 
router.post('tasks', taskController.createTasks); 
router.put('tasks/:id', taskController.updateTask); 
router.delete('tasks/:id', taskController.deleteTask); 

module.exports=router; 





