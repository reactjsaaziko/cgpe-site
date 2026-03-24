import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";

export default function MedicalHistoryHI() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from previous screens
  const selectedMembers = location.state?.selectedMembers || ["self"];
  const selectedAge = location.state?.selectedAge || "";
  const selectedCity = location.state?.selectedCity || "";
  const currentMember = location.state?.currentMember || "self";
  const mobileNumber = location.state?.mobileNumber || "";

  // Single-select logic for 'None of these', else multi-select
  const handleCheck = (key) => {
    if (key === "none") {
      setSelected(selected.includes("none") ? [] : ["none"]);
    } else {
      if (selected.includes("none")) {
        setSelected([key]);
      } else if (selected.includes(key)) {
        setSelected(selected.filter((k) => k !== key));
      } else {
        setSelected([...selected, key]);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Headerlogin/>

      {/* Main content */}
      <div className="flex flex-col flex-1 items-center justify-start relative mt-24">
        {/* Title & subtitle */}
        <div className="mb-4">
          <h1 className="text-3xl font-semibold text-center mb-2">Medical history</h1>
          <p className="text-gray-700 text-center text-lg max-w-3xl mb-2">
            Do any member(s) have any existing illnesses for which they take regular medication?
          </p>
        </div>
        {/* Checkboxes */}
        <div className="flex flex-col gap-5 mb-12 w-full max-w-xl">
          {/* Existing illness */}
          <label
            className={`border-2 rounded-xl px-5 py-4 flex flex-col cursor-pointer transition
            ${selected.includes("illness") ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
            `}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selected.includes("illness")}
                onChange={() => handleCheck("illness")}
                className="form-checkbox w-5 h-5 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
                disabled={selected.includes("none")}
              />
              <span className={`ml-3 text-lg font-medium ${selected.includes("illness") ? "text-blue-700" : "text-gray-800"}`}>
                Existing illness
              </span>
            </div>
            <span className={`ml-8 mt-1 text-sm ${selected.includes("illness") ? "text-blue-600" : "text-gray-500"}`}>
              Blood pressure, Diabetes, Heart conditions, Asthma, Thyroid, Cancer etc.
            </span>
          </label>
          {/* Surgical procedure */}
          <label
            className={`border-2 rounded-xl px-5 py-4 flex flex-col cursor-pointer transition
            ${selected.includes("surgical") ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
            `}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selected.includes("surgical")}
                onChange={() => handleCheck("surgical")}
                className="form-checkbox w-5 h-5 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
                disabled={selected.includes("none")}
              />
              <span className={`ml-3 text-lg font-medium ${selected.includes("surgical") ? "text-blue-700" : "text-gray-800"}`}>
                Surgical procedure
              </span>
            </div>
            <span className="ml-8 mt-1 text-sm text-gray-500">
              Appendix, Gall bladder, C-section etc.
            </span>
          </label>
          {/* None of these */}
          <label
            className={`border-2 rounded-xl px-5 py-4 flex items-center cursor-pointer transition
            ${selected.includes("none") ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
            `}
          >
            <input
              type="checkbox"
              checked={selected.includes("none")}
              onChange={() => handleCheck("none")}
              className="form-checkbox w-5 h-5 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
            />
            <span className={`ml-3 text-lg font-medium ${selected.includes("none") ? "text-blue-700" : "text-gray-800"}`}>
              None of these
            </span>
          </label>
        </div>
        {/* Continue button */}
        <button
          className="bg-[#0072ce] hover:bg-blue-700 text-white rounded-lg px-20 py-3 text-lg font-medium shadow transition-all duration-150"
          disabled={selected.length === 0}
          type="button"
          onClick={() => {
            if (selected.length > 0) {
              // Navigate to second medical history page with all collected data
              navigate("/medical-history-grid2", {
                state: {
                  selectedMembers,
                  selectedAge,
                  selectedCity,
                  currentMember,
                  mobileNumber,
                  medicalHistory: selected
                }
              });
            }
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
