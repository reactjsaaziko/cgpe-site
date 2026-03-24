import React, { useState, useMemo, useEffect } from "react";
import LeftSidebar from "./Leftsidebar"; // Make sure this path is correct
import Footer from "../Footer"; // Adjust the path as needed
import PlanDetailsPopup from "./PlanDetailsPopup";
import StartBlock from "../StartBlock";
import { useInvestment } from "../../context/InvestmentContext";
import ContactConfirmation from "../term insurance/ContactConfirmation";
import OptimizedImage from "../common/OptimizedImage";





function PlanCard({ plan, onGetDetails }) {
    // if (plan.highlight) {
    //     return (
    //         <div className={`rounded-xl overflow-hidden mb-4 ${plan.gradient}`}>
    //             <div className="flex flex-col md:flex-row items-center px-6 py-5">
    //                 {/* Left - Company, Title */}
    //                 <div className="flex items-center mb-3 md:mb-0 md:w-1/4">
    //                     <img src={plan.logo} alt={plan.company} className="h-9 w-9 rounded mr-4" />
    //                     <div>
    //                         <div className="font-bold">{plan.company}</div>
    //                         <div className="text-xs text-gray-600">{plan.solution}</div>
    //                     </div>
    //                 </div>
    //                 {/* Center - Highlight Banner */}
    //                 <div className="flex-1 text-center">
    //                     <div className="font-semibold text-blue-900 text-base mb-1">
    //                         {plan.blueBanner.main}
    //                         <span className="font-bold">{plan.blueBanner.bold}</span>
    //                         {plan.blueBanner.rest}
    //                     </div>
    //                     <div className="text-xs text-blue-900">{plan.blueBanner.sub}</div>
    //                     <div className="flex items-center justify-center mt-2">
    //                         <span className="w-4 h-4 bg-yellow-200 rounded-full flex items-center justify-center mr-2">
    //                             <svg className="w-3 h-3" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#ffe066" /></svg>
    //                         </span>
    //                         <span className="text-xs text-[#0373d3] font-semibold">{plan.blueBanner.note}</span>
    //                     </div>
    //                 </div>
    //                 {/* Right - Returns and Button */}
    //                 <div className="flex flex-col items-end md:w-1/4">
    //                     <div className="flex gap-7 mb-3">
    //                         <div>
    //                             <div className="text-xs text-gray-500">{plan.returnsPeriod}</div>
    //                             <div className="text-lg font-bold text-[#0373d3]">{plan.returns}</div>
    //                             <div className="mt-1 text-xs px-2 py-1 bg-[#e3ebfc] text-[#0373d3] rounded inline-block">{plan.fundType}</div>
    //                         </div>
    //                         <div>
    //                             <div className="text-xs text-gray-500">Lumpsum Payout</div>
    //                             <div className="text-lg font-bold text-green-600">{plan.payout}</div>
    //                             <div className="mt-1 text-xs text-gray-500">{plan.payoutNote}</div>
    //                         </div>
    //                     </div>
    //                     <button 
    //                         onClick={() => onGetDetails(plan)}
    //                         className="bg-[#0373d3] hover:bg-blue-800 text-white font-semibold px-7 py-2 rounded-lg shadow text-sm transition"
    //                     >
    //                         Get Details
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="rounded-xl shadow border bg-white mb-10 overflow-hidden relative">
            {/* Top Section */}
            <div className="flex items-center px-7 py-2 m-10n">
                {/* Tags positioned at top left corner */}
                <div className="absolute top-0 left-0 z-10">
                    <div className="flex items-center">
                        {plan.tags?.map((tag, i) => (
                            <span
                                key={i}
                                className={`text-xs px-2 py-1 rounded font-semibold
                                    ${
                                        tag === "Instant Tax Receipt"
                                            ? "bg-green-100 text-green-800"
                                            : tag === "New Fund Launched"
                                            ? "bg-yellow-100 text-yellow-700 ml-1"
                                            : "bg-blue-100 text-blue-800"
                                    }
                                `}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Left - Logo, Name */} 
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-7 md:w-1/4">
                    <div className="flex items-center gap-3">
                        <OptimizedImage src={plan.logo} alt={plan.company} className="h-9 w-9 rounded"/>
                        <div>
                            <div className="font-bold text-gray-900">{plan.company}</div>
                            <div className="text-xs text-gray-600">{plan.solution}</div> 
                        </div>
                    </div>
                </div>
                {/* Center - Returns, Fund */}
                <div className="flex-1 flex flex-col md:flex-row items-center gap-10 justify-between px-10 py-5">
                    <div>
                        <div className="text-xs text-gray-500">{plan.returnsPeriod}</div>
                        <div className="text-lg font-bold text-[#0373d3]">{plan.returns}</div>
                        <div className="mt-1 text-xs px-2 py-1 bg-[#e3ebfc] text-[#0373d3] rounded inline-block">{plan.fundType}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">Lumpsum Payout</div>
                        <div className="text-lg font-bold text-green-600">{plan.payout}</div>
                        <div className="mt-1 text-xs text-gray-500">{plan.payoutNote}</div>
                    </div>
                </div>
                {/* Right - Button */}
                <div className="flex flex-col items-end md:w-1/6">
                    <button 
                        onClick={() => onGetDetails(plan)}
                        className="bg-[#0373d3] hover:bg-blue-800 text-white font-semibold px-7 py-2 rounded-lg shadow text-sm transition"
                    >
                        Get Details
                    </button>
                </div>
            </div>
            {/* Bottom Line (More Plans) */}
            {plan.morePlans && (
                <div className="bg-[#e5f8df] text-green-800 text-xs font-semibold py-1 px-5 border-t border-green-200 flex items-center justify-center">
                    {plan.morePlans} <span className="ml-2">&#x2714;</span>
                </div>
            )}
        </div>
    );
}

export default function FundComparisonPage() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { selectedYears, selectedAmount } = useInvestment();          

    // Fetch plans from API
    useEffect(() => {
         const fetchPlans = async () => {
            try {
                const response = await fetch('/api/investment-plans/public');
                const data = await response.json();
                
                if (data.success) {
                    setPlans(data.data);
                } else {
                    console.warn('API not available, using fallback data');
                    setPlans(fallbackPlans);
                }
            } catch (error) {
                console.warn('API not available, using fallback data:', error);
                setPlans(fallbackPlans);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleGetDetails = (plan) => {
        setSelectedPlan(plan);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedPlan(null);
    };

    // Filter plans based on sidebar selections
    const filteredPlans = useMemo(() => {
        return plans.filter(plan => {
            // Check if amount is within plan's range
            const amountMatch = selectedAmount >= plan.minAmount && selectedAmount <= plan.maxAmount;
            
            // Check if years is within plan's range
            const yearsMatch = selectedYears >= plan.minYears && selectedYears <= plan.maxYears;
            
            return amountMatch && yearsMatch;
        });
    }, [selectedAmount, selectedYears, plans]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-gray-50 h-[100%] w-[1900px] mx-auto">
                
                {/* Filters Header */}
                {/* <HeaderInvest/> */}
                {/* Main Content with Left and Right Sidebar */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
                        <LeftSidebar />
                    </aside>
                    {/* Main Cards Section */}
                    <main className="flex-1 ">
                        <div className="bg-white rounded-xl shadow border px-6 py-5 flex flex-wrap items-center gap-6 mb-6">
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-gray-700">Returns <span className="font-normal text-xs text-gray-500">(Point To Point)</span></div>
                                <div className="text-sm text-gray-500">Past Performance</div>
                            </div>
                            <div className="flex flex-col gap-1">      
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-gray-700">Plan Type:</div>
                                <div className="text-[#0373d3] font-bold text-sm">Market Linked</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="font-semibold text-gray-700">With CG</div>
                            </div>
                            <div className="flex-1" />
                            <button className="flex items-center gap-2 px-5 py-2 border rounded-lg text-[#0373d3] font-bold shadow-sm bg-white hover:bg-blue-50">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                Compare Plans
                            </button>
                            <button className="flex items-center gap-2 px-5 py-2 border rounded-lg text-[#0373d3] font-bold shadow-sm bg-white hover:bg-blue-50">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" /></svg>
                                Fund Comparison
                            </button>
                        </div>
                        <ContactConfirmation />
                        {/* Filter Summary */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-blue-800">
                                        Showing plans for: ₹{selectedAmount.toLocaleString()} monthly for {selectedYears} years
                                    </span>
                                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                        {filteredPlans.length} plans available
                                    </span>
                                </div>
                                {filteredPlans.length === 0 && (
                                    <span className="text-sm text-red-600 font-medium">
                                        No plans match your criteria. Try adjusting your selections.
                                    </span>
                                )}
                            </div>
                        </div>
                        <StartBlock/>
                        {filteredPlans.length > 0 ? (
                            filteredPlans.map(plan => (
                                <PlanCard plan={plan} key={plan.id} onGetDetails={handleGetDetails} />
                            ))
                        ) : (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
                                <div className="text-4xl mb-3">📈</div>
                                <div className="text-lg font-semibold text-blue-800 mb-2">No investment plans available</div>
                                <div className="text-sm text-blue-600">
                                    Try adjusting your investment amount or duration to see available plans.
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <Footer />
            
            {/* Plan Details Popup */}
            <PlanDetailsPopup 
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                plan={selectedPlan}
            />
        </>
    );
}
