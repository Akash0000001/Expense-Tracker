const Users=require("../models/user")
const bcrypt=require("bcrypt")
exports.adduser=(req,res,next)=>{
    const {Name,Email,Password}=req.body
    console.log(Password)
    const saltrounds=10;
    bcrypt.hash(Password,saltrounds,async(err,hash)=>
    {
    try{
    const result=await Users.create({
        Name:Name,
        Email:Email,
        Password:hash
    })
    res.status(200).json(result.dataValues)
}
catch(err)
{
    res.status(400).send(err)
}
})
}
exports.authorizeuser=(req,res,next)=>{
    Users.findAll()
    .then(users=>{
        for(let i=0;i<users.length;i++)
        {
            if(users[i].Email===req.body.Email)
            {
                return bcrypt.compare(req.body.Password,users[i].Password,(err,re)=>{
                    if(err)
                    {
                        throw new Error("Something went wrong")
                    }
                    if(re===true)
                    {
                        res.status(200).json({success:true,message:"User logged in successfully"})
                    }
                    else
                    {
                        res.status(400).json({success:false,message:"user not authorized"})
                    }

                })
                 
            }
            
        }
    
        return res.status(404).json({success:false,message:"user not found"})
    })
    .catch(err=>res.status(500).json({message:err,success:false}))
}