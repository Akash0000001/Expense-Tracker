const Expenses=require("../models/expense")
const DownloadedFilesUrl=require("../models/Downloadedfiles")
const sequelize=require("../util/database")
const User=require("../models/user")
const AWS=require("aws-sdk")
//require("dotenv").config()


exports.addexpense=async (req,res,next)=>{
    
    try{
    var  t=await sequelize.transaction()
    const {Expense,Description,Category}=req.body
    const result =await Expenses.create({expense:Number(Expense),description:Description,category:Category,userId:req.user.id},{transaction:t})
    let  expense=Number(req.user.totalexpenses)+Number(Expense)
    await User.update({totalexpenses:expense},{where:{id:req.user.id},transaction:t})
    t.commit()
     res.json(result)
    }
    catch(err)
    {   
        t.rollback()
        res.status(400).send(err)
    }
}

exports.getexpenses=async (req,res,next)=>{
    try{
    const expense=await req.user.getExpenses()
    const listFilesUrl=await DownloadedFilesUrl.findAll({where:{userId:req.user.id}})
    
    res.json({expense,ispremiumuser:req.user.ispremiumuser,filesurl:listFilesUrl})
    
    }
    catch(err){
        res.status(400).send(err)
    }
}

exports.deleteexpense=async (req,res,next)=>{
    try{
    var t=await sequelize.transaction()
    const expense=await req.user.getExpenses({where:{id:req.params.expenseid},transaction:t})
    await expense[0].destroy({transaction:t})
    await req.user.update({totalexpenses:Number(req.user.totalexpenses)-Number(expense[0].expense)},{transaction:t})
    t.commit()
    res.json("Done")
    }
    catch(err){
        t.rollback()
        res.status(400).send(err)
    }
}

async function uploadtos3(data,filename)
{
    var response;
    const BUCKET_NAME=process.env.BUCKET_NAME
    const IAM_ACCESS_KEY=process.env.IAM_ACCESS_KEY
    const IAM_SECRET_KEY=process.env.IAM_SECRET_KEY
    const s3bucket=new AWS.S3({
        accessKeyId:IAM_ACCESS_KEY,
        secretAccessKey:IAM_SECRET_KEY
    })
        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:"public-read"
        }
        return  new Promise((res,rej)=>{
            s3bucket.upload(params,(err,s3response)=>{
            if(err)
            {
                //console.log(err)
                rej(err)
            }
            else{
                // console.log(s3response)
                // console.log(s3response.Location)

                res(s3response.Location)
                }
            })

        })
    
}

exports.downloadexpenses=async (req,res,next)=>{
    try
    {
        if(req.user.ispremiumuser===true)
        {
        const expenses=await req.user.getExpenses()
        const strinfiedexpenses=JSON.stringify(expenses)
        const userId=req.user.id
        const filename=`Expense${userId}/${new Date()}.txt`;
        const fileUrl=await uploadtos3(strinfiedexpenses,filename)
        const result=await DownloadedFilesUrl.create({url:fileUrl,userId:req.user.id})
        res.status(200).json({result,success:true})
        }
        else{
            throw new Error("Unauthorized")
        }
        
    }
    catch(err)
    {
        console.log(err)
        res.status(401).json(err)
    }

}