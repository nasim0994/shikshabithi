const router = require("express").Router();
const { update } = require("../../controllers/profile/imageController");
const verifyToken = require("../../middleware/verifyToken");
const singleUploder = require("../../utils/singleUploder");

let upload = singleUploder("./uploads/user/image", 100 * 1024, "image");

router.patch("/update", verifyToken, (req, res, next) => {
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
