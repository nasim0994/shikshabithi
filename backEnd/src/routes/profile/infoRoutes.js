const router = require("express").Router();
const verifyToken = require("../../middleware/verifyToken");
const { update } = require("../../controllers/profile/infoController");

router.patch("/update", verifyToken, update);

module.exports = router;
