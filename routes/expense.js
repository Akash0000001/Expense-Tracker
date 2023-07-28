const express=require("express")
const authenticate=require("../middlewares/authorize")
const router=express.Router();
const expensecontroller=require("../controllers/expense")
router.post("/add-expense",authenticate,expensecontroller.addexpense)
router.get("/get-expenses",authenticate,expensecontroller.getexpenses)
router.delete("/delete-expense/:expenseid",authenticate,expensecontroller.deleteexpense)
router.put("/edit-expense/:expenseid",authenticate,expensecontroller.editexpense)

router.get("/download-expense",authenticate,expensecontroller.downloadexpenses)

module.exports=router;


