const express = require("express");
const router = express.Router();
const singleUploder = require("../utils/singleUploder");
const {
  get,
  add,
  update,
  destroy,
  getSingle,
} = require("../controllers/featureController");

let upload = singleUploder("./uploads/feature", 300 * 1024, "icon");

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

router.get("/:id", getSingle);

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
