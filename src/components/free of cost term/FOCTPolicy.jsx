
import React, { useState, useEffect } from "react";
import { usePricing } from '../../context/PricingContext';
import { useLocation } from 'react-router-dom';
import PlanDetailsModal from "../term insurance/PlanDetailsModal";
import StartBlock from "../StartBlock";
import Header from "../headers/Header";
import Footer from "../Footer";
import FOCTOccuption from "./FOCTOccuption";
import ContactConfirmation from "../term insurance/ContactConfirmation";

export default function FOCTPolicy() {
    // Utility function to reset popup state (for testing purposes)
    // Call this in browser console: localStorage.removeItem('focPolicyPopupSeen');

    const location = useLocation();
    const { formData: locationFormData } = location.state || {};

    const [lifeCover, setLifeCover] = useState("3 Crore");
    const [coverageTill, setCoverageTill] = useState("60 yrs of age");
    const { paymentMode, setPaymentMode, setSelectedPlan: setPricingSelectedPlan } = usePricing();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userFilters, setUserFilters] = useState({});
    const [formData, setFormData] = useState(null);
    const [showRestoreNotification, setShowRestoreNotification] = useState(false);
    const [showOccupationPopup, setShowOccupationPopup] = useState(false);
    const [occupationFormData, setOccupationFormData] = useState({
        occupation: ''
    });

    // Load form data from localStorage on component mount
    useEffect(() => {
        const savedFormData = localStorage.getItem('termInsuranceFormData');
        if (savedFormData) {
            try {
                const parsedData = JSON.parse(savedFormData);
                setFormData(parsedData);
                // Show a brief notification that data was restored
                setShowRestoreNotification(true);
                setTimeout(() => setShowRestoreNotification(false), 3000);
                console.log('Form data restored from localStorage');
            } catch (error) {
                console.error('Error parsing saved form data:', error);
                localStorage.removeItem('termInsuranceFormData');
            }
        }
    }, []);

    // Save form data to localStorage when it changes
    useEffect(() => {
        if (locationFormData) {
            setFormData(locationFormData);
            localStorage.setItem('termInsuranceFormData', JSON.stringify(locationFormData));

            // Check if user has already seen the occupation popup
            const hasSeenPopup = localStorage.getItem('focPolicyPopupSeen');
            if (!hasSeenPopup) {
                // Show occupation popup only if user hasn't seen it before
                setShowOccupationPopup(true);
            }
        }
    }, [locationFormData]);

    // Cleanup function to clear localStorage when component unmounts (optional)
    useEffect(() => {
        return () => {
            // Uncomment the line below if you want to clear data when user leaves the page
            // localStorage.removeItem('termInsuranceFormData');
            // Note: We don't clear 'focPolicyPopupSeen' here as we want it to persist
        };
    }, []);

    // Calculate user age and prepare filters from form data
    useEffect(() => {
        if (formData) {
            const calculateAge = (dateOfBirth) => {
                const today = new Date();
                const birthDate = new Date(dateOfBirth);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            };

            const age = formData.dateOfBirth ? calculateAge(formData.dateOfBirth) :
                formData.dob ? calculateAge(formData.dob) : null;

            // Map form data to filter parameters - handle both FOCT form and term insurance form
            const filters = {
                smoker: formData.smokingStatus ? (formData.smokingStatus === 'Yes' ? 'yes' : 'no') : 'no',
                alcohol: formData.alcoholStatus ? (formData.alcoholStatus === 'Yes' ? 'yes' : 'no') : 'no',
                age: age,
                education: formData.qualification ?
                    (formData.qualification === 'College graduate & above' ? 'graduate' :
                        formData.qualification === '12th Pass' ? '12th-pass' : 'below-10th') : 'graduate'
            };

            setUserFilters(filters);
        }
    }, [formData]);

    // Fetch free of cost insurance policies from backend
    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                setLoading(true);

                // Fetch active free of cost insurance policies
                const response = await fetch('/api/free-of-cost-insurance/active');
                const result = await response.json();

                if (result.success) {
                    // Transform free of cost insurance data to match frontend structure
                    const transformedPlans = result.data.map(policy => ({
                        _id: policy._id,
                        logo: "./assets/images/default_logo.png", // Default logo for free of cost insurance
                        title: policy.companyName,
                        plan: policy.policyName,
                        claim: "100%", // Free of cost insurance typically has 100% claim settlement
                        coverage: `${policy.policyTerm} Yrs`,
                        survival: `₹${(policy.sumAssured / 100000).toFixed(2)} L`,
                        death: `₹${(policy.sumAssured / 10000000).toFixed(0)} Cr`,
                        // Use the premium amount from the database, fallback to 0 if not present
                        monthlyPrice: typeof policy.premiumAmount === "number" ? `₹${policy.premiumAmount}` : "₹0",
                        yearlyPrice: typeof policy.premiumAmount === "number" ? `₹${policy.premiumAmount * 12}` : "₹0",
                        note: "Free of Cost Insurance",
                        highlights: policy.benefits?.slice(0, 2).map(benefit => ({
                            label: benefit,
                            color: "bg-green-50 text-green-700"
                        })) || [],
                        addons: policy.benefits?.length ? `${policy.benefits.length} Benefits` : "No Benefits",
                        offer: "100% Free Insurance",
                        isYellow: !policy.premiumAmount || policy.premiumAmount === 0, // Highlight only if price is 0
                        hasTag: true,
                        tag: !policy.premiumAmount || policy.premiumAmount === 0 ? "FREE" : "PAID",
                        rating: 5,
                        reviews: 100,
                        description: policy.description || "Free of cost insurance policy",
                        policyType: policy.policyType,
                        minAge: policy.ageRange?.min || 18,
                        maxAge: policy.ageRange?.max || 65,
                        waitingPeriod: "30 days",
                        gracePeriod: "15 days",
                        // Popular field from backend
                        isPopular: policy.isPopular || false,
                        // Free of cost insurance specific fields
                        sumAssured: policy.sumAssured,
                        ageRange: policy.ageRange,
                        occupation: policy.occupation,
                        qualification: policy.qualification,
                        annualIncome: policy.annualIncome,
                        smokingStatus: policy.smokingStatus,
                        medicalHistory: policy.medicalHistory,
                        exclusions: policy.exclusions,
                        documentsRequired: policy.documentsRequired,
                        claimProcess: policy.claimProcess,
                        termsAndConditions: policy.termsAndConditions
                    }));

                    // Add special promotional card
                    const specialCard = {
                        special: true,
                        specialTag: "Get your Money Back Anytime after 25 years",
                        btn: "See How"
                    };

                    // Insert special card at index 3
                    transformedPlans.splice(3, 0, specialCard);

                    setPlans(transformedPlans);
                } else {
                    setError(result.message || 'Failed to fetch policies');
                }
            } catch (err) {
                console.error('Error fetching policies:', err);
                setError('Failed to load policies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, [userFilters]);

    const claims = [
        {
            img: "https://randomuser.me/api/portraits/women/44.jpg", // Replace with your image path
            name: "Mrs. Chouhan",
            role: "Claim Beneficiary",
            exec: "Mr. Kuldeep",
            execRole: "Policybazaar Executive",
            city: "Bhopal",
            posted: "Sep-2021",
            desc: (
                <>
                    Mr. Chouhan was working with BHEL in Bhopal. <br />
                    To take care of the financial future of his wife and 2 sons,
                    he purchased an Edelweiss Tokio <b>Term insurance plan from Policybazaar</b> in May 2019.
                </>
            ),
        },
        {
            img: "https://randomuser.me/api/portraits/women/41.jpg", // Replace with your image path
            name: "Mrs. Narware",
            role: "Claim Beneficiary",
            exec: "Mr. Kuldeep",
            execRole: "Policybazaar Executive",
            city: "Bhopal",
            posted: "Sep-2021",
            desc: (
                <>
                    Mr. Narware was working as a Deputy Manager Marketing in Bhopal region.<br />
                    Around July 2020, two of his colleagues passed away in an accident and their families went into financial stress which made Mr. Narware...
                </>
            ),
        },
    ];

    const handlePlanClick = (plan) => {
        setSelectedPlan(plan);
        // Map plan to pricing context - now using dynamic data
        const planMap = {
            'ICICI PRUDENTIAL': 'icici',
            'HDFC Life': 'hdfc',
            'Max Life': 'max',
            'TATA AIA': 'tata',
            'Bajaj Allianz': 'bajaj'
        };
        const pricingPlan = planMap[plan.title] || 'custom';
        setPricingSelectedPlan(pricingPlan);
        // Save to localStorage for persistence
        localStorage.setItem('selectedPlan', pricingPlan);
        localStorage.setItem('selectedPolicyData', JSON.stringify(plan));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null);
    };

    const updateOccupationFormData = (field, value) => {
        setOccupationFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleOccupationNext = () => {
        // Close the popup and continue with the policy page
        setShowOccupationPopup(false);

        // Mark that the user has seen the popup
        localStorage.setItem('focPolicyPopupSeen', 'true');

        // You can save the occupation data to localStorage or formData if needed
        if (formData) {
            const updatedFormData = { ...formData, occupation: occupationFormData.occupation };
            setFormData(updatedFormData);
            localStorage.setItem('termInsuranceFormData', JSON.stringify(updatedFormData));
        }
    };

    const handleOccupationPrev = () => {
        // Navigate back to the FOCTInsurance page
        localStorage.removeItem('focPolicyPopupSeen');
        window.location.href = '/free-term-plan';
    };

    function PlanRow(p, i) {
        if (p.special) {
            return (
                <div
                    key={i}
                    className="rounded-2xl border border-yellow-200 bg-yellow-50 flex items-center px-4 py-2 mb-4"
                >
                    <span className="text-yellow-700 font-semibold mr-3 text-sm">⭐ {p.specialTag}</span>
                    <button className="bg-yellow-200 text-yellow-800 text-xs font-semibold rounded px-2 py-1 border border-yellow-300 hover:bg-yellow-300">{p.btn}</button>
                </div>
            );
        }
        // Determine if plan is free or paid
        const isFree = (!p.monthlyPrice || p.monthlyPrice === "₹0" || p.monthlyPrice === 0);
        // Show price from database, fallback to "₹0"
        const displayPrice = p.monthlyPrice && p.monthlyPrice !== "₹0" && p.monthlyPrice !== 0 ? p.monthlyPrice : "₹0";

        // Determine if plan is popular
        const isPopular = p.isPopular;

        return (
            <div
                key={i}
                className={`rounded-2xl border p-4 mb-3 shadow-sm relative transition-all duration-300 hover:shadow-md ${isPopular
                    ? "border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 hover:shadow-purple-100"
                    : isFree
                        ? "border-yellow-200 bg-yellow-50 hover:shadow-yellow-100"
                        : "border-gray-100 bg-white hover:shadow-gray-100"
                    } ${isPopular ? 'animate-pulse' : ''}`}
            >
                {/* Popular Badge */}
                {isPopular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-bounce">
                        ⭐ POPULAR
                    </div>
                )}
                <div className="flex gap-4">
                    {/* Logo */}
                    <div className="flex flex-col items-center justify-start mr-4">
                        <img src={p.logo} alt="img" className="w-auto h-8 rounded-md border object-contain mb-6" />
                        <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
                            <span className="text-xs text-gray-500">{p.plan}</span>
                            {isPopular && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                                    Popular
                                </span>
                            )}
                        </div>
                        <button className="mt-3 bg-blue-100 text-blue-700 text-xs font-semibold rounded px-4 py-1.5 hover:bg-blue-200">
                            Plan details <span className="ml-1">&#9660;</span>                        </button>
                    </div>
                    {/* Main Details */}
                    <div className="flex-1">
                        <div className="flex gap-6 m-6 text-base">
                            <span className="mx-3">
                                <span className="block text-gray-400">Claim settled</span>
                                <span className="ml-1 font-bold">{p.claim}</span>
                            </span>
                            <span className="mx-3">
                                <span className="block text-gray-400">Coverage till</span>
                                <span className="ml-1 font-bold">{p.coverage}</span>
                            </span>
                            <span className="mx-3">
                                <span className="block text-gray-400">On survival</span>
                                <span className="ml-1 font-bold">{p.survival}</span>
                            </span>
                            <span className="mx-3">
                                <span className="block text-gray-400">On death</span>
                                <span className="ml-1 font-bold">{p.death}</span>
                            </span>
                        </div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {(p.highlights || []).map((hl, k) => (
                                <span key={k} className={`${hl.color} text-xs px-2 py-1 rounded-md`}>
                                    {hl.label}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Price and Buttons */}
                    <div className="min-w-[140px] text-right">
                        <button
                            onClick={() => handlePlanClick(p)}
                            className={`font-bold text-lg rounded px-3 py-1 inline-block transition-colors cursor-pointer ${isFree
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                }`}
                        >
                            {/* REWRITE: Show the value from the database, not "FREE" */}
                            <>
                                {displayPrice}
                                <span className="text-xs font-normal text-gray-700 ml-1">
                                    /month
                                </span>
                            </>
                        </button>
                        {p.note && <div className="text-xs text-green-600 mt-1 font-semibold">{p.note}</div>}
                        <div className="text-xs text-green-600 mt-1 font-medium">
                            {isFree ? "No Premium Required" : "Premium Required"}
                        </div>
                    </div>
                </div>
                <hr className="mt-5" />
                {/* Add-ons & Offer Row */}
                <div className="flex items-center justify-between mt-2 text-xs">
                    <div className="text-green-700">{p.offer}</div>
                    <div className="flex gap-2 items-center text-gray-500 rounded-lg px-3 py-1 bg-white relative">
                        {p.hasTag && (
                            <span className={`font-semibold rounded px-2 py-0.5 border ${isFree ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                                {isFree ? "FREE" : "PAID"}
                            </span>
                        )}
                        {/* Benefits Dropdown */}
                        <div className="relative group  border border-gray-200 ">
                            <button className="flex items-center gap-1 hover:text-green-600 focus:outline-none p-1">
                                <span>{p.addons}</span>
                                <svg className="w-3 h-3 ml-1 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7l3 3 3-3" />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity duration-150">
                                <ul className="py-2 text-sm text-gray-700">
                                    {p.highlights && p.highlights.length > 0 ? (
                                        p.highlights.slice(0, 3).map((highlight, index) => (
                                            <li key={index}>
                                                <button className="w-full text-left px-4 py-2 hover:bg-green-50">{highlight.label}</button>
                                            </li>
                                        ))
                                    ) : (
                                        <li>
                                            <button className="w-full text-left px-4 py-2 hover:bg-green-50">No Benefits Listed</button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />


            {/* Occupation Popup Overlay */}
            {showOccupationPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <FOCTOccuption
                        formData={occupationFormData}
                        updateFormData={updateOccupationFormData}
                        errors={{}}
                        onNext={handleOccupationNext}
                        onPrev={handleOccupationPrev}
                    />
                </div>
            )}

            <div className="max-w-5xl mx-auto py-8">
                {/* Restore Notification
            {showRestoreNotification && (
                <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-lg">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Your form data has been restored!</span>
                    </div>
                </div>
            )} */}

                <div className="w-full flex flex-col gap-3 max-w-5xl mx-auto pt-6">
                    {/* Top Filter Bar */}
                    <div className="flex items-center gap-3 bg-white rounded-2xl shadow border border-gray-100 px-4 py-3">
                        {/* Left Filters */}
                        <div className="flex items-center gap-3 flex-1">
                            {/* Life Cover */}
                            <div className="flex flex-col text-xs">
                                <span className="text-gray-400 mb-1">Life Cover</span>
                                <select
                                    className="flex items-center min-w-[100px] border border-gray-200 px-2 py-1 rounded-lg font-medium text-gray-700 bg-white"
                                    value={lifeCover}
                                    onChange={e => setLifeCover(e.target.value)}
                                >
                                    <option value="1 Crore">1 Crore</option>
                                    <option value="2 Crore">2 Crore</option>
                                    <option value="3 Crore">3 Crore</option>
                                    <option value="5 Crore">5 Crore</option>
                                </select>
                            </div>
                            {/* Coverage Till */}
                            <div className="flex flex-col text-xs">
                                <span className="text-gray-400 mb-1">Coverage till</span>
                                <select
                                    className="flex items-center min-w-[120px] border border-gray-200 px-2 py-1 rounded-lg font-medium text-gray-700 bg-transparent"
                                    value={coverageTill}
                                    onChange={e => setCoverageTill(e.target.value)}
                                >
                                    <option value="60 yrs of age">60 yrs of age</option>
                                    <option value="65 yrs of age">65 yrs of age</option>
                                    <option value="70 yrs of age">70 yrs of age</option>
                                    <option value="75 yrs of age">75 yrs of age</option>
                                </select>
                            </div>
                        </div>
                        {/* Monthly / Yearly Toggle */}
                        <div className="flex items-center gap-0 bg-gray-50 border border-gray-200 px-2 py-1 rounded-xl min-w-[180px]">
                            <button
                                className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${paymentMode === "monthly" ? "bg-white shadow text-blue-700" : "text-gray-400"
                                    }`}
                                onClick={() => setPaymentMode("monthly")}
                            >
                                Monthly
                            </button>
                            <button
                                className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${paymentMode === "yearly" ? "bg-white shadow text-blue-700" : "text-gray-400"
                                    }`}
                                onClick={() => setPaymentMode("yearly")}
                            >
                                Yearly
                            </button>
                        </div>
                        <span className="text-[11px] text-green-600 ml-2 font-medium">
                            Save 5%<span className="text-xs align-super">&#8635;</span> on Yearly
                        </span>
                        {/* Save up to 70% Toggle */}
                        <div className="ml-auto flex items-center">
                            <div className="flex items-center bg-[#F5FAF7] border border-[#D5E8DB] rounded-full px-3 py-1 shadow-sm">
                                <span className="inline-block w-4 h-4 rounded-full bg-green-200 border border-green-400 mr-2"></span>
                                <span className="font-semibold text-green-700 text-sm">
                                    Save upto <span className="text-base font-bold">70%</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* User Details and Auto-Filtering Message */}
                    {formData ? (
                        <></>
                        // <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        //     <div className="flex items-center justify-between mb-2">
                        //         <div className="flex items-center gap-2">
                        //             <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        //             </svg>
                        //             <h3 className="text-lg font-semibold text-blue-800">Personalized Policy Recommendations</h3>
                        //         </div>
                        //         <button 
                        //             onClick={() => {
                        //                 localStorage.removeItem('termInsuranceFormData');
                        //                 setFormData(null);
                        //                 setUserFilters({});
                        //             }}
                        //             className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                        //         >
                        //             Clear Data
                        //         </button>
                        //     </div>
                        //     <div className="text-sm text-blue-700 mb-3">
                        //         Based on your details, we're showing policies that match your profile:
                        //     </div>
                        //     <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        //         <div className="bg-white rounded px-3 py-2">
                        //             <span className="text-gray-500">Name:</span> <span className="font-medium">{formData.name || 'Not provided'}</span>
                        //         </div>
                        //         <div className="bg-white rounded px-3 py-2">
                        //             <span className="text-gray-500">Age:</span> <span className="font-medium">{userFilters.age || 'Not provided'}</span>
                        //         </div>
                        //         <div className="bg-white rounded px-3 py-2">
                        //             <span className="text-gray-500">Education:</span> <span className="font-medium">{formData.qualification || 'Not provided'}</span>
                        //         </div>
                        //         <div className="bg-white rounded px-3 py-2">
                        //             <span className="text-gray-500">Smoker:</span> <span className="font-medium">{formData.smokingStatus || 'Not provided'}</span>
                        //         </div>
                        //     </div>
                        // </div>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-yellow-800">Showing All Available Free of Cost Insurance Policies</h3>
                                </div>
                            </div>
                            <div className="text-sm text-yellow-700 mb-3">
                                No personal details provided. Please complete the form to get personalized free of cost insurance recommendations.
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.removeItem('focPolicyPopupSeen');
                                    window.location.href = '/free-term-plan';
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                Start Over
                            </button>
                        </div>
                    )}
                    {/* Suggest Best Free of Cost Policy Search Bar */}
                    <div className="flex items-center w-full my-6">
                        <input
                            type="text"
                            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-base bg-gray-50 focus:ring-2 focus:ring-green-200"
                            defaultValue="Suggest Best Free of Cost Policy"
                            readOnly
                        />
                        <button className="ml-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2 hover:bg-green-100 transition">
                            <img
                                src="/assets/images/assistant1.png"
                                alt="Assistant"
                                className="w-6 h-6 object-contain"
                            />
                        </button>
                    </div>
                    <ContactConfirmation />
                    {/* Health Insurance Action Button */}
                    {/* <div className="flex justify-center mb-6">
                    <button 
                        onClick={() => window.location.href = '/helthregister'}
                        className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-6 py-3 hover:bg-red-100 transition-colors duration-200 shadow-sm"
                    >
                        <span className="text-2xl">🏥</span>
                        <span className="text-red-700 font-semibold">Get Health Insurance</span>
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div> */}
                </div>
                <StartBlock />

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <span className="ml-3 text-gray-600">Loading free of cost insurance policies...</span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium">Error loading free of cost insurance policies</h3>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Plans List */}
                {!loading && !error && plans.length > 0 && plans.map((p, i) => PlanRow(p, i))}

                {/* Empty State */}
                {!loading && !error && plans.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎁</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Free of Cost Insurance Policies Found</h3>
                        <p className="text-gray-600 mb-4">
                            {formData
                                ? "No free of cost insurance policies match your current profile. Please try adjusting your preferences or contact our support team for assistance."
                                : "No free of cost insurance policies are currently available. Please check back later."
                            }
                        </p>
                        {formData && (
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
                                <p className="text-sm text-gray-600 mb-2">Your current profile:</p>
                                <div className="text-xs text-gray-500 space-y-1">
                                    <div>Age: {userFilters.age || 'Not provided'}</div>
                                    <div>Education: {formData.qualification || 'Not provided'}</div>
                                    <div>Smoker: {formData.smokingStatus || 'Not provided'}</div>
                                    <div>Alcohol: {formData.alcoholStatus || 'Not provided'}</div>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh Page
                        </button>
                        {formData && (
                            <button
                                onClick={() => {
                                    localStorage.removeItem('termInsuranceFormData');
                                    localStorage.removeItem('focPolicyPopupSeen');
                                    window.location.href = '/free-term-plan';
                                }}
                                className="ml-3 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Start Over
                            </button>
                        )}
                    </div>
                )}

                {/* Free Dedicated Claim Assistance Section */}
                <div className="rounded-lg p-5 bg-white max-w-6xl mx-auto shadow border border-gray-100">
                    <div>
                        <div className="text-xl md:text-2xl font-bold text-gray-800">Free Dedicated Claim Assistance</div>
                        <div className="text-gray-500 text-sm md:text-base mt-1 mb-3">
                            Policybazaar Guarantees claim support for your family in those difficult times
                        </div>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 pt-2">
                        {Array.isArray(claims) && claims.map((claim, idx) => (
                            <div key={idx} className="min-w-[425px] max-w-[425px] p-6 m-6 bg-white rounded-xl border border-gray-200 p-3 flex">
                                {/* Image and Names */}
                                <div>
                                    <div className="flex gap-2">
                                        <img
                                            src={claim.img}
                                            alt={claim.name}
                                            className="h-20 w-20 object-cover rounded-xl border border-gray-200"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <div>
                                            <div className="font-semibold text-sm text-gray-800">{claim.name}</div>
                                            <div className="text-xs text-gray-400">{claim.role}</div>
                                        </div>
                                        {/* <div>
                                        <div className="font-semibold text-sm text-gray-800">{claim.exec}</div>
                                        <div className="text-xs text-gray-400">{claim.execRole}</div>
                                    </div> */}
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex justify-center">
                                            <div className="flex items-center gap-1 text-xs text-blue-700 font-semibold bg-gray-100 rounded px-2 py-1 my-2 w-full justify-center">
                                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="10" r="3" />
                                                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                                                </svg>
                                                {claim.city}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                                <path d="M16 2v4M8 2v4M3 10h18" />
                                            </svg>
                                            Posted : {claim.posted}
                                        </div>
                                    </div>
                                </div>
                                {/* Description */}
                                <div className="pl-3 flex-1 flex flex-col justify-between">
                                    <div className="text-xs text-gray-700 leading-snug mb-4">{claim.desc}</div>
                                    <div className="flex items-end justify-end">
                                        <button type="button" className="text-blue-600 text-xs font-semibold flex items-center hover:underline">
                                            Read More
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Add more cards here */}
                    </div>
                </div>

                {/* Plan Details Modal */}
                <PlanDetailsModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    planData={selectedPlan}
                    currentPlan={selectedPlan}
                />
            </div>
            <Footer />
        </>
    );
}
