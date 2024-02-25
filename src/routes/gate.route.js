const express = require("express");
const router = express.Router();
const [
  homePage,
  registerPage,
  registerUser,
  loginPage,
  loginUser,
  logoutUser,
] = require("../controllers/gate.controller");

router.get("/", homePage);
router.get("/register", registerPage);
router.post("/register", registerUser);
router.get("/login", loginPage);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
