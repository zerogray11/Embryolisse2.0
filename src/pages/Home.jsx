import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Star, ShoppingCart } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToQuestionnaire = () => {
    navigate('/questionnaire');
  };

  const handleNavigateToProduct = () => {
    navigate('/product');
  };

  return (
    <div className="bg-[rgb(255,240,222)] min-h-screen flex flex-col">
      {/* Brand Header */}
      <div className="text-center py-8">
        <p className="text-sm text-gray-600">laboratoires</p>
        <h1 className="text-4xl font-light text-[rgb(6,31,108)] tracking-wider">EMBRYOLISSE</h1>
      </div>

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 flex flex-col justify-center items-center space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2 items-center">
            <Sparkles size={24} className="text-[rgb(6,31,108)]" />
            <h2 className="text-2xl font-semibold text-[rgb(6,31,108)]">
              Discover Your Perfect Skincare Routine
            </h2>
            <Sparkles size={24} className="text-[rgb(6,31,108)]" />
          </div>
          <p className="text-gray-700 max-w-xl mx-auto">
            Unlock the secret to radiant, healthy skin with our personalized skincare experience. 
            Take our quick questionnaire to find your ideal Embryolisse products.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4 w-full max-w-md">
          <button 
            onClick={handleNavigateToQuestionnaire}
            className="w-full bg-[rgb(6,31,108)] text-white py-4 rounded-lg 
            flex items-center justify-center space-x-2 hover:opacity-90 
            transition-all duration-300 transform hover:scale-105"
          >
            <Star size={20} />
            <span>Start Skincare Questionnaire</span>
          </button>

          <button 
            onClick={handleNavigateToProduct}
            className="w-full border-2 border-[rgb(6,31,108)] text-[rgb(6,31,108)] 
            py-4 rounded-lg flex items-center justify-center space-x-2 
            hover:bg-[rgb(6,31,108)] hover:text-white 
            transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart size={20} />
            <span>Browse Our Products</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Embryolisse Laboratoires. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;