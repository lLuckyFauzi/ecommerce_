const User = require("../models/user");

exports.login = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", { isLogIn: req.session.isLoggedIn });
};

exports.postLogin = (req, res, next) => {
  User.findById("63ba36723cad443290cbc0ec")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
