const Expenses=require("../models/expense")
const sequelize=require("../util/database")
const User=require("../models/user")

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
    
    res.json({expense,ispremiumuser:req.user.ispremiumuser})
    
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