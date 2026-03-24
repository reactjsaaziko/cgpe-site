import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";
import male from "../assets/account.png";
import female from "../assets/personfemale.png";
import son from "../assets/son.png";
import daughter from "../assets/daughter.png";
import father from "../assets/father.png";
import mother from "../assets/mother.png";
import grandfather from "../assets/grandfather.png";
import grandmother from "../assets/grandmother.png";
import fatherinlaw from "../assets/father-in-law.png";
import motherinlaw from "../assets/mother-in-law.png";

const AGE_RANGES = [
    { min: 18, max: 25, label: "18-25 years" },
    { min: 26, max: 35, label: "26-35 years" },
    { min: 36, max: 45, label: "36-45 years" },
    { min: 46, max: 55, label: "46-55 years" },
    { min: 56, max: 65, label: "56-65 years" },
    { min: 66, max: 75, label: "66-75 years" },
    { min: 76, max: 85, label: "76-85 years" },
];

const getMemberIcon = (memberKey) => {
    switch (memberKey) {
        case "self":
            return male;
        case "wife":
            return female;
        case "son":
            return son;
        case "daughter":
            return daughter;
        case "father":
            return father;
        case "mother":
            return mother;
        case "grand_father":
            return grandfather;
        case "grand_mother":
            return grandmother;
        case "father_in_law":
            return fatherinlaw;
        case "mother_in_law":
            return motherinlaw;
        default:
            return male;
    }
};

export default function SelectAgeHI() {
    const [selectedAge, setSelectedAge] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [age, setage] = useState("");

    // Get selected members from location state or default to ["self"]
    const selectedMembers = location.state?.selectedMembers || ["self"];
    const name = location.state?.name || "";
    const gender = location.state?.gender || "Male";
    const currentMember = selectedMembers[0]; // Show first selected member

    const handleContinue = () => {
        if (age.trim()) {
            // Navigate to city selection screen with selected data
            navigate("/select-city", {
                state: {
                    selectedMembers,
                    selectedAge: age,
                    currentMember,
                    name,
                    gender
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-10">
            <Headerlogin />

            {/* Header with selected member icon */}
            <div className="flex flex-col items-center mb-8 mt-20">
                <div className="mb-4">
                    <img
                        src={getMemberIcon(currentMember)}
                        alt={currentMember}
                        className="w-20 h-20 rounded-full border-4 border-blue-200"
                    />
                </div>
                <div className="text-2xl font-medium mb-2 text-center">
                    {name ? `${name},` : ''} Select age for {currentMember.replace('_', ' ')}
                </div>
            </div>

            {/* Age selection cards */}
            <div className="flex justify-center items-center w-full mb-8">
                <input
                    type="text"
                    className="w-full max-w-lg border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
                    placeholder="Your Age"
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                />
            </div>

            {/* Continue Button */}
            <button
                className="w-full max-w-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg rounded-lg py-3 shadow transition"
                disabled={!age.trim()}
                onClick={handleContinue}
            >
                Continue
            </button>

            {/* Top right actions */}
        </div>
    );
}
