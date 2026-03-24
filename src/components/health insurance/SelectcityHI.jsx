import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";
import male from "../assets/account.png";
import female from "../assets/personfemale.png";
import son from "../assets/son.png";
import daughter from "../assets/daughter.png";
import father from "../assets/father.png";
import mother from "../assets/mother.png";
import grandfather from "../assets/grandfather.png";
import grandmother from "../assets/grandmother.png";
import fatherinlaw from "../assets/father-in-law.png";
import motherinlaw from "../assets/mother-in-law.png";

const CITIES = [
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Thane",
  "Surat",
  "Ahmedabad",
];

const getMemberIcon = (memberKey) => {
  switch (memberKey) {
    case "self":
      return male;
    case "wife":
      return female;
    case "son":
      return son;
    case "daughter":
      return daughter;
    case "father":
      return father;
    case "mother":
      return mother;
    case "grand_father":
      return grandfather;
    case "grand_mother":
      return grandmother;
    case "father_in_law":
      return fatherinlaw;
    case "mother_in_law":
      return motherinlaw;
    default:
      return male;
  }
};

export default function SelectCityHI() {
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [isPincode, setIsPincode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from previous screens
  const selectedMembers = location.state?.selectedMembers || ["self"];
  const selectedAge = location.state?.selectedAge || "";
  const name = location.state?.name || "";
  const gender = location.state?.gender || "Male";
  const currentMember = selectedMembers[0];

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchTerm(city);
    setIsCustomCity(false);
    setIsPincode(false);
  };

  const handleContinue = () => {
    if (selectedCity) {
      navigate("/enter-mobile", {
        state: {
          selectedMembers,
          selectedAge,
          selectedCity,
          currentMember,
          name,
          gender
        }
      });
    }
  };

  const handleBack = () => {
    navigate("/select-age", {
      state: {
        selectedMembers
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-white relative pt-10">
      <Headerlogin/>
      {/* Logo & Top right nav */}
      {/* <Headerlogin/>   */}
     {/* Centered content */}
      <div className="flex flex-col items-center flex-1 justify-start w-full mt-20">
        <h2 className="text-3xl font-medium mb-6 text-center"> 
          {name ? `${name}, ` : ''}Select your city 
        </h2> 

        {/* City search input */} 
        <div className="w-full flex justify-center mb-6">
          <input
            type="text"
            className="w-[450px] h-14 rounded-lg border border-gray-300 px-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Search city or enter Pincode"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            maxLength={50}
          />
        </div>

        {/* Show status message for pincode or custom city */}
        {isPincode && (
          <div className="mb-4 text-sm text-blue-600">
            ✓ Valid pincode: "{selectedCity}" will be used
          </div>
        )}
        {isCustomCity && !isPincode && (
          <div className="mb-4 text-sm text-blue-600">
            ✓ Custom city: "{selectedCity}" will be used
          </div>
        )}

        {/* City selection grid - only show if not a pincode and no custom city */}
        {!isPincode && !isCustomCity && (
          <div className="w-full max-w-2xl mb-8">
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedCity === city
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Show message when no cities found */}
        {!isPincode && !isCustomCity && filteredCities.length === 0 && searchTerm.trim() && (
          <div className="w-full max-w-2xl mb-8 text-center text-gray-500 py-8">
            <div>No cities found matching "{searchTerm}"</div>
            <div className="mt-2 text-sm">
              You can continue with your custom city entry or try a pincode
            </div>
          </div>
        )}

        <button
          className={`rounded-lg px-20 py-3 text-lg font-semibold shadow-sm transition-all ${
            selectedCity
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          type="button"
          disabled={!selectedCity}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>

      {/* Left arrow (for previous/back navigation) */}

      {/* Background bottom decor */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none opacity-10 z-0">
        {/* Insert SVGs for background decor here if needed */}
      </div>
    </div>
  );
}
