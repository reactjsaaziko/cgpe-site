import React, { useState } from 'react';
import FOCTSmoke from './FOCTSmoke';

const FOCTQulification = ({ formData = {}, updateFormData, errors, onNext, onPrev }) => {
  const [showSmokePopup, setShowSmokePopup] = useState(false);

  const qualificationOptions = [
    'College graduate & above',
    '12th Pass',
    '10th Pass & below'
  ];

  const handleQualificationChange = (qualification) => {
    updateFormData('qualification', qualification);
    // Show the smoke popup when qualification is selected
    setShowSmokePopup(true);
  };

  const handleSmokeClose = () => {
    setShowSmokePopup(false);
  };

  const handleSmokeNext = () => {
    setShowSmokePopup(false);
    onNext(); // Continue to next step after smoke selection
  };

  const handleSmokePrev = () => {
    setShowSmokePopup(false);
    // Go back to qualification selection
  };

  return (
    <>
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
          
          {/* Next button is now handled through popup flow */}
        </div>
      </div>

      {/* Smoke Popup Modal */}
      {showSmokePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={handleSmokeClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* FOCTSmoke Component */}
            <FOCTSmoke
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              onNext={handleSmokeNext}
              onPrev={handleSmokePrev}
            />
          </div>
        </div>
      )}
    </>
  );
};

FOCTQulification.displayName = "FOCTQulification";

export default FOCTQulification;