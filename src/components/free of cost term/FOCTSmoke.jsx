import React from 'react';

const FOCTSmoke = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const handleSmokingChange = (status) => {
    updateFormData('smokingStatus', status);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 py-5 w-[500px] mx-auto text-center">
      <div className="text-gray-500 text-sm mb-4">
        Just answer 4 simple questions to get more accurate quotes
      </div>
      <hr className="mb-5" />
      <div className="text-xl font-medium text-gray-700 mb-6">
        Do You Smoke or Chew tobacco?
      </div>
      
      <div className="text-sm text-gray-500 mb-6">
        Select <span className="text-primary font-semibold text-base mt-1">Yes</span> if you have smoked or chewed tobacco in last 12 months
      </div>

      {/* Smoking   Options */}
      <div className="flex justify-center gap-4 mb-20">
        <button
          type="button"
          className={`px-10 py-3 rounded-lg text-lg font-medium border transition-all duration-200 focus:outline-none ${formData.smokingStatus === 'Yes'
            ? 'bg-primary text-white border-primary shadow'
            : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
          }`}
          onClick={() => handleSmokingChange('Yes')}
        >
          Yes
        </button>
        <button
          type="button"
          className={`px-10 py-3 rounded-lg text-lg font-medium border transition-all duration-200 focus:outline-none ${formData.smokingStatus === 'No'
            ? 'bg-primary text-white border-primary shadow'
            : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
          }`}
          onClick={() => handleSmokingChange('No')}
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
          className="px-6 py-3 bg-primary text-white border-none rounded-lg font-bold cursor-pointer hover:bg-primaryDark transition-colors"
        >
          Next
        </button>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 mt-6">
        Only certified cgpatel expert will assist you      
      </div>
      <div className="text-xs text-gray-500">
        By clicking, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">Privacy policy</a>,{' '}
        <a href="#" className="text-primary hover:underline">Terms of Use</a> &{' '}
        <a href="#" className="text-primary hover:underline">Disclaimers</a>
      </div>
    </div>
  );
};

export default FOCTSmoke;
