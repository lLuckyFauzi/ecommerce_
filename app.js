const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./router/admin");
const shopRoutes = require("./router/shop");

const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("63ba36723cad443290cbc0ec")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

mongoose
  .connect(
    "mongodb+srv://Lynne:kookys@cluster0.tltsg18.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected!");
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Lucky",
          email: "lucky@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
