const router = require("express").Router();
const {
  insert,
  get,
  getSingle,
  update,
  destroy,
  totalAddLength,
} = require("../controllers/modelTestController");
const verifyToken = require("../middleware/verifyToken");

router.post("/add", insert);
router.get("/all", get);
router.get("/length", verifyToken, totalAddLength);
router.get("/:id", getSingle);

router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
