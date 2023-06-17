const express=require("express")
const router=express.Router();
const expensecontroller=require("../controllers/expense")
router.post("/add",expensecontroller.addexpense)
router.get("/list",expensecontroller.getexpenses)
router.delete("/delete/:expenseid",expensecontroller.deleteexpense)

module.exports=router;