import React, { useState } from 'react';
import FOCTAnnual from './FOCTAnnual';
import FOCTQulification from './FOCTQulification';

const FOCTOccuption = ({ formData, updateFormData, errors, onNext, onPrev }) => {
  const [showAnnualPopup, setShowAnnualPopup] = useState(false);
  const [showQualificationPopup, setShowQualificationPopup] = useState(false);

  const handleOccupationChange = (occupation) => {
    updateFormData('occupation', occupation);
    // Show the annual income popup when occupation is selected
    setShowAnnualPopup(true);
  };

  const handleAnnualClose = () => {
    setShowAnnualPopup(false);
  };

  const handleAnnualNext = () => {
    // Hide annual popup and show qualification popup when user selects an option
    setShowAnnualPopup(false);
    setShowQualificationPopup(true);
  };

  const handleQualificationClose = () => {
    setShowQualificationPopup(false);
  };

  const handleQualificationNext = () => {
    setShowQualificationPopup(false);
    onNext(); // Continue to next step after qualification selection
  };

  const handleQualificationPrev = () => {
    setShowQualificationPopup(false);
    setShowAnnualPopup(true); // Go back to annual income popup
  };

  return (
    <>
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
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
            }`}
          >
            Salaried
          </button>
          <button
            type="button"
            onClick={() => handleOccupationChange('Self Employed')}
            className={`px-6 py-2 rounded-md border font-medium transition ${
              formData.occupation === 'Self Employed'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
            }`}
          >
            Self Employed
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-3 text-blue-600 hover:text-blue-700 transition-colors border rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          {/* <button
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 text-white border-none rounded-lg font-bold cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Next
          </button> */}
        </div>
      </div>

      {/* Annual Income Popup Modal */}
      {showAnnualPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={handleAnnualClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* FOCTAnnual Component */}
            <FOCTAnnual
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              onNext={handleAnnualNext}
              onPrev={handleAnnualClose}
            />
          </div>
        </div>
      )}

      {/* Qualification Popup Modal */}
      {showQualificationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={handleQualificationClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-2 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* FOCTQulification Component */}
            <FOCTQulification
              formData={formData}
              updateFormData={updateFormData}
              errors={errors}
              onNext={handleQualificationNext}
              onPrev={handleQualificationPrev}
            />
          </div>
        </div>
      )}
    </>
  );
};

FOCTOccuption.displayName = "FOCTOccuption";

export default FOCTOccuption;
