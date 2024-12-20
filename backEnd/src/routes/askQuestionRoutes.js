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
  getAskQuestionLengthByUser,
} = require("../controllers/askquestionController");

let upload = singleUploder("./uploads/askQuestion", 1000 * 1024, "image");

router.get("/", get);
router.get("/byuser", verifyToken, getByUser);
router.get("/length", verifyToken, getAskQuestionLengthByUser);

router.post("/add", (req, res, next) => {
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

router.patch("/update/:id", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }

    update(req, res, next);
  });
});

router.delete("/delete/:id", destroy);

module.exports = router;
