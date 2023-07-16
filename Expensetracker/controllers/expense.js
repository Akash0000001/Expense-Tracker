const Expenses=require("../models/expense")

exports.addexpense=async (req,res,next)=>{
    const {Expense,Description,Category}=req.body
    try{
    const result =await Expenses.create({expense:Expense,description:Description,category:Category,userId:req.user.id})
     res.json(result)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
}

exports.getexpenses=async (req,res,next)=>{
    try{
    const expense=await req.user.getExpenses()
    
    res.json({expense,ispremiumuser:req.user.ispremiumuser})
    
    }
    catch(err){
        res.status(400).send(err)
    }
}

exports.deleteexpense=async (req,res,next)=>{
    try{
    const expense=await req.user.getExpenses({where:{id:req.params.expenseid}})
    await expense[0].destroy()
    res.json("Done")
    }
    catch(err){
        res.status(400).send(err)
        console.log(err)
    }
}