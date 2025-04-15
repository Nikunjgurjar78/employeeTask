
const User = require('../model/userModel')
const Task = require('../model/taskModel')


const dashboardinfomation = async(req,res)=> {

    // res.send("dashboard")
    try {
        const totalEmployees = await User.countDocuments();
        const totalTasks = await Task.countDocuments()
        const pendingTasks = await Task.countDocuments({ status: 'pending' })
        const completedTasks = await Task.countDocuments({ status: 'completed' })
    
        res.json({ totalEmployees, totalTasks, pendingTasks, completedTasks });
      } catch (error) {
        res.status(500).json({ message: 'Server Error', error })
      }
}


module.exports = {dashboardinfomation}