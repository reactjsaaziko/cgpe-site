import React from 'react';

const QualificationForm = ({ formData = {}, updateFormData, errors, onNext, onPrev }) => {
  const qualificationOptions = [
    'College graduate & above',
    '12th Pass',
    '10th Pass & below'
  ];

  const handleQualificationChange = (qualification) => {
    updateFormData('qualification', qualification);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 py-5 w-[500px] mx-auto text-center">
      <div className="text-gray-500 text-sm mb-4">
        Just answer 4 simple questions to get more accurate quotes
      </div>
      <hr className="mb-5" />
      <div className="text-xl font-medium text-gray-700 mb-6">
        Select Educational Qualification
      </div>
      
      {/* Qualification Options */}
      <div className="space-y-4 border p-5 rounded-lg w-[300px] mx-auto">
        {qualificationOptions.map((qualification) => (
          <label key={qualification} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors text-base">
            <input
              type="radio"
              name="educationalQualification"
              value={qualification}
              checked={formData?.qualification === qualification}
              onChange={() => handleQualificationChange(qualification)}
              className="hidden"
            />
            <div
              className={`w-4 h-4 border-2 border-gray-300 rounded-full relative cursor-pointer transition-colors flex items-center justify-center ${formData?.qualification === qualification ? 'border-primary' : ''
                }`}
            >
              {formData?.qualification === qualification && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>
            <span className="text-lg text-gray-700 text-base">{qualification}</span>
          </label>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
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

export default QualificationForm;
