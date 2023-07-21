const Sequelize=require("sequelize")
const sequelize=require("../util/database")

const DownloadedFilesUrl=sequelize.define("downloadedfilesurl",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    url:{
        type:Sequelize.STRING,
        allowNull:false
    }
   
})

module.exports=DownloadedFilesUrl;