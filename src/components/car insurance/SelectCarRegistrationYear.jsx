import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetailsForm from "./UserDetailsForm";

export default function SelectCarRegistrationYear({ selectedBrand, selectedModel, selectedFuelType, selectedVariant, onBack }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedYear, setSelectedYear] = useState("Brand New Car");
    const [showUserDetails, setShowUserDetails] = useState(false);

    const years = [
        "Brand New Car",
        "2022", "2021", "2020", "2019", "2018",
        "2017", "2016", "2015", "2014", "2013",
        "2012", "2011", "2010", "2009", "2008",
        "2007", "2006", "2005", "2004", "2003",
        "2002", "2001", "2000", "1999"
    ];

    const filteredYears = years.filter(year =>
        year.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        // Show user details form when any year is selected
        setShowUserDetails(true);
    };

    const handleContinue = () => {
        // Show user details form instead of navigating
        setShowUserDetails(true);
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

    // If user details should be shown, render that component
    if (showUserDetails) {
        return (
            <UserDetailsForm 
                selectedBrand={selectedBrand}
                selectedModel={selectedModel}
                selectedFuelType={selectedFuelType}
                selectedVariant={selectedVariant}
                selectedYear={selectedYear}
                onBack={() => setShowUserDetails(false)}
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
                    Select Car Registration Year
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

            {/* Year Selection Grid */}
            <div className="grid grid-cols-5 gap-2">
                {filteredYears.map(year => (
                    <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`flex items-center justify-between p-3 rounded-lg border transition text-sm font-medium
                            ${selectedYear === year
                                ? "bg-[#4472c4] border-[#4472c4] text-white"
                                : "bg-white text-[#23294a] border-gray-200 hover:border-[#4472c4] hover:bg-blue-50"
                            }
                        `}
                    >
                        <span className="text-sm">{year}</span>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="ml-1 flex-shrink-0">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
} 