const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const {
  get,
  insert,
  update,
  destoy,
  getSingle,
  totalAttend,
} = require("../../controllers/academy/onDemandTest.controller");

router.get("/all", get);
router.get("/length", verifyToken, totalAttend);
router.get("/:id", getSingle);
router.post("/add", insert);
router.patch("/edit/:id", update);
router.delete("/delete/:id", destoy);

module.exports = router;
