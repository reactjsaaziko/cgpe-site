import React from "react";
import a from "../assets/IMAGE.png"

export default function ExpertContactModal({ isOpen, onClose, onScheduleCallback, onCallUs }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        {/* Header Section - Light Blue Background */}
        <div className="bg-blue-100 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            We're glad to help you!
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content Area - White Background */}
        <div className="px-6 py-8 text-center">
          {/* Illustration */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              {/* Purple cloud-like background */}
              <img
                src={a}
                alt="Expert Illustration"
                className="w-32 h-32 object-contain rounded-full bg-purple-100"
              />
            </div>
          </div>
          
          {/* Main Message */}
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Don't worry, we've got your back :
          </h3>

          {/* Informational Text */}
          <p className="text-gray-700 mb-2">
            Your nature of business is interesting!
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Our group health insurance <span className="font-bold">experts</span> will contact you immediately to assist with your purchase.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onScheduleCallback}
            className="flex-1 py-3 px-4 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Schedule Callback
          </button>
          <button
            onClick={onCallUs}
            className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call us
          </button>
        </div>
      </div>
    </div>
  );
}
