const router = require("express").Router();
const {
  insert,
  get,
  getSingle,
  destroy,
} = require("../../controllers/admission/admissionModelTestAttend.controller");

router.post("/add", insert);
router.get("/all", get);
router.get("/:id", getSingle);

// router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
