import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FundPerformance from "./FundPerformance";

export default function PlanDetailsPopup({ isOpen, onClose, plan }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("benefits");
  const [showFundPerformance, setShowFundPerformance] = useState(false);

    if (!isOpen || !plan) return null;

    // Show Fund Performance component if requested
    if (showFundPerformance) {
        return (
            <FundPerformance onClose={() => setShowFundPerformance(false)} />
        );
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xl w-full mx-auto relative min-h-[600px] max-h-[60vh] overflow-y-auto">
                {/* Tabs */}
                <div className="flex justify-center gap-2 mb-8">
                    <button
                        onClick={() => setTab("benefits")}
                        className="px-6 py-2 rounded-t-xl font-semibold text-base transition bg-white text-[#2b2d42] border-b-2 border-[#4b93f6]"
                    >
                        Plan Benefits
                    </button>
                    <button
                        onClick={() => setShowFundPerformance(true)}
                        className="px-6 py-2 rounded-t-xl font-semibold text-base transition bg-transparent text-gray-400 hover:text-gray-600"
                    >
                        Fund Performance
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 bg-[#4b93f6] bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition"
                >
                    <svg className="w-6 h-6 text-[#4b93f6]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                    </svg>
                </button>

                {/* Plan Title */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-2xl font-bold text-[#2b2d42]">Understand Your Plan</h2>
                    <div className="flex flex-col items-end">
                        <img
                            src={plan.logo}
                            alt={`${plan.company} Logo`}
                            className="h-7 mb-1"
                        />
                        <div className="text-xs text-gray-500 font-medium -mt-1">{plan.solution}</div>
                    </div>
                </div>

                {/* Company Info */}
                <div className="bg-[#e7effe] text-[#244491] font-semibold rounded-lg px-4 py-2 text-center mb-5">
                    {plan.fundType} has given <span className="font-bold">{plan.returns} returns in last 5 years</span>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-lg px-2 py-3 mb-3 flex items-center justify-center">
                    {/* Replace with actual chart if needed */}
                    <svg width="300" height="120" className="mx-auto">
                        <linearGradient id="greenGrad" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#A7E9A4" />
                            <stop offset="100%" stopColor="#e5f8df" />
                        </linearGradient>
                        {/* Area under line */}
                        <polygon
                            points="0,110 0,80 30,70 60,60 100,80 120,60 150,40 180,60 210,40 240,25 270,30 300,15 300,110"
                            fill="url(#greenGrad)"
                            opacity="0.9"
                        />
                        {/* Line */}
                        <polyline
                            points="0,80 30,70 60,60 100,80 120,60 150,40 180,60 210,40 240,25 270,30 300,15"
                            fill="none"
                            stroke="#48bb78"
                            strokeWidth="3"
                        />
                        {/* CAGR arrow & text */}
                        <text x="110" y="30" fontSize="14" fontWeight="bold" fill="#333">
                            {plan.returns} CAGR
                        </text>
                        <line x1="125" y1="35" x2="185" y2="55" stroke="#333" strokeDasharray="4 2" />
                        {/* Axis labels */}
                        <text x="0" y="115" fontSize="10" fill="#888">2018</text>
                        <text x="60" y="115" fontSize="10" fill="#888">2019</text>
                        <text x="120" y="115" fontSize="10" fill="#888">2021</text>
                        <text x="180" y="115" fontSize="10" fill="#888">2022</text>
                        <text x="240" y="115" fontSize="10" fill="#888">2023</text>
                        <text x="280" y="115" fontSize="10" fill="#888">2024</text>
                    </svg>
                </div>

                {/* Blue Info Card */}
                <div className="bg-[#e7effe] text-[#244491] font-medium rounded-lg px-4 py-3 text-center mb-4">
                    If you had invested <span className="font-bold">₹1 Lac in 2019</span>, it would have grown to
                    <span className="font-bold"> {plan.payout}</span> with return of {plan.returns} over the last 5 years
                </div>

                {/* Why Fund Card */}
                <div className="bg-[#e3edfd] rounded-xl p-5 mb-5">
                    <div className="font-bold text-[#2b2d42] mb-2">Why {plan.fundType}?</div>
                    <div className="bg-white rounded-xl px-4 py-3 mb-3 shadow border-l-4 border-[#4b93f6]">
                        <div className="font-bold text-[#2b2d42] mb-1">Growth Potential</div>
                        <div className="text-gray-700 text-sm">
                            {plan.fundType.includes('Mid Cap')
                                ? 'Mid-cap companies have the potential to grow faster and become large-cap of tomorrow.'
                                : 'This fund offers strong growth potential with diversified portfolio management.'}
                        </div>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 shadow border-l-4 border-[#4b93f6]">
                        <div className="font-bold text-[#2b2d42] mb-1">Professional Management</div>
                        <div className="text-gray-700 text-sm">
                            {plan.fundType.includes('Index')
                                ? 'Fund Portfolio replicates the components of the index resulting in no bias of fund manager in stock selection.'
                                : 'Managed by experienced professionals with proven track record in fund management.'}
                        </div>
                    </div>
                </div>


                {/* Payout Information Card */}
                <div className="mt-6 mb-5">
                    <PayoutInfoCard plan={plan} navigate={navigate} />
                </div>
            </div>
        </div>
    );
}

// Payout Information Card Component
function PayoutInfoCard({ plan, navigate }) {
    return (
        <div className="bg-white rounded-b-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    {/* Left Section - Payout Information */}
                    <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">Lumpsum Payout</div>
                        <div className="text-2xl font-bold text-gray-800 mb-2">₹1.41 Cr</div>
                        <div className="text-sm text-gray-500">
                            If you had invested <span className="font-semibold">20 yrs ago</span>
                        </div>
                    </div>

                              {/* Right Section - Proceed Button */}
          <div className="ml-6">
            <button 
              onClick={() => navigate("/investment-plan-config")}
              className="bg-[#4b93f6] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-md"
            >
              Proceed
            </button>
          </div>
                </div>
            </div>
        </div>
    );
}
