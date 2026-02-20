import { Link } from 'react-router-dom';
import { ChefHat, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-text-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-red text-white p-2 rounded-full">
                <ChefHat size={24} />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold">12th Fail</h2>
                <p className="text-sm text-gray-400">Pizza Wala</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Serving the best pizzas in town with fresh ingredients and authentic recipes. Your satisfaction is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-red transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-primary-red transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-primary-red transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-red transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-red transition-colors">Pizza</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-red transition-colors">Sandwich</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-red transition-colors">Burger</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-red transition-colors">French Fries</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-red transition-colors">Garlic Bread</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} className="flex-shrink-0" />
                <span>Galiyon ke andar</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={18} className="flex-shrink-0" />
                <span>98-111-111</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 12th Fail Pizza Wala. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-red text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-red text-sm transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-red text-sm transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
