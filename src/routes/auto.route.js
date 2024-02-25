const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const [
  autoPage,
  createNewAutoDataPage,
  createNewAutoData,
  detailAutoDataPage,
  editAutoDataPage,
  updateAutoData,
  deleteAutoData,
] = require("../controllers/auto.controller");

router.get("/autos", auth, autoPage);
router.get("/autos/create", auth, createNewAutoDataPage);
router.post("/autos", createNewAutoData);
router.get("/autos/:id", auth, detailAutoDataPage);
router.get("/autos/:id/edit", auth, editAutoDataPage);
router.put("/autos/:id", updateAutoData);
router.delete("/autos/:id", deleteAutoData);

module.exports = router;
