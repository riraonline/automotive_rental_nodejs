const User = require("../models/user.model");
const Auto = require("../models/auto.model");
const bcrypt = require("bcrypt");

const homePage = async (req, res) => {
  const autos = await Auto.find({});
  res.render("home.ejs", { autos, user: req.session.user_id });
};

const registerPage = (req, res) => {
  res.render("register.ejs");
};

const registerUser = async (req, res) => {
  const { name, gender, address, phone, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({
    name,
    gender,
    address,
    phone,
    email,
    password: hashedPassword,
  });
  await user.save();
  res.redirect("/login");
};

const loginPage = (req, res) => {
  res.render("login.ejs");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user_id = user._id;
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = [
  homePage,
  registerPage,
  registerUser,
  loginPage,
  loginUser,
  logoutUser,
];
