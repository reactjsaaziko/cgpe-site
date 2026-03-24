import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderHI from "../headers/HeaderHI";
import Footer from "../Footer";
    
export default function NomineeDetailsHI() {
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
    
    const proposerDetails = location.state?.proposerDetails || {};
    const medicalAnswers = location.state?.medicalAnswers || {};

    // Nominee form state
    const [nomineeData, setNomineeData] = useState({
        relationship: "",
        fullName: "",
        noLastName: false
    });

    const handleInputChange = (field, value) => {
        setNomineeData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to final confirmation or payment page
        navigate("/final-confirmation", {
            state: {
                ...location.state,
                nomineeData
            }
        });
    };

    const isFormValid = nomineeData.relationship && nomineeData.fullName;

    return (
        <div className="min-h-screen bg-[#f9fafb] flex flex-col">
            <HeaderHI/>
            <div className="flex-1 flex justify-center py-6 px-4">
                <div className="w-full max-w-7xl flex gap-6">
                    {/* Left Column - Nominee Details */}
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
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="ml-2 font-medium text-green-600">Proposer</span>
                                </div>
                                <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="ml-2 font-medium text-green-600">Medical</span>
                                </div>
                                <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                        3
                                    </div>
                                    <span className="ml-2 font-medium text-green-600">Nominee</span>
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold text-[#1d2746] mb-2">
                                Tell us who you want to make nominee
                            </h1>
                            <p className="text-gray-600">
                                God forbid, in case of any mishappening to the proposer, nominee is the person who gets the benefits
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Nominee Details Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-[#1d2746] mb-4">
                                    Give us the details of nominee to be
                                </h2>
                                
                                <div className="space-y-6">
                                    {/* Relationship with proposer */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Relationship with proposer
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={nomineeData.relationship}
                                                onChange={(e) => handleInputChange('relationship', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                                            >
                                                <option value="">Select relationship</option>
                                                <option value="spouse">Spouse</option>
                                                <option value="father">Father</option>
                                                <option value="mother">Mother</option>
                                                <option value="son">Son</option>
                                                <option value="daughter">Daughter</option>
                                                <option value="brother">Brother</option>
                                                <option value="sister">Sister</option>
                                                <option value="grandfather">Grandfather</option>
                                                <option value="grandmother">Grandmother</option>
                                                <option value="uncle">Uncle</option>
                                                <option value="aunt">Aunt</option>
                                                <option value="cousin">Cousin</option>
                                                <option value="friend">Friend</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Nominee Full Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nominee Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={nomineeData.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter nominee's full name"
                                        />
                                        <div className="mt-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={nomineeData.noLastName}
                                                    onChange={(e) => handleInputChange('noLastName', e.target.checked)}
                                                    className="mr-2"
                                                />
                                                <span className="text-sm text-gray-600">Don't have a last name</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="button"
                                    disabled={!isFormValid}
                                    className={`w-full font-semibold py-3 px-6 rounded-lg text-lg transition-colors ${
                                        isFormValid
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Continue to nominee section
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
                            <div className="text-sm text-gray-600 mb-2">Selected Add Ons:</div>
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