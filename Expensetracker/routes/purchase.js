const express=require("express");
const purchasecontroller=require ("../controllers/purchase.js")
const authenticate=require("../middlewares/authorize.js")

const router=express.Router();

router.get("/primemembership",authenticate,purchasecontroller.purchasemembership)
router.post("/updatetransactionstatus",authenticate,purchasecontroller.updatetransactionstatus)

module.exports=router