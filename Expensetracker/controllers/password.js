const User=require("../models/user")
const sib=require("sib-api-v3-sdk")
require("dotenv").config()

exports.forgotpassword=async (req,res,next)=>{
try{
const email=req.body.Email
const user=await User.findAll({where:{Email:email}})
if(user.length===0)
{
 return res.status(200).json("Entered email id is not registered!")
}
//console.log(process.env.SENDINBLUE_API_KEY)
const client=sib.ApiClient.instance
const apiKey=client.authentications["api-key"]
apiKey.apiKey=process.env.SENDINBLUE_API_KEY


const tranemailapi= new sib.TransactionalEmailsApi()

const sender={
    email:"bholap669@gmail.com"
}

const recievers=[{
    email:email
}]

const result=await tranemailapi.sendTransacEmail({
    sender,
    to:recievers,
    subject:"Reset password",
    textContent:"please click the below link to generate password"
})
res.status(200).json("Email sent to your mail id to generate password")
}
catch(err){
    res.status(400).json(err)
}
}