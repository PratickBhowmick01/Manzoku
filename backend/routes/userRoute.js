const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser)

module.exports = router;
 