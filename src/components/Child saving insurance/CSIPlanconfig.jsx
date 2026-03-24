import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderInvest from "../headers/HeaderInvest";
import Footer from "../Footer";
import YourDetailsForm from "./YourDetailsForm";
// import PersonalDetailsForm from "../guaranted returns plan/PersonalDetailsForm";

export default function CSIPlanconfig() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedPolicy = location.state?.selectedPolicy;
    const userData = location.state?.userData;

    const [gender, setGender] = useState("Male");
    const [showYourDetails, setShowYourDetails] = useState(false);
    const [selected, setSelected] = useState('Yourself');
    const [initialFormData, setInitialFormData] = useState({
        fullName: '',
        email: '',
        dateOfBirth: '',
        annualIncome: ''
    });
    const [yourDetailsFormData, setYourDetailsFormData] = useState(null);
    const [hasClickedProceed, setHasClickedProceed] = useState(false);





    const getFallbackPrice = () => {
        return "₹1,20,000";
    };

    const handleInitialFormChange = (field, value) => {
        setInitialFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleProceedToPayment = () => {
        if (hasClickedProceed) {
            // Second click - navigate directly to review details
            navigate('/child-saving-review-details', {
                state: {
                    initialFormData: initialFormData,
                    yourDetailsFormData: yourDetailsFormData,
                    planData: {
                        investmentAmount: "₹ 10000",
                        paymentMode: "Monthly",
                        payFor: `${userData?.investFor || 10} Years`,
                        withdrawAfter: `${userData?.withdrawAfter || 20} Years`,
                        lifeCover: "₹12 Lacs",
                        selectedPlan: selectedPolicy?.plan || "Capital Goal Suraksha",
                        selectedPolicy: selectedPolicy
                    }
                }
            });
        } else {
            // First click - show details form
            setShowYourDetails(true);
            setHasClickedProceed(true);
        }
    };

    const handleYourDetailsBack = () => {
        setShowYourDetails(false);
        setHasClickedProceed(false);
    };

    const handleYourDetailsNext = (formData) => {
        setYourDetailsFormData(formData);
        setShowYourDetails(false);
        // Navigate to the review page with all collected data
        navigate('/child-saving-review-details', {
            state: {
                initialFormData: initialFormData,
                yourDetailsFormData: formData,
                planData: {
                    investmentAmount: "₹ 10000",
                    paymentMode: "Monthly",
                    payFor: `${userData?.investFor || 10} Years`,
                    withdrawAfter: `${userData?.withdrawAfter || 20} Years`,
                    lifeCover: "₹12 Lacs",
                    selectedPlan: selectedPolicy?.plan || "Capital Goal Suraksha",
                    selectedPolicy: selectedPolicy
                }
            }
        });
    };

    return (
        <>
            <HeaderInvest />
            <div className="min-h-screen flex flex-col px-2 md:px-6 py-6">
                {/* Back button */}
                {/* <div className="mx-auto max-w-[1200px] px-4 py-4">
                    <button
                        onClick={() => navigate('/child-saving-policy')}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Policy List
                    </button>
                </div> */}

                {/* Main 2-col layout */}
                <div className="flex max-w-6xl w-full mx-auto gap-7 mt-2">
                    {/* Left Side Card */}
                    <div className="bg-white rounded-xl shadow p-7 w-[370px] flex flex-col gap-4">
                        {/* Logo & Title */}
                        <div className="flex items-center mb-3 gap-3">
                            <img
                                src={selectedPolicy?.logo || "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Allianz_logo.svg/2560px-Allianz_logo.svg.png"}
                                alt={selectedPolicy?.brand || "Allianz"}
                                className="h-8"
                            />
                            <div>
                                <div className="font-bold text-[#244491]">{selectedPolicy?.plan || "Capital Goal Suraksha"}</div>
                                <div className="text-xs text-gray-500">Know Your Plan in 2 mins</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Investment Amount</div>
                            <div className="flex items-end gap-2">
                                <span className="font-bold text-2xl text-[#244491]">₹ 10000</span>
                                <span className="text-sm text-gray-500 mb-1">Monthly</span>
                                <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className="text-xs text-gray-400">Ten Thousand</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Pay For</div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg">{userData?.investFor || 10} Years</span>
                                <span className="bg-blue-100 text-[#3978cb] text-xs font-semibold px-3 py-1 rounded-full mr-2">Till {new Date().getFullYear() + (userData?.investFor || 10)}</span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Withdraw After</div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-lg">{userData?.withdrawAfter || 20} Years</span>
                                <span className="bg-blue-100 text-[#3978cb] text-xs font-semibold px-3 py-1 rounded-full mr-2">In {new Date().getFullYear() + (userData?.withdrawAfter || 20)}</span>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {/* Plan Info Blocks */}
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="rounded-lg bg-[#e4f6e7] px-4 py-3 font-medium text-[#31a354] border border-[#bdecd2]">
                                Capital Guarantee <br />
                                <span className="font-normal text-xs text-gray-700">Your amount is 100% Guaranteed and will be returned on Maturity</span>
                            </div>
                            <div className="rounded-lg bg-[#e7f0fe] px-4 py-3 font-medium text-[#244491] border border-[#b7d6f9]">
                                ₹12 Lacs Life Cover <br />
                                <span className="font-normal text-xs text-gray-700">Inbuilt Cover*</span>
                            </div>
                            <div className="rounded-lg bg-[#fdf6e5] px-4 py-3 font-medium text-[#c98222] border border-[#fae2b6]">
                                Tax Savings* <br />
                                <span className="font-normal text-xs text-gray-700">Under Section 80C and Sec 10(10 D)<br />Tax benefits are subject to change in tax laws</span>
                            </div>
                        </div>
                    </div>
                    {/* Form */}
                    {showYourDetails ? (
                        <YourDetailsForm
                            onNext={handleYourDetailsNext}
                            onBack={handleYourDetailsBack}
                            initialData={yourDetailsFormData}
                        />
                    ) : (
                        <div className="bg-white rounded-xl shadow p-8 flex-1 flex flex-col gap-2 min-w-[360px]">
                            <div className="text-xl font-semibold mb-6 flex items-center">
                                Your Details
                            </div>
                            <form className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-gray-600 text-sm mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={initialFormData.fullName}
                                        onChange={(e) => handleInitialFormChange('fullName', e.target.value)}
                                        placeholder="Enter full name"
                                        className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm mb-1">Gender</label>
                                    <select
                                        value={initialFormData.gender || ""}
                                        onChange={(e) => handleInitialFormChange('gender', e.target.value)}
                                        className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent"
                                    >
                                        <option value="" disabled>Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm mb-1">Date of Birth</label>
                                    <input
                                        type="text"
                                        value={initialFormData.dateOfBirth}
                                        onChange={(e) => handleInitialFormChange('dateOfBirth', e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm mb-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        value={initialFormData.mobileNumber || ""}
                                        onChange={(e) => handleInitialFormChange('mobileNumber', e.target.value)}
                                        placeholder="Enter 10-digit mobile number"
                                        maxLength={10}
                                        className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={initialFormData.email}
                                        onChange={(e) => handleInitialFormChange('email', e.target.value)}
                                        placeholder="Enter email address"
                                        className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent"
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Benefits Section */}
                <div className="max-w-6xl mx-auto w-full mt-14">
                    <div className="text-center text-xl font-semibold text-[#244491] mb-6">
                        Benefits available under this plan
                    </div>
                    <div className="flex flex-wrap justify-center gap-5">
                        <BenefitCard
                            icon={
                                <svg className="w-9 h-9 text-blue-500 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M12 4V20M12 20L7 15M12 20l5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            }
                            title="Capital Guarantee"
                            desc="Your invested amount is 100% guaranteed and will be returned at maturity"
                        />
                        <BenefitCard
                            icon={
                                <svg className="w-9 h-9 text-blue-500 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M3 17l9-9 4 4 5-5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            }
                            title="Market Upside"
                            desc="Get benefit of market linked returns with zero risk to invested amount"
                        />
                        <BenefitCard
                            icon={
                                <svg className="w-9 h-9 text-blue-500 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" />
                                </svg>
                            }
                            title="Inbuilt Life Cover"
                            desc="₹12 Lacs life cover throughout the policy duration"
                        />
                        <BenefitCard
                            icon={
                                <svg className="w-9 h-9 text-blue-500 mb-2 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <rect x="4" y="4" width="16" height="16" rx="3" />
                                    <path d="M8 10h8M8 14h6" />
                                </svg>
                            }
                            title="Tax Benefits"
                            desc="You get tax benefits under Section 80C and no tax on returns under Section 10(10D)"
                        />
                    </div>
                </div>

                {/* Investment Criteria */}
                <div className="max-w-6xl mx-auto w-full mt-14 mb-10">
                    <div className="text-center text-xl font-semibold text-[#244491] mb-6">
                        Investment Criteria
                    </div>
                    <div className="flex flex-wrap justify-center gap-5">
                        <CriteriaCard
                            title="Age to start investing"
                            desc={(
                                <>
                                    <div>Minimum: <span className="font-bold">18 years</span></div>
                                    <div>Maximum: <span className="font-bold">52 years</span></div>
                                </>
                            )}
                        />
                        <CriteriaCard
                            title="Minimum amount to invest"
                            desc={(
                                <div>
                                    <div>Monthly: <span className="font-bold">₹1,700</span></div>
                                    <div>Quarterly: <span className="font-bold">₹5,000</span></div>
                                    <div>Half Yearly: <span className="font-bold">₹10,000</span></div>
                                    <div>Annually: <span className="font-bold">₹19,800</span></div>
                                </div>
                            )}
                        />
                        <CriteriaCard
                            title="Number of years after which your investment will mature"
                            desc={(
                                <>
                                    <div>Minimum: <span className="font-bold">10 years</span></div>
                                    <div>Maximum: <span className="font-bold">20 years</span></div>
                                </>
                            )}
                        />
                        <CriteriaCard
                            title="Number of years you can invest"
                            desc="Limited Pay: Invest for a few years and stay invested for the entire policy duration. Choose from 5, 7, 10 & 12 years"
                        />
                    </div>
                </div>

                {/* Footer Note */}
                <div className="max-w-6xl mx-auto w-full mb-2 text-[11px] text-gray-400 text-center px-3">
                    The Returns in ULIP plans are subject to market risk and are not guaranteed...
                    <br /><br />
                    Policybazaar Insurance Brokers Private Limited CNE U74999HR2001PTC03454 | Registered Office - Plot No.119, Sector - 44, Gurgaon, Haryana - 122001
                    <br />
                    <a href="#" className="text-blue-700 underline">Contact Us | Legal and Admin Policies</a>
                    <br /><br />
                    © Copyright 2008-2023 policybazaar.com. All Rights Reserved.
                </div>
                <div className="max-w-7xl w-full mx-auto bg-white border-t border-gray-200 shadow-lg z-20">
                    <div className=" flex items-center justify-between py-4 px-6 max-w-none">
                        <div className="font-semibold text-gray-700">
                            Total Premium <span className="text-lg font-bold text-gray-900 ml-1">{getFallbackPrice()}</span>
                            <svg className="inline ml-1 -mt-1" width={16} height={16} fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><circle cx="12" cy="8" r="1" /></svg>
                        </div>
                        <button
                            onClick={handleProceedToPayment}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-blue-700 transition shadow">
                            {hasClickedProceed ? 'REVIEW DETAILS' : 'PROCEED'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

// Sub-components
function BenefitCard({ icon, title, desc }) {
    return (
        <div className="bg-white rounded-xl shadow p-6 w-[240px] min-h-[160px] flex flex-col items-center text-center border">
            {icon}
            <div className="font-bold text-[#244491] mb-1">{title}</div>
            <div className="text-gray-600 text-sm">{desc}</div>
        </div>
    );
}
function CriteriaCard({ title, desc }) {
    return (
        <div className="bg-white rounded-xl shadow p-6 w-[250px] min-h-[120px] flex flex-col items-center text-center border">
            <div className="font-bold text-[#244491] mb-2">{title}</div>
            <div className="text-gray-600 text-sm">{desc}</div>
        </div>
    );
}
