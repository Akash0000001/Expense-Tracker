const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
const sequelize=require("./util/database")
const adminroutes=require('./routes/admin')
const app=express();
app.use(cors());
app.use(bodyparser.json({extended:false}));
app.use('/admin',adminroutes)

sequelize.sync()
.then(()=>app.listen(5000))
.catch(err=>console.log(err))