import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-[rgb(6,31,108)] h-2.5 rounded-full transition-all duration-300 ease-in-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;