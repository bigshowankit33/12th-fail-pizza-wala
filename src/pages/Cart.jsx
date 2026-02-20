import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();

  const deliveryFee = cartTotal > 799 ? 0 : 49;
  const finalTotal = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-light rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-text-secondary" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Your cart is empty
            </h2>
            <p className="text-text-secondary mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/menu"
              className="btn-primary inline-flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Browse Menu
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
            Your Cart
          </h1>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <Trash2 size={18} />
            <span className="text-sm font-medium">Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="text-xs text-text-secondary bg-gray-light p-2 rounded">
                    Free delivery on orders above ₹799
                  </div>
                )}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-bold text-lg text-text-primary">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full btn-primary text-center py-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/menu"
                className="block w-full text-center mt-3 text-primary-red font-medium hover:underline"
              >
                Add more items
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
