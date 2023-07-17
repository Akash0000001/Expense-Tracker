const User=require("../models/user")
const Expense=require("../models/expense")
const sequelize=require("../util/database")
const Sequelize=require("sequelize")

exports.leaderboard=async (req,res,next)=>{
try{
    const leaderboard= await User.findAll({
        attributes:["id","Name",[sequelize.fn("sum",sequelize.col("expenses.expense")),"totalexpense"]],
        include:[
        {
            model:Expense,
            attributes:[]
        }],
        group:["users.id"],
        order:[["totalexpense","DESC"]]
    })
        
//     const aggregatedexpenses=await Expense.findAll(
//         {
//             attributes:["userId",[Sequelize.fn("sum",Sequelize.col("expense")),"totalexpense"]],
//             group:["userId"]
// })
    
res.json(leaderboard)
    //let expensesgroup=[];
    // for(let i=0;i<users.length;i++)
    // {
    //     const expenses=await users[i].getExpenses({attributes:[userId,expense]})
    //     let totalexpense=0;
    //     expenses.forEach(exp=>{
    //         totalexpense+=exp.expense;
    //     })
    //     const name=users[i].Name
    //     expensesgroup.push({name:name,totalexpense:totalexpense})
    // }
//     for(let i=1;i<expensesgroup.length;i++)
//     {
//         for(let j=0;j<expensesgroup.length-1;j++)
//         {
//             if(expensesgroup[j].totalexpense<expensesgroup[j+1].totalexpense)
//             {
//                 let temp=expensesgroup[j]
//                 expensesgroup[j]=expensesgroup[j+1]
//                 expensesgroup[j+1]=temp;
//             }
//         }
//     }
//     res.status(200).json(expensesgroup)
 }
catch(err)
{
    res.status(400).json(err)
}
}
