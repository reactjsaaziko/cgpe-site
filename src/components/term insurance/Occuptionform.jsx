import React from 'react';

const OccupationForm = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const handleOccupationChange = (occupation) => {
    updateFormData('occupation', occupation);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md mx-auto text-center w-[500px] mt-14">
      {/* Top Text */}
      <p className="text-gray-500 mb-2 text-sm py-3">
        Just answer 4 simple questions to get more accurate quotes
      </p>
      <hr className="mb-6 border-gray-200" />

      {/* Heading */}
      <h2 className="text-lg font-medium my-11">Please Choose your occupation type</h2>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-11">
        <button
          type="button"
          onClick={() => handleOccupationChange('Salaried')}
          className={`px-6 py-2 rounded-md border font-medium transition ${
            formData.occupation === 'Salaried'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
          }`}
        >
          Salaried
        </button>
        <button
          type="button"
          onClick={() => handleOccupationChange('Self Employed')}
          className={`px-6 py-2 rounded-md border font-medium transition ${
            formData.occupation === 'Self Employed'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
          }`}
        >
          Self Employed
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
    </div>
  );
};

export default OccupationForm;
