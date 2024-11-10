const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  insert,
  get,
  getSingle,
  destroy,
  totalModelTestAttend,
} = require("../controllers/modelTestAttendController");

router.post("/add", insert);
router.get("/all", get);
router.get("/length", verifyToken, totalModelTestAttend);
router.get("/:id", getSingle);
router.delete("/delete/:id", destroy);

module.exports = router;
