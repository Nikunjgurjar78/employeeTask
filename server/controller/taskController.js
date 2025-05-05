const Task = require("../model/taskModel");


// Asign Task
const createTask = async(req,res)=> {
    //  console.log(req.body)
 const { title, description, assigned , priority, deadline, status } = req.body;

 if( !title ||!description ||!assigned ||!priority ||!deadline ||!status ){
    res.status(400)
    throw new Error("Fill all details")
 };

 const task = await Task.create({title, description, assigned , priority, deadline, status});
 
 if(!task){
    res.status(400)
    throw new Error("task not created")
 };

 res.status(200).json(task);
};

// Get All Task's
const  getalltask  = async(req,res)=> {

    const tasks = await Task.find()
    if(!tasks){
        res.status(400)
        throw new Error("No task found")
    }
    res.status(200).json(tasks)
};


// Update Asign Task's
const updateTask = async(req,res)=> {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if(task){
        res.status(200).json(task)
    }else{
        res.status(400)
        throw new Error("not updated")
    }
};


// Delete Task's
const deletetask = async(req,res)=> {
    
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if(task){
    res.status(200).json({
        msg : "task dlt"
    })
    }else{
        res.status(400)
        throw new Error ('task not deleted')
    }
};



module.exports = {createTask ,getalltask ,deletetask , updateTask}