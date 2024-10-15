const router = require("express").Router();
const { update } = require("../../controllers/profile/passwordController");
const verifyToken = require("../../middleware/verifyToken");

router.patch("/update", verifyToken, update);

module.exports = router;
