import React from 'react';

const TWIAlkohole = ({ formData, updateFormData, errors, onNext, onPrev, isSubmitting }) => {
  const handleAlcoholChange = (status) => {
    updateFormData('alcoholStatus', status);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 py-5 w-[500px] mx-auto text-center">
      <div className="text-gray-500 text-sm mb-10">
        Just answer 4 simple questions to get more accurate quotes
      </div>
      <hr className="mb-5" />
      <div className="text-xl font-medium text-gray-700 mb-6">
        Do You take alcohol ?
      </div>
      
      <div className="text-sm text-gray-500 mb-6">
        Select <span className="text-primary font-semibold text-base mt-1">Yes</span> If you have smoked or chewed tobacco in last 12 months
      </div>

      {/* Alcohol Options */}
      <div className="flex justify-center gap-4 mb-20">
        <button
          type="button"
          className={`px-10 py-3 rounded-lg text-lg font-medium border transition-all duration-200 focus:outline-none ${formData.alcoholStatus === 'Yes'
            ? 'bg-primary text-white border-primary shadow'
            : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
          }`}
          onClick={() => handleAlcoholChange('Yes')}
        >
          Yes
        </button>
        <button
          type="button"
          className={`px-10 py-3 rounded-lg text-lg font-medium border transition-all duration-200 focus:outline-none ${formData.alcoholStatus === 'No'
            ? 'bg-primary text-white border-primary shadow'
            : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
          }`}
          onClick={() => handleAlcoholChange('No')}
        >
          No
        </button>
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
          disabled={isSubmitting}
          className={`px-6 py-3 bg-primary text-white border-none rounded-lg font-bold cursor-pointer transition-colors ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-primaryDark'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'View Plans'}
        </button>
      </div>
    </div>
  );
};

export default TWIAlkohole;