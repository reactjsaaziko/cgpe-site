import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import HeaderHI from "../headers/HeaderHI";

export default function ProposerDetailsHI() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get data from previous screens
    const selectedPlan = location.state?.selectedPlan || {
        logo: "/care-logo.png",
        companyName: "care HEALTH INSURANCE",
        planName: "Care Supreme Direct",
        cover: "₹7 Lakh",
        basePremium: "₹9,574",
        totalPremium: "₹10,375"
    };

    // Form state
    const [formData, setFormData] = useState({
        fullName: " ",
        noLastName: false,
        gender: " ",
        maritalStatus: "",
        panCard: "",
        noPanCard: false,
        gstNo: "",
        dateOfBirth: "",
        occupation: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        flatNumber: "",
        colony: "",
        landmark: "",
        city: " ",
        state: " ",
        pinCode: " ",
        email: "",
        mobile: " ",
        emergencyMobile: ""
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to medical questions with all data
        navigate("/medical-questions", {
            state: {
                ...location.state,
                proposerDetails: formData
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] flex flex-col">
            <HeaderHI/>
            <div className="flex-1 flex justify-center py-6 px-4">
                <div className="w-full max-w-7xl flex gap-6">
                    {/* Left Column - Form */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <a href="#" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
                                ← Go back to Product
                            </a>
                            
                            {/* Progress Steps */}
                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                        1
                                    </div>
                                    <span className="ml-2 font-medium text-green-600">Proposer</span>
                                </div>
                                <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                                        2
                                    </div>
                                    <span className="ml-2 font-medium text-gray-500">Medical</span>
                                </div>
                                <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                                        3
                                    </div>
                                    <span className="ml-2 font-medium text-gray-500">Nominee</span>
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold text-[#1d2746] mb-2">
                                Great! Let's start with proposer details
                            </h1>
                            <p className="text-gray-600">
                                Proposer is going to pay the premium and avail tax benefits
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Proposer's Details */}
                            <div>
                                <h2 className="text-lg font-semibold text-[#1d2746] mb-4">Proposer's Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name as per your ID Card
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter full name as per ID card" 
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <div className="mt-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.noLastName}
                                                    onChange={(e) => handleInputChange('noLastName', e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-gray-600">Don't have a last name</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Gender
                                        </label>
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => handleInputChange('gender', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Gender">Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Marital Status
                                        </label>
                                        <select
                                            value={formData.maritalStatus}
                                            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Marital Status</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Widowed">Widowed</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            PAN Card
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.panCard}
                                            onChange={(e) => handleInputChange('panCard', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter PAN Card number"
                                        />
                                        <div className="mt-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.noPanCard}
                                                    onChange={(e) => handleInputChange('noPanCard', e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-gray-600">I don't have a PAN card</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            GST No (optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.gstNo}
                                            onChange={(e) => handleInputChange('gstNo', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter GST number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Personal Details */}
                            <div>
                                <h2 className="text-lg font-semibold text-[#1d2746] mb-2">Personal Details</h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    Information required about the member to be insured
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            D.O.B (DD-MM-YYYY)
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Occupation
                                        </label>
                                        <select
                                            value={formData.occupation}
                                            onChange={(e) => handleInputChange('occupation', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Occupation</option>
                                            <option value="Salaried">Salaried</option>
                                            <option value="Self-Employed">Self-Employed</option>
                                            <option value="Business Owner">Business Owner</option>
                                            <option value="Student">Student</option>
                                            <option value="Retired">Retired</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Height (Feet)
                                        </label>
                                        <select
                                            value={formData.heightFeet}
                                            onChange={(e) => handleInputChange('heightFeet', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Feet</option>
                                            {[4, 5, 6, 7].map(feet => (
                                                <option key={feet} value={feet}>{feet}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Height (Inches)
                                        </label>
                                        <select
                                            value={formData.heightInches}
                                            onChange={(e) => handleInputChange('heightInches', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Select Inches</option>
                                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(inch => (
                                                <option key={inch} value={inch}>{inch}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Weight (KG)
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.weight}
                                            onChange={(e) => handleInputChange('weight', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter weight in KG"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <h2 className="text-lg font-semibold text-[#1d2746] mb-2">Address</h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    It will be used to send physical copy of your policy
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Flat/House number, Apartment
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.flatNumber}
                                            onChange={(e) => handleInputChange('flatNumber', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter flat/house number"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Colony, Street, Sector
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.colony}
                                            onChange={(e) => handleInputChange('colony', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter colony, street, sector"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Landmark
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.landmark}
                                            onChange={(e) => handleInputChange('landmark', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter landmark"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State
                                        </label>
                                        <select
                                            value={formData.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="select your city">select-your-city</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pin Code
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.pinCode}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Only allow numbers and limit to 6 digits
                                                if (value === '' || /^\d{0,6}$/.test(value)) {
                                                    handleInputChange('pinCode', value);
                                                }
                                            }}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter 6-digit pincode"
                                            maxLength="6"
                                        />
                                        {formData.pinCode && formData.pinCode.length !== 6 && (
                                            <p className="text-red-500 text-sm mt-1">Pincode must be 6 digits</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div>
                                <h2 className="text-lg font-semibold text-[#1d2746] mb-2">Contact Details</h2>
                                <p className="text-gray-600 text-sm mb-4">
                                    It will be used to send digital copy of your policy
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter email address"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mobile
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Enter mobile number"
                                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Emergency Mobile No.
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.emergencyMobile}
                                            onChange={(e) => handleInputChange('emergencyMobile', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter emergency mobile number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors"
                                >
                                    Proceed to medical questions
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
                        <h2 className="text-xl font-semibold text-[#1d2746] mb-6">Summary</h2>
                        
                        {/* Plan for */}
                        <div className="mb-4">
                            <span className="text-gray-600">Plan for:</span>
                            <span className="ml-2 font-medium text-[#1d2746]">Self</span>
                        </div>

                        {/* Plan Details */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                                <img src={selectedPlan.logo} alt={selectedPlan.companyName} className="w-8 h-8 object-contain rounded mr-2" />
                                <div>
                                    <div className="text-sm font-medium text-[#1d2746]">{selectedPlan.companyName}</div>
                                    <div className="text-sm text-gray-600">{selectedPlan.planName}</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">Cover: {selectedPlan.cover}</div>
                        </div>

                        {/* Base Premium */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Base Premium - 1 Year</span>
                            <span className="font-semibold text-[#1d2746]">{selectedPlan.basePremium}</span>
                        </div>

                        {/* Selected Add Ons */}
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <span className="text-red-500 mr-2">❤️</span>
                                <span className="text-sm text-gray-600">Critical Illness - 20 critical illnesses covered - Self</span>
                            </div>
                            <div className="text-right">
                                <span className="font-medium text-[#1d2746]">₹801</span>
                            </div>
                        </div>

                        {/* Total Premium */}
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-[#1d2746]">Total premium</span>
                                <span className="text-xl font-bold text-[#1d2746]">{selectedPlan.totalPremium}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
} 