const sendToken = require("../utils/jwtToken.js");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorhandler.js");

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

    const passwordMatched = await user.comparePassword(password);

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
exports.showUserDetails = catchAsyncError(async (req,res,next) => {

    const id = req.user.id;

    const user = await User.findById(id)
    res.status(200).json({
        success: true,
        user
    });

});

// Get all users 
exports.getAllUsers = catchAsyncError(async (req, res) => {
    
    const allUsers = await User.find()
    res.status(200).json({
        success: true,
        allUsers
    })
})

// Get admin info
exports.getAdminUsers = catchAsyncError(async (req, res, next) => {
    
    const id = req.params.id;

    const users = await User.findById(id);

    if(!users){
        return next(
            new ErrorHandler(`User does not exist with ${req.params.id}`)
        );
    }

    res.status(200).json({
        success: true,
        users
    })
})

// Delete User Admin 
exports.deleteUser = catchAsyncError( async (req,res, next) => {
    const id = req.params.id

    const removeUser = await User.findByIdAndDelete(id)

    if(!removeUser) {
        return next(new ErrorHandler(`User does not exist with ${id}`))
    }

    res.status(200).json({
        success:true,
        removeUser
    })
})

// update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });

