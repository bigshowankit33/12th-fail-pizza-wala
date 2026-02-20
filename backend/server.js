require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes Import
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); // Isko activate kar diya hai

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected ✅"))
  .catch((err) => {
    console.error("MongoDB Connection Error ❌:", err.message);
    process.exit(1); 
  });

// 1. Health Check Routes
app.get("/", (req, res) => {
  res.send("12th Fail Pizza Wala API is Running 🚀");
});

// API Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connection solid hai bhai! 🍕" });
});

// 2. Main API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // Order system enabled

// 3. 404 Route Handler (Jab koi galat URL hit kare)
app.use((req, res) => {
  res.status(404).json({ message: "Route nahi mila! Path check karo." });
});

// 4. Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error! Console check karo." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🍕`);
});