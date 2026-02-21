const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  popular: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
