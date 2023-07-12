const Users=require("../models/user")

exports.adduser=(req,res,next)=>{
    Users.create({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password
    })
    .then(result=>res.json(result.dataValues))
    .catch(err=>res.status(400).send(err))
}
exports.authorizeuser=(req,res,next)=>{
    Users.findAll()
    .then(users=>{
        for(let i=0;i<users.length;i++)
        {
            if(users[i].Email===req.body.Email)
            {
                if(users[i].Password===req.body.Password)
                {
                    return res.send("user found")
                }
                else
                {
                    return res.status(401).send("user not authorized")
                }
            }
            
        }
    
        return res.status(404).send("user not found")
    })
    .catch(err=>res.status(400))
}