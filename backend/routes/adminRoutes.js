const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Admin Login Route
router.post("/login", (req, res) => {
  const { password } = req.body;

  // process.env se tumhara password check ho raha hai
  if (password === process.env.ADMIN_PASSWORD) {
    // Agar sahi hai, toh token generate karo
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({ success: true, token });
  } else {
    // Agar galat hai, toh error bhej do
    return res.status(401).json({ success: false, message: "Galat password hai bhai!" });
  }
});

module.exports = router;