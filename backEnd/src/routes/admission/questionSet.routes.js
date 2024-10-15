const express = require("express");
const router = express.Router();
const {
  get,
  getSingle,
  insert,
  update,
  destoy,
} = require("../../controllers/admission/questionSet.controller");

router.get("/all", get);
router.get("/:id", getSingle);
router.post("/add", insert);
router.patch("/edit/:id", update);
router.delete("/delete/:id", destoy);

module.exports = router;
