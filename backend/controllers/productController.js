const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
//Create Product --Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{

    const product = await Product.find();
    //create(req.body)
    res.status(201).json({
        success:true,
        product 
    });

});

exports.getAllProducts = catchAsyncError(async (req,res) =>{

    const apiFeature= new ApiFeatures(Product.find(),req.query).search();
    const products = await apiFeature.query;

    res.status(200).jason({
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
