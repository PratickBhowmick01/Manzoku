const express = require("express");
const { updateProduct, deleteProduct, getAllProducts, createProduct, getProductDetails, reviewProducts, getAllReviews, deleteReviews, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);


router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
    
router.route("/product/:id").get(getProductDetails)

router.route("/create-review").put(isAuthenticatedUser, reviewProducts);
router.route("/all-reviews").get(getAllReviews).delete(isAuthenticatedUser, deleteReviews)

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

module.exports = router;