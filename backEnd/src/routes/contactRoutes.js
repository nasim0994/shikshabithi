const verifyAdmin = require("../middleware/verifyAdmin");
const {
  getContacts,
  addContact,
  updateContact,
} = require("../controllers/contactController");

const router = require("express").Router();

router.get("/", getContacts);
router.post("/add", verifyAdmin, addContact);
router.patch("/update/:id", verifyAdmin, updateContact);

module.exports = router;
