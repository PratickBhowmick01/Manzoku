const express = require("express");
const { registerUser, loginUser, logoutUser, showUserDetails, getAllUsers, getAdminUsers, deleteUser, updateUserRole } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser)
router.route("/user-details").get(isAuthenticatedUser, showUserDetails);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/details/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminUsers);
router.route("/admin/delete/user/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
router.route("/admin/update/user/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);

module.exports = router;
 