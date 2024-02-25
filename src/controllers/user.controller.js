const User = require("../models/user.model");
const Auto = require("../models/auto.model");
const bcrypt = require("bcrypt");

const userPage = async (req, res) => {
  const users = await User.find({}).populate("autos");
  res.render("gate/index.ejs", { users, message: req.flash("message") });
};

const createNewUserPage = (req, res) => {
  res.render("gate/create.ejs");
};

const createNewUser = async (req, res) => {
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
  req.flash("message", "Add new data Successful");
  res.redirect("/users");
};

const detailUserPage = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("autos");
  res.render("gate/detail", { user, messages: req.flash("flash_messages") });
};

const editUserPage = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  res.render("gate/edit", { user });
};

const updateDataUser = async (req, res) => {
  const { id } = req.params;
  const { name, gender, address, phone, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await User.findByIdAndUpdate(
    id,
    {
      name,
      gender,
      address,
      phone,
      email,
      password: hashedPassword,
    },
    { runValidators: true }
  );
  req.flash("flash_messages", "Data berhasil diubah");
  res.redirect(`/users/${user._id}`);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect("/users");
};

const addNewAutoPage = async (req, res) => {
  const { user_id } = req.params;
  res.render("automotive/create.ejs", { user_id });
};

const addNewAutoData = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findById(user_id);
  const auto = new Auto(req.body);
  user.autos.push(auto);
  auto.user = user;
  await auto.save();
  await user.save();
  res.redirect(`/users/${user_id}`);
};

module.exports = [
  userPage,
  createNewUserPage,
  createNewUser,
  detailUserPage,
  editUserPage,
  updateDataUser,
  deleteUser,
  addNewAutoPage,
  addNewAutoData,
];
