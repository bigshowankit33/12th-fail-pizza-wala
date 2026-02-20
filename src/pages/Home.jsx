import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Star, Truck } from "lucide-react";
import Navbar from "../components/Navbar";
import RestaurantBanner from "../components/RestaurantBanner";
import FoodCard from "../components/FoodCard";
import CategoryFilter from "../components/CategoryFilter";
import Footer from "../components/Footer";

// ⭐ restaurant info static (abhi ke liye)
const restaurantInfo = {
  deliveryTime: "30-40 min",
  rating: "4.5",
  deliveryFee: 20,
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // 🔥 Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(async (res) => {
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Products from backend:", data);

        setAllProducts(data);

        // default → all items
        setFilteredItems(data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  // ⭐ Filter logic
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(allProducts);
    } else {
      setFilteredItems(
        allProducts.filter(
          (item) =>
            item.category?.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, allProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Restaurant Banner */}
      <RestaurantBanner />

      {/* Quick Info Bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="text-primary-red" size={20} />
              <span className="font-medium">
                Delivery in {restaurantInfo.deliveryTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Star className="text-primary-red" size={20} />
              <span className="font-medium">
                {restaurantInfo.rating} Rating
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="text-primary-red" size={20} />
              <span className="font-medium">
                ₹{restaurantInfo.deliveryFee} Delivery Fee
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            {selectedCategory === "all"
              ? "All Items"
              : selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}
          </h2>

          <Link
            to="/menu"
            className="flex items-center gap-2 text-primary-red font-medium hover:underline"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        {/* Food Grid */}
        {isLoading ? (
          <h2>Loading...</h2>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <p>No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FoodCard item={item} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;