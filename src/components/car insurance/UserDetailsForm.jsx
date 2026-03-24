import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarPriceModal from "./CarPriceModal";

export default function UserDetailsForm({ selectedBrand, selectedModel, selectedFuelType, selectedVariant, selectedYear, onBack }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        registration: "GJ05"
    });
    const [isCarPriceModalOpen, setIsCarPriceModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleViewPrices = async () => {
        // On viewing prices, record a minimal inquiry
        try {
            if (formData.fullName?.trim() || formData.mobileNumber?.trim()) {
                await fetch('/api/inquiries/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.fullName || 'Unknown',
                        phone: formData.mobileNumber || '',
                        inquiryType: 'insurance',
                        subject: 'Car Insurance',
                        message: `Lead from Car Insurance flow. Reg ${formData.registration}`,
                        source: 'website'
                    })
                });
            }
        } catch (e) {
            console.error('Failed to create inquiry', e);
        }
        // Open the car price modal instead of navigating
        setIsCarPriceModalOpen(true);
    };

    const handleCarPriceSubmit = (price) => {
        // Navigate to policy comparison page with all selected data, user details, and car price
        navigate("/policy-comparison", {
            state: { 
                selectedBrand, 
                selectedModel, 
                selectedFuelType,
                selectedVariant,
                selectedYear,
                registration: formData.registration,
                userDetails: formData,
                carPrice: price
            }
        });
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <>
            <div className="rounded-2xl w-[500px] p-4">
                {/* Title Bar */}
                <div className="w-full bg-[#4472c4] rounded-lg py-3 px-3 flex items-center justify-between mb-6">
                    <button className="mr-3" onClick={handleBack}>
                        <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 24 24">
                            <path d="M15 6l-6 6 6 6" />
                        </svg>
                    </button>
                    <span className="text-white text-xl font-semibold mx-auto tracking-wide">
                        enter your details
                    </span>
                </div>

                {/* Input Fields */}
                <div className="space-y-4 mb-6">
                    <div>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4472c4] transition"
                        />
                    </div>
                    
                    <div>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Mobile Number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4472c4] transition"
                        />
                    </div>
                    
                    <div>
                        <input
                            type="email"
                            name="emailId"
                            value={formData.emailId}
                            onChange={handleInputChange}
                            placeholder="Email Id"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4472c4] transition"
                        />
                    </div>
                    
                    <div>
                        <select
                            name="registration"
                            value={formData.registration}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4472c4] transition"
                        >
                            <option value="GJ05">GJ05 - Gujarat</option>
                            <option value="MH01">MH01 - Maharashtra</option>
                            <option value="DL01">DL01 - Delhi</option>
                            <option value="KA01">KA01 - Karnataka</option>
                            <option value="TN01">TN01 - Tamil Nadu</option>
                            <option value="AP01">AP01 - Andhra Pradesh</option>
                            <option value="TS01">TS01 - Telangana</option>
                            <option value="KL01">KL01 - Kerala</option>
                            <option value="PB01">PB01 - Punjab</option>
                            <option value="HR01">HR01 - Haryana</option>
                            <option value="RJ01">RJ01 - Rajasthan</option>
                            <option value="MP01">MP01 - Madhya Pradesh</option>
                            <option value="UP01">UP01 - Uttar Pradesh</option>
                            <option value="WB01">WB01 - West Bengal</option>
                            <option value="OR01">OR01 - Odisha</option>
                            <option value="JH01">JH01 - Jharkhand</option>
                            <option value="BR01">BR01 - Bihar</option>
                            <option value="AS01">AS01 - Assam</option>
                            <option value="CH01">CH01 - Chandigarh</option>
                        </select>
                    </div>
                </div>

                {/* View Prices Button */}
                <button
                    className="w-full bg-[#4472c4] hover:bg-[#2957a4] text-white rounded-lg py-4 text-lg font-semibold transition"
                    onClick={handleViewPrices}
                    type="button"
                >
                    View Prices
                </button>
            </div>

            {/* Car Price Modal */}
            <CarPriceModal
                isOpen={isCarPriceModalOpen}
                onClose={() => setIsCarPriceModalOpen(false)}
                onSubmit={handleCarPriceSubmit}
            />
        </>
    );
} 