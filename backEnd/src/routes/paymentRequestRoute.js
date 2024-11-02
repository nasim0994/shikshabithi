const router = require("express").Router();
const {
  getAll,
  add,
  updateStatus,
  destroy,
  getById,
} = require("../controllers/paymentRequestController");

router.get("/", getAll);
router.post("/add", add);
router.get("/:id", getById);
router.patch("/update/:id", updateStatus);
router.delete("/delete/:id", destroy);

module.exports = router;
