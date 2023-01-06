const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/productDetail/:productId", shopController.getOneProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/deleteCart", shopController.postCartDelete);

router.post("/createOrder", shopController.postOrder);

router.get("/checkout", shopController.getCheckout);

router.get("/orders", shopController.getOrders);

module.exports = router;
