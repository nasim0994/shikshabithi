const router = require("express").Router();
const { get, add, update } = require("../controllers/featureImageController");
const singleUploder = require("../utils/singleUploder");
let upload = singleUploder("./uploads/feature", 1 * 1024 * 1024, "image");

router.get("/all", get);

router.post("/add", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        message: "File upload failed.max image size 1mb.",
        error: err,
      });
    }

    add(req, res, next);
  });
});

router.patch("/update/:id", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        message: "File upload failed.max image size 1mb.",
        error: err,
      });
    }

    update(req, res, next);
  });
});

module.exports = router;
