// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser, refreshToken, logoutUser, validateToken } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);
router.get("/validate-token", validateToken);

module.exports = router;
