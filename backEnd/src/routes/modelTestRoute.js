const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  insert,
  get,
  getSingle,
  update,
  destroy,
  totalAddLength,
  updateStatus,
} = require("../controllers/modelTestController");

router.post("/add", insert);
router.get("/all", get);
router.get("/length", verifyToken, totalAddLength);
router.get("/:id", getSingle);

router.patch("/update/:id", update);
router.patch("/update/status/:id", updateStatus);
router.delete("/delete/:id", destroy);

module.exports = router;
