require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGO_URI = "mongodb+srv://sagarankit2310_db_user:lz4i1SHJHeDo90ZB@12thfailpizza.snwlr42.mongodb.net/?appName=12thfailpizza";

mongoose.connect(MONGO_URI);

const products = [
  // Pizza
  {
    name: "Gabbar Single Topping Pizza",
    description: "Single topping pizza with your choice of topping",
    price: 100,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.5,
    popular: true,
  },
  {
    name: "Bahubali Mix Veg Pizza",
    description: "Loaded with mixed vegetables",
    price: 130,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.7,
    popular: true,
  },
  {
    name: "Jai & Veeru Onion Capsicum Pizza",
    description: "Onion and capsicum loaded pizza",
    price: 130,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.4,
    popular: false,
  },
  {
    name: "Katappa Spicy Pizza",
    description: "Extra spicy pizza with special masala",
    price: 140,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.6,
    popular: true,
  },
  {
    name: "Break-up Tandoori Paneer Pizza",
    description: "Tandoori paneer with special herbs",
    price: 150,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.3,
    popular: false,
  },
  {
    name: "Badshah Farm House Pizza",
    description: "Farm fresh vegetables with premium cheese",
    price: 150,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.8,
    popular: true,
  },
  {
    name: "Sholey Country Special Pizza",
    description: "Country style special pizza with unique toppings",
    price: 150,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.5,
    popular: false,
  },
  {
    name: "3 Idiots Double Cheese Margherita",
    description: "Extra double cheese loaded margherita",
    price: 150,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.7,
    popular: true,
  },
  {
    name: "Dangal Golden Corn Pizza",
    description: "Golden corn with special seasoning",
    price: 160,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.4,
    popular: false,
  },
  {
    name: "Pathan Cheese Burst Pizza",
    description: "Cheese burst with premium toppings",
    price: 170,
    image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.9,
    popular: true,
  },
  {
    name: "K.G.F American Veg Pizza",
    description: "American style veg pizza with exotic vegetables",
    price: 190,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.6,
    popular: false,
  },
  {
    name: "Rockey Bhai 12th Fail Special Pizza",
    description: "Special 12th fail edition pizza with premium toppings",
    price: 220,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    category: "pizza",
    rating: 4.9,
    popular: true,
  },

  // Sandwich
  {
    name: "Oppo Company Veg Sandwich",
    description: "Fresh vegetables with special sauce",
    price: 30,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    category: "sandwich",
    rating: 4.2,
    popular: false,
  },
  {
    name: "Vivo Company Paneer Sandwich",
    description: "Tasty paneer with fresh vegetables",
    price: 40,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    category: "sandwich",
    rating: 4.3,
    popular: false,
  },
  {
    name: "Samsung Company Cheese Sandwich",
    description: "Loaded with cheese and fresh veggies",
    price: 60,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    category: "sandwich",
    rating: 4.5,
    popular: true,
  },
  {
    name: "iPhone Company Tandoori Paneer Sandwich",
    description: "Tandoori paneer with premium spices",
    price: 75,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    category: "sandwich",
    rating: 4.6,
    popular: true,
  },

  // Burger
  {
    name: "Leon Messi Aloo Tikki Burger",
    description: "Classic aloo tikki burger with special sauce",
    price: 50,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "burger",
    rating: 4.3,
    popular: false,
  },
  {
    name: "Ronaldo Paneer Aloo Tikki Burger",
    description: "Paneer and aloo tikki combined",
    price: 60,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "burger",
    rating: 4.4,
    popular: false,
  },
  {
    name: "Big Boss Spicy Burger",
    description: "Extra spicy with special masala",
    price: 80,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
    category: "burger",
    rating: 4.6,
    popular: true,
  },
  {
    name: "Yo Yo Honey Singh Tandoori Paneer Burger",
    description: "Tandoori paneer with honey glaze",
    price: 90,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    category: "burger",
    rating: 4.7,
    popular: true,
  },
  {
    name: "Tiktok is Back Maharaja Burger",
    description: "Ultimate burger with extra toppings",
    price: 100,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    category: "burger",
    rating: 4.8,
    popular: true,
  },

  // French Fries
  {
    name: "Justin Bieber French Fries",
    description: "Crispy golden fries with seasoning",
    price: 50,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    category: "french-fries",
    rating: 4.4,
    popular: true,
  },
  {
    name: "Obama Cheesy French Fries",
    description: "Loaded with cheese and herbs",
    price: 100,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    category: "french-fries",
    rating: 4.7,
    popular: true,
  },

  // Garlic Bread
  {
    name: "Facebook Wala Cheese Garlic Bread",
    description: "2 pcs - Cheese garlic bread with butter",
    price: 40,
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&h=300&fit=crop",
    category: "garlic-bread",
    rating: 4.3,
    popular: false,
  },
  {
    name: "Whatsapp Wala Veg Garlic Bread",
    description: "2 pcs - Vegetable loaded garlic bread",
    price: 50,
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&h=300&fit=crop",
    category: "garlic-bread",
    rating: 4.4,
    popular: false,
  },
  {
    name: "Instagram Wala Cheesy Paneer Garlic Bread",
    description: "2 pcs - Paneer and cheese loaded",
    price: 60,
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&h=300&fit=crop",
    category: "garlic-bread",
    rating: 4.6,
    popular: true,
  },

  // Coffee & Shakes
  {
    name: "Dhoni Bhai Cold Coffee",
    description: "Creamy cold coffee with ice",
    price: 60,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    category: "coffee-shakes",
    rating: 4.5,
    popular: true,
  },
  {
    name: "Sachin Sir Caramel Cold Coffee",
    description: "Caramel flavoured cold coffee",
    price: 90,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    category: "coffee-shakes",
    rating: 4.7,
    popular: true,
  },
  {
    name: "Virat Bhai Hazelnut Cold Coffee",
    description: "Hazelnut flavoured cold coffee",
    price: 90,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    category: "coffee-shakes",
    rating: 4.6,
    popular: true,
  },
  {
    name: "Salman Bhai Oreo Shake",
    description: "Oreo biscuits blended with ice cream",
    price: 90,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop",
    category: "coffee-shakes",
    rating: 4.8,
    popular: true,
  },
  {
    name: "Shahrukh Bhai KitKat Shake",
    description: "KitKat chunks with creamy shake",
    price: 90,
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop",
    category: "coffee-shakes",
    rating: 4.8,
    popular: true,
  },

  // Unique Dishes
  {
    name: "Ambani Cheese Burst Burger",
    description: "Premium cheese burst burger with extra toppings",
    price: 80,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    category: "unique-dishes",
    rating: 4.9,
    popular: true,
  },
  {
    name: "Donald Trump Frenchy Sandwich",
    description: "Unique french style sandwich",
    price: 100,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop",
    category: "unique-dishes",
    rating: 4.5,
    popular: false,
  },
  {
    name: "Bill Gates The Sandy Burg",
    description: "Ultimate burger experience",
    price: 120,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop",
    category: "unique-dishes",
    rating: 4.7,
    popular: true,
  },
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
