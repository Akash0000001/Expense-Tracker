const express=require("express");
const router=express.Router();
const passwordcontroller=require("../controllers/password")

router.post("/forgotpassword",passwordcontroller.forgotpassword)
router.get('/resetpassword/:uuid',passwordcontroller.resetpassword)
router.get("/postresetpassword/:uuid",passwordcontroller.postresetpassword)


module.exports=router;
