const Users=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports.adduser=(req,res,next)=>{
    const {Name,Email,Password}=req.body
    const saltrounds=10;
    bcrypt.hash(Password,saltrounds,async (err,hash)=>
    {
    try{
    const result=await Users.create({
        Name:Name,
        Email:Email,
        Password:hash
    })
    res.status(200).json("user created successfully")}
catch(err)
{
    res.status(400).send(err)
}
})
}
function generateaccesstoken(id,name)
{
    return jwt.sign({userId:id,name:name},'23467tyvvchgdhhafugfyfgaygayg344545654645324')
}
exports.authorizeuser=async (req,res,next)=>{
    try{
    const users=await Users.findAll()
        for(let i=0;i<users.length;i++)
        {
            if(users[i].Email===req.body.Email)
            {
                return bcrypt.compare(req.body.Password,users[i].Password,(err,result)=>{
                    if(err)
                    {
                        throw new Error("Something went wrong")
                    }
                    if(result===true)
                    {
                        res.status(200).json({success:true,message:"User logged in successfully",token:generateaccesstoken(users[i].id,users[i].Name)})
                    }
                    else
                    {
                        res.status(400).json({success:false,message:"Incorrect password"})
                    }

                })
                 
            }
            
        }
    
        return res.status(404).json({success:false,message:"User doesn't exist"})
    }
    catch(err)
    {
    res.status(500).json({message:err,success:false})
    }
}