const User=require("../models/user")
const ForgetPasswordRequest=require("../models/forgotpassword.js")
const sequelize=require("../util/database")
const path=require("path")
const sib=require("sib-api-v3-sdk")
const {v4:uuidv4}=require("uuid")
const bcrypt=require("bcrypt")
require("dotenv").config()

exports.forgotpassword=async (req,res,next)=>{
    const t=await sequelize.transaction()
try{
const email=req.body.Email
const user=await User.findAll({where:{Email:email}})
if(user.length===0)
{
 return res.status(200).json("Entered email id is not registered!")
}
//console.log(process.env.SENDINBLUE_API_KEY)

const uuid=uuidv4()
await ForgetPasswordRequest.create({id:uuid,isactive:true,userId:user[0].id},{transaction:t})
const client=sib.ApiClient.instance
const apiKey=client.authentications["api-key"]
apiKey.apiKey=process.env.SENDINBLUE_API_KEY


const tranemailapi= new sib.TransactionalEmailsApi()

const sender={
    email:"akashranjan947@gmail.com"
}

const recievers=[{
    email:email
}]

const result=await tranemailapi.sendTransacEmail({
    sender,
    to:recievers,
    subject:"Reset password",
    htmlContent:`<h3>Please click the below link to reset password</h3>
    <a href='http://localhost:4000/password/resetpassword/${uuid}'>Reset Password</a>`
})
t.commit()
res.status(200).json("Email sent to your mail id to generate password")
}
catch(err){
    t.rollback()
    res.status(400).json(err)
}
}

exports.resetpassword=async(req,res,next)=>{

try{
    const uuid=req.params.uuid
    const request=await ForgetPasswordRequest.findAll({where:{id:uuid,isactive:true}})
    if(request.length>0)
    {
        return res.sendFile(path.join(__dirname,"../","resetpassword.html"))
    }
    
        throw new Error("Link not found")


}
catch(err)
{
    res.status(500).json(err.message)
}


}
exports.postresetpassword=async(req,res,next)=>{
    try{
    const uuid=req.params.uuid
    const request=await ForgetPasswordRequest.findAll({where:{id:uuid,isactive:true}})
    if(request.length>0)
    {
        bcrypt.hash(req.body.Password,10,async(err,hash)=>{
            if(err)
            {
                throw new Error(err)
            }
            await User.update({Password:hash},{where:{id:request[0].userId}})
            await request[0].update({isactive:false})
            res.status(200).json("Password reset successful")
        })
    }
    else{
        throw new Error("Link not found")
    }

}
catch(err)
{
    res.status(400).json(err)
}
}