import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanBenefitsPopup from './PlanBenefitsPopup';

const PlanBenefitsDemo = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handleProceedClick = () => {
        navigate('/guaranteed-returns-plan-config'); // Navigate directly to GRPLPlanconfig
    };

    const samplePlanData = {
        planName: 'iGuarantee Max Savings',
        investmentAmount: '₹ 12 Lacs',
        monthlyPremium: '₹ 20 K',
        maturityAmount: '₹ 18.6 L',
        lifeCover: '₹ 25.3 L',
        returnRate: '5.9%',
        tenure: '5 Years',
        maturityYear: '10 Years'
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Plan Benefits Demo
                </h1>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Investment Plan Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-800 mb-2">Plan Name</h3>
                            <p className="text-blue-600">{samplePlanData.planName}</p>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="font-semibold text-green-800 mb-2">Investment Amount</h3>
                            <p className="text-green-600">{samplePlanData.investmentAmount}</p>
                        </div>
                        
                        <div className="bg-purple-50 rounded-lg p-4">
                            <h3 className="font-semibold text-purple-800 mb-2">Monthly Premium</h3>
                            <p className="text-purple-600">{samplePlanData.monthlyPremium}</p>
                        </div>
                        
                        <div className="bg-orange-50 rounded-lg p-4">
                            <h3 className="font-semibold text-orange-800 mb-2">Maturity Amount</h3>
                            <p className="text-orange-600">{samplePlanData.maturityAmount}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            View Plan Benefits & Compare with FD
                        </button>
                        <button
                            onClick={handleProceedClick}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>

            {/* Plan Benefits Popup */}
            <PlanBenefitsPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                planData={samplePlanData}
            />
        </div>
    );
};

export default PlanBenefitsDemo;