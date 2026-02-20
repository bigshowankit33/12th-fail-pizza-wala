import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-border animate-fadeIn">
      {/* Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading font-semibold text-text-primary truncate">
          {item.name}
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          ₹{item.price} each {item.size && `- ${item.size}`}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-gray-light rounded-full">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Minus size={16} className="text-text-primary" />
          </button>
          <span className="w-10 text-center font-semibold text-text-primary">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Plus size={16} className="text-text-primary" />
          </button>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-text-primary">
          ₹{item.price * item.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
