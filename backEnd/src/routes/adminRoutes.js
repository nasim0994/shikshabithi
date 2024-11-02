const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  addAdmin,
  getAll,
  update,
  getById,
  destroy,
} = require("../controllers/adminController");

router.get("/all", verifyAdmin, getAll);
router.post("/add", verifyAdmin, addAdmin);
router.get("/:id", verifyAdmin, getById);
router.post("/update/:id", verifyAdmin, update);
router.post("/delete/:id", verifyAdmin, destroy);

module.exports = router;
