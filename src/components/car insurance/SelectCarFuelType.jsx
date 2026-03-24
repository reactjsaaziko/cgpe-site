import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCarVariant from "./SelectCarVariant";

export default function SelectCarFuelType({ selectedBrand, selectedModel, onBack }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFuelType, setSelectedFuelType] = useState("Petrol");
    const [showVariant, setShowVariant] = useState(false);

    const fuelTypes = [
        "Petrol",
        "CNG", 
        "External CNG Kit"
    ];

    const filteredFuelTypes = fuelTypes.filter(fuelType =>
        fuelType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFuelTypeSelect = (fuelType) => {
        setSelectedFuelType(fuelType);
    };

    const handleContinue = () => {
        // Show variant selection instead of navigating
        setShowVariant(true);
    };

    const handleCancel = () => {
        setSearchQuery("");
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    // If variant selection should be shown, render that component
    if (showVariant) {
        return (
            <SelectCarVariant 
                selectedBrand={selectedBrand}
                selectedModel={selectedModel}
                selectedFuelType={selectedFuelType}
                onBack={() => setShowVariant(false)}
            />
        );
    }

    return (
        <div className="rounded-2xl w-[500px] mx-auto mt-10 p-4">
            {/* Header */}
            <div className="w-full bg-[#4472c4] rounded-lg py-1 px-1 flex items-center text-base justify-between mb-3">
                <button
                    onClick={handleBack}
                    className="text-white"
                >
                    <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <div className="text-center">
                    <span className="text-white text-xl font-semibold tracking-wide block">
                        Select Car Fuel Type
                    </span>
                </div>
                <button className="text-white">
                    <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Search Row */}
            <div className="flex items-center gap-3 mb-2 px-1">
                <div className="flex items-center bg-white rounded-full px-4 py-2 flex-1 border border-gray-200 shadow-sm">
                    <svg width="18" height="18" fill="none" stroke="#aaa" strokeWidth="2" className="mr-2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        className="flex-1 bg-transparent outline-none border-none text-base"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button onClick={handleCancel} className="bg-gray-200 text-gray-600 font-semibold px-4 py-2 rounded-full text-lg hover:bg-gray-300 transition">
                    Cancel
                </button>
            </div>

            {/* Fuel Type Options */}
            <div className="space-y-3">
                {filteredFuelTypes.map(fuelType => (
                    <button
                        key={fuelType}
                        onClick={() => handleFuelTypeSelect(fuelType)}
                        className={`w-full flex items-center justify-between p-4 rounded-lg border transition
                            ${selectedFuelType === fuelType
                                ? "bg-[#4472c4] border-[#4472c4] text-white"
                                : "bg-white border-gray-200 hover:border-[#4472c4] hover:bg-blue-50 text-[#23294a]"
                            }
                        `}
                    >
                        <span className="text-lg font-medium">{fuelType}</span>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                ))}
            </div>

            {/* Continue Button */}
            <button
                className="w-full mt-6 bg-[#4472c4] hover:bg-[#2957a4] text-white rounded-lg py-3 text-lg font-semibold transition"
                onClick={handleContinue}
                type="button"
            >
                Continue
            </button>
        </div>
    );
} 