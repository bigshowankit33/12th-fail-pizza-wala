import { Plus, Star, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ item }) => {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState('medium');
  
  // Check if item is a pizza (has small and medium prices in description)
  const isPizza = item.category === 'pizza';
  
  // Find cart item matching both id and size
  const cartItem = cartItems.find((ci) => 
    isPizza 
      ? ci.id === item.id && ci.size === selectedSize
      : ci.id === item.id
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  // Extract prices from description for pizza items
  const getPrice = () => {
    if (!isPizza) return item.price;
    return selectedSize === 'small' ? parseInt(item.description.match(/Small: ₹(\d+)/)?.[1] || item.price) : item.price;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, isPizza ? selectedSize : null);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden card-hover group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-primary-red text-white text-xs font-semibold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-text-primary">{item.rating}</span>
        </div>

        {/* Name */}
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-1 truncate">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Size Selection for Pizza */}
        {isPizza && (
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => handleSizeChange('small')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedSize === 'small'
                  ? 'bg-primary-red text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Small
            </button>
            <button
              onClick={() => handleSizeChange('medium')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedSize === 'medium'
                  ? 'bg-primary-red text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Medium
            </button>
          </div>
        )}

        {/* Price and Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-text-primary">₹{getPrice()}</span>
            {isPizza && (
              <span className="text-xs text-gray-500 ml-1">
                ({selectedSize})
              </span>
            )}
          </div>
          
          {quantity > 0 ? (
            <div className="flex items-center space-x-2 bg-success text-white rounded-full px-2 py-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateQuantity(cartItem.id, quantity - 1);
                }}
                className="p-1 hover:bg-white/20 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-medium min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(item, isPizza ? selectedSize : null);
                }}
                className="p-1 hover:bg-white/20 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 bg-primary-red text-white hover:bg-primary-dark hover:shadow-lg active:scale-95"
            >
              <Plus size={18} />
              <span className="text-sm">Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
