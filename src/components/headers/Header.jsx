import React, { useState, useEffect } from 'react';
import { useUserData } from '../../context/UserDataContext';

const Header = ({ formData }) => {
  const [isFeatureChecked, setIsFeatureChecked] = useState(false);
  const { userData, updateUserData, clearUserData } = useUserData();

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} yrs`;
  };

  // Format income for display
  const formatIncome = (income) => {
    if (!income) return '';
    
    // Extract the first number from income string
    const match = income.match(/(\d+)/);
    if (match) {
      const number = parseInt(match[1]);
      if (number >= 25) {
        return '>25 Lac';
      } else if (number >= 15) {
        return '>15 Lac';
      } else if (number >= 10) {
        return '>10 Lac';
      } else if (number >= 5) {
        return '>5 Lac';
      } else {
        return '<5 Lac';
      }
    }
    return income;
  };

  // Update user data when formData prop changes
  useEffect(() => {
    if (formData) {
      updateUserData(formData);
    }
  }, [formData, updateUserData]);

  // Generate user info string
  const getUserInfoString = () => {
    // Use context data if available, otherwise use prop data, otherwise use default
    const currentUserData = userData || formData;
    
    if (!currentUserData) {
      return 'Male | 28 yrs | Non-smoker | >25 Lac |';
    }

    const gender = currentUserData.gender || 'Male';
    const age = calculateAge(currentUserData.dateOfBirth) || '28 yrs';
    const smokingStatus = currentUserData.smokingStatus === 'Yes' ? 'Smoker' : 'Non-smoker';
    const income = formatIncome(currentUserData.annualIncome) || '>25 Lac';

    return `${gender} | ${age} | ${smokingStatus} | ${income} |`;
  };

  return (
    <header className="max-w-[1900px] mx-auto w-full border-b border-gray-200 bg-white px-4 py-2 flex items-center justify-between">
      {/* Logo with text */}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <img
            src="/assets/images/cg2.png"
            alt="C.G. Patel Logo"
            className="h-auto w-20 object-contain"
          />
         
        </div>
      </div>

      {/* Checkbox Feature */}
      <div className="flex flex-col justify-center border border-blue-200 bg-blue-50 rounded px-3 py-2 ml-4 mr-6 min-w-[230px]">
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isFeatureChecked}
              onChange={() => setIsFeatureChecked((prev) => !prev)}
              className="sr-only"
            />
            <span className={`w-4 h-4 flex items-center justify-center rounded border-2 ${isFeatureChecked ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'} mr-2`}>
              {isFeatureChecked && (
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l4 4 6-6" />
                </svg>
              )}
            </span>
            <span className="text-sm text-blue-700 font-medium">Plans that Return my premium</span>
            <span className="ml-1 flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full">
              <span className="text-white text-[10px] font-bold">i</span>
            </span>
          </label>
        </div>
        <span className="ml-6 text-xs text-gray-500 mt-1">(Opted by 20% Customers)</span>
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center gap-4">
        {/* Compare Plans */}
        {/* <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600">
          <span className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="text-sm font-medium">Compare Plans</span>
        </div> */}

        {/* Vertical Divider */}
        {/* <div className="w-px h-6 bg-gray-300"></div> */}

        {/* Filter */}
        {/* <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600">
          <span className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center relative">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"></span>
          </span>
          <span className="text-sm font-medium">Filter</span>
        </div> */}

        {/* Vertical Divider */}
        {/* <div className="w-px h-6 bg-gray-300"></div> */}

        {/* Sorting */}
        {/* <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600">
          <span className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </span>
          <span className="text-sm font-medium">Sorting</span>
        </div> */}

        {/* User Info */}
        {/* <div className="flex items-center gap-2 ml-4 relative group">
          <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="text-sm text-gray-700 font-medium whitespace-nowrap">{getUserInfoString()}</span>
          <button 
            onClick={clearUserData}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Reset
          </button>
          <svg className="w-4 h-4 text-gray-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div> */}
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
