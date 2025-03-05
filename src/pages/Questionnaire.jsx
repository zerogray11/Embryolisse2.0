import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionStep from '../components/QuestionStep';
import ProgressBar from '../components/ProgressBar';
import Summary from '../components/Summary';
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
    const key = steps[currentStep].key;
    const updatedResponse = { ...userResponse, [key]: value };
    setUserResponse(updatedResponse);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Ensure all required fields are filled
      if (
        updatedResponse.name.trim() === '' ||
        updatedResponse.age === '' ||
        updatedResponse.skinTypeName === null ||
        updatedResponse.breakoutName === null ||
        updatedResponse.concernName === null ||
        updatedResponse.targetAreaName === null ||
        updatedResponse.dryInWinter === null ||
        updatedResponse.spendsTimeInSun === null
      ) {
        alert('Please answer all questions before submitting.');
        return;
      }
      submitQuestionnaire(updatedResponse);
    }
  };

  const submitQuestionnaire = async (responses) => {
    setLoading(true);
    setError(null);

    try {
      const apiResponses = await Promise.all([
        getProductsBySkinType(responses.skinTypeName),
        getProductsByBreakout(responses.breakoutName),
        getProductsByConcern(responses.concernName),
        getProductsByTargetArea(responses.targetAreaName),
        getProductsByForWinter(responses.dryInWinter),
        getProductsByForSun(responses.spendsTimeInSun),
      ]);

      // Combine all products into a single list
      const allProducts = apiResponses.flatMap((response) => response.data);

      // Navigate to the summary page with userResponse and recommendations
      navigate('/summary', { state: { userResponse: responses, recommendations: allProducts } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Brand title added with margin bottom */}
      <div className="text-center mb-8 pt-4">
        <p className="text-sm text-gray-600">laboratoires</p>
        <h1 className="text-3xl font-light text-[rgb(6,31,108)] tracking-wider">EMBRYOLISSE</h1>
      </div>

      <ProgressBar currentStep={currentStep + 1} totalSteps={steps.length} />
      {currentStep < steps.length ? (
        <QuestionStep
          question={steps[currentStep].question}
          options={steps[currentStep].options}
          type={steps[currentStep].type}
          onNext={handleNext}
        />
      ) : (
        <Summary userResponse={userResponse} recommendations={[]} />
      )}
    </div>
  );
};

export default Questionnaire;