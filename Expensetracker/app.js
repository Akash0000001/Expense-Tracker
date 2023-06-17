const express=require("express")
const bodyparser=require("body-parser")
const cors=require("cors")
const sequelize=require("./util/database")
const expenserouter=require("./routes/expense")

const app=express();
app.use(cors())
app.use(bodyparser.json({extented:false}))
app.use("/expense",expenserouter)
sequelize.sync()
.then(()=>app.listen(4000))
.catch(err=>console.log(err))