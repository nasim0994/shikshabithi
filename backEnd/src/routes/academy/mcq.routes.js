const express = require("express");
const {
  get,
  insert,
  update,
  destoy,
  getSingle,
  getMulti,
} = require("../../controllers/academy/mcq.controller");
const router = express.Router();

router.get("/all", get);
router.get("/:id", getSingle);
router.get("/multi/:id", getMulti);
router.post("/add", insert);
router.patch("/edit/:id", update);
router.delete("/delete/:id", destoy);

module.exports = router;
