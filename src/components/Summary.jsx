import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ChevronLeft 
} from 'lucide-react';

const ProductCard = ({ product, onFavorite, isFavorited }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Product Image */}
      <div className="w-full aspect-square bg-[rgb(255,245,235)] flex items-center justify-center">
        <img 
          src={`/api/placeholder/300/300?text=${encodeURIComponent(product.name)}`} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-[rgb(6,31,108)]">{product.name}</h3>
          </div>
          <button 
            onClick={() => onFavorite(product.id)}
            className={`
              transition-colors duration-300
              ${isFavorited ? 'text-red-500' : 'text-[rgb(6,31,108)]'}
              hover:text-red-500
            `}
          >
            <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              fill={i < product.rating ? 'currentColor' : 'none'}
              stroke="currentColor"
            />
          ))}
          <span className="text-gray-600 ml-2 text-sm">({product.reviewCount})</span>
        </div>

        {/* Price and Discount */}
        <div className="flex justify-between items-center">
          <div className="text-[rgb(6,31,108)] font-semibold text-2xl">
            ${product.price.toFixed(2)}
          </div>
          {product.discount > 0 && (
            <span className="text-green-600 font-semibold">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button className="w-full bg-[rgb(6,31,108)] text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90">
          <ShoppingCart size={20} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

const Summary = () => {
  const location = useLocation();
  const { userResponse = {}, recommendations = [] } = location.state || {};
  
  // State to track favorited products
  const [favoritedProducts, setFavoritedProducts] = useState(new Set());

  const handleFavorite = (productId) => {
    setFavoritedProducts(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Mock product data with additional details
  const enrichedRecommendations = recommendations.map((product, index) => ({
    ...product,
    rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
    reviewCount: Math.floor(Math.random() * 200) + 10, // Random review count
    price: Math.floor(Math.random() * 50) + 20, // Random price $20-$70
    discount: index % 2 === 0 ? Math.floor(Math.random() * 30) : 0 // Random discount for some products
  }));

  return (
    <div className="bg-[rgb(255,240,222)] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-[rgb(6,31,108)]">
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">laboratoires</p>
          <h1 className="text-3xl font-light text-[rgb(6,31,108)] tracking-wider">EMBRYOLISSE</h1>
        </div>

        {/* Recommendations Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[rgb(6,31,108)] mb-2">
              Welcome, {userResponse.name || 'Skincare Enthusiast'}!
            </h2>
            <p className="text-gray-600 text-lg">
              Discover your personalized Embryolisse skincare solutions
            </p>
          </div>

          {enrichedRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enrichedRecommendations.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onFavorite={handleFavorite}
                  isFavorited={favoritedProducts.has(product.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-center text-xl">
              No recommendations found. Let's discover your perfect skincare routine!
            </p>
          )}

          {/* Newsletter Section */}
          <div className="mt-12 bg-[rgb(255,245,235)] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[rgb(6,31,108)] mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">Sign up to our newsletter to receive exclusive offers.</p>
            <div className="flex flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[rgb(6,31,108)]"
              />
              <button className="bg-[rgb(6,31,108)] text-white px-4 py-2 rounded-lg sm:rounded-l-none mt-2 sm:mt-0">
                Subscribe
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 italic text-lg">
              "Radiant skin is just a step away with Embryolisse"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;