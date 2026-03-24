import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import HeaderHI from "../headers/HeaderHI";

export default function MedicalQuestionsHI() {
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
    const proposerName = proposerDetails.fullName || "Sagar Exe";

    // Medical questions state
    const [medicalAnswers, setMedicalAnswers] = useState({
        question1: null, // Diagnosed with any condition
        question2: null, // Smoke, alcohol, tobacco, drugs
        question3: null, // Hospitalized in last 48 months
        question4: null, // Filed claims before
        question5: null, // Insurance declined/cancelled
        question6: null  // Already covered by Religare
    });

    const handleAnswer = (questionKey, answer) => {
        setMedicalAnswers(prev => ({
            ...prev,
            [questionKey]: answer
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to nominee section with all data
        navigate("/nominee-details-fhi", {
            state: {
                ...location.state,
                medicalAnswers
            }
        });
    };

    const isAllQuestionsAnswered = Object.values(medicalAnswers).every(answer => answer !== null);

    return (
        <div className="min-h-screen bg-[#f9fafb] flex flex-col">
            <HeaderHI/>   
            <div className="flex-1 flex justify-center py-6 px-4">
                <div className="w-full max-w-7xl flex gap-6">
                    {/* Left Column - Medical Questions */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <a href="#" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
                                ← Go back to Product
                            </a>
                            
                            {/* Progress Steps */}
                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                                        1
                                    </div>
                                    <span className="ml-2 font-medium text-gray-500">Proposer</span>
                                </div>
                                <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                        2
                                    </div>
                                    <span className="ml-2 font-medium text-green-600">Medical</span>
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
                                Help us know the medical condition, if any
                            </h1>
                            <p className="text-gray-600">
                                We'll only ask for the details insurance companies need
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Medical Questions Section */}
                            <div>
                                <h2 className="text-lg font-semibold text-[#1d2746] mb-6">
                                    Medical Questions for {proposerName}
                                </h2>
                                
                                {/* Question 1 */}
                                <div className="mb-8">
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        Has any Proposed to be Insured been diagnosed with or suffered from / is suffering from or is currently under medication for the following. If Your response is yes to any of the following questions, please specify details of the same in the additional information section:
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question1', 'yes')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question1 === 'yes'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question1', 'no')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question1 === 'no'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {/* Question 2 */}
                                <div className="mb-8">
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        Do You smoke, consume alcohol, or chew tobacco, ghutka or paan or use any recreational drugs? If 'Yes' then please provide the frequency & amount consumed. *
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question2', 'yes')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question2 === 'yes'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question2', 'no')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question2 === 'no'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {/* Question 3 */}
                                <div className="mb-8">
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        Have any of the above mentioned person(s) to be insured been diagnosed / hospitalized for any illness / injury during the last 48 months?
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question3', 'yes')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question3 === 'yes'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question3', 'no')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question3 === 'no'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {/* Question 4 */}
                                <div className="mb-8">
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        Have any of the person(s) to be insured ever filed a claim with their current / previous insurer?
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question4', 'yes')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question4 === 'yes'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question4', 'no')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question4 === 'no'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {/* Question 5 */}
                                <div className="mb-8">
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        Has any proposal for Health insurance been declined, cancelled or charged a higher premium?
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question5', 'yes')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question5 === 'yes'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question5', 'no')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question5 === 'no'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>

                                {/* Question 6 */}
                                <div className="mb-8">
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        Is any of the person(s) to be insured, already covered under any other health insurance policy of Religare Health Insurance?
                                    </p>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question6', 'yes')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question6 === 'yes'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleAnswer('question6', 'no')}
                                            className={`flex-1 py-3 px-6 rounded-lg border-2 font-medium transition-all ${
                                                medicalAnswers.question6 === 'no'
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={!isAllQuestionsAnswered}
                                    className={`w-full font-semibold py-3 px-6 rounded-lg text-lg transition-colors ${
                                        isAllQuestionsAnswered
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Continue to Nominee Details
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