const express=require("express");
const router=express.Router();
const passwordcontroller=require("../controllers/password")

router.post("/forgotpassword",passwordcontroller.forgotpassword)



module.exports=router;
