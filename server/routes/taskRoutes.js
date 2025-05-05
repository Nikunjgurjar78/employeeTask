
const express = require("express");
const { createTask, getalltask, deletetask, updateTask } = require("../controller/taskController");
const adminProtect = require("../middleware.js/adminMiddleware");
const router = express.Router();

// Method = POST
// For = Asign Taks 
router.post("/" ,adminProtect , createTask);

// Method = GET
// For = Get all task's
router.get('/', adminProtect ,getalltask);

// Method = PUT
// For = Update Task Data
router.put("/:id",adminProtect , updateTask);

// Method = Delete
// For = Delete Task
router.delete("/:id" , adminProtect , deletetask);



module.exports = router ;
