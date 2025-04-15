
const express = require("express")
const { createUser, updateDetails, getAlldata, deleteUser } = require("../controller/userController")
const adminProtect = require("../middleware.js/adminMiddleware")

const router = express.Router()

// All Employee
router.get("/allemployeedata" , adminProtect , getAlldata)

// Create Employee
router.post("/saveemployee" , adminProtect , createUser )

//update route
router.put("/:id" ,adminProtect , updateDetails)

// delete Employee
router.delete("/:id" ,adminProtect , deleteUser)



module.exports = router;