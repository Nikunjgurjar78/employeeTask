
const express = require("express");
const connectdb = require("./config/db_config");
const dotenv = require("dotenv").config();

const app = express()

const PORT = process.env.PORT || 2030;


connectdb();

app.get("/", (req,res)=> {
    res.send("server run")
})

app.use(express.json())
app.use(express.urlencoded())

// routes
app.use("/api" , require("./routes/authRoutes"));

app.use('/api/user' , require('./routes/userRoutes'))

app.use("/api/user/taskasign" , require("./routes/taskRoutes"))

app.use('/api/dashboard' , require('./routes/dashboardRoutes'))


app.listen(PORT , ()=> {
    console.log(`server run port no ${PORT}`)
})