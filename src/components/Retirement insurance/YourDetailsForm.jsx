import React, { useState } from 'react';

const YourDetailsForm = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    pincode: '',
    city: '',
    nationality: 'Resident Indian',
    premiumPayerDifferent: ''
  });

  const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);

  const nationalityOptions = [
    'Resident Indian',
    'Non-Resident Indian',
    'Person of Indian Origin',
    'Foreign National'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProceed = () => {
    onNext(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 flex-1 flex flex-col gap-2 min-w-[360px]">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Your Details</h1>
      </div>

      <div className="flex flex-col gap-6">
        {/* Pincode Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Pincode
          </label>
          <div className="mb-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <circle cx="12" cy="8" r="1" />
              </svg>
              Please enter the pincode of your current residential address.
            </div>
          </div>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            placeholder="Enter pincode"
            className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent focus:border-blue-500 transition-colors"
            maxLength="6"
          />
        </div>

        {/* City Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            City
          </label>
          <div className="mb-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <circle cx="12" cy="8" r="1" />
              </svg>
              Please enter the city of your current residential address.
            </div>
          </div>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Enter city"
            className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Nationality Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Nationality
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNationalityDropdown(!showNationalityDropdown)}
              className="w-full flex items-center justify-between border-b border-gray-300 py-2 text-gray-700 bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
            >
              <span className="font-medium">{formData.nationality}</span>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform ${showNationalityDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showNationalityDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
                {nationalityOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      handleInputChange('nationality', option);
                      setShowNationalityDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 focus:bg-gray-50 focus:outline-none"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Premium Payer Question */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-3">
            Is the person paying premium different from the insured ?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="premiumPayerDifferent"
                value="yes"
                checked={formData.premiumPayerDifferent === 'yes'}
                onChange={(e) => handleInputChange('premiumPayerDifferent', e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="premiumPayerDifferent"
                value="no"
                checked={formData.premiumPayerDifferent === 'no'}
                onChange={(e) => handleInputChange('premiumPayerDifferent', e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Proceed Button (you can hook next steps here) */}
        <div className="mt-2">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-blue-700 transition shadow"
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourDetailsForm;


