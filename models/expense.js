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
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=Expenses;