const jwt = require("jsonwebtoken");
const Auth = require("../model/authModel");






const loginuser = async(req,res)=> {

    // res.send(req.body)
    
    const{email , password} = req.body ;

    if(!email ||!password){
        res.status(400)
        throw new Error("fill all details")
    }

    const user = await Auth.findOne({email})
    if(user){
        res.status(200).json({
            id : user._id,
            email : user.email,
            token : ganerateToken(user._id),
            isAdmin: user.isAdmin
        })
    }
}


module.exports = {loginuser}

const ganerateToken = (id) => {
    return jwt.sign({id} , process.env.SECRET , {expiresIn :"30d"})
};
