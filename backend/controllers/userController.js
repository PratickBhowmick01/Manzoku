const sendToken = require("../utils/jwtToken.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel.js");

// Register a user 
exports.registerUser = catchAsyncError (async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "dpUUrl"
        },
    });

    sendToken(user, 200, res);
});

// Login User 

exports.loginUser = catchAsyncError (async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter email & password"), 400);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password"), 401);
    }

    const passwordMatched = user.comparePassword(password);

    if (!passwordMatched) {
        return next(new ErrorHandler("Invalid email or password"), 401);
    }

    sendToken(user, 200, res);
});


// Logout User 

exports.logoutUser = catchAsyncError (async (req, res, next) => {

    res.cookie("token",null,{
        expire: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message:"Logged out successfully"
    })
});

// Get User details 
// exports.showUserDetails = catchAsyncError(async (req,res,next) => {

//     const id = req.user._id;

//     const user = await User.findById

// });