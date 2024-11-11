const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const {
  add,
  update,
  get,
  getByUser,
  destroy,
  getSingle,
  toggleStatus,
  download,
} = require("../controllers/handnotesController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/handnotes");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).array("images", 10);

router.get("/", get);
router.get("/byuser", verifyToken, getByUser);
router.post("/add", verifyToken, upload, add);

router.get("/download/:id", verifyToken, download);

router.get("/:id", getSingle);
router.patch("/toggle-status/:id", verifyToken, toggleStatus);
router.patch("/update/:id", verifyToken, upload, update);
router.delete("/delete/:id", verifyToken, destroy);

module.exports = router;
