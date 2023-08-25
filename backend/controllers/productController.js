const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");


// get all product
exports.getAllProducts = catchAsyncError(async (req,res) =>{

    const resultPerPage =8;
    const productsCount = await Product.countDocuments();

    const apiFeature= new ApiFeatures(Product.find(),req.query)
    .search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;


    res.status(200).json({
        success:true,
        products,
        productsCount
    });
});

//get product detail
exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success:true,
        product
        });
});




//Update Product --Admin
exports.updateProduct = catchAsyncError(async (req,res,next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
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

    await product.deleteOne()

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    });

});

// Create And Update Review 

exports.reviewProducts = catchAsyncError( async (req, res, next) => {
    const { rating, comment, productID } = req.body;
    
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productID);

    const isRviewed = product.reviews.find(
        (rev)=> rev.user.toString() === req.user._id.toString()
    );

    if (isRviewed) {
        product.reviews.forEach((rev)=> {
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment)
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let total = 0;

    product.reviews.forEach((rev)=> {
        total += rev.rating;
    })
    
    product.ratings = total/ product.reviews.length

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    })
    
})

// Get all reviews 
exports.getAllReviews = catchAsyncError( async(req, res, next) => {

    const id = req.query.id;

    const product = await Product.findById(id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews
    });


})

// Delete Review 
exports.deleteReviews = catchAsyncError( async(req, res, next) => {

    const id = req.query.productID;

    const product = await Product.findById(id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString())

    let total = 0;

    reviews.forEach((rev)=> {
        total += rev.rating;
    })
    
    const ratings = total/ reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productID,
        {
            reviews,
            ratings,
            numOfReviews,
        },{
            new:true,
            runValidators:true,
            useFindAndModify: false
        });

    res.status(200).json({
        success:true,
        // reviews: product.reviews
    });

});

// ---------- ADMIN -------------- 

// get all product (ADMIN)
exports.getAdminProducts = catchAsyncError(async (req,res) =>{

    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    });
});

//Create Product --Admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product 
    });

});