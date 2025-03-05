import React, { useState } from 'react';
import LaitCremeConcentre from '../assets/LaitCremeConcentre.jpeg';
import { 
  ChevronLeft, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ChevronDown,
  ChevronUp 
} from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="font-semibold text-[rgb(6,31,108)]">{question}</span>
        {isOpen ? <ChevronUp size={20} className="text-[rgb(6,31,108)]" /> : <ChevronDown size={20} className="text-[rgb(6,31,108)]" />}
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-700">
          {answer}
        </div>
      )}
    </div>
  );
};

const ReviewCard = ({ name, skinType, ageRange, title, content, keyFeatures, scent }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-[rgb(6,31,108)]">{name}</h3>
          <p className="text-sm text-gray-600">{skinType} | {ageRange}</p>
        </div>
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
      </div>
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-gray-700 mb-4">{content}</p>
      <div className="mb-4">
        <h5 className="font-semibold text-sm mb-2">Key Features:</h5>
        <p className="text-gray-600 text-sm">{keyFeatures}</p>
      </div>
      <div>
        <span className="text-sm text-gray-600">Scent: {scent}</span>
      </div>
    </div>
  );
};

const Product = () => {
  const [selectedSize, setSelectedSize] = useState('2.54 Fl.oz');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Benefits');
  const [activeSection, setActiveSection] = useState('Details');

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const faqQuestions = [
    {
      question: "Is this cream non-comedogenic?",
      answer: "Yes, the Lait-Crème Concentré is non-comedogenic, making it suitable for various skin types."
    },
    {
      question: "How long can the Lait-Crème Concentré be stored?",
      answer: "You can store it for 12 months after opening. The expiration date is indicated on the box and the tube."
    },
    {
      question: "Is the Lait Crème Concentré also a makeup base?",
      answer: "Yes, it is an excellent makeup base. Many users and makeup artists use it to create a smooth canvas for makeup application."
    }
  ];

  const reviews = [
    {
      name: "Naima A",
      skinType: "Combination",
      ageRange: "45 - 54",
      title: "My go to",
      content: "My go to moisturizer, I've been hooked since my sister turned me on to it. I will keep replenishing it…I especially love it as a makeup primer.",
      keyFeatures: "Hydrating. Multitasking. Great Results. Great For My skin Type.",
      scent: "Fresh"
    },
    {
      name: "Deirdre P",
      skinType: "Combination",
      ageRange: "45 - 54",
      title: "Amazing!",
      content: "Full disclosure: I am a beauty junkie- I will buy anything, usually try it a few times, and then it gets pushed to back of the medicine cabinet. Not with this! The texture is amazing- this just melts into my skin. Keeps me totally moisturized, but doesn't feel heavy on my face. It just feels like I have perfectly smooth skin. Love it- I will never be without this!",
      keyFeatures: "Easy To Use. Gentle. Hydrating. Multitasking. Great Results. Great Texture. Great For My skin Type.",
      scent: "Unscented"
    },
    {
      name: "Susan H",
      skinType: "Sensitive",
      ageRange: "65+",
      title: "Silky cream",
      content: "This cream has a silky texture and absorbs quickly. Leaves my rosacea plagued skin hydrated w no greasy feel. I apply a spf in the morning over embryolisse then after washing face at night use as a night cream. I prefer un scented products however this light floral fragrance fades quickly.",
      keyFeatures: "Fast Acting. Hydrating. Great Texture.",
      scent: "Floral"
    }
  ];

  return (
    <div className="bg-[rgb(255,240,222)] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Navigation and Favorites */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-[rgb(6,31,108)]">
            <ChevronLeft size={24} />
          </button>
          <button className="text-[rgb(6,31,108)]">
            <Heart size={24} />
          </button>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-600">laboratoires</p>
          <h1 className="text-3xl font-light text-[rgb(6,31,108)] tracking-wider">EMBRYOLISSE</h1>
        </div>

        {/* Product Details - Responsive Grid */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:grid lg:grid-cols-2">
          {/* Product Image */}
          <div className="w-full aspect-square bg-[rgb(255,245,235)] flex items-center justify-center">
            <img 
              src={LaitCremeConcentre}
              alt="Lait-Crème Concentré" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-[rgb(6,31,108)]">
                  Lait-Crème Concentré
                </h2>
                <p className="text-gray-600">Daily Face and Body Cream</p>
              </div>
              <div className="flex items-center space-x-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
                <span className="text-gray-600 ml-2 text-sm">(108)</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-[rgb(6,31,108)] font-semibold text-2xl">
              $29.00
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <p className="text-gray-700">Size:</p>
              <div className="flex space-x-2">
                {['2.54 Fl.oz', '1.01 Fl.oz'].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`
                      px-4 py-2 rounded-lg 
                      ${selectedSize === size 
                        ? 'bg-[rgb(6,31,108)] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                  className="bg-gray-100 p-2 rounded-lg"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="bg-gray-100 p-2 rounded-lg"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-2">
              <button className="w-full bg-[rgb(6,31,108)] text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90">
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </button>
              <button className="w-full border border-[rgb(6,31,108)] text-[rgb(6,31,108)] py-3 rounded-lg">
                Buy with Payment Options
              </button>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex space-x-4 border-b mb-4 overflow-x-auto">
                {['Benefits', 'How to use', 'Ingredients', 'Ecoconception'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`
                      py-2 whitespace-nowrap
                      ${activeTab === tab 
                        ? 'border-b-2 border-[rgb(6,31,108)] text-[rgb(6,31,108)]' 
                        : 'text-gray-500'}
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div>
                {activeTab === 'Benefits' && (
                  <div className="space-y-4">
                    <p>Recommended by beauty pros and used by professional makeup artists, everyone swears by this multi-functional product to take care of fragile skin and keep it beautiful.</p>
                    <p>Its winning formula includes a blend of essential ingredients from natural origin. Rich in fatty acids and vitamins, it delivers nutrients to the skin, retains moisture, and protects it from external aggressions.</p>
                    
                    <h3 className="font-semibold text-[rgb(6,31,108)]">Multi-Purpose Functionality:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Moisturizing cream</li>
                      <li>Mask</li>
                      <li>Make-up base</li>
                      <li>Cleansing milk</li>
                      <li>After-shave</li>
                      <li>After-sun care</li>
                    </ul>
                  </div>
                )}
                {/* Other tab contents would be similarly styled */}
              </div>
            </div>
          </div>
        </div>

        {/* Sections Selector */}
        <div className="flex space-x-4 justify-center my-6">
          {['Details', 'FAQ', 'Reviews'].map((section) => (
            <button
              key={section}
              onClick={() => handleSectionChange(section)}
              className={`
                py-2 px-4 rounded-lg
                ${activeSection === section 
                  ? 'bg-[rgb(6,31,108)] text-white' 
                  : 'bg-white text-[rgb(6,31,108)] border border-[rgb(6,31,108)]'}
              `}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Additional Content Sections - Responsive Grid for larger screens */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* FAQ and Reviews Sections */}
          <div>
            {activeSection === 'FAQ' && (
              <div className="bg-white rounded-2xl shadow-xl mb-6">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[rgb(6,31,108)] mb-4">Frequently Asked Questions</h2>
                  {faqQuestions.map((faq, index) => (
                    <FAQItem 
                      key={index} 
                      question={faq.question} 
                      answer={faq.answer} 
                    />
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'Reviews' && (
              <div className="bg-white rounded-2xl shadow-xl mb-6">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6 flex-wrap">
                    <h2 className="text-2xl font-bold text-[rgb(6,31,108)]">Customer Reviews</h2>
                    <div className="flex items-center space-x-1 text-yellow-500 mt-2 sm:mt-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                      <span className="text-gray-600 ml-2">4.85 (108 reviews)</span>
                    </div>
                  </div>
                  <button className="w-full bg-[rgb(6,31,108)] text-white py-3 rounded-lg mb-6">
                    Write a Review
                  </button>
                  {reviews.map((review, index) => (
                    <ReviewCard 
                      key={index}
                      name={review.name}
                      skinType={review.skinType}
                      ageRange={review.ageRange}
                      title={review.title}
                      content={review.content}
                      keyFeatures={review.keyFeatures}
                      scent={review.scent}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Newsletter Section - Always visible on larger screens */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl mb-6">
              <div className="p-6">
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
            </div>
            
            {/* Additional content section for large screens */}
            <div className="bg-white rounded-2xl shadow-xl mb-6 hidden lg:block">
              <div className="p-6">
                <h3 className="text-xl font-bold text-[rgb(6,31,108)] mb-4">Our Bestsellers</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[rgb(255,245,235)] rounded-lg"></div>
                    <div>
                      <h4 className="font-medium text-[rgb(6,31,108)]">Lait-Crème Sensitive</h4>
                      <p className="text-gray-600 text-sm">For sensitive skin</p>
                      <p className="text-[rgb(6,31,108)] font-semibold mt-1">$32.00</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[rgb(255,245,235)] rounded-lg"></div>
                    <div>
                      <h4 className="font-medium text-[rgb(6,31,108)]">Hydra-Mask</h4>
                      <p className="text-gray-600 text-sm">Intensive hydration</p>
                      <p className="text-[rgb(6,31,108)] font-semibold mt-1">$25.00</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[rgb(255,245,235)] rounded-lg"></div>
                    <div>
                      <h4 className="font-medium text-[rgb(6,31,108)]">Micellar Water</h4>
                      <p className="text-gray-600 text-sm">Gentle cleansing</p>
                      <p className="text-[rgb(6,31,108)] font-semibold mt-1">$22.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;