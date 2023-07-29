const express = require("express");
const { updateProduct, deleteProduct, getAllProducts, createProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getAllProducts);


router.route("/products/new").post(isAuthenticatedUser, authorizeRoles("admin") ,createProduct);

router.route("/product/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct).get(getProductDetails)

module.exports =router;