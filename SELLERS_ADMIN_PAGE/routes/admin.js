const express=require('express')
const admincontroller=require('../controllers/admin')

const router=express.Router();

router.post('/add-product',admincontroller.addproduct)
router.get("/get-products",admincontroller.getproducts)
router.delete('/delete-product/:productId',admincontroller.deleteproduct)

module.exports=router;