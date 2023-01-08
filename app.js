const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const MONGODB_URI =
  "mongodb+srv://Lynne:kookys@cluster0.tltsg18.mongodb.net/shop?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const adminRoutes = require("./router/admin");
const shopRoutes = require("./router/shop");
const authRoutes = require("./router/auth");

const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my secret!",
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: { maxAge: 10 },
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

mongoose
  .connect(MONGODB_URI)
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
