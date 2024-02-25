const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("express-session");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const wrapAsync = require("./src/middleware/wrapAsync.middleware");

const Gate = require("./src/routes/gate.route");
const User = require("./src/routes/user.route");
const Auto = require("./src/routes/auto.route");
const Error = require("./src/middleware/error.middleware");

const port = process.env.PORT;
const db = process.env.DB;

mongoose
  .connect(db)
  .then(() => {
    console.log("server has connect to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard-cat",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(Gate);
app.use(User);
app.use(Auto);
app.use(Error);

app.listen(port, () => {
  console.log("server has run on http://localhost:" + port);
});
