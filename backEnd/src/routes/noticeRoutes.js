const express = require("express");
const router = express.Router();
const singleUploder = require("../utils/singleUploder");
const verifyToken = require("../middleware/verifyToken");
const {
  add,
  update,
  get,
  getByUser,
  destroy,
  getSingle,
  toggleStatus,
} = require("../controllers/noticeController");

let upload = singleUploder("./uploads/notice", 1000 * 1024, "image");

router.get("/", get);
router.get("/byuser", verifyToken, getByUser);

router.post("/add", verifyToken, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }

    add(req, res, next);
  });
});

router.get("/:id", getSingle);
router.patch("/toggle-status/:id", verifyToken, toggleStatus);

router.patch("/update/:id", verifyToken, (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }

    update(req, res, next);
  });
});

router.delete("/delete/:id", verifyToken, destroy);

module.exports = router;
