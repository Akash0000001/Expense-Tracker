const Sequelize=require("sequelize");
const sequelize=require("../util/database")

const Expenses=sequelize.define("expense",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    expense:{
        type:Sequelize.DOUBLE,
        allowedNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowedNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowedNull:false
    }
})
module.exports=Expenses;