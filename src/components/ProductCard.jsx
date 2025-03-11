import React, { useState, useEffect } from 'react';
import { AlertCircle, Star, Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onFavorite, isFavorited }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    try {
      if (product?.imageUrl) {
        // Remove the `\x` prefix if present
        let hexString = product.imageUrl;
        if (hexString.startsWith('\\x')) {
          hexString = hexString.substring(2); // Remove the `\x` prefix
        }

        // Convert the hexadecimal string to a base64 string
        const base64String = hexToBase64(hexString);

        // Add the data URL prefix
        const validBase64Url = `data:image/jpeg;base64,${base64String}`;
        setImageUrl(validBase64Url);
        setImageError(false);
      } else {
        setImageError(true);
        console.log(`No image available for product: ${product?.name || 'Unknown'}`);
      }
    } catch (error) {
      setImageError(true);
      console.error('Error processing product image:', error);
    }
  }, [product]);

  // Helper function to convert a hexadecimal string to a base64 string
  const hexToBase64 = (hexString) => {
    // Convert the hexadecimal string to a byte array
    const byteArray = new Uint8Array(hexString.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16)));
    // Convert the byte array to a base64 string
    return btoa(String.fromCharCode.apply(null, byteArray));
  };

  // Handle null product scenario
  if (!product) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-orange-500 mb-2" />
          <p className="text-gray-600">Product information unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Product Image */}
      <div className="w-full aspect-square bg-[rgb(255,245,235)] flex items-center justify-center">
        {!imageError && imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product.name || 'Product image'} 
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Failed to load image for product: ${product.name || 'Unknown'}`);
              console.error(`Image URL attempted: ${imageUrl.substring(0, 30)}...`);
              setImageError(true);
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <AlertCircle size={32} className="text-gray-400 mb-2" />
            <p className="text-gray-600 text-center">No image available</p>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-[rgb(6,31,108)]">
              {product.name || 'Unknown Product'}
            </h3>
          </div>
          <button 
            onClick={() => onFavorite(product.productId)}
            className={`
              transition-colors duration-300
              ${isFavorited ? 'text-red-500' : 'text-[rgb(6,31,108)]'}
              hover:text-red-500
            `}
          >
            <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 line-clamp-2">
          {product.description || 'No description available.'}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              fill={i < (product.rating || 0) ? 'currentColor' : 'none'}
              stroke="currentColor"
            />
          ))}
          <span className="text-gray-600 ml-2 text-sm">({product.reviewCount || 0})</span>
        </div>

        {/* Price and Discount */}
        <div className="flex justify-between items-center">
          <div className="text-[rgb(6,31,108)] font-semibold text-2xl">
            ${(product.price || 0).toFixed(2)}
          </div>
          {(product.discount || 0) > 0 && (
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

export default ProductCard;