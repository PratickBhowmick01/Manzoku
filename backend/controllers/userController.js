const User = require("../models/userModel.js");

// Register a user 

exports.registerUser = async (req, res) => {
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

    res.status(200).json({
        success: true,
        user,
    });
}