const router = require("express").Router();

const {
  add,
  get,
  getSingle,
  update,
  destroy,
  updateStatus,
  getActive,
} = require("../controllers/adminNoticeController");

router.post("/add", add);
router.get("/all", get);
router.get("/active", getActive);
router.get("/:id", getSingle);
router.patch("/update/:id", update);
router.patch("/update/status/:id", updateStatus);
router.delete("/delete/:id", destroy);

module.exports = router;
