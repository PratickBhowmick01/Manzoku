const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");


//Create Product --Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product 
    });

});

exports.getAllProducts = catchAsyncError(async (req,res) =>{

    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    });
});

exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success:true,
        product,
    });
});




//Update Product --Admin
exports.updateProduct = catchAsyncError(async (req,res,next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    product = await Product.findById(req.params.id,req.body,{
        new:true, 
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });
});

//Delete Product

exports.deleteProduct = catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    await product.remove()

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    });

});
