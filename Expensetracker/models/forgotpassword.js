const Sequelize=require("sequelize")
const sequelize=require("../util/database")

const ForgotPasswordRequests=sequelize.define("ForgotPasswordRequests",{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
    },
    isactive:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
})

module.exports=ForgotPasswordRequests;