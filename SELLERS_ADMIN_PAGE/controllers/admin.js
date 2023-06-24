const Product=require('../models/product')

exports.addproduct=(req,res,next)=>{
    Product.create({
        price:req.body.price,
        product_name:req.body.product_name,
        category:req.body.category
    })
    .then(data=>res.json(data.dataValues))
    .catch(err=>console.log(err))
}

exports.getproducts=(req,res,next)=>{

    Product.findAll().then((result)=>res.json(result))
    .catch(err=>console.log(err))
}

exports.deleteproduct=(req,res,next)=>{
    Product.findByPk(req.params.productId)
    .then(product=>product.destroy())
    .then(()=>res.json("Done"))
    .catch(err=>console.log(err))
}

