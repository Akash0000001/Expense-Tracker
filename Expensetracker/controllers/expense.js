const Expenses=require("../models/expense")

exports.addexpense=async (req,res,next)=>{
    const {Expense,Description,Category}=req.body
    try{
    const result =await Expenses.create({expense:Expense,description:Description,category:Category,userId:req.user.id})
    let  expense=req.user.totalexpenses
    if(!expense)
    {
        expense=0;
    }
    await req.user.update({totalexpenses:expense+JSON.parse(Expense)},{where:{id:req.user.id}})
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
    await req.user.update({totalexpenses:req.user.totalexpenses-expense[0].expense},{where:{id:req.user.id}})
    await expense[0].destroy()
    res.json("Done")
    }
    catch(err){
        res.status(400).send(err)
        console.log(err)
    }
}