import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCarRegistrationYear from "./SelectCarRegistrationYear";

export default function SelectCarVariant({ selectedBrand, selectedModel, selectedFuelType, onBack }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedVariant, setSelectedVariant] = useState("LX (796 cc)");
    const [showRegistrationYear, setShowRegistrationYear] = useState(false);

    const popularVariants = [
        "LX (796 cc)",
        "LXI (796 cc)",
        "STANDARD (796 cc)"
    ];

    const otherVariants = [
        "AUTO TRANSMISSION ABS PETROL (1197 cc)",
        "AUTO TRANSMISSION PETROL (1197 cc)",
        "LXI WITH AIRBAGS (796 cc)",
        "VX (1061 cc)",
        "VXI (1061 cc)",
        "VXI (796 cc)"
    ];

    const filteredPopularVariants = popularVariants.filter(variant =>
        variant.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredOtherVariants = otherVariants.filter(variant =>
        variant.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
        // Show registration year selection when any variant is selected
        setShowRegistrationYear(true);
    };

    const handleContinue = () => {
        // Navigate to next step with all selected data
        navigate("/car-details", {
            state: {
                selectedBrand,
                selectedModel,
                selectedFuelType,
                selectedVariant
            }
        });
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

    // If registration year selection should be shown, render that component
    if (showRegistrationYear) {
        return (
            <SelectCarRegistrationYear 
                selectedBrand={selectedBrand}
                selectedModel={selectedModel}
                selectedFuelType={selectedFuelType}
                selectedVariant={selectedVariant}
                onBack={() => setShowRegistrationYear(false)}
            />
        );
    }

    return (
        <div className="rounded-2xl w-[500px] p-4">
            {/* Title Bar */}
            <div className="w-full bg-[#4472c4] rounded-lg py-3 px-3 flex items-center justify-between mb-3">
                <button className="mr-3" onClick={handleBack}>
                    <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M15 6l-6 6 6 6" />
                    </svg>
                </button>
                <span className="text-white text-xl font-semibold mx-auto tracking-wide">
                    Select Car Variant
                </span>
                <button className="ml-auto" onClick={handleContinue}>
                    <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24">
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </button>
            </div>
            {/* Search Row */}
            <div className="flex items-center gap-3 mb-4 px-1">
                <div className="flex items-center bg-[#f7f7fa] rounded-full px-4 py-2 flex-1 border border-gray-200">
                    <svg width="18" height="18" fill="none" stroke="#aaa" strokeWidth="2" className="mr-2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        className="flex-1 bg-transparent outline-none border-none text-base"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleCancel}
                    className="bg-[#e7e8ea] text-gray-400 font-semibold px-7 py-2 rounded-full text-lg cursor-pointer hover:bg-gray-300 transition"
                >
                    Cancel
                </button>
            </div>
            {/* Popular Models */}
            <div className="bg-[#f7f7fa] rounded-xl px-4 py-4 mb-4">
                <div className="font-semibold text-[15px] text-[#4472c4] mb-2">Popular Models</div>
                <div className="flex gap-2 mb-4">
                    {filteredPopularVariants.map(variant => (
                        <button
                            key={variant}
                            onClick={() => handleVariantSelect(variant)}
                            className={`font-semibold px-4 py-2 text-[15px] flex items-center gap-2 shadow border
                                ${selectedVariant === variant
                                    ? "bg-[#4472c4] text-white border-[#4472c4]"
                                    : "bg-[#eceff3] text-[#a1a7b3] border-[#e0e6ed] hover:bg-blue-50 hover:text-[#4472c4] hover:border-[#4472c4]"}
                            `}
                        >
                            {variant}
                            <svg width="15" height="15" fill="none" stroke={selectedVariant === variant ? "#fff" : "#a1a7b3"} strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M9 9l3 3-3 3" />
                            </svg>
                        </button>
                    ))}
                </div>
                {/* Other variants */}
                <div className="font-semibold text-[15px] text-[#7a8498] mb-2">Other variants</div>
                <div className="grid grid-cols-2 gap-2">
                    {filteredOtherVariants.map(variant => (
                        <button
                            key={variant}
                            onClick={() => handleVariantSelect(variant)}
                            className={`flex justify-between items-center border rounded-lg px-4 py-2 font-semibold text-[15px] transition
                                ${selectedVariant === variant
                                    ? "bg-[#4472c4] text-white border-[#4472c4]"
                                    : "bg-white text-[#a1a7b3] border-gray-200 hover:border-[#4472c4] hover:bg-blue-50 hover:text-[#4472c4]"}
                            `}
                        >
                            {variant}
                            <svg width="15" height="15" fill="none" stroke={selectedVariant === variant ? "#fff" : "#a1a7b3"} strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M9 9l3 3-3 3" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
} 