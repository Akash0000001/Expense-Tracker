const User=require("../models/user")
const Expense=require("../models/expense")

exports.leaderboard=async (req,res,next)=>{
try{
    const users= await User.findAll()
    let expensesgroup=[];
    for(let i=0;i<users.length;i++)
    {
        const expenses=await users[i].getExpenses()
        let totalexpense=0;
        expenses.forEach(exp=>{
            totalexpense+=exp.expense;
        })
        const name=users[i].Name
        expensesgroup.push({name:name,totalexpense:totalexpense})
    }
    for(let i=1;i<expensesgroup.length;i++)
    {
        for(let j=0;j<expensesgroup.length-1;j++)
        {
            if(expensesgroup[j].totalexpense<expensesgroup[j+1].totalexpense)
            {
                let temp=expensesgroup[j]
                expensesgroup[j]=expensesgroup[j+1]
                expensesgroup[j+1]=temp;
            }
        }
    }
    res.status(200).json(expensesgroup)
}
catch(err)
{
    res.status.json(err)
}
}
