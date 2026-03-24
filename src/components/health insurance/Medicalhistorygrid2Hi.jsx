import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";

const OPTIONS = [
  { key: "diabetes", label: "Diabetes" },
  { key: "bp", label: "BP / Hypertension" },
  { key: "heart", label: "Heart Ailments" },
  { key: "other", label: "Other health issues" },
];

export default function MedicalHistoryGrid2HI() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from previous screens
  const selectedMembers = location.state?.selectedMembers || ["self"];
  const selectedAge = location.state?.selectedAge || "";
  const selectedCity = location.state?.selectedCity || "";
  const currentMember = location.state?.currentMember || "self";
  const mobileNumber = location.state?.mobileNumber || "";
  const medicalHistory = location.state?.medicalHistory || [];

  // Handle multiple selection
  const handleSelection = (key) => {
    if (selected.includes(key)) {
      setSelected(selected.filter(item => item !== key));
    } else {
      setSelected([...selected, key]);
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Headerlogin/>

      {/* Main content */}
      <div className="flex flex-col flex-1 items-center justify-start relative mt-32">
        {/* Back arrow */}
        {/* Title & subtitle */}
        <div className="mb-4">
          <h1 className="text-3xl font-semibold text-center mb-2">Medical history</h1>
          <p className="text-gray-700 text-center text-lg max-w-2xl mb-2">
            Do any member(s) have any existing illnesses for which they take regular medication?
          </p>
        </div>
        {/* 2x2 Checkbox grid */}
        <div className="mb-12 w-full max-w-2xl flex flex-col items-center">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 w-full">
            {OPTIONS.map((opt) => (
              <label
                key={opt.key}
                className={`border-2 rounded-xl px-5 py-4 flex items-center cursor-pointer transition text-lg font-medium
                ${
                  selected.includes(opt.key)
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-800"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt.key)}
                  onChange={() => handleSelection(opt.key)}
                  className="form-checkbox w-5 h-5 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
                />
                <span className="ml-3 select-none">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* View Plans button */}
        <button
          className="bg-[#0072ce] hover:bg-blue-700 text-white rounded-lg px-20 py-3 text-lg font-medium shadow transition-all duration-150"
          type="button"
          onClick={() => {
            // Navigate to plan list with all collected data (selection is optional)
            navigate("/plan-list", {
              state: {
                selectedMembers,
                selectedAge,
                selectedCity,
                currentMember,
                mobileNumber,
                medicalHistory,
                specificConditions: selected.length > 0 ? selected : null
              }
            });
          }}
        >
          View Plans
        </button>
      </div>

      {/* Bottom background SVG decor (optional) */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none opacity-10 z-0">
        {/* Place the SVG/PNG decorative background here if you have it */}
      </div>
    </div>
  );
}
