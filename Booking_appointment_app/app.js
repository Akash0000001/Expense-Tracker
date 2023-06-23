const express =require("express");
const bodyparser=require("body-parser");
const sequelize=require('./util/database')
const user=require("./routes/user")
const cors=require("cors")

const app=express();
app.use(cors());
app.use(bodyparser.json({extented:false}))
app.use('/users',user)

sequelize.sync()
.then(result=>{
    app.listen(8000)
})
.catch(err=>console.log(err))