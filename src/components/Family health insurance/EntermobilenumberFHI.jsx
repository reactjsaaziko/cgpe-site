import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Headerlogin from '../headers/Headerlogin';

export default function EnterMobileNumberFHI() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from previous screen
  const { selectedMembers, memberAges, gender, name, selectedCity } = location.state || {};

  const handleMobileChange = (value) => {
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 10) {
      setMobileNumber(numericValue);
      
      // Clear error when user starts typing
      if (errors.mobile) {
        setErrors(prev => ({ ...prev, mobile: '' }));
      }
    }
  };

  const validateMobile = () => {
    const newErrors = {};
    
    if (!mobileNumber.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (mobileNumber.length !== 10) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    } else if (!/^[1-9]/.test(mobileNumber)) {
      newErrors.mobile = 'Mobile number should start with 1, 2, 3, 4, 5, 6, 7, 8, or 9';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (validateMobile()) {
      // Create inquiry for Family Health Insurance lead (no name at this step)
      try {
        await fetch('/api/inquiries/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name || 'Unknown',
            phone: mobileNumber,
            inquiryType: 'insurance',
            subject: 'Family Health Insurance',
            message: `Lead from Family HI. City: ${selectedCity || ''}`,
            source: 'website'
          })
        });
      } catch (e) {
        console.error('Failed to create inquiry', e);
      }

      navigate('/medical-history-fhi', {
        state: {
          selectedMembers,
          memberAges,
          gender,
          name,
          selectedCity,
          mobileNumber
        }
      });
    }
  };

  const formatMobileNumber = (number) => {
    if (number.length <= 3) return number;
    if (number.length <= 6) return `${number.slice(0, 3)} ${number.slice(3)}`;
    return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-10">
      <Headerlogin />
      
      {/* Back Button */}
      <div className="w-full max-w-4xl px-6 mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="text-blue-600 text-[15px] mb-4 inline-block hover:text-blue-800"
        >
          ← Back
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col items-center mb-8 mt-10">
        <div className="text-2xl font-medium mb-2 text-center">
          Enter your mobile number
        </div>
        <div className="text-gray-500 text-center">
          We'll send you a verification code to this number
        </div>
      </div>

      {/* Mobile Number Input */}
      <div className="w-full max-w-lg mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">+91</span>
            </div>
            <input
              type="tel"
              value={formatMobileNumber(mobileNumber)}
              onChange={(e) => handleMobileChange(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter 10-digit mobile number"
              maxLength="12"
            />
          </div>
          {errors.mobile && (
            <div className="mt-2 text-red-500 text-sm">{errors.mobile}</div>
          )}
        </div>
        
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-blue-800">
              <div className="font-medium mb-1">Why do we need your mobile number?</div>
              <ul className="space-y-1 text-blue-700">
                <li>• To send you verification code</li>
                <li>• To share policy documents</li>
                <li>• For important updates about your policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        className={`w-full max-w-lg font-semibold text-lg rounded-lg py-3 shadow transition ${
          mobileNumber.length === 10
            ? 'bg-blue-700 hover:bg-blue-800 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={mobileNumber.length !== 10}
        onClick={handleContinue}
      >
        Continue
      </button>

      {/* Summary */}
      {selectedMembers && (
        <div className="mt-6 text-center text-sm text-gray-600">
          <div>Family members: {selectedMembers.length}</div>
          <div>Selected city: {selectedCity}</div>
          <div>Mobile: {mobileNumber ? `+91 ${formatMobileNumber(mobileNumber)}` : 'Not entered'}</div>
        </div>
      )}
    </div>
  );
}