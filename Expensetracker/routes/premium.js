const express=require("express");
const router=express.Router();
const premiumcontroller=require("../controllers/premium")

router.get("/leaderboard",premiumcontroller.leaderboard)

module.exports=router;