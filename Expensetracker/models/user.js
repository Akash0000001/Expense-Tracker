const Sequelize=require("sequelize");
const sequelize=require("../util/database")

const Users=sequelize.define("users",{
    Name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Email:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowedNull:false
    },
    Password:{
        type:Sequelize.STRING,
        allowedNull:false
    },
})
module.exports=Users;