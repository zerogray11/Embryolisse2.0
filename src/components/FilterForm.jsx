import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

const FilterForm = () => {
  // State to hold user selections
  const [skinType, setSkinType] = useState('');
  const [breakout, setBreakout] = useState('');
  const [concern, setConcern] = useState('');
  const [targetArea, setTargetArea] = useState('');
  const [forWinter, setForWinter] = useState(false);
  const [forSun, setForSun] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/filter?skinType=${skinType}&concern=${concern}&breakout=${breakout}&targetArea=${targetArea}&forWinter=${forWinter}&forSun=${forSun}`
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error('Error fetching products');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[rgb(255,240,222)] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">laboratoires</p>
          <h1 className="text-3xl font-light text-[rgb(6,31,108)] tracking-wider">EMBRYOLISSE</h1>
        </div>

        {/* Filter Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skin Type */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                How would you describe your skin type?
              </label>
              <div className="mt-2 space-y-2">
                {['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="skinType"
                      value={type}
                      onChange={(e) => setSkinType(e.target.value)}
                      className="form-radio h-4 w-4 text-[rgb(6,31,108)]"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Breakout Frequency */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                How often do you experience breakouts?
              </label>
              <div className="mt-2 space-y-2">
                {['Never', 'Rarely', 'Sometimes', 'Frequently'].map((frequency) => (
                  <label key={frequency} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="breakout"
                      value={frequency}
                      onChange={(e) => setBreakout(e.target.value)}
                      className="form-radio h-4 w-4 text-[rgb(6,31,108)]"
                    />
                    <span className="text-gray-700">{frequency}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Skin Concern */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                What is your top skin concern?
              </label>
              <div className="mt-2 space-y-2">
                {['Acne', 'Dark spots', 'Redness', 'Wrinkles', 'Fine lines', 'Dryness', 'Oiliness', 'Uneven texture'].map((concernType) => (
                  <label key={concernType} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="concern"
                      value={concernType}
                      onChange={(e) => setConcern(e.target.value)}
                      className="form-radio h-4 w-4 text-[rgb(6,31,108)]"
                    />
                    <span className="text-gray-700">{concernType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Target Area */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                What areas would you like to target with our products?
              </label>
              <div className="mt-2 space-y-2">
                {['Hands', 'Body', 'Face', 'Lips', 'Eyes'].map((area) => (
                  <label key={area} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="targetArea"
                      value={area}
                      onChange={(e) => setTargetArea(e.target.value)}
                      className="form-radio h-4 w-4 text-[rgb(6,31,108)]"
                    />
                    <span className="text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Winter Dry Skin */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Do you experience drier skin in the winter?
              </label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="forWinter"
                    value="true"
                    onChange={() => setForWinter(true)}
                    checked={forWinter === true}
                    className="form-radio h-4 w-4 text-[rgb(6,31,108)]"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="forWinter"
                    value="false"
                    onChange={() => setForWinter(false)}
                    checked={forWinter === false}
                    className="form-radio h-4 w-4 text-[rgb(6,31,108)]"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Sun Exposure */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Do you spend a lot of time in the sun?
              </label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="forSun"
                    value="true"
                    onChange={() => setForSun(true)}
                    checked={forSun === true}
                    className="form-radio h-4 w-4 text-[rgb(6,31,108)]"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="forSun"
                    value="false"
                    onChange={() => setForSun(false)}
                    checked={forSun === false}
                    className="form-radio h-4 w-4 text-[rgb(6,31,108)]"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[rgb(6,31,108)] text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90"
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </form>

          {/* Display filtered products */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-[rgb(6,31,108)] mb-4">Filtered Products:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="w-full aspect-square bg-[rgb(255,245,235)] flex items-center justify-center">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-[rgb(6,31,108)]">{product.name}</h3>
                      <button className="text-[rgb(6,31,108)] hover:text-red-500">
                        <Heart size={24} fill="none" />
                      </button>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-[rgb(6,31,108)] font-semibold text-2xl">
                        ${(product.price || 29.99).toFixed(2)}
                      </div>
                      {product.discount && (
                        <span className="text-green-600 font-semibold">{product.discount}% OFF</span>
                      )}
                    </div>
                    <button className="w-full bg-[rgb(6,31,108)] text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90">
                      <ShoppingCart size={20} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;