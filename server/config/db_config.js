const { mongoose } = require("mongoose")

const connectdb = async()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connected')
        
    } catch (error) {
        console.log('DB not connected')
        
    }
}

module.exports = connectdb ;