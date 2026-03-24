import React, { useState } from "react";
import CSIFee from "./CSIFee";

export default function CollegeSelectionScreen({
  childName = "Asas",
  collegeYear = "2024",
  onSelect = () => {},
  onBack = () => {},
  onClose = () => {},
}) {
  const [selectedCollege, setSelectedCollege] = useState("premier");
  const [error, setError] = useState("");
  const [showCSIFee, setShowCSIFee] = useState(false);

  const collegeOptions = [
    {
      id: "premier",
      title: "Premier Colleges",
      cost: "25 L",
      description: "Top government and private institutions"
    },
    {
      id: "private",
      title: "Private Colleges",
      cost: "50 L",
      description: "Reputed private institutions"
    },
    {
      id: "abroad",
      title: "Study Abroad",
      cost: "75 L",
      description: "International universities and colleges"
    }
  ];

  const handleCollegeSelect = (collegeId) => {
    setSelectedCollege(collegeId);
    setError("");
    // Show CSIFee popup when any college option is clicked
    setShowCSIFee(true);
  };

  const handleContinue = () => {
    if (!selectedCollege) {
      setError("Please select a college option to continue.");
      return;
    }
    onSelect(selectedCollege);
  };

  const handleCSIFeeClose = () => {
    setShowCSIFee(false);
  };

  const handleCSIFeeBack = () => {
    setShowCSIFee(false);
  };

  const handleCSIFeeStart = (data) => {
    setShowCSIFee(false);
    onSelect(selectedCollege, data);
  };

  // If CSIFee popup is shown, render it instead of the college selection
  if (showCSIFee) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/20 p-4">
        <div className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
          <CSIFee
            yearNow={2023}
            horizonYears={1}
            expectedReturn={10}
            onBack={handleCSIFeeBack}
            onClose={handleCSIFeeClose}
            onStart={handleCSIFeeStart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/20 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-14 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Back"
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h2 className="text-center text-lg font-semibold text-slate-700">
            Child Savings Calculator
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
            type="button"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Context Information */}
        <div className="mb- 6 text-center">
          <p className="text-sm text-slate-600 mb-2">
            <span className="text-blue-600 font-semibold">{childName}</span> is likely to start college in{" "}
            <span className="text-blue-600 font-semibold">{collegeYear}</span>
          </p>
          <p className="text-sm font-medium text-slate-700">
            Which college would you like {childName} to study?
          </p>
        </div>

        {/* College Options */}
        <div className="space-y-3 my-6">
          {collegeOptions.map((college) => (     
            <button
              key={college.id}
              type="button"
              onClick={() => handleCollegeSelect(college.id)}
              className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                selectedCollege === college.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedCollege === college.id
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300"
                }`}>
                  {selectedCollege === college.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium text-slate-700">{college.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">{college.cost}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 text-center text-sm text-red-600 font-medium">{error}</div>
        )}
      </div>
    </div>
  );
}
