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