import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import Footer from "../components/Footer";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  // 🔥 Fetch products from backend
  useEffect(() => {
    console.log("Fetching products from backend...");

    fetch("http://localhost:5000/api/products")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Products from backend:", data);

        setAllProducts(data);
        setFilteredItems(data);

        // auto generate categories
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];

        const categoryData = uniqueCategories.map((cat) => ({
          id: cat,
          name: cat,
          slug: cat.toLowerCase(),
          icon: "🍕",
        }));

        setCategories(categoryData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  // filter by category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredItems(allProducts);
    } else {
      setFilteredItems(
        allProducts.filter(
          (item) => item.category?.toLowerCase() === selectedCategory
        )
      );
    }
  }, [selectedCategory, allProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
          <p>Explore our delicious range of items</p>
        </div>
      </div>

      {/* Mobile Filter */}
      <div className="lg:hidden bg-white border-b sticky top-16 z-40">
        <div className="px-4 py-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center gap-2"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 lg:top-16 left-0 h-full w-64 bg-white z-50 transform transition-transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>

            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full text-left px-4 py-3 rounded-xl mb-2 ${
                selectedCategory === "all"
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              All Items
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`w-full text-left px-4 py-3 rounded-xl mb-2 ${
                  selectedCategory === category.slug
                    ? "bg-red-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-2">
            {selectedCategory === "all"
              ? "All Items"
              : selectedCategory.toUpperCase()}
          </h2>

          <p className="mb-6">{filteredItems.length} items available</p>

          {isLoading ? (
            <h2>Loading menu...</h2>
          ) : filteredItems.length === 0 ? (
            <p>No items found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;