const Expenses=require("../models/expense")

exports.addexpense=async (req,res,next)=>{
    const {Expense,Description,Category}=req.body
    try{
    const result =await Expenses.create({expense:Expense,description:Description,category:Category})
     res.json(result)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
}

exports.getexpenses=async (req,res,next)=>{
    try{
    const result=await Expenses.findAll()
    res.json(result)
    }
    catch(err){
        res.status(400).send(err)
    }
}

exports.deleteexpense=async (req,res,next)=>{
    try{
    const expense=await Expenses.findByPk(req.params.expenseid)
    await expense.destroy()
    res.json("Done")
    }
    catch(err){
        res.status(400).send(err)
    }
}