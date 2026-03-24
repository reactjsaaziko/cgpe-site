import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalDetailsForm = ({ onBack, onNext }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    panNumber: '',
    heightFeet: '',
    heightInches: '',
    weightKg: '',
    politicallyExposed: 'no',
    healthDeclaration: 'disagree'
  });

  const [showHeightFeetDropdown, setShowHeightFeetDropdown] = useState(false);
  const [showHeightInchesDropdown, setShowHeightInchesDropdown] = useState(false);

  const heightFeetOptions = Array.from({ length: 8 }, (_, i) => i + 1); // 1 to 8 feet
  const heightInchesOptions = Array.from({ length: 12 }, (_, i) => i); // 0 to 11 inches

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
        {/* PAN Number Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            PAN Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.panNumber}
            onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
            placeholder="Enter PAN number"
            className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent focus:border-blue-500 transition-colors"
            maxLength="10"
          />
        </div>

        {/* Height Fields */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Height <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {/* Height in Feet */}
            <div className="flex-1 relative">
              <label className="block text-gray-600 text-xs mb-1">Height in Feet</label>
              <button
                type="button"
                onClick={() => setShowHeightFeetDropdown(!showHeightFeetDropdown)}
                className="w-full flex items-center justify-between border-b border-gray-300 py-2 text-gray-700 bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
              >
                <span className="font-medium">{formData.heightFeet || 'Select'}</span>
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${showHeightFeetDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showHeightFeetDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1 max-h-40 overflow-y-auto">
                  {heightFeetOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        handleInputChange('heightFeet', option);
                        setShowHeightFeetDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 focus:bg-gray-50 focus:outline-none"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Height in Inches */}
            <div className="flex-1 relative">
              <label className="block text-gray-600 text-xs mb-1">Height in Inches</label>
              <button
                type="button"
                onClick={() => setShowHeightInchesDropdown(!showHeightInchesDropdown)}
                className="w-full flex items-center justify-between border-b border-gray-300 py-2 text-gray-700 bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
              >
                <span className="font-medium">{formData.heightInches || 'Select'}</span>
                <svg 
                  className={`w-4 h-4 text-gray-400 transition-transform ${showHeightInchesDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showHeightInchesDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1 max-h-40 overflow-y-auto">
                  {heightInchesOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        handleInputChange('heightInches', option);
                        setShowHeightInchesDropdown(false);
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
        </div>

        {/* Weight Field */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Weight in KG <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.weightKg}
            onChange={(e) => handleInputChange('weightKg', e.target.value)}
            placeholder="Enter weight in KG"
            className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent focus:border-blue-500 transition-colors"
            min="0"
            max="300"
          />
        </div>

        {/* Politically Exposed Person Question */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-3">
            Are You Politically exposed person or Do You Work in CRPF/ Defence/ Merchant Marine/ Mining/ Oil & Natural Gas / any other Hazardous Industry ?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="politicallyExposed"
                value="yes"
                checked={formData.politicallyExposed === 'yes'}
                onChange={(e) => handleInputChange('politicallyExposed', e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="politicallyExposed"
                value="no"
                checked={formData.politicallyExposed === 'no'}
                onChange={(e) => handleInputChange('politicallyExposed', e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Health Declaration */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-3">
            I have read the health declaration and hereby declare that i am fit and fine and do not have any medical issues.
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="healthDeclaration"
                value="agree"
                checked={formData.healthDeclaration === 'agree'}
                onChange={(e) => handleInputChange('healthDeclaration', e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">I agree</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="healthDeclaration"
                value="disagree"
                checked={formData.healthDeclaration === 'disagree'}
                onChange={(e) => handleInputChange('healthDeclaration', e.target.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700">I Disagree</span>
            </label>
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="mt-8 flex justify-end">
        {/* <button
          onClick={handleProceed}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
        >
          PROCEED
        </button> */}
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
