const Expenses=require("../models/expense")

exports.addexpense=(req,res,next)=>{
    Expenses.create({
        expense:req.body.Expense,
        description:req.body.Description,
        category:req.body.Category
    })
    .then(result=>res.json(result.dataValues))
    .catch(err=>console.log(err))
}

exports.getexpenses=(req,res,next)=>{

    Expenses.findAll().then((result)=>res.json(result))
    .catch(err=>console.log(err))
}

exports.deleteexpense=(req,res,next)=>{
    Expenses.findByPk(req.params.expenseid)
    .then(expense=>expense.destroy())
    .then(()=>res.json("Done"))
    .catch(err=>console.log(err))
}