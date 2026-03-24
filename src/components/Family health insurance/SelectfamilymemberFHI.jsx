import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";
import male from "../assets/account.png"
import female from "../assets/personfemale.png"
import son from "../assets/son.png"
import daughter from "../assets/daughter.png"
import father from "../assets/father.png"
import mother from "../assets/mother.png"
import grandfather from "../assets/grandfather.png"
import grandmother from "../assets/grandmother.png"
import fatherinlaw from "../assets/father-in-law.png"
import motherinlaw from "../assets/mother-in-law.png"

const MEMBERS = [
  { key: "self", label: "Self" },
  { key: "wife", label: "Wife" },
  { key: "son", label: "Son" },
  { key: "daughter", label: "Daughter" },
  { key: "father", label: "Father" },
  { key: "mother", label: "Mother" },
  { key: "grand_father", label: "Grand Father" },
  { key: "grand_mother", label: "Grand Mother" },
  { key: "father_in_law", label: "Father-in-law" },
  { key: "mother_in_law", label: "Mother-in-law" },
];

export default function SelectFamilyMembersFHI() {
  const [selected, setSelected] = useState(["self"]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from previous screen
  const { gender, name } = location.state || {};

  const toggleMember = (key) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(key)) {
        // Remove if already selected
        return prevSelected.filter((item) => item !== key);
      } else {
        // Add if not selected
        return [...prevSelected, key];
      }
    });
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      navigate("/select-age-fhi", {
        state: {
          selectedMembers: selected,
          gender: gender,
          name: name
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-10">
      <Headerlogin />
      {/* Back Button */}
      <div className="w-full max-w-4xl px-6 mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="text-blue-600 text-[15px] mb-4 inline-block hover:text-blue-800"
        >
          ← Back
        </button>
      </div>
      {/* Logo & Header */}
      <div className="flex flex-col items-center">
        <div className="text-2xl font-medium mt-8 mb-2 text-center">
          Hey {name || 'there'}, now select member(s) that you want to insure
        </div>
        <div className="text-gray-500 mb-10 text-center">
          We have plans covering everyone in your family
        </div>
      </div>
      {/* Family member cards */}
      <div className="grid grid-cols-5 gap-6 max-w-4xl mb-12">
        {MEMBERS.map((member) => (
          <button
            key={member.key}
            onClick={() => toggleMember(member.key)}
            className={`flex flex-col items-center justify-center border rounded-xl px-5 py-5 bg-white 
            hover:shadow-md transition-all outline-none 
            ${selected.includes(member.key)
                ? "border-blue-600 shadow-lg ring-2 ring-blue-200"
                : "border-gray-200"
              }`}
            style={{ minWidth: 100, minHeight: 120 }}
            type="button"
          >
            <div className="text-4xl mb-2">
              {member.key === "self" && <img src={male} alt="Self" className="w-14 h-14" />}
              {member.key === "wife" && <img src={female} alt="Wife" className="w-14 h-14" />}
              {member.key === "son" && <img src={son} alt="Son" className="w-14 h-14" />}
              {member.key === "daughter" && <img src={daughter} alt="Daughter" className="w-14 h-14" />}
              {member.key === "father" && <img src={father} alt="Father" className="w-14 h-14" />}
              {member.key === "mother" && <img src={mother} alt="Mother" className="w-14 h-14" />}
              {member.key === "grand_father" && <img src={grandfather} alt="Grand Father" className="w-14 h-14" />}
              {member.key === "grand_mother" && <img src={grandmother} alt="Grand Mother" className="w-14 h-14" />}
              {member.key === "father_in_law" && <img src={fatherinlaw} alt="Father-in-law" className="w-14 h-14" />}
              {member.key === "mother_in_law" && <img src={motherinlaw} alt="Mother-in-law" className="w-14 h-14" />}
            </div>
            <span className="font-medium">{member.label}</span>
            {selected.includes(member.key) && (
              <span className="mt-2 text-blue-600 text-xs font-semibold">Selected</span>
            )}
          </button>
        ))}
      </div>
      {/* Continue Button */}
      <button
        className={`rounded-lg px-20 py-3 text-lg font-semibold shadow-sm transition-all ${
          selected.length > 0
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        type="button"
        disabled={selected.length === 0}
        onClick={handleContinue}
      >
        Continue
      </button> 
      {/* Bottom faint illustrations (optional, for background decor) */}
      <div className="fixed inset-x-0 bottom-0 pointer-events-none opacity-10 z-0">
        {/* Place your SVG or PNG decor here */}
      </div>
    </div>
  );
}
