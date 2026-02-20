import { Star, Clock, Truck, Gift, MapPin } from 'lucide-react';
import { restaurantInfo } from '../data/foodData';

const RestaurantBanner = () => {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={restaurantInfo.image}
          alt={restaurantInfo.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Restaurant Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            {/* Left Side - Restaurant Details */}
            <div className="text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2">
                {restaurantInfo.name}
              </h1>
              <p className="text-white/80 text-sm sm:text-base mb-3">
                {restaurantInfo.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {/* Rating */}
                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{restaurantInfo.rating}</span>
                  <span className="text-white/70">({restaurantInfo.reviewCount}+)</span>
                </div>
                
                {/* Delivery Time */}
                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Clock size={16} />
                  <span>{restaurantInfo.deliveryTime}</span>
                </div>

                {/* Delivery Fee */}
                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Truck size={16} />
                  <span>₹{restaurantInfo.deliveryFee}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center space-x-2 mt-3 text-white/80 text-sm">
                <MapPin size={16} />
                <span>{restaurantInfo.address}</span>
              </div>
            </div>

            {/* Right Side - Offers */}
            <div className="flex flex-wrap gap-2">
              {restaurantInfo.offers.map((offer, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white text-primary-red px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  <Gift size={16} />
                  <span>{offer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;
