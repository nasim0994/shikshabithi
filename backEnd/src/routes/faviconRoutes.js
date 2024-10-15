const express = require("express");
const router = express.Router();
const { get, add, update } = require("../controllers/faviconController");
const singleUploder = require("../utils/singleUploder");
let upload = singleUploder("./uploads/favicon", 100 * 1024, "icon");

router.get("/", get);
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

module.exports = router;
