const router = require("express").Router();
const {
  insert,
  get,
  getSingle,
  destroy,
} = require("../controllers/modelTestAttendController");

router.post("/add", insert);
router.get("/all", get);
router.get("/:id", getSingle);
router.delete("/delete/:id", destroy);

module.exports = router;
