const Sequelize=require('sequelize');
const sequelize=new Sequelize('booking_appointment_app','root','Akash@2803*#$',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;