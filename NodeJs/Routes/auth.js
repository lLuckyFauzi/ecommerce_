const express = require("express");
const { body } = require("express-validator/check");
const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email", "The input must be email").isEmail().normalizeEmail(),
    body("password", "Must 6 character!").isLength({ min: 5 }).trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    body("email", "The input must be email")
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exist!");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Must 6 character!").trim().isLength({ min: 5 }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password not match");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
