const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

// Checkout Route: POST /api/orders/checkout (public - customers can place orders)
router.post("/checkout", async (req, res) => {
  try {
    const { items, totalPrice, customerDetails } = req.body;

    const newOrder = new Order({
      items,
      totalPrice,
      customerDetails,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully! 🍕", order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Order fail ho gaya bhai!", error: error.message });
  }
});

// Get all orders Route: GET /api/orders/all (protected - admin only)
router.get("/all", protect, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// Update order status Route: PUT /api/orders/:id/status (protected - admin only)
router.put("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully!", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
});

module.exports = router;
