const { mongoose } = require("mongoose");

const authSchema = new mongoose.Schema({


    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    
 
},{
    timestamps : true 
})

module.exports = mongoose.model("Auth" , authSchema)