import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import ProductCard from './ProductCard'; // Import the ProductCard component

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userResponse = {}, recommendations = [] } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  
  // State to track favorited products
  const [favoritedProducts, setFavoritedProducts] = useState(new Set());

  useEffect(() => {
    // Process recommendations that come directly from the backend
    try {
      if (Array.isArray(recommendations) && recommendations.length > 0) {
        // Enhance products with mock data since ProductResponse doesn't include all UI fields
        const enhancedProducts = recommendations.map((product, index) => ({
          ...product,
          rating: Math.floor(Math.random() * 5) + 1, // Random rating 1-5
          reviewCount: Math.floor(Math.random() * 200) + 10, // Random review count
          price: Math.floor(Math.random() * 50) + 20, // Random price $20-$70
          discount: index % 2 === 0 ? Math.floor(Math.random() * 30) : 0 // Random discount for some products
        }));
        setProducts(enhancedProducts);
        console.log('Products processed successfully:', enhancedProducts);
      } else {
        console.log('No recommendations available in location state');
        setProducts([]);
      }
    } catch (error) {
      console.error('Error processing recommendations:', error);
      setError('Failed to process product recommendations');
    }
  }, [recommendations]);

  // Function to handle fetching products if needed
  const fetchProducts = async (params) => {
    setLoading(true);
    setError(null);
    
    try {
      // Example of how to fetch products based on different criteria
      let endpoint = '';
      let queryParam = '';
      
      if (params.skinType) {
        endpoint = '/api/products/skintype';
        queryParam = `skinTypeName=${encodeURIComponent(params.skinType)}`;
      } else if (params.concern) {
        endpoint = '/api/products/concern';
        queryParam = `concernName=${encodeURIComponent(params.concern)}`;
      } else if (params.breakout) {
        endpoint = '/api/products/breakout';
        queryParam = `breakoutName=${encodeURIComponent(params.breakout)}`;
      } else if (params.targetArea) {
        endpoint = '/api/products/targetarea';
        queryParam = `targetAreaName=${encodeURIComponent(params.targetArea)}`;
      } else if (params.forWinter !== undefined) {
        endpoint = `/api/products/forWinter/${params.forWinter}`;
      } else if (params.forSun !== undefined) {
        endpoint = `/api/products/forSun/${params.forSun}`;
      }
      
      if (endpoint) {
        const url = queryParam ? `${endpoint}?${queryParam}` : endpoint;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const productData = await response.json();
        
        // If valid product returned, add to products with mock data
        if (productData && productData.productId) {
          const enhancedProduct = {
            ...productData,
            rating: Math.floor(Math.random() * 5) + 1,
            reviewCount: Math.floor(Math.random() * 200) + 10,
            price: Math.floor(Math.random() * 50) + 20,
            discount: Math.random() > 0.5 ? Math.floor(Math.random() * 30) : 0
          };
          
          setProducts(prev => [...prev, enhancedProduct]);
          console.log('Product fetched successfully:', enhancedProduct);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to fetch product recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = (productId) => {
    if (!productId) {
      console.warn('Attempted to favorite a product with no ID');
      return;
    }
    
    setFavoritedProducts(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
        console.log(`Product ${productId} removed from favorites`);
      } else {
        newFavorites.add(productId);
        console.log(`Product ${productId} added to favorites`);
      }
      return newFavorites;
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[rgb(255,240,222)] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button 
            className="text-[rgb(6,31,108)]"
            onClick={handleBackClick}
          >
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

          {/* Error display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center">
              <AlertCircle size={20} className="mr-2" />
              <p>{error}</p>
            </div>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="text-center p-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[rgb(6,31,108)] border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          )}

          {!loading && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.productId || `product-${Math.random()}`} 
                  product={product}
                  onFavorite={handleFavorite}
                  isFavorited={favoritedProducts.has(product.productId)}
                />
              ))}
            </div>
          ) : (
            !loading && !error && (
              <p className="text-gray-700 text-center text-xl p-8">
                No recommendations found. Let's discover your perfect skincare routine!
              </p>
            )
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