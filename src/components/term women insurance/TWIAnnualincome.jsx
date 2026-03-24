import React from 'react';

const TWIAnnualincome = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const incomeOptions = [
    '15 Lac +',
    '10 Lac to 14.9 Lac',
    '8 Lac to 9.9 Lac',
    '5 Lac to 7.9 Lac',
    '3 Lac to 4.9 Lac',
    '2 Lac to 2.9 Lac',
    'Less than 2 Lac'
  ];

  const handleIncomeChange = (income) => {
    updateFormData('annualIncome', income);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md mx-auto text-center w-[600px] mt-14">
      {/* Top Text */}
      <p className="text-gray-500 mb-2 text-sm py-3">
        Just answer 4 simple questions to get more accurate quotes
      </p>
      <hr className="mb-6 border-gray-200" />
      {/* Heading */}
      <h2 className="text-lg font-medium my-2">Select Your Annual Income</h2>
      
      {/* Income Options */}
      <div className="flex flex-col justify-center gap-1 mb-4">
        {incomeOptions.map((income) => (
          <button
            key={income}
            type="button"
            onClick={() => handleIncomeChange(income)}
            className={`px-6 py-2 rounded-md font-medium transition ${
              formData.annualIncome === income
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
            }`}
          >
            {income}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-3 text-primary hover:text-primaryDark transition-colors border rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        
        <button
          onClick={onNext}
          className="px-6 py-3 bg-primary text-white border-none rounded-lg font-bold cursor-pointer hover:bg-primaryDark transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TWIAnnualincome;
