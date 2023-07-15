const Razorpay=require("razorpay")
const Order=require("../models/order")
require("dotenv").config()

exports.purchasemembership=async (req,res,next)=>{
 try{
    const rzp=new Razorpay({
    key_id:process.env.Razorpay_Key_id,
    key_secret:process.env.Razorpay_Key_secret
    })
    const amount=2500;
    rzp.orders.create({amount,currency:"INR"},async (err,order)=>{
        if(err)
        {
            throw new Error(JSON.stringify(err))
        }
        try{
        await req.user.createOrder({orderid:order.id,status:"PENDING"})
        return res.status(201).json({order,key_id:rzp.key_id})
        }
        catch(err)
        {
            res.status(404).json(err)
        }
})
}
    catch(err){

        res.status(401).json(err);
    }
}

exports.updatetransactionstatus=async (req,res,next)=>{
    try{
    // const order=await req.user.getOrders({where:{orderid:req.body.order_id}})
    // console.log(order)
    await Order.update({paymentid:req.body.payment_id,status:req.body.status},{where:{orderid:req.body.order_id}})
    if(req.body.status==="SUCCESSFUL"){
    await req.user.update({ispremiumuser:true})
    res.status(200).json({message:"Transaction Successful"})
    }
    else
    {
        res.status(200).json({message:"Transaction Failed"})
    }
}
    catch(err)
    {
        res.status(400).json(err)
    }

}

