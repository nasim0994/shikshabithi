const router = require("express").Router();

const {
  add,
  get,
  getSingle,
  update,
  destroy,
} = require("../controllers/feedbackController");

router.post("/add", add);
router.get("/", get);
router.get("/:id", getSingle);
router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
