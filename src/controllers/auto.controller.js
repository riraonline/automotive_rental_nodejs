const Auto = require("../models/auto.model");

const autoPage = async (req, res) => {
  const autos = await Auto.find({}).populate("user");
  res.render("automotive/index.ejs", { autos });
};

const createNewAutoDataPage = (req, res) => {
  res.render("automotive/create.ejs");
};

const createNewAutoData = async (req, res) => {
  const auto = new Auto(req.body);
  await auto.save();
  res.redirect("/autos");
};

const detailAutoDataPage = async (req, res) => {
  const { id } = req.params;
  const auto = await Auto.findById(id).populate("user");
  res.render("automotive/detail.ejs", { auto });
};

const editAutoDataPage = async (req, res) => {
  const { id } = req.params;
  const auto = await Auto.findById(id);
  res.render("automotive/edit.ejs", { auto });
};

const updateAutoData = async (req, res) => {
  const { id } = req.params;
  await Auto.findByIdAndUpdate(id, req.body, { runValidators: true });
  res.redirect(`/autos/${id}`);
};

const deleteAutoData = async (req, res) => {
  const { id } = req.params;
  await Auto.findByIdAndDelete(id);
  res.redirect("/autos");
};

module.exports = [
  autoPage,
  createNewAutoDataPage,
  createNewAutoData,
  detailAutoDataPage,
  editAutoDataPage,
  updateAutoData,
  deleteAutoData,
];
