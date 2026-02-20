require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes Import
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Admin login ke liye zaroori hai

const app = express();

// 1. CORS Middleware - Isse connection error theek ho jayega
app.use(cors({
  origin: "*", // Testing ke liye sab allow kiya hai, baad mein Vercel link dalo
  credentials: true
}));

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
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes); // Admin dashboard connection

// 3. 404 Route Handler
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