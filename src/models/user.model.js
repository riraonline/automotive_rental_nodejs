const mongoose = require("mongoose");

const Auto = require("./auto.model");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is Required"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Gender is Required"],
  },
  address: {
    type: String,
    required: [true, "Address is Required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  autos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auto",
    },
  ],
});

userSchema.post("findOneAndDelete", async function (user) {
  if (user.autos.length) {
    const res = await Auto.deleteMany({ _id: { $in: user.autos } });
    console.log(res);
  }
});

module.exports = mongoose.model("User", userSchema);
