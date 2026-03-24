import React, { useState } from "react";

const Confirmpage = () => {
  const [formData, setFormData] = useState({
    pincode: "",
    city: "",
    nationality: "Indian",
    covidVaccination: "",
  });

  const handleInputChange = (field, value) => { 
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));     
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Pincode Field */}
      <div>
        <label className="block font-bold text-gray-800 mb-2">Pincode</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.pincode}
          onChange={(e) => handleInputChange('pincode', e.target.value)}
          placeholder="Enter pincode"
        />
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <circle cx="12" cy="8" r="1" />
          </svg>
          <span>Please enter the pincode of your current residential address</span>
        </div>
      </div>

      {/* City Field */}
      <div>
        <label className="block font-bold text-gray-800 mb-2">City</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          placeholder="Enter city"
        />
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <circle cx="12" cy="8" r="1" />
          </svg>
          <span>Please enter the city of your current residential address</span>
        </div>
      </div>

      {/* Nationality Field */}
      <div>
        <label className="block font-bold text-gray-800 mb-2">Nationality</label>
        <div className="relative">
          <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-between">
            <span className="font-bold text-gray-800">{formData.nationality}</span>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* COVID-19 Vaccination Status */}
      <div>
        <label className="block font-bold text-gray-800 mb-3">Have you been vaccinated for COVID-19?</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="covidVaccination"
              value="yes"
              checked={formData.covidVaccination === 'yes'}
              onChange={(e) => handleInputChange('covidVaccination', e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="covidVaccination"
              value="no"
              checked={formData.covidVaccination === 'no'}
              onChange={(e) => handleInputChange('covidVaccination', e.target.value)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Confirmpage;