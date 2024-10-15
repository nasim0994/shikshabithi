const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  registerUser,
  processRegister,
  loginUser,
  getMe,
  forgotPassword,
  recoverPassword,
  getAll,
} = require("../controllers/userController");
router.get("/all", getAll);
router.post("/processRegister", processRegister);
router.get("/verify/:token", registerUser); //user info save database
router.post("/login", loginUser); //user login
router.post("/forgotPassword", forgotPassword);
router.post("/recoverPassword", recoverPassword);
router.get("/loggedUser", verifyToken, getMe); //get logged user

module.exports = router;
