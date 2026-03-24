import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bike from "../assets/bike.png"
import SelectBikeBrand from "./SelectBikeBrand";

export default function BikeRenewal() {
    const navigate = useNavigate();
    const [carNumber, setCarNumber] = useState("");
    const [showSelectCarBrand, setShowSelectCarBrand] = useState(false);

    const handleViewPrices = () => {
        if (carNumber.trim()) {
            // Show the SelectCarBrand component inline
            setShowSelectCarBrand(true);
        }
    };

    const handleBuyNewCar = () => {
        // Navigate to new car insurance page
        navigate("/new-car-insurance");
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* <HeaderHI/> */} 
            <div className="relative bg-[#f3f6fa] w-full flex items-center px-4 py-2 min-h-[140px] border border-blue-200">
                {/* Logo */}
                <img src="/assets/images/C.G3.png" alt="CG Patel" className="w-[130px] h-[140px] object-contain" />
                {/* Optional vertical dotted divider */}
                <div className="h-[100px] border-l-2 border-dotted border-blue-200 mx-8" />
                {/* Faded Title */}
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2">
                    <h1 className="text-[70px] font-extrabold text-[#dbe6f5] tracking-tight select-none whitespace-nowrap">
                        Motar Renewal
                    </h1>
                </div>
                {/* Call Us Button */}
                <div className="ml-auto">
                    <button className="bg-[#4472c4] text-white rounded-lg px-7 py-3 font-medium text-base shadow hover:bg-[#2e54a5] transition">
                        Call Us
                    </button>
                </div>
            </div>


            {/* Content */}
            <div className="flex flex-col items-center justify-start flex-1 mt-2">
                <div className="w-full max-w-5xl mx-auto mt-32">
                    {/* Heading and subheading */}
                    <div className="flex items-center gap-3 mb-1 mt-8">
                        <span className="text-[#4773c8]">
                            {/* Heroicon: Shield Check / Car SVG */}
                            <svg width={34} height={34} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                                <path d="M3 17v-2a4 4 0 0 1 4-4h2" />
                                <path d="M21 17v-2a4 4 0 0 0-4-4h-2" />
                                <circle cx="7" cy="17" r="2" />
                                <circle cx="17" cy="17" r="2" />
                                <path d="M5 17v-6.5A1.5 1.5 0 0 1 6.5 9h11A1.5 1.5 0 0 1 19 10.5V17" />
                            </svg>
                        </span>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-[#22294a]">
                                  Buy your two-wheeler insurance
                            </span>
                            <span className="text-gray-500 text-base font-medium mt-1">
                                Renew in 1 minutes
                            </span>
                        </div>
                    </div>
                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between mt-8 px-10 py-10">
                        {/* Left: Illustration */}
                        <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
                            {/* Car crash SVG/PNG: Replace with your actual file if needed */}
                            <img src={bike} alt="Car Crash" className="w-80 h-52 object-contain" />
                        </div>
                        {/* Divider vertical */}
                        <div className="hidden md:block w-px h-64 bg-gray-200 mx-10" />
                        {/* Right: Form */}
                        {showSelectCarBrand ? (
                            <div className="w-full md:w-1/2 flex flex-col items-center">
                                <SelectBikeBrand />
                            </div>
                        ) : (
                            <div className="w-full md:w-1/2 flex flex-col items-center">
                                <input
                                    type="text"
                                    placeholder="Enter Bike Number"
                                    value={carNumber}
                                    onChange={(e) => setCarNumber(e.target.value)}
                                    className="w-full max-w-xs border border-gray-300 rounded-lg px-5 py-3 text-lg mb-8 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                                <button 
                                    onClick={handleViewPrices}
                                    className="w-full max-w-xs bg-[#4676c8] hover:bg-[#2957a4] text-white rounded-lg py-3 text-lg font-semibold mb-6 transition"
                                >
                                    View Prices
                                </button>
                                <div className="flex items-center w-full max-w-xs mb-4">
                                    <div className="flex-1 border-t border-gray-300"></div>
                                    <span className="px-3 text-gray-400 font-medium text-base">Or</span>
                                    <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <button 
                                    onClick={handleBuyNewCar}
                                    className="w-full max-w-xs bg-gray-100 hover:bg-gray-200 text-[#283356] font-medium text-lg py-3 rounded-lg transition"
                                >
                                    Buy a New Bike
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 
