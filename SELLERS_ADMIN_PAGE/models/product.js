const Sequelize=require("sequelize");
const sequelize=require('../util/database');

const Product=sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    product_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=Product;