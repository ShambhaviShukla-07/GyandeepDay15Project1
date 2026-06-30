const express= require("express");
const router= express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.post("/register",authController.register);
router.post("/login",authController.login);
router.get("/profile",authMiddleware,authController.profile);
router.get("/logout",authController.logout);

module.exports = router;
// model -> controller -> router