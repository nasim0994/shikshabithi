const express = require("express");
const router = express.Router();
const { add, get, update } = require("../controllers/aboutController");

router.get("/", get);
router.post("/add", add);
router.patch("/update/:id", update);

module.exports = router;
