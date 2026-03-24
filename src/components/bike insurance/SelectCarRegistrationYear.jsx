import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectCarRegistrationYear({ selectedBrand, selectedModel, selectedVariant, onBack }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("Brand New Car");

    const registrationYears = [
        "Brand New Bike",
        "2022",
        "2021", 
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
        "2009",
        "2008",
        "2007",
        "2006",
        "2005",
        "2004",
        "2003",
        "2002",
        "2001",
        "2000",
        "1999"
    ];

    const filteredYears = registrationYears.filter(year =>
        year.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        // Navigate to policy suggestion page immediately when year is selected
        navigate("/policy-suggestion", {
            state: { 
                selectedBrand,
                selectedModel,
                selectedVariant,
                selectedYear: year 
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

    const handleContinue = () => {
        // Navigate to next step with selected year
        navigate("/bike-fuel-type", {
            state: { 
                selectedBrand,
                selectedModel,
                selectedVariant,
                selectedYear 
            }
        });
    };

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
                        Select bike Registration Year
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

            {/* Year Selection Grid */}
            <div className="grid grid-cols-6 gap-2 mb-4">
                {filteredYears.map(year => (
                    <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`py-3 px-2 rounded-lg border transition text-center text-sm font-medium flex items-center justify-between
                            ${selectedYear === year
                                ? "bg-[#4472c4] border-[#4472c4] text-white"
                                : "bg-white border-gray-200 hover:border-[#4472c4] hover:bg-blue-50 text-[#23294a]"
                            }
                        `}
                    >
                        <span className="flex-1 text-left">{year}</span>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
}  