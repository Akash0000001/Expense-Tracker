const jwt=require("jsonwebtoken")
const User=require("../models/user")

const authenticate =async (req,res,next)=>{
    try{
        const token=req.header("Authorization")
        const user=jwt.verify(token,'23467tyvvchgdhhafugfyfgaygayg344545654645324')
        User.findByPk(user.userId)
        .then(user=>{
            req.user=user
            next()
        })
    }
        catch(err){
            res.status(401).json({success:false})
            console.log(err)
        }
    
}

module.exports=authenticate;