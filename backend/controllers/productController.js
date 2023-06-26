const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");



//Create Product --Admin
exports.createProduct = async (req,res,next)=>{

    const product = await Product.find();
    //create(req.body)
    res.status(201).json({
        success:true,
        product 
    })

}

// View all products 
exports.getAllProducts = async (req,res) =>{

    const apiFeature= new ApiFeatures(Product.find(),req.query).search();
    const products = await apiFeature.query;

    res.status(200).jason({
        success:true,
        products
    });
}


exports.getProductDetails = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })
}




//Update Product --Admin
exports.updateProduct = async (req,res,next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findById(req.params.id,req.body,{
        new:true, 
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}

//Delete Product

exports.deleteProduct = async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })

}
