// import React from "react";

// export default function CareerSelectionScreen({ onClose, onCareerSelect }) {
//   const careerOptions = [
//     {
//       id: "mba",
//       title: "MBA",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
//           <circle cx="12" cy="12" r="3"/>
//         </svg>
//       )
//     },
//     {
//       id: "doctor",
//       title: "Doctor",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//           <path d="M8 12h8v2H8z"/>
//         </svg>
//       )
//     },
//     {
//       id: "engineer",
//       title: "Engineer",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//         </svg>
//       )
//     },
//     {
//       id: "other",
//       title: "Other",
//       icon: (
//         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//         </svg>
//       )
//     }
//   ];

//   const handleCareerSelect = (careerId) => {
//     onCareerSelect(careerId);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <h2 className="text-xl font-semibold text-gray-800">
//             Child Savings Calculator
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* Question */}
//           <div className="text-center mb-8">
//             <h3 className="text-blue-600 text-lg font-semibold">
//               What do you want Asas to become?
//             </h3>
//           </div>

//           {/* Career Options Grid */}
//           <div className="grid grid-cols-2 gap-4">
//             {careerOptions.map((career) => (
//               <button
//                 key={career.id}
//                 onClick={() => handleCareerSelect(career.id)}
//                 className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
//               >
//                 <div className="text-blue-600 mb-3">
//                   {career.icon}
//                 </div>
//                 <span className="text-gray-800 font-medium text-sm">
//                   {career.title}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import CollegeSelectionScreen from "./CollegeSelectionScreen";

export default function CareerSelectionScreen({
  childName = "Your Child",
  onSelect = () => {},
  onBack = () => {},
  onClose = () => {},
}) {
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [showCollegeSelection, setShowCollegeSelection] = useState(false);

  const options = [
    { key: "MBA", icon: MortarboardIcon, label: "MBA" },
    { key: "Doctor", icon: DoctorIcon, label: "Doctor" },
    { key: "Engineer", icon: EngineerIcon, label: "Engineer" },
    { key: "Other", icon: KidIcon, label: "Other" },
  ];

  const handleOptionClick = (key) => {
    setSelected(key);
    setError("");
    // Automatically proceed to college selection when an option is selected
    setShowCollegeSelection(true);
  };

  const handleCollegeSelect = (collegeType) => {
    // Pass both career and college selection to parent
    onSelect({ career: selected, college: collegeType });
  };

  const handleBackToCareer = () => {
    setShowCollegeSelection(false);
  };

  // Show college selection screen if career is selected
  if (showCollegeSelection) {
    return (
      <CollegeSelectionScreen
        childName={childName}
        onSelect={handleCollegeSelect}
        onBack={handleBackToCareer}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/20 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl h-[500px]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Back"
            type="button"
          >
            {/* Back chevron */}
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

        <p className="mb-6 text-center text-sm font-semibold text-blue-600">
          What do you want {childName} to become?
        </p>

        {/* Options grid */}
        <div className="grid gap-4 sm:grid-cols-2 my-10">
          {options.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleOptionClick(key)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-4 transition 
                ${selected === key
                  ? "border-blue-600 bg-blue-50 text-blue-800 font-semibold"
                  : "border-blue-300 text-blue-700 hover:bg-blue-50"}
              `}
            >
              <Icon className="h-6 w-6" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
        {error && (
          <div className="mb-2 text-center text-sm text-red-600 font-medium">{error}</div>
        )}
      </div>
    </div>
  );
}

/* ---- Tiny inline icons (no libraries) ---- */
function MortarboardIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3L1 8l11 5 9-4.09V17h2V8L12 3z" />
      <path d="M7 12.5V16c0 1.66 2.69 3 5 3s5-1.34 5-3v-3.5l-5 2.27L7 12.5z" opacity=".35" />
    </svg>
  );
}
function DoctorIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="7" r="3" />
      <path d="M4 20a8 8 0 0116 0v1H4v-1z" />
      <path d="M12 10v3M10.5 12.5h3" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function EngineerIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a5 5 0 00-5 5v1h10V7a5 5 0 00-5-5z" />
      <circle cx="12" cy="13" r="3" />
      <path d="M4 20a8 8 0 0116 0v1H4v-1z" />
    </svg>
  );
}
function KidIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4 20a8 8 0 0116 0v1H4v-1z" />
    </svg>
  );
}
