const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  add,
  update,
  get,
  getByUser,
  destroy,
  getSingle,
} = require("../controllers/currentAffairsController");

router.get("/", get);
router.get("/byuser", verifyToken, getByUser);

router.post("/add", add);
router.get("/:id", getSingle);
router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
