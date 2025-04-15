const Task = require("../model/taskModel")



const createTask = async(req,res)=> {
 const { title, description, assigned , priority, deadline, status } = req.body;
//  console.log(req.body)

 if( !title ||!description ||!assigned ||!priority ||!deadline ||!status ){
    res.status(400)
    throw new Error("fill all details")
 }

 const task = await Task.create({title, description, assigned , priority, deadline, status});
 
 if(!task){
    res.status(400)
    throw new Error("task not created")
 }

 res.status(200).json(task)
}


const  getalltask  = async(req,res)=> {

    const tasks = await Task.find()
    if(!tasks){
        res.status(400)
        throw new Error("No task Found")
    }
    res.status(200).json(tasks)
}


const deletetask = async(req,res)=> {
    
    const task = await Task.findByIdAndDelete(req.params.id)
    
    if(task){

    res.status(200).json({
        msg : "task dlt"
    })
    }else{
        res.status(400)
        throw new Error ('task not deleted')
    }
}

const updateTask = async(req,res)=> {

    const task = await Task.findByIdAndUpdate(req.params.id ,req.body)

    if(task){
        res.status(200).json(task)
    }else{
        res.status(400)
        throw new Error("not updated")
    }
}



module.exports = {createTask ,getalltask ,deletetask , updateTask}