import { categories } from '../data/foodData';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="sticky top-16 z-40 bg-white py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Scrollable Categories */}
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-primary-red text-white shadow-lg'
                : 'bg-gray-light text-text-primary hover:bg-gray-200'
            }`}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.slug)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.slug
                  ? 'bg-primary-red text-white shadow-lg'
                  : 'bg-gray-light text-text-primary hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
