import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../headers/Header";
import Footer from "../Footer";
import ExpertContactModal from "./ExpertContactModal";

export default function KnowYourExactPremium() {
  const navigate = useNavigate();
  const [industryType, setIndustryType] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);

  // Sample industry suggestions
  const industrySuggestions = [
    "Administrative Functions including Desk",
    "Agriculture and Farming",
    "Automotive and Transportation",
    "Banking and Finance",
    "Construction and Real Estate",
    "Education and Training",
    "Healthcare and Medical",
    "Information Technology",
    "Manufacturing and Production",
    "Retail and E-commerce",
    "Telecommunications",
    "Travel and Tourism"
  ];

  const filteredSuggestions = industrySuggestions.filter(industry =>
    industry.toLowerCase().includes(industryType.toLowerCase())
  );

  const summaryData = {
    insurer: "SBI General Insurance Company Ltd",
    totalLives: "27",
    sumInsured: "₹ 5,00,000",
    policyPeriod: "1 Year",
    coverage: "Employee, Spouse & 2 Kids"
  };

  const handleIndustrySelect = (industry) => {
    setIndustryType(industry);
    setShowSuggestions(false);
  };

  const handleProceed = () => {
    // Show the expert contact modal
    setShowExpertModal(true);
  };

  const handleScheduleCallback = () => {
    // Handle schedule callback logic
    console.log("Schedule callback clicked");
    setShowExpertModal(false);
  };

  const handleCallUs = () => {
    // Handle call us logic
    console.log("Call us clicked");
    setShowExpertModal(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 my-20">
          <div className="flex gap-6">
            {/* Left Section - Input and Information */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => navigate('/group-health-plan-upgrade')}
                  className="text-blue-600 hover:text-blue-800 mr-3 text-xl font-semibold"
                >
                  ←
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                  Know Your Exact Premium
                </h1>
              </div>

              {/* Industry/Business Type Input */}
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  What is your industry/business type?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={industryType}
                    onChange={(e) => {
                      setIndustryType(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search & Select industry"
                    className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  />
                  
                  {/* Dropdown Suggestions */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleIndustrySelect(suggestion)}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Informational Tip */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-green-800">
                      We need industry/business type to fetch the best premiums for your group health insurance plan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Summary Card */}
            <div className="w-80">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Insurer:</span>
                    <span className="text-sm font-medium">{summaryData.insurer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Lives:</span>
                    <span className="text-sm font-medium">{summaryData.totalLives}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sum Insured:</span>
                    <span className="text-sm font-medium">{summaryData.sumInsured}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Policy Period:</span>
                    <span className="text-sm font-medium">{summaryData.policyPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Coverage:</span>
                    <span className="text-sm font-medium">{summaryData.coverage}</span>
                  </div>
                </div>

                <button 
                  onClick={handleProceed}
                  disabled={!industryType.trim()}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    industryType.trim() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  PROCEED
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Expert Contact Modal */}
      <ExpertContactModal
        isOpen={showExpertModal}
        onClose={() => setShowExpertModal(false)}
        onScheduleCallback={handleScheduleCallback}
        onCallUs={handleCallUs}
      />
    </>
  );
}
