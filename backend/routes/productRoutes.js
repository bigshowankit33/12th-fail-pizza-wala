const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Ye route test karne ke liye: http://localhost:5000/api/products/test
router.get("/test", (req, res) => {
    res.json({ message: "Product route working! 🍕" });
});

// Saare products lane ke liye: http://localhost:5000/api/products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;