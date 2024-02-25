const mongoose = require("mongoose");

const autoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is Required"],
  },
  type: {
    type: String,
    enum: ["Car", "Truck", "Pick Up", "Motorcycle", "Bike"],
    required: [true, "Type is Required"],
  },
  years: {
    type: Number,
    required: [true, "Years Release is Required"],
  },
  status: {
    type: String,
    enum: ["pre_order", "ready", "sold_out"],
    required: [true, "Status is Required"],
  },
  price: {
    type: Number,
    required: [true, "Price for rentall is Required"],
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Auto", autoSchema);
