import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";

export default function OfficeInsuranceQuestion() {
  const [hasOfficeInsurance, setHasOfficeInsurance] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from previous screens
  const selectedMembers = location.state?.selectedMembers || [];
  const selectedAge = location.state?.selectedAge || "";
  const selectedCity = location.state?.selectedCity || "";
  const currentMember = location.state?.currentMember || "";
  const mobileNumber = location.state?.mobileNumber || "";
  const medicalHistory = location.state?.medicalHistory || [];
  const specificConditions = location.state?.specificConditions || [];

  const handleSelection = (value) => {
    setHasOfficeInsurance(value);
  };

  const handleViewPlans = () => {
    if (hasOfficeInsurance !== null) {
      // Navigate to plan list with all collected data
      navigate("/plan-list", {
        state: {
          selectedMembers,
          selectedAge,
          selectedCity,
          currentMember,
          mobileNumber,
          medicalHistory,
          specificConditions,
          hasOfficeInsurance
        }
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Headerlogin />

      {/* Back Button */}
      <div className="w-full max-w-4xl px-6 mb-4 mt-24">
        <button 
          onClick={() => navigate(-1)}
          className="text-blue-600 text-[15px] mb-4 inline-block hover:text-blue-800"
        >
          ← Back
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 items-center justify-start relative">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-center mb-2">
            Does your office provide health insurance for you?
          </h1>
        </div>

        {/* Yes/No Options */}
        <div className="flex flex-col gap-4 mb-12 w-full max-w-lg">
          <label
            className={`border-2 rounded-xl px-5 py-4 flex items-center cursor-pointer transition
            ${hasOfficeInsurance === true ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
            `}
          >
            <input
              type="radio"
              name="officeInsurance"
              checked={hasOfficeInsurance === true}
              onChange={() => handleSelection(true)}
              className="form-radio w-5 h-5 text-blue-600 focus:ring-blue-500 accent-blue-600"
            />
            <span className={`ml-3 text-lg font-medium ${hasOfficeInsurance === true ? "text-blue-700" : "text-gray-800"}`}>
              Yes
            </span>
          </label>

          <label
            className={`border-2 rounded-xl px-5 py-4 flex items-center cursor-pointer transition
            ${hasOfficeInsurance === false ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
            `}
          >
            <input
              type="radio"
              name="officeInsurance"
              checked={hasOfficeInsurance === false}
              onChange={() => handleSelection(false)}
              className="form-radio w-5 h-5 text-blue-600 focus:ring-blue-500 accent-blue-600"
            />
            <span className={`ml-3 text-lg font-medium ${hasOfficeInsurance === false ? "text-blue-700" : "text-gray-800"}`}>
              No
            </span>
          </label>
        </div>

        {/* View Plans Button */}
        <button
          className={`rounded-lg px-20 py-3 text-lg font-medium shadow transition-all duration-150 ${
            hasOfficeInsurance !== null
              ? "bg-[#0072ce] hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={hasOfficeInsurance === null}
          onClick={handleViewPlans}
        >
          View Plans
        </button>
      </div>

      {/* Bottom background pattern */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none opacity-10 z-0 h-32">
        <div className="w-full h-full bg-gradient-to-t from-gray-200 to-transparent"></div>
      </div>
    </div>
  );
} 