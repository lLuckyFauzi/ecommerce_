const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/login", authController.login);

router.post("/postLogin", authController.postLogin);

router.post("/postLogout", authController.postLogout);

module.exports = router;
