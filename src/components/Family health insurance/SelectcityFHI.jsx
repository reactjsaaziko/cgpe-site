import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Headerlogin from '../headers/Headerlogin';

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 
  'Pune', 'Ahmedabad', 'Surat'
];

export default function SelectCityFHI() {
  const [selectedCity, setSelectedCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [isPincode, setIsPincode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from previous screen
  const { selectedMembers, memberAges, gender, name } = location.state || {};

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchTerm(city);
    setIsCustomCity(false);
    setIsPincode(false);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    
    // Check if the entered value is a pincode (6 digits)
    const pincodeRegex = /^\d{6}$/;
    if (pincodeRegex.test(value)) {
      setIsPincode(true);
      setIsCustomCity(false);
      setSelectedCity(value);
    } else {
      setIsPincode(false);
      
      // Check if the entered value matches any city in the list
      const exactMatch = CITIES.find(city => 
        city.toLowerCase() === value.toLowerCase()
      );
      
      if (exactMatch) {
        setSelectedCity(exactMatch);
        setIsCustomCity(false);
      } else if (value.trim()) {
        // If it's not in the list but user has entered something, treat as custom city
        setSelectedCity(value.trim());
        setIsCustomCity(true);
      } else {
        setSelectedCity('');
        setIsCustomCity(false);
      }
    }
  };

  const handleContinue = () => {
    if (selectedCity) {
      navigate('/enter-mobile-fhi', {
        state: {
          selectedMembers,
          memberAges,
          gender,
          name,
          selectedCity
        }
      });
    }
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
          Select your city
        </div>
        <div className="text-gray-500 text-center">
          Choose your city to get location-specific health insurance plans
        </div>
      </div>

      {/* Search Input */}
      <div className="w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="Search for your city or enter Pincode..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
          maxLength={50}
        />
        {isPincode && (
          <div className="mt-2 text-sm text-blue-600">
            ✓ Valid pincode: "{selectedCity}" will be used
          </div>
        )}
        {isCustomCity && !isPincode && (
          <div className="mt-2 text-sm text-blue-600">
            ✓ Custom city: "{selectedCity}" will be used
          </div>
        )}
      </div>

      {/* City List - only show if not a pincode and no custom city */}
      {!isPincode && !isCustomCity && (
        <div className="w-full max-w-lg mb-8 max-h-96 overflow-y-auto">
          {filteredCities.length > 0 ? (
            <div className="space-y-2">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedCity === city
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{city}</div>
                  {selectedCity === city && (
                    <div className="text-sm text-blue-600 mt-1">✓ Selected</div>
                  )}
                </button>
              ))}
            </div>
          ) : searchTerm.trim() ? (
            <div className="text-center text-gray-500 py-8">
              <div>No cities found matching "{searchTerm}"</div>
              <div className="mt-2 text-sm">
                You can continue with your custom city entry or try a pincode
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Start typing to search for your city or enter a pincode
            </div>
          )}
        </div>
      )}

      {/* Continue Button */}
      <button
        className={`w-full max-w-lg font-semibold text-lg rounded-lg py-3 shadow transition ${
          selectedCity
            ? 'bg-blue-700 hover:bg-blue-800 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!selectedCity}
        onClick={handleContinue}
      >
        Continue
      </button>

      {/* Summary */}
      {selectedMembers && (
        <div className="mt-6 text-center text-sm text-gray-600">
          <div>Family members: {selectedMembers.length}</div>
          <div>Selected city: {selectedCity || 'Not selected'}</div>
          {isPincode && (
            <div className="text-blue-600 mt-1">(Pincode entry)</div>
          )}
          {isCustomCity && !isPincode && (
            <div className="text-blue-600 mt-1">(Custom city entry)</div>
          )}
        </div>
      )}
    </div>
  );
}