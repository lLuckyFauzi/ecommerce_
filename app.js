const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminRoutes = require("./router/admin");
const shopRoutes = require("./router/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(3000);
