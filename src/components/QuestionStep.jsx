import React, { useState } from 'react';

const QuestionStep = ({ question, options, type, onNext }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [textValue, setTextValue] = useState('');
  const [numberValue, setNumberValue] = useState('');

  const handleSubmit = () => {
    if (type === 'text' && textValue.trim() !== '') {
      onNext(textValue);
    } else if (type === 'number' && numberValue !== '') {
      onNext(Number(numberValue));
    } else if (selectedValue !== null) {
      onNext(selectedValue);
    } else {
      alert('Please select an option before proceeding.');
    }
  };
  return (
    <div className="bg-[rgb(255,240,222)] min-h-screen flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {question}
        </h2>

        {/* Render input based on type */}
        {type === 'text' ? (
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(6,31,108)]"
            placeholder="Enter your name"
          />
        ) : type === 'number' ? (
          <input
            type="number"
            value={numberValue}
            onChange={(e) => setNumberValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(6,31,108)]"
            placeholder="Enter your age"
          />
        ) : type === 'boolean' ? (
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ].map(({ value, label }) => (
              <button
                key={label}
                onClick={() => setSelectedValue(value)}
                className={`
                  py-3 
                  rounded-lg 
                  font-semibold 
                  transition-all 
                  duration-300 
                  ${selectedValue === value
                    ? 'bg-[rgb(6,31,108)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {label}
              </button>
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => setSelectedValue(option)}
                className={`
                  px-4 
                  py-3 
                  rounded-lg 
                  cursor-pointer 
                  transition-all 
                  duration-300 
                  ${selectedValue === option
                    ? 'bg-[rgb(6,31,108)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {option}
              </li>
            ))}
          </ul>
        )}

        {/* Next button */}
        <button
          onClick={handleSubmit}
          disabled={
            (type === 'text' && textValue.trim() === '') ||
            (type === 'number' && numberValue === '') ||
            (type !== 'text' && type !== 'number' && selectedValue === null)
          }
          className={`
            w-full 
            py-3 
            rounded-lg 
            font-semibold 
            transition-all 
            duration-300 
            ${(type === 'text' && textValue.trim() !== '') ||
            (type === 'number' && numberValue !== '') ||
            (type !== 'text' && type !== 'number' && selectedValue !== null)
              ? 'bg-[rgb(6,31,108)] text-white hover:opacity-90'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionStep;