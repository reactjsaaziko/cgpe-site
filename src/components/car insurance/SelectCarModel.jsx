import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCarFuelType from "./SelectCarFuelType";

export default function SelectCarModel({ selectedBrand = "Maruti" }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedModel, setSelectedModel] = useState("Alto");
    const [showFuelType, setShowFuelType] = useState(false);

    const popularModels = [
        // First section
        "Alto", "Alto 800", "Alto k10", "Baleno",
        "Ertiga", "Swift", "Swift Dzire", "Wagon R",
        // Second section
        "Celerio", "Ciaz", "Dzire", "Eeco",
        "Ignis", "Ritz", "S cross", "Vitara Brezza"
    ];

    const filteredModels = popularModels.filter(model =>
        model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleModelSelect = (model) => {
        setSelectedModel(model);
    };

    const handleContinue = () => {
        // Show fuel type selection instead of navigating
        setShowFuelType(true);
    };

    const handleCancel = () => {
        setSearchQuery("");
    };

    const handleOther = () => {
        // Navigate to other model selection or manual input
        navigate("/other-car-model", {
            state: { selectedModel: "Other" }
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    // If fuel type selection should be shown, render that component
    if (showFuelType) {
        return (
            <SelectCarFuelType 
                selectedBrand={selectedBrand}
                selectedModel={selectedModel}
                onBack={() => setShowFuelType(false)}
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
                        Select Car Model
                    </span>
                    <span className="text-white text-sm opacity-90 block">
                        {selectedBrand}
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

            {/* Car Models Selection */}
            <div className="space-y-6">
                {/* First Popular Models Section */}
                <div>
                    <h3 className="text-[#4472c4] font-semibold text-lg mb-3">Popular Models</h3>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        {filteredModels.slice(0, 8).map(model => ( 
                            <button
                                key={model}
                                onClick={() => handleModelSelect(model)}
                                className={`py-3 px-2 rounded-lg border transition text-center text-sm font-medium
                                    ${selectedModel === model
                                        ? "bg-[#4472c4] border-[#4472c4] text-white"
                                        : "bg-white border-gray-200 hover:border-[#4472c4] hover:bg-blue-50 text-[#23294a]"
                                    }
                                `}
                            >
                                {model}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Second Popular Models Section */}
                <div>
                    <h3 className="text-[#4472c4] font-semibold text-lg mb-3">Popular Models</h3>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {filteredModels.slice(8, 16).map(model => (
                            <button
                                key={model}
                                onClick={() => handleModelSelect(model)}
                                className={`py-3 px-2 rounded-lg border transition text-center text-sm font-medium
                                    ${selectedModel === model
                                        ? "bg-[#4472c4] border-[#4472c4] text-white"
                                        : "bg-white border-gray-200 hover:border-[#4472c4] hover:bg-blue-50 text-[#23294a]"
                                    }
                                `}
                            >
                                {model}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Other Button */}
            <button
                className={`w-full bg-white border border-gray-300 rounded-lg py-1 text-center text-lg font-medium text-[#23294a] hover:bg-blue-50 transition ${selectedModel === "Other" ? "bg-blue-50 border-[#4472c4] text-[#4472c4]" : ""}`}
                onClick={handleOther}
                type="button"
            >
                Other
            </button>

            {/* Continue Button */}
            <button
                className="w-full mt-4 bg-[#4472c4] hover:bg-[#2957a4] text-white rounded-lg py-1 text-lg font-semibold transition"
                onClick={handleContinue}
                type="button"
            >
                Continue
            </button>
        </div>
    );
} 