const express=require("express");
const router=express.Router();
const passwordcontroller=require("../controllers/password")

router.post("/forgotpassword",passwordcontroller.forgotpassword)
router.get('/resetpassword/:uuid',passwordcontroller.resetpassword)
router.post("/resetpassword/:uuid",passwordcontroller.postresetpassword)


module.exports=router;
