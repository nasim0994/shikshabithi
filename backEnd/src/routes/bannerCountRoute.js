const router = require("express").Router();
const { get } = require("../controllers/bannerCountController");

router.get("/all", get);

module.exports = router;
