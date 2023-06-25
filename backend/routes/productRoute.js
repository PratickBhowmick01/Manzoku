const express = require("express");
const { getAllProducts, createProduct, getProductDetails } = require("../controllers/productController");
const router = express.Router();



router.route("/products").get(getAllProducts);


router.route("/products/new").post(createProduct);

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)

module.exports =router;