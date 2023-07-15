const express=require("express")
const bodyparser=require("body-parser")
const cors=require("cors")
const sequelize=require("./util/database")
const expenserouter=require("./routes/expense")
const purchaserouter=require("./routes/purchase")
const userrouter=require("./routes/user")
const Expense=require("./models/expense")
const User=require("./models/user")
const Order=require("./models/order")


const app=express();
app.use(cors())
app.use(bodyparser.json({extented:false}))
app.use("/expense",expenserouter)
app.use("/user",userrouter)
app.use("/purchase",purchaserouter)

Expense.belongsTo(User,{constrainsts:true})
User.hasMany(Expense);
User.hasMany(Order)
Order.belongsTo(User)
sequelize.sync()
.then(()=>app.listen(4000))
.catch(err=>console.log(err))