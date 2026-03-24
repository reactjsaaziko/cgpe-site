import React, { useState } from "react";
import CareerSelectionScreen from "./CareerSelectionScreen";

export default function ChildSavingsCalculator({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    childName: " ",
    childAge: " "
  });
  const [showCareerSelection, setShowCareerSelection] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Child Savings Calculator submitted:", formData);
    setShowCareerSelection(true);
  };

  const handleCareerSelect = (selection) => {
    console.log("Selected career:", selection.career);
    console.log("Selected college:", selection.college);
    console.log("Child data:", formData);
    // Here you can add logic to handle the career and college selection
    // For example, navigate to another screen or show results
    onClose();
  };

  const handleCloseCareerSelection = () => {
    setShowCareerSelection(false);
  };

  if (!isOpen) return null;

  // Show career selection screen if form is submitted
  if (showCareerSelection) {
    return (
      <CareerSelectionScreen
        childName={formData.childName || "Your Child"}
        onSelect={handleCareerSelect}
        onBack={handleCloseCareerSelection}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Child Savings Calculator
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Subtitle */}
          <div className="text-center mb-6">
            <p className="text-blue-600 text-sm font-medium mb-1">
              Lets make your child Financial Planning Easy
            </p>
            <p className="text-gray-800 text-sm">
              Secure your child's future
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Child Name Input */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">
                This plan is for (Child Name)
              </label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm font-semibold"
                placeholder="Enter child's name"
              />
            </div>

            {/* Child Age Input */}
            <div>
              <label className="block text-xs text-gray-500 mb-2">
                Whose age is
              </label>
              <input
                type="text"
                name="childAge"
                value={formData.childAge}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm font-semibold"
                placeholder="Enter child's age"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
