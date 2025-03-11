import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionStep from '../components/QuestionStep';
import ProgressBar from '../components/ProgressBar';
import {
  getProductsBySkinType,
  getProductsByBreakout,
  getProductsByConcern,
  getProductsByTargetArea,
  getProductsByForWinter,
  getProductsByForSun,
} from '../services/api';

// Steps for the questionnaire
const steps = [
  { id: 1, question: 'Please enter your name.', key: 'name', type: 'text' },
  { id: 2, question: 'Please enter your age.', key: 'age', type: 'number' },
  {
    id: 3,
    question: 'How would you describe your skin type?',
    key: 'skinTypeName',
    options: ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive'],
  },
  {
    id: 4,
    question: 'How often do you experience breakouts?',
    key: 'breakoutName',
    options: ['Never', 'Rarely', 'Sometimes', 'Frequently'],
  },
  {
    id: 5,
    question: 'What is your top skin concern?',
    key: 'concernName',
    options: ['Acne', 'Dark spots', 'Redness', 'Wrinkles', 'Fine lines', 'Dryness', 'Oiliness', 'Uneven texture'],
  },
  {
    id: 6,
    question: 'What areas would you like to target with our products?',
    key: 'targetAreaName',
    options: ['Hands', 'Body', 'Face', 'Lips', 'Eyes'],
  },
  {
    id: 7,
    question: 'Do you experience drier skin in the winter?',
    key: 'dryInWinter',
    type: 'boolean',
  },
  {
    id: 8,
    question: 'Do you spend a lot of time in the sun?',
    key: 'spendsTimeInSun',
    type: 'boolean',
  },
];

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponse, setUserResponse] = useState({
    name: '',
    age: '',
    skinTypeName: null,
    breakoutName: null,
    concernName: null,
    targetAreaName: null,
    dryInWinter: null,
    spendsTimeInSun: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle next step
  const handleNext = (value) => {
    const step = steps[currentStep];
    const key = step.key;
    
    // Format the value based on the type
    let formattedValue = value;
    if (step.type === 'boolean') {
      formattedValue = value === 'true' || value === true;
    } else if (step.type === 'number' && value !== '') {
      formattedValue = parseInt(value, 10);
    }
    
    const updatedResponse = { ...userResponse, [key]: formattedValue };
    setUserResponse(updatedResponse);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Validate responses before submitting
      if (validateResponses(updatedResponse)) {
        submitQuestionnaire(updatedResponse);
      }
    }
  };

  // Validate all required fields
  const validateResponses = (responses) => {
    const requiredFields = [
      'name', 'age', 'skinTypeName', 'breakoutName', 
      'concernName', 'targetAreaName', 'dryInWinter', 'spendsTimeInSun'
    ];
    
    const missingFields = requiredFields.filter(field => {
      const value = responses[field];
      return value === null || value === undefined || 
             (typeof value === 'string' && value.trim() === '') ||
             (field === 'age' && isNaN(value));
    });
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => {
        const step = steps.find(s => s.key === field);
        return step ? step.question.replace('Please enter your ', '').replace('?', '') : field;
      });
      
      alert(`Please complete the following: ${missingFieldNames.join(', ')}`);
      return false;
    }
    
    return true;
  };

  const submitQuestionnaire = async (responses) => {
    setLoading(true);
    setError(null);
  
    try {
      console.log('Submitting questionnaire with responses:', responses);
      
      // Make API calls in parallel for better performance
      const apiCalls = [
        getProductsBySkinType(responses.skinTypeName),
        getProductsByBreakout(responses.breakoutName),
        getProductsByConcern(responses.concernName),
        getProductsByTargetArea(responses.targetAreaName),
        getProductsByForWinter(responses.dryInWinter),
        getProductsByForSun(responses.spendsTimeInSun),
      ];
      
      const apiResponses = await Promise.all(apiCalls);
      
      // Process and deduplicate products
      const productMap = new Map();
      
      apiResponses.forEach(response => {
        if (response && Array.isArray(response.data)) {
          response.data.forEach(product => {
            if (product && product.productId) {
              // Use productId as key to avoid duplicates
              productMap.set(product.productId, product);
            }
          });
        }
      });
      
      // Convert Map values to array
      const uniqueProducts = Array.from(productMap.values());
      console.log(`Found ${uniqueProducts.length} unique products`);
      
      // Add mock data for UI elements
      const enhancedProducts = uniqueProducts.map((product, index) => ({
        ...product,
        rating: Math.floor(Math.random() * 5) + 1,
        reviewCount: Math.floor(Math.random() * 200) + 10,
        price: Math.floor(Math.random() * 50) + 20,
        discount: index % 3 === 0 ? Math.floor(Math.random() * 30) : 0
      }));
      
      // Navigate to the summary page with all the data
      navigate('/summary', { 
        state: { 
          userResponse: responses, 
          recommendations: enhancedProducts 
        } 
      });
    } catch (err) {
      console.error('Error submitting questionnaire:', err);
      setError(err.message || 'Failed to process your responses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle back button
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(255,240,222)] py-8">
      {/* Brand title */}
      <div className="text-center mb-8 pt-4">
        <p className="text-sm text-gray-600">laboratoires</p>
        <h1 className="text-3xl font-light text-[rgb(6,31,108)] tracking-wider">EMBRYOLISSE</h1>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
        <ProgressBar currentStep={currentStep + 1} totalSteps={steps.length} />
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {/* Loading indicator */}
        {loading ? (
          <div className="text-center p-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[rgb(6,31,108)] border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Processing your responses...</p>
          </div>
        ) : (
          <QuestionStep
            question={steps[currentStep].question}
            options={steps[currentStep].options}
            type={steps[currentStep].type}
            onNext={handleNext}
            onBack={handleBack}
            showBack={currentStep > 0}
            value={userResponse[steps[currentStep].key]}
          />
        )}
      </div>
    </div>
  );
};

export default Questionnaire;