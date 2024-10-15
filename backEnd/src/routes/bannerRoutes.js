const express = require("express");
const router = express.Router();
const { add, update, get } = require("../controllers/bannerController");
const singleUploder = require("../utils/singleUploder");
let upload = singleUploder("./uploads/banner", 1000 * 1024, "bg");

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
