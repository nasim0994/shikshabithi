const express = require("express");
const router = express.Router();
const {
  add,
  update,
  get,
  destroy,
  getSingle,
} = require("../controllers/yearsController");

router.get("/", get);
router.post("/add", add);
router.get("/:id", getSingle);
router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;