const Task= require('../models/Task'); 

exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.status(200).json(tasks);
    }
    catch(err){
        console.log('Error', err); 
        res.status(400).json({error: err}); 
     }
}

exports.createTasks= async (req, res) => {
    try{ 
        const task=new Task ({description: req.body.description}); 
        await task.save(); 
        res.status(201). json(task); 
    }catch(err){
        console.log('Error: ', err); 
        res.status(400).json({error: err}); 
    }
}

exports.updateTask= async (req, res)=> {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!task){
            res.status(404).json({message: 'Task not found'}); 
        }
        res.status(200).json(task); 
    }catch (err){
        res.status(400).json({error: err}); 
    }
}

exports.deleteTask=async (req, res) => {
    try{ 
        const task= Task.findByIdAndDelete(req. params.id); 
        if(!task){
        res.status(404).json({message:'Task not found'}); 
        }
        res.status(204).send();
    }catch(err){
        res.status(400).json({error:err}); 
    }
     
}
