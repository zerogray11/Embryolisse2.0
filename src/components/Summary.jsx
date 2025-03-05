import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingBag, Star, Heart } from 'lucide-react';

const ProductCard = ({ product, onFavorite, isFavorited }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Placeholder */}
      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
        <img 
          src={`/api/placeholder/300/200?text=${encodeURIComponent(product.name)}`} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain"
        />
        
        {/* Hover Effect */}
        <div className={`
          absolute inset-0 bg-[rgb(6,31,108)] bg-opacity-0 
          transition-all duration-300
          flex items-center justify-center
          ${isHovered ? 'bg-opacity-70' : ''}
        `}>
          {isHovered && (
            <div className="text-white text-center px-4">
              <p className="text-sm mb-2">{product.description}</p>
              <div className="flex justify-center space-x-4">
                <button 
                  className="bg-white text-[rgb(6,31,108)] px-4 py-2 rounded-lg flex items-center hover:bg-gray-100"
                  onClick={() => {/* Add to cart logic */}}
                >
                  <ShoppingBag size={20} className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <button 
            onClick={() => onFavorite(product.id)}
            className={`
              transition-colors duration-300
              ${isFavorited ? 'text-red-500' : 'text-gray-300'}
              hover:text-red-500
            `}
          >
            <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                fill={i < product.rating ? 'currentColor' : 'none'}
                stroke="currentColor"
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm">({product.reviewCount} reviews)</span>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-[rgb(6,31,108)]">${product.price.toFixed(2)}</span>
          <span className="text-green-600 font-semibold">
            {product.discount > 0 ? `${product.discount}% OFF` : ''}
          </span>
        </div>
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
    <div className="bg-[rgb(255,240,222)] min-h-screen flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
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

        <div className="text-center mt-6">
          <p className="text-gray-600 italic">
            "Radiant skin is just a step away with Embryolisse"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;