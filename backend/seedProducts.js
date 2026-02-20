require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URI);

const products = [
  { name: "Gabbar Single Topping Pizza", price: 60, category: "Pizza" },
  { name: "Bahubali Mix Veg Pizza", price: 70, category: "Pizza" },
  { name: "Jai Veeru Onion Capsicum Pizza", price: 80, category: "Pizza" },
  { name: "Break-up Tandoori Paneer Pizza", price: 90, category: "Pizza" },
  { name: "3 Idiots Double Cheese Pizza", price: 90, category: "Pizza" },
  { name: "Dangal Golden Corn Pizza", price: 100, category: "Pizza" },

  { name: "Veg Sandwich", price: 30, category: "Sandwich" },
  { name: "Paneer Sandwich", price: 40, category: "Sandwich" },
  { name: "Cheese Sandwich", price: 60, category: "Sandwich" },

  { name: "Aloo Tikki Burger", price: 50, category: "Burger" },
  { name: "Paneer Burger", price: 60, category: "Burger" },
  { name: "Maharaja Burger", price: 100, category: "Burger" },

  { name: "French Fries", price: 50, category: "Fries" },
  { name: "Cheesy French Fries", price: 100, category: "Fries" },

  { name: "Cold Coffee", price: 60, category: "Drinks" },
  { name: "Oreo Shake", price: 90, category: "Drinks" }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Menu Added Successfully 🍕");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();