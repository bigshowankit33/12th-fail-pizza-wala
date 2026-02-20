import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, User, Home, Building, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state add kiya
  const [orderId, setOrderId] = useState(''); // Real Order ID dikhane ke liye
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    deliveryType: 'home',
    paymentMethod: 'cod',
    instructions: '',
  });

  const deliveryFee = cartTotal > 799 ? 0 : 49;
  const finalTotal = formData.deliveryType === 'pickup' ? (cartTotal + deliveryFee - 50) : (cartTotal + deliveryFee);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // --- Backend Integration Start ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      items: cartItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        id: item.id
      })),
      totalPrice: finalTotal,
      customerDetails: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        instructions: formData.instructions
      },
      paymentMethod: formData.paymentMethod,
      deliveryType: formData.deliveryType
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderId(data.order._id); // Backend se aayi real ID
        setOrderPlaced(true);
        clearCart();
      } else {
        alert(data.message || "Order fail ho gaya bhai!");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Server connect nahi ho pa raha!");
    } finally {
      setLoading(false);
    }
  };
  // --- Backend Integration End ---

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-4">Your cart is empty</h2>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">Order Placed Successfully!</h2>
            <p className="text-text-secondary mb-6">"12th Fail Pizza Wala" aapka order jald hi deliver karega!</p>
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-sm text-text-secondary">
                Order ID: <span className="font-mono font-medium text-primary-red">#{orderId}</span>
              </p>
            </div>
            <div className="space-y-3">
              <Link to="/" className="w-full bg-primary-red text-white py-3 rounded-xl block font-bold">Back to Home</Link>
              <Link to="/menu" className="text-primary-red hover:underline block font-medium">Order More Items</Link>
            </div>
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
        {/* Back Link */}
        <div className="mb-8">
          <Link to="/cart" className="flex items-center gap-2 text-text-secondary hover:text-primary-red mb-4">
            <ArrowLeft size={20} /> <span>Back to Cart</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact & Address Form logic remains same as your original UI */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">Contact & Delivery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="border p-3 rounded-xl w-full" />
                   <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="border p-3 rounded-xl w-full" />
                </div>
                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Delivery Address" required rows={3} className="border p-3 rounded-xl w-full mt-4 resize-none" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                   <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="border p-3 rounded-xl w-full" />
                   <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="border p-3 rounded-xl w-full" />
                </div>
              </div>

              {/* Delivery Type & Payment logic remains same... */}
              {/* (Maine UI code thoda short rakha hai reference ke liye, aapka purana JSX yahan perfectly fit hoga) */}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 text-lg font-semibold rounded-xl text-white transition-all ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" /> Placing Order...</span> : `Place Order - ₹${finalTotal}`}
              </button>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-heading font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name} x {item.quantity}</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
                <div className="flex justify-between font-bold text-xl border-t pt-2 mt-2"><span>Total</span><span>₹{finalTotal}</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;