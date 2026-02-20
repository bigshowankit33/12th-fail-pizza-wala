import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChefHat, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-red text-white p-2 rounded-full">
              <ChefHat size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-text-primary">
                12th Fail
              </h1>
              <p className="text-xs text-text-secondary">Pizza Wala</p>
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-text-secondary" />
              </div>
              <input
                type="text"
                placeholder="Search for pizza, burger, pasta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-light border-none rounded-full focus:outline-none focus:ring-2 focus:ring-primary-red text-sm"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Admin Dashboard Button */}
            <Link
              to="/admin"
              className={`hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                isActive('/admin')
                  ? 'bg-primary-red text-white'
                  : 'text-text-primary hover:bg-gray-light'
              }`}
            >
              <Settings size={20} />
              <span className="font-medium">Admin</span>
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className={`relative flex items-center justify-center p-2 rounded-full transition-colors ${
                isActive('/cart')
                  ? 'bg-primary-red text-white'
                  : 'text-text-primary hover:bg-gray-light'
              }`}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-light"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-text-secondary" />
            </div>
            <input
              type="text"
              placeholder="Search for pizza, burger, pasta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-light border-none rounded-full focus:outline-none focus:ring-2 focus:ring-primary-red text-sm"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg ${
                  isActive('/') ? 'bg-primary-red text-white' : 'hover:bg-gray-light'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`px-4 py-2 rounded-lg ${
                  isActive('/menu') ? 'bg-primary-red text-white' : 'hover:bg-gray-light'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/cart"
                className={`px-4 py-2 rounded-lg ${
                  isActive('/cart') ? 'bg-primary-red text-white' : 'hover:bg-gray-light'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg ${
                  isActive('/login') ? 'bg-primary-red text-white' : 'hover:bg-gray-light'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-lg ${
                isActive('/admin') ? 'bg-primary-red text-white' : 'hover:bg-gray-light'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
