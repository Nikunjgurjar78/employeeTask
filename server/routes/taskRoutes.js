
const express = require("express");
const { createTask, getalltask, deletetask, updateTask } = require("../controller/taskController");
const adminProtect = require("../middleware.js/adminMiddleware");
const router = express.Router();

// post task
router.post("/" ,adminProtect , createTask)

// get all task
router.get('/', adminProtect ,getalltask)

// dlt task
router.delete("/:id" , adminProtect , deletetask)

// update task
router.put("/:id",adminProtect , updateTask)


module.exports = router
