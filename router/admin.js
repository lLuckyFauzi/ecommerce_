const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/addProduct", adminController.getAddProduct);

router.post("/addProduct", adminController.postAddProduct);

router.get("/editProduct/:productId", adminController.editProduct);

router.post("/editProduct", adminController.postEditProduct);

router.post("/deleteProduct", adminController.PostDeleteProduct);

router.get("/products", adminController.getProducts);

module.exports = router;
