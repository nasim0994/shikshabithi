const express = require("express");
const router = express.Router();
const { add, update, get } = require("../controllers/founderSpeechController");
const singleUploder = require("../utils/singleUploder");
let upload = singleUploder("./uploads/founder", 1000 * 1024, "image");

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
