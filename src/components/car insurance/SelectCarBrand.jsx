import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import suzuki from "../assets/suzuki.png"
import hyundai from "../assets/hyundai.png"
import tata from "../assets/tata.png"
import mahindra from "../assets/mahindra.png"
import honda from "../assets/honda.png"
import toyota from "../assets/toyota.png"
import ford from "../assets/ford.png"
import renault from "../assets/renault.png"
import kia from "../assets/kia.png"
import skoda from "../assets/skoda.png"
import SelectCarModel from "./SelectCarModel";


export default function SelectCarBrand() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("Maruti");
    const [showSelectCarModel, setShowSelectCarModel] = useState(false);

    const carBrands = [
        { key: "maruti", label: "Maruti" },
        { key: "hyundai", label: "Hyundai" },
        { key: "tata", label: "Tata" },
        { key: "mahindra", label: "Mahindra" },
        { key: "honda", label: "Honda" },
        { key: "toyota", label: "Toyota" },
        { key: "ford", label: "Ford" },
        { key: "renault", label: "Renault" },
        { key: "kia", label: "Kia" },
        { key: "skoda", label: "Skoda" },
    ];


    const filteredBrands = carBrands.filter(brand =>
        brand.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBrandSelect = (brandId) => {
        setSelectedBrand(brandId);
    };

    const handleContinue = () => {
        // Show the SelectCarModel component inline
        setShowSelectCarModel(true);
    };

    const handleCancel = () => {
        setSearchQuery("");
    };

    const handleOther = () => {
        // Navigate to other brand selection or manual input
        navigate("/other-car-brand", {
            state: { selectedBrand: "Other" }
        });
    };

    return (
        <div className="rounded-2xl w-[500px] mx-auto mt-5">
            {showSelectCarModel ? (
                <SelectCarModel selectedBrand={selectedBrand} />
            ) : (
                <>
                    {/* Title Bar */}
                    <div className="w-full bg-[#4472c4] rounded-lg py-2 px-2 flex items-center justify-between mb-2">
                        <span className="text-white text-xl font-semibold mx-auto text-base tracking-wide">
                            Select Car Brand
                        </span>
                        <span className="ml-auto">
                            <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24">
                                <path d="M9 6l6 6-6 6" />
                            </svg>
                        </span>
                    </div>
                    {/* Search Row */}
                    <div className="flex items-center gap-3 mb-3 px-1">
                        <div className="flex items-center bg-[#f7f7fa] rounded-full px-4 py-2 flex-1 border border-gray-200">
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
                        <button
                            onClick={handleCancel}
                            className="bg-[#e7e8ea] text-gray-400 font-semibold px-7 py-2 rounded-full text-lg cursor-default"
                        >
                            Cancel
                        </button>
                    </div>
                    {/* Brands Grid */}
                    <div className="bg-[#f7f7fa] rounded-xl py-5 px-3 mb-2">
                        <div className="grid grid-cols-5 gap-3 mb-3">
                            {carBrands.slice(0, 5).map(brand => (
                                <button
                                    key={brand.key}
                                    onClick={() => handleBrandSelect(brand.label)}
                                    className={`flex flex-col items-center py-4 rounded-lg border transition text-center
                          ${selectedBrand === brand.label
                                        ? "bg-[#4472c4] border-[#4472c4] text-white"
                                        : "bg-white border-gray-200 hover:border-[#4472c4] hover:bg-blue-50"}
                        `}
                                >
                                    <img
                                        src={
                                            brand.key === "maruti" ? suzuki :
                                            brand.key === "hyundai" ? hyundai :
                                            brand.key === "tata" ? tata :
                                            brand.key === "mahindra" ? mahindra :
                                            brand.key === "honda" ? honda :
                                            brand.key === "toyota" ? toyota :
                                            brand.key === "ford" ? ford :
                                            brand.key === "renault" ? renault :
                                            brand.key === "kia" ? kia :
                                            brand.key === "skoda" ? skoda :
                                            ""
                                        }
                                        alt={brand.label}
                                        className="w-10 h-10 object-contain mb-2"
                                        style={{ filter: selectedBrand === brand.label ? "brightness(0) invert(1)" : "none" }}
                                    />
                                    <span className={`text-[17px] font-medium tracking-tight ${selectedBrand === brand.label ? "text-white" : "text-[#23294a]"}`}>{brand.label}</span>
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {carBrands.slice(5, 10).map(brand => (
                                <button
                                    key={brand.key}
                                    onClick={() => handleBrandSelect(brand.label)}
                                    className={`flex flex-col items-center py-4 rounded-lg border transition text-center
                                         ${selectedBrand === brand.label
                                        ? "bg-[#4472c4] border-[#4472c4] text-white"
                                        : "bg-white border-gray-200 hover:border-[#4472c4] hover:bg-blue-50"}
                                     `}
                                >
                                    <img
                                        src={
                                            brand.key === "maruti" ? suzuki :
                                            brand.key === "hyundai" ? hyundai :
                                            brand.key === "tata" ? tata :
                                            brand.key === "mahindra" ? mahindra :
                                            brand.key === "honda" ? honda :
                                            brand.key === "toyota" ? toyota :
                                            brand.key === "ford" ? ford :
                                            brand.key === "renault" ? renault :
                                            brand.key === "kia" ? kia :
                                                                                brand.key === "skoda" ? skoda :
                                                                                    ""
                                        }
                                        alt={brand.label}
                                        className="w-10 h-10 object-contain mb-2"
                                        style={{ filter: selectedBrand === brand.label ? "brightness(0) invert(1)" : "none" }}
                                    />
                                    <span className={`text-[17px] font-medium tracking-tight ${selectedBrand === brand.label ? "text-white" : "text-[#23294a]"}`}>{brand.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Other Button */}
                    <button
                        className={`w-full bg-white border border-gray-300 rounded-lg py-1 text-center text-lg font-medium text-[#23294a] hover:bg-blue-50 transition ${selectedBrand === "Other" ? "bg-blue-50 border-[#4472c4] text-[#4472c4]" : ""}`}
                        onClick={handleOther}
                        type="button"
                    >
                        Other
                    </button>
                    {/* Continue Button */}
                    <button
                        className="w-full mt-2 bg-[#4472c4] hover:bg-[#2957a4] text-white rounded-lg py-1 text-lg font-semibold transition"
                        onClick={handleContinue}
                        type="button"
                    >
                        Continue
                    </button>
                </>
            )}
        </div>
    );
} 