const express=require("express")
const authenticate=require("../middlewares/authorize")
const router=express.Router();
const expensecontroller=require("../controllers/expense")
router.post("/add",authenticate,expensecontroller.addexpense)
router.get("/list",authenticate,expensecontroller.getexpenses)
router.delete("/delete/:expenseid",authenticate,expensecontroller.deleteexpense)

module.exports=router;