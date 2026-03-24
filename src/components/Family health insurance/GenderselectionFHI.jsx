import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import female from "../assets/personfemale.png"
import male from "../assets/account.png"
import Headerlogin from "../headers/Headerlogin";

export default function GenderSelectScreenFHI() {
  const [gender, setGender] = useState("Male");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (name.trim()) {
      navigate("/select-family-members-fhi", {
        state: {
          gender: gender,
          name: name
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Headerlogin/>
      {/* Top Nav */}
      {/* Center Content */}
      <div className="flex flex-col items-center flex-1 justify-start relative mt-20">
        {/* Title */}
        <div className="text-center mt-2 mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">
            Find top plans with up to <span className="text-blue-700 font-bold">25% discount</span>
          </h2>
          <div className="text-gray-500 text-lg font-normal">
            Find top plans with up to 25% discount
          </div>
        </div>
        {/* Gender Cards */}
        <div className="flex gap-7 mb-8">
          {/* Male Card */}
          <button
            onClick={() => setGender("Male")}
            className={`rounded-xl border-2 px-8 py-6 flex flex-col items-center w-48 shadow-sm transition
              ${gender === "Male" ? "border-blue-700 bg-blue-50" : "border-gray-200 bg-white"}
              hover:border-blue-400`}
          >
            <img
              src={male}
              alt="Male"
              className="h-20 mb-3"
            />
            <span className="text-lg font-medium text-gray-700">Male</span>
          </button>
          {/* Female Card */}
          <button
            onClick={() => setGender("Female")}
            className={`rounded-xl border-2 px-8 py-6 flex flex-col items-center w-48 shadow-sm transition
              ${gender === "Female" ? "border-blue-700 bg-blue-50" : "border-gray-200 bg-white"}
              hover:border-blue-400`}
          >
            <img
              src={female}
              alt="Female"
              className="h-20 mb-3"
            />
            <span className="text-lg font-medium text-gray-700">Female</span>
          </button>
        </div>
        {/* Name Input */}
        <input
          type="text"
          className="w-full max-w-lg border border-gray-300 rounded-lg px-4 py-3 text-lg mb-8 focus:outline-none focus:border-blue-500"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Continue Button */}
        <button
          className="w-full max-w-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg rounded-lg py-3 shadow transition"
          disabled={!name.trim()}
          onClick={handleContinue}
        >
          Continue
        </button>
        {/* Background icons, use as <svg> or <img> in absolute position if needed */}
        <div className="absolute left-0 right-0 bottom-0 pointer-events-none opacity-10 z-0">
          {/* You can add SVG or PNG as background image here for full match */}
        </div>
      </div>
    </div>
  );
}
