import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectCarRegistrationYear from "./SelectCarRegistrationYear";

export default function SelectBikeVariant({ selectedBrand = "Honda", selectedModel = "Activa", onBack }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedVariant, setSelectedVariant] = useState("3G (110 CC)");
    const [showRegistrationYear, setShowRegistrationYear] = useState(false);

    const popularModels = [
        "3G (110 CC)",
        "4G (110 CC)",
        "5G (110 CC)",
        "6G H Smart (110)",
        "6G Premium Edition (110)",
        "6G DLX Ltd Edition (110 cc)",
        "6GSmart key Alloy (110 cc)",
        "DLX (110 CC)",
        "DLX OBD2 (110)",
        "DLX OBD2 Ltd Edition (110 cc)",
        "Disc Brake OBD 2 (125)",
        "DLX (125 CC)",
        "Drum Brake OBD (125)",
        "Electric Start (110 cc)",
        "Premium Edition Disc Brake",
        "Premium Edition Drum Brake"
    ];

    const otherVariants = [
        "H - Smart (125 cc)",
        "5G DLX (110 CC)",
        "6G - DLX (110 Cc)",
        "6G - STD (110 CC)",
        "HET (110 CC )",
        "STD (102)"
    ];

    const filteredPopularModels = popularModels.filter(variant =>
        variant.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredOtherVariants = otherVariants.filter(variant =>
        variant.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
        setShowRegistrationYear(true);
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

    const handleBackToVariant = () => {
        setShowRegistrationYear(false);
    };

    // Show car registration year selection if a variant is selected
    if (showRegistrationYear) {
        return (
            <SelectCarRegistrationYear
                selectedBrand={selectedBrand}
                selectedModel={selectedModel}
                selectedVariant={selectedVariant}
                onBack={handleBackToVariant}
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
                        Select Bike Variant
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

            {/* Bike Variants Selection */}
            <div className="space-y-6">
                {/* Popular Models Section */}
                <div>
                    <h3 className="text-[#4472c4] font-semibold text-lg mb-3">Popular Models</h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {filteredPopularModels.map(variant => (
                            <button
                                key={variant}
                                onClick={() => handleVariantSelect(variant)}
                                className={`py-3 px-2 rounded-lg border transition text-center text-sm font-medium flex items-center justify-between
                                    ${selectedVariant === variant
                                        ? "bg-[#4472c4] border-[#4472c4] text-white"
                                        : "bg-white border-gray-200 hover:border-[#4472c4] hover:bg-blue-50 text-[#23294a]"
                                    }
                                `}
                            >
                                <span className="flex-1 text-left">{variant}</span>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Other Variants Section */}
                <div>
                    <h3 className="text-[#4472c4] font-semibold text-lg mb-3">Other variants</h3>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {filteredOtherVariants.map(variant => (
                            <button
                                key={variant}
                                onClick={() => handleVariantSelect(variant)}
                                className={`py-3 px-2 rounded-lg border transition text-center text-sm font-medium flex items-center justify-between
                                    ${selectedVariant === variant
                                        ? "bg-[#4472c4] border-[#4472c4] text-white"
                                        : "bg-white border-gray-200 hover:border-[#4472c4] hover:bg-blue-50 text-[#23294a]"
                                    }
                                `}
                            >
                                <span className="flex-1 text-left">{variant}</span>
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
} 