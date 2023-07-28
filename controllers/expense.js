const Expenses=require("../models/expense")
const DownloadedFilesUrl=require("../models/Downloadedfiles")
const sequelize=require("../util/database")
const User=require("../models/user")
const AWS=require("aws-sdk")
const { parse } = require("dotenv")
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
    const rowsperpage=parseInt(req.query.rowsperpage)||10;
    const expense=await req.user.getExpenses()
    const totalurls=await req.user.getDownloadedfilesurls()
    const totalpages=Math.max(parseInt((expense.length-1)/rowsperpage)+1,parseInt((totalurls.length-1)/rowsperpage)+1)
    const page=parseInt(req.query.page);
    const haspreviouspage=page===1?false:true;
    const hasnextpage=page<totalpages?true:false;
    const previouspage=haspreviouspage?page-1:0;
    const nextpage=hasnextpage?page+1:null;
    const pagedetails={haspreviouspage:haspreviouspage,hasnextpage:hasnextpage,previouspage:previouspage,nextpage:nextpage,currentpage:page}
    const expenseperpage=[]
    for(let i=(page-1)*rowsperpage;i<rowsperpage*page && i<expense.length;i++)
    {
        expenseperpage.push(expense[i])
    }
    
    const listFilesUrl=await DownloadedFilesUrl.findAll({where:{userId:req.user.id},offset:(page-1)*rowsperpage,limit:rowsperpage})
    
    res.json({expenseperpage,ispremiumuser:req.user.ispremiumuser,pagedetails,filesurl:listFilesUrl})
    
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

exports.editexpense=async (req,res,next)=>{
    try{
    var t=await sequelize.transaction()
    const {Expense,Description,Category}=req.body
    const expense= await req.user.getExpenses({where:{id:req.params.expenseid}})
    const updated=expense[0].update({expense:Expense,description:Description,category:Category},{transaction:t})
    await req.user.update({totalexpenses:req.user.totalexpenses-expense[0].expense+Number(Expense)},{transaction:t})
    t.commit()
    console.log(updated)
    res.status(200).json(updated)
}
catch(err)
{
    t.rollback();
    res.status(400).json(err)
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