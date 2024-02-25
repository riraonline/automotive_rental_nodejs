const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const [
  userPage,
  createNewUserPage,
  createNewUser,
  detailUserPage,
  editUserPage,
  updateDataUser,
  deleteUser,
  addNewAutoPage,
  addNewAutoData,
] = require("../controllers/user.controller");

router.get("/users", auth, userPage);
router.get("/users/create", auth, createNewUserPage);
router.post("/users", createNewUser);
router.get("/users/:id", auth, detailUserPage);
router.get("/users/:id/edit", auth, editUserPage);
router.put("/users/:id", updateDataUser);
router.delete("/users/:id", deleteUser);
router.get("/users/:user_id/autos/create", auth, addNewAutoPage);
router.post("/users/:user_id/autos", addNewAutoData);

module.exports = router;
