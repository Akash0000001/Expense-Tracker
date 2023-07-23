const express=require("express");
const router=express.Router();
const usercontroller=require("../controllers/user")
router.post("/signup",usercontroller.adduser)
router.post("/login",usercontroller.authorizeuser)
module.exports=router;