const express = require("express");
const router = express.Router();
const {
  get,
  getSingle,
  insert,
  update,
  destroy,
} = require("../../controllers/board/boardWrittenController");

router.get("/all", get);
router.get("/:id", getSingle);
router.post("/add", insert);
router.patch("/edit/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
