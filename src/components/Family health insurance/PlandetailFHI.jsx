import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import HeaderHI from "../headers/HeaderHI";

// Dummy data
const addOns = [
    {
        title: "Instant Cover",
        desc: "Claim can be made for hospitalization related to Diabetes, Hypertension, Hyperlipidemia & Asthma after initial wait period of 30 days",
        premium: 1810,
        action: "+ Add",
    },
    {
        title: "Reduction in PED",
        desc: "Get your pre-existing disease waiting period reduced to 1 year, 2 year or 3 year from default existing 4 years waiting period",
        waiting: "1 year",
        premium: 407,
        action: "+ Add",
    },
    {
        title: "Annual Health Check-up",
        desc: "Once for all insured every policy year",
        premium: 453,
        action: "+ Add",
    },
    {
        title: "Claim Shield",
        desc: "Get claim for expenses incurred on 68 Non-Payable items as per list of items in policy T&C",
        premium: 452,
        action: "+ Add",
    },
];

export default function PlanDetailHI() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get data from previous screens
    const selectedMembers = location.state?.selectedMembers || ["self"];
    const selectedAge = location.state?.selectedAge || "";
    const selectedCity = location.state?.selectedCity || "";
    const currentMember = location.state?.currentMember || "self";
    const mobileNumber = location.state?.mobileNumber || "";
    const medicalHistory = location.state?.medicalHistory || [];
    const specificConditions = location.state?.specificConditions || null;

    // Get selected plan data from previous screen
    const selectedPlan = location.state?.selectedPlan || {
        logo: "/care-logo.png",
        companyName: "care HEALTH INSURANCE",
        planName: "Care Supreme Direct",
        hospitals: 246,
        cover: "₹7 Lakh",
        basePremium: "₹9,574",
        annually: "₹9,574"
    };

    const [cover, setCover] = useState("₹7 Lakh");
    const [policyPeriod, setPolicyPeriod] = useState(1);
    const [selectedRiders, setSelectedRiders] = useState([]);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [selected, setSelected] = useState("Recommended");

    // Calculate total premium
    const calculateTotalPremium = () => {
        let basePremiumStr = selectedPlan.basePremium;
        if (typeof basePremiumStr !== "string") basePremiumStr = String(basePremiumStr || "0");
        let total = parseInt(basePremiumStr.replace(/[^\d]/g, '')) || 0;

        // Add addon premiums (example: Critical Illness)
        if (selectedAddons.includes("criticalIllness")) {
            total += 801;
        }

        return total;
    };

    const totalPremium = calculateTotalPremium();

    return (
        <>
            <HeaderHI />
            <div className="bg-[#f6fafd] min-h-screen flex flex-col items-center pt-8 pb-14">
                <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 px-2">
                    {/* Left Main Content */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Plan Header */}
                        <div className="bg-white rounded-xl border border-gray-200 px-6 py-4 shadow-sm">
                            <div className="flex items-center gap-4 mb-2">
                                <img src="/care-logo.png" alt="Care" className="w-14 h-14 object-contain rounded" />
                                <div>
                                    <div className="text-lg font-semibold text-[#1d2746]">Care Supreme Direct</div>
                                    <div className="text-[#74b63e] text-[15px] font-medium mt-1">See all features · 246 Cashless hospitals</div>
                                    <div className="text-xs text-blue-700 mt-1">
                                        Policybazaar is a 5 Star Partner for Care Health
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cover Amount */}
                        <div className="bg-white rounded-xl border border-gray-200 px-6 py-5 shadow-sm">
                            <div className="block items-center justify-between mb-2">
                                <div className="font-semibold text-lg text-[#23294a]">Cover Amount</div>
                                is this cover ammount sufficient?
                                <span className="text-green-600 text-sm font-medium cursor-pointer">Let's find out <span className="ml-1">↗</span></span>
                            </div>
                            <div className="mt-2">
                                <select
                                    className="border border-gray-300 rounded-lg p-3 text-xl font-semibold w-48 focus:ring-2 focus:ring-blue-100"
                                    value={cover}
                                    onChange={e => setCover(e.target.value)}
                                >
                                    <option>₹7 Lakh</option>
                                    <option>₹10 Lakh</option>
                                    <option>₹15 Lakh</option>
                                </select>
                            </div>
                        </div>

                        {/* Policy Period */}
                        <div className="bg-white rounded-xl border border-gray-200 px-6 py-5 shadow-sm">
                            <div className="font-semibold text-lg text-[#23294a] mb-3">Policy Period</div>
                            choosing a multi year plan saves your money and the trouble of remembering yearly renewals
                            <div className="flex flex-col md:flex-row gap-4">
                                <button
                                    onClick={() => setPolicyPeriod(1)}
                                    className={`flex-1 rounded-lg px-6 py-3 border text-left transition-all ${policyPeriod === 1 ? "border-blue-600 bg-blue-50 shadow" : "border-gray-300 bg-white"}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-[15px]">1 Year @ <b>₹9,574</b></span>
                                        {policyPeriod === 1 && <span className="ml-2 text-blue-700 font-semibold">✔</span>}
                                    </div>
                                </button>
                                <button
                                    onClick={() => setPolicyPeriod(2)}
                                    className={`flex-1 rounded-lg px-6 py-3 border text-left transition-all ${policyPeriod === 2 ? "border-blue-600 bg-blue-50 shadow" : "border-gray-300 bg-white"}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-[15px]">2 Years @ <b>₹18,430</b></span>
                                        <span className="text-green-600 text-sm">Save ₹1,222</span>
                                        {policyPeriod === 2 && <span className="ml-2 text-blue-700 font-semibold">✔</span>}
                                    </div>
                                </button>
                                <button
                                    onClick={() => setPolicyPeriod(3)}
                                    className={`flex-1 rounded-lg px-6 py-3 border text-left transition-all ${policyPeriod === 3 ? "border-blue-600 bg-blue-50 shadow" : "border-gray-300 bg-white"}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-[15px]">3 Years @ <b>₹27,047</b></span>
                                        <span className="text-green-600 text-sm">Save ₹2,683</span>
                                        {policyPeriod === 3 && <span className="ml-2 text-blue-700 font-semibold">✔</span>}
                                    </div>
                                </button>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                Easy EMI options starting from ₹928/month. <span className="text-blue-700 cursor-pointer">View details ›</span>
                            </div>
                        </div>

                        {/* Riders */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="font-bold text-lg text-[#23294a] mb-1">Riders</div>
                            <div className="text-sm text-gray-500 mb-4">
                                You should get these additional benefits to enhance your current plan
                            </div>
                            <div className="mb-5">
                                <div className="rounded-md px-3 py-2 text-base bg-white text-gray-700">
                                    Select any 1 of 2
                                </div>
                            </div>
                            <div className="bg-[#f9fafd] border border-gray-200 rounded-lg mb-4">
                                {/* Instant Cover */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between px-5 py-4">
                                    <div>
                                        <div className="font-bold text-[17px] text-[#23294a] mb-1">Instant Cover</div>
                                        <div className="text-sm text-gray-600">
                                            Claim can be made for hospitalization related to Diabetes, Hypertension, Hyperlipidemia &amp; Asthma after initial wait period of 30 days
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:items-end mt-4 md:mt-0 min-w-[130px]">
                                        <div className="text-xs text-gray-600 mb-1">Premium</div>
                                        <div className="text-[17px] font-bold text-[#23294a] mb-2">₹1,810</div>
                                        <button className="border border-orange-400 text-orange-600 font-semibold px-5 py-1 rounded-md hover:bg-orange-50 transition-all">+ Add</button>
                                    </div>
                                </div>
                                {/* Divider */}
                                <div className="border-t border-gray-200 mx-5" />
                                {/* Reduction in PED */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between px-5 py-4">
                                    <div>
                                        <div className="font-bold text-[17px] text-[#23294a] mb-1">Reduction in PED</div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            Get your pre-existing disease waiting period reduced to 1year, 2year or 3year from default existing 4 years waiting period
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:items-end min-w-[180px]">
                                        <div className="flex items-center gap-8 mb-1">
                                            <div>
                                                <div className="text-xs text-gray-600">Waiting Period</div>
                                                <select className="border border-gray-300 rounded px-2 py-1 text-sm mt-1">
                                                    <option>1 year</option>
                                                    <option>2 year</option>
                                                    <option>3 year</option>
                                                </select>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-600">Premium</div>
                                                <div className="text-[17px] font-bold text-[#23294a] mt-1">₹407</div>
                                            </div>
                                        </div>
                                        <button className="border border-orange-400 text-orange-600 font-semibold px-5 py-1 rounded-md hover:bg-orange-50 transition-all">+ Add</button>
                                    </div>
                                </div>
                            </div>
                            {/* More Riders */}
                            <div className="text-[15px] text-[#23294a] mb-2 flex items-center gap-2">
                                More Riders for you
                                <div className="flex-1 border-b border-gray-300"></div>
                            </div>
                            {/* Annual Health Check-up */}
                            <div className="bg-[#f9fafd] border border-gray-200 rounded-lg mb-3 flex flex-col md:flex-row md:items-center justify-between px-5 py-4">
                                <div>
                                    <div className="font-bold text-[17px] text-[#23294a] mb-1">Annual Health Check-up</div>
                                    <div className="text-sm text-gray-600">Once for all insured every policy year</div>
                                </div>
                                <div className="flex flex-col md:items-end min-w-[130px] mt-3 md:mt-0">
                                    <div className="text-xs text-gray-600 mb-1">Premium</div>
                                    <div className="text-[17px] font-bold text-[#23294a] mb-2">₹453</div>
                                    <button className="border border-orange-400 text-orange-600 font-semibold px-5 py-1 rounded-md hover:bg-orange-50 transition-all">+ Add</button>
                                </div>
                            </div>
                            {/* Claim Shield */}
                            <div className="bg-[#f9fafd] border border-gray-200 rounded-lg flex flex-col md:flex-row md:items-center justify-between px-5 py-4">
                                <div>
                                    <div className="font-bold text-[17px] text-[#23294a] mb-1">Claim Shield</div>
                                    <div className="text-sm text-gray-600">
                                        Get claim for expenses incurred on 68 Non-Payable items as per list of items in policy T&amp;C
                                    </div>
                                </div>
                                <div className="flex flex-col md:items-end min-w-[130px] mt-3 md:mt-0">
                                    <div className="text-xs text-gray-600 mb-1">Premium</div>
                                    <div className="text-[17px] font-bold text-[#23294a] mb-2">₹452</div>
                                    <button className="border border-orange-400 text-orange-600 font-semibold px-5 py-1 rounded-md hover:bg-orange-50 transition-all">+ Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Summary Card */}
                    <div className="w-full md:w-[330px]">
                        <div className="bg-white rounded-xl border border-gray-200 shadow p-5 sticky top-8">
                            <div className="font-bold text-[17px] mb-2">Summary</div>
                            <div className="flex justify-between text-[15px] mb-2">
                                <span>Base Premium - 1 year</span>
                                <span className="font-semibold text-[#283356]">₹9,574</span>
                            </div>
                            <div className="flex justify-between text-[15px] mb-2">
                                <span>
                                    Select Rider(s)
                                    <div className="flex justify-between w-[300px] border border-gray-300 rounded-md p-2 mt-1">
                                        <span className="text-xs text-orange-600 ml-1">Missing out on benefits</span>
                                        <span className="text-blue-600 text-xs font-semibold cursor-pointer">View riders</span>
                                    </div>
                                </span>
                            </div>
                            <div className="flex justify-between text-[15px] mb-2">
                                <span>
                                    Selected Add-ons<br />
                                    <span className="text-xs text-gray-500">Critical Illness - 20 critical illnesses covered(Self)</span>
                                </span>
                                <span className="font-semibold text-[#283356]">₹801</span>
                            </div>
                            <div className="text-xs text-orange-600 mb-2">
                                <span className="mr-1">⚠️</span>
                                Port option is only available from <b>₹10 Lakh</b> or above cover amount <span className="text-blue-700 underline cursor-pointer">Change cover amount</span>
                            </div>
                            <div className="flex justify-between text-[16px] font-bold py-3 border-t border-gray-100">
                                <span>Total premium</span>
                                <span className="text-[#283356]">₹10,375</span>
                            </div>
                            <div className="bg-green-50 border border-green-100 rounded p-2 text-green-700 text-xs mb-3">
                                Effectively costs just <b>₹5,262.</b> <span className="text-green-600 underline cursor-pointer">See how ›</span>
                            </div>
                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[15px] rounded-lg py-3 mt-1 shadow"
                                onClick={() => navigate("/proposer-details-fhi", {
                                    state: {
                                        selectedPlan: {
                                            logo: selectedPlan.logo,
                                            companyName: selectedPlan.companyName,
                                            planName: selectedPlan.planName,
                                            cover: selectedPlan.cover,
                                            basePremium: selectedPlan.basePremium,
                                            totalPremium: `₹${totalPremium.toLocaleString()}`
                                        },
                                        // Pass all previous data
                                        selectedMembers,
                                        selectedAge,
                                        selectedCity,
                                        currentMember,
                                        mobileNumber,
                                        medicalHistory,
                                        specificConditions
                                    }
                                })}
                            >
                                Proceed to proposal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
