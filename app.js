const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoConnect = require("./utils/database").mongoConnect;

const adminRoutes = require("./router/admin");
const shopRoutes = require("./router/shop");

const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("63b983ac9036a3c2bcecedcb")
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
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

mongoConnect(() => {
  app.listen(3000);
});
