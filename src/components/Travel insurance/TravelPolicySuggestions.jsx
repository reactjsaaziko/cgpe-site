import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../headers/Header";
import Footer from "../Footer";
import StartBlock from "../StartBlock";
import ContactConfirmation from "../term insurance/ContactConfirmation";

// Static plans data (fallback)
const staticPlans = [
    {
        logo: "/niva.png",
        name: "Niva Bupa",
        subtitle: "formerly known as Max Bupa",
        plan: "Travel Assure Lite",
        medical: "$100,000",
        passport: "$300",
        baggage: "$1,000",
        premium: "2,561",
        details: "View product details",
        buy: true,
    },
    {
        logo: "/bajaj.png",
        name: "Bajaj Allianz",
        subtitle: "Travel Ace Gold",
        medical: "$200,000",
        passport: "$400",
        baggage: "$750",
        premium: "5,404",
        details: "View product details",
        buy: true,
    },
    {
        logo: "/tata.png",
        name: "Tata AIG",
        subtitle: "Travel Guard - Gold",
        medical: "$250,000",
        passport: "$250",
        baggage: "$1,000",
        premium: "3,620",
        details: "View product details",
        buy: true,
        banner: "1,105 people bought this plan in last one week",
    },
    {
        logo: "/reliance.png",
        name: "Reliance",
        subtitle: "Travel Care Individual",
        medical: "$250,000",
        passport: "$300",
        baggage: "$1,200",
        premium: "3,082",
        details: "View product details",
        buy: true,
    },
    {
        logo: "/care.png",
        name: "Care Health",
        subtitle: "Explore Asia",
        medical: "$100,000",
        passport: "$300",
        baggage: "$500",
        premium: "1,955",
        details: "View product details",
        buy: true,
    },
    {
        logo: "/digit.png",
        name: "DIGIT General Insurance",
        subtitle: "Option - Global Cover with PED",
        medical: "$100,000",
        passport: "$300",
        baggage: "$300",
        premium: "2,842",
        details: "View product details",
        buy: true,
    },
];

// Upgrade Modal Component
const UpgradeModal = ({ isOpen, onClose, selectedPlan, onSkip, onUpgrade }) => {
    if (!isOpen || !selectedPlan) return null;

    const upgradePrice = parseInt(selectedPlan.premium) + 192;
    const upgradePlan = {
        ...selectedPlan,
        plan: "Travel Assure Pro",
        premium: upgradePrice.toString(),
        missedConnection: "$500",
        medicalEvacuation: "$25,000",
        repatriation: "$1,000"
    };

    return (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        //     <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        //         {/* Header */}
        //         <div className="flex justify-between items-start p-6 border-b border-gray-200">
        //             <div>
        //                 <h2 className="text-xl font-semibold text-gray-800 mb-1">Upgrade your plan!</h2>
        //                 <p className="text-gray-600">
        //                     Get additional benefits at just{" "}
        //                     <span className="text-green-600 font-semibold">₹192 extra</span>
        //                 </p>
        //             </div>
        //             <button
        //                 onClick={onClose}
        //                 className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
        //             >
        //                 ×
        //             </button>
        //         </div>

        //         {/* Plan Comparison */}
        //         <div className="p-6">
        //             <div className="grid grid-cols-2 gap-4 mb-6">
        //                 {/* Current Plan */}
        //                 <div className="text-center">
        //                     <img 
        //                         src={selectedPlan.logo} 
        //                         alt={selectedPlan.name} 
        //                         className="w-16 h-16 mx-auto mb-2 object-contain"
        //                     />
        //                     <h3 className="font-semibold text-gray-800">{selectedPlan.plan}</h3>
        //                 </div>
        //                 {/* Upgrade Plan */}
        //                 <div className="text-center">
        //                     <img 
        //                         src={selectedPlan.logo} 
        //                         alt={selectedPlan.name} 
        //                         className="w-16 h-16 mx-auto mb-2 object-contain"
        //                     />
        //                     <h3 className="font-semibold text-gray-800">{upgradePlan.plan}</h3>
        //                 </div>
        //             </div>

        //             {/* Benefits Comparison */}
        //             <div className="space-y-3 mb-6">
        //                 <div className="flex items-center justify-between py-2 border-b border-gray-100">
        //                     <span className="text-sm text-gray-600">Missed Connection</span>
        //                     <div className="flex gap-4">
        //                         <span className="text-blue-500 font-bold">×</span>
        //                         <span className="text-green-600 font-semibold">{upgradePlan.missedConnection}</span>
        //                     </div>
        //                 </div>
        //                 <div className="flex items-center justify-between py-2 border-b border-gray-100">
        //                     <span className="text-sm text-gray-600">Medical Evacuation</span>
        //                     <div className="flex gap-4">
        //                         <span className="text-blue-500 font-bold">×</span>
        //                         <span className="text-green-600 font-semibold">{upgradePlan.medicalEvacuation}</span>
        //                     </div>
        //                 </div>
        //                 <div className="flex items-center justify-between py-2 border-b border-gray-100">
        //                     <span className="text-sm text-gray-600">Repatriation of Mortal Remains</span>
        //                     <div className="flex gap-4">
        //                         <span className="text-blue-500 font-bold">×</span>
        //                         <span className="text-green-600 font-semibold">{upgradePlan.repatriation}</span>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Premium Comparison */}
        //             <div className="flex items-center justify-between mb-6">
        //                 <div className="text-center">
        //                     <p className="text-sm text-gray-500">Total premium</p>
        //                     <p className="text-xl font-bold text-gray-800">₹{selectedPlan.premium}</p>
        //                 </div>
        //                 <button className="text-blue-600 text-sm font-medium hover:underline">
        //                     Show all differences &gt;
        //                 </button>
        //                 <div className="text-center">
        //                     <p className="text-sm text-gray-500">premium</p>
        //                     <p className="text-xl font-bold text-gray-800">₹{upgradePlan.premium}</p>
        //                 </div>
        //             </div>

        //             {/* Action Buttons */}
        //             <div className="flex gap-4">
        //                 <button
        //                     onClick={onClose}
        //                     className="flex-1 border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition"
        //                 >
        //                     Skip
        //                 </button>
        //                 <button
        //                     onClick={() => {
        //                         // Handle upgrade logic here
        //                         console.log("Upgrading to:", upgradePlan);
        //                         onClose();
        //                     }}
        //                     className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
        //                 >
        //                     Upgrade
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg relative">
                {/* Header */}
                <button className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-gray-800" onClick={onClose}>
                    &times;
                </button>
                <div className="px-6 pt-6 pb-4 border-b">
                    <div className="font-medium text-lg text-[#23294a] mb-1">Upgrade your plan!</div>
                    <div className="text-[17px] mb-1">
                        Get additional benefits <span className="text-gray-500">at just</span>{" "}
                        <span className="text-green-600 font-semibold">₹192 extra</span>
                    </div>
                </div>
                {/* Comparison Table */}
                <div className="px-6 py-5">
                    <div className="grid grid-cols-3 items-center mb-6">
                        <div className="flex flex-col items-center">
                            <img src="/niva.png" alt="Niva" className="w-12 h-6 object-contain mb-1" />
                            <div className="font-medium text-[#23294a] text-[15px] mt-1">Travel Assure Lite</div>
                        </div>
                        <div></div>
                        <div className="flex flex-col items-center">
                            <img src="/niva.png" alt="Niva" className="w-12 h-6 object-contain mb-1" />
                            <div className="font-medium text-[#23294a] text-[15px] mt-1">Travel Assure Pro</div>
                        </div>
                    </div>
                    {/* Benefits */}
                    <div className="divide-y divide-gray-200 mb-5">
                        <div className="grid grid-cols-3 py-2 items-center text-center">
                            <div className="text-2xl text-gray-400">✗</div>
                            <div className="text-[#23294a] text-[15px]">Missed Connection</div>
                            <div className="text-[#23294a] text-[15px] font-medium">$500</div>
                        </div>
                        <div className="grid grid-cols-3 py-2 items-center text-center">
                            <div className="text-2xl text-gray-400">✗</div>
                            <div className="text-[#23294a] text-[15px]">Medical Evacuation</div>
                            <div className="text-[#23294a] text-[15px] font-medium">$25,000</div>
                        </div>
                        <div className="grid grid-cols-3 py-2 items-center text-center">
                            <div className="text-2xl text-gray-400">✗</div>
                            <div className="text-[#23294a] text-[15px]">Repatriation of Mortal Remains</div>
                            <div className="text-[#23294a] text-[15px] font-medium">$1,000</div>
                        </div>
                    </div>
                    {/* Premium */}
                    <div className="grid grid-cols-3 items-end mt-2 mb-2">
                        <div className="flex flex-col items-center">
                            <div className="text-[14px] text-gray-500 mb-1">Total premium</div>
                            <div className="text-[18px] font-bold text-[#23294a]">₹ 2,560</div>
                        </div>
                        <div className="text-center">
                            <a href="#" className="text-[#2968d6] font-semibold text-[15px] hover:underline">
                                Show all differences &rsaquo;
                            </a>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-[14px] text-gray-500 mb-1">premium</div>
                            <div className="text-[18px] font-bold text-[#23294a]">₹ 2,752</div>
                        </div>
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex gap-6 justify-between px-6 py-5 border-t">
                    <button
                        className="flex-1 border border-[#2968d6] rounded-lg py-3 text-[#2968d6] text-[17px] font-semibold bg-white hover:bg-blue-50 transition"
                        onClick={onSkip}
                    >
                        Skip
                    </button>
                    <button
                        className="flex-1 bg-[#2968d6] hover:bg-[#2447b5] text-white rounded-lg py-3 text-[17px] font-semibold transition"
                        onClick={onUpgrade}
                    >
                        Upgrade
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function TravelPolicyCompare() {
    const [planType, setPlanType] = useState("single");
    const [tripData, setTripData] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Load trip data from localStorage when component mounts
    useEffect(() => {
        const savedTripData = localStorage.getItem("travelTripData");
        if (savedTripData) {
            setTripData(JSON.parse(savedTripData));
        }
    }, []);

    // Fetch travel insurance policies from API
    useEffect(() => {
        fetchTravelPolicies();
    }, []);

    const fetchTravelPolicies = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/travel-insurance/client');
            const result = await response.json();

            if (result.success) {
                // Transform API data to match the expected format
                const transformedPlans = result.data.map(policy => ({
                    logo: policy.companyLogo,
                    name: policy.companyName,
                    subtitle: policy.subtitle || '',
                    plan: policy.planName,
                    medical: policy.medicalCoverage,
                    passport: policy.passportCoverage,
                    baggage: policy.baggageCoverage,
                    premium: policy.premium,
                    details: policy.details || "View product details",
                    buy: true,
                    banner: policy.banner || null,
                    rating: policy.rating,
                    reviews: policy.reviews
                }));
                setPlans(transformedPlans);
            } else {
                console.error('Failed to fetch travel policies:', result.message);
                setPlans(staticPlans); // Fallback to static data
            }
        } catch (error) {
            console.error('Error fetching travel policies:', error);
            setError('Failed to load travel policies');
            setPlans(staticPlans); // Fallback to static data
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate("/travelinsurance");
    };

    const handleBuyNowClick = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPlan(null);
    };

    const handleSkip = () => {
        closeModal();
        // Navigate to personal details form when user clicks skip
        navigate("/travel-personal-details");
    };

    const handleUpgrade = () => {
        // Add upgrade logic here
        console.log("Upgrading plan:", selectedPlan);
        closeModal();
    };

    return (
        <>
            <Header />
           
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
                {/* Header */}
                {/* Back button */}
                <div className="max-w-7xl mx-auto px-4 mb-8">
                    <button
                        onClick={handleBackClick}
                        className="flex items-center gap-3 text-[#2968d6] hover:text-[#2447b5] font-semibold transition-all duration-200 hover:scale-105 group"
                    >
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:-translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Travel Insurance
                    </button>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                    {/* Left main */}
                    <div className="flex-1">
                        {/* Search bar */}
                        <div className="bg-white border-2 border-gray-100 shadow-lg rounded-2xl px-6 py-4 mb-6 flex items-center hover:border-blue-200 transition-all duration-300">
                            <div className="flex-1 flex items-center">
                                <svg width="24" height="24" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24" className="mr-3">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>
                                <input
                                    className="flex-1 bg-transparent outline-none text-lg placeholder-gray-400"
                                    placeholder="Search for the best travel insurance policy..."
                                />
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 hover:scale-105">
                                    <svg width="20" height="20" fill="none" stroke="#4472c4" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M8 15l4-4-4-4" />
                                        <path d="M16 15l-4-4 4-4" />
                                    </svg>
                                </button>
                                <button className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 hover:scale-105">
                                    <svg width="20" height="20" fill="none" stroke="#4472c4" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M3 6h18M3 12h18M3 18h18" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <ContactConfirmation />
                        {/* Plan List */}
                        <div className="flex flex-col gap-6">
                            <StartBlock/>
                            {loading ? (
                                <div className="flex items-center justify-center py-16">
                                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
                                    <span className="ml-4 text-gray-600 text-lg font-medium">Loading travel policies...</span>
                                </div>
                            ) : error ? (
                                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
                                    <div className="flex items-center">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 8v4m0 4h.01" />
                                        </svg>
                                        {error}
                                    </div>
                                </div>
                            ) : plans.length === 0 ? (
                                <div className="text-center py-16 text-gray-500">
                                    <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="mx-auto mb-4 opacity-50">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-lg font-medium">No travel insurance policies available at the moment.</p>
                                </div>
                            ) : (
                                plans.map((p, i) => (
                                    <div key={p.name} className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200 px-6 py-6 flex items-center gap-6 mb-6 relative group">
                                        <div className="flex items-center gap-4">
                                            <input type="checkbox" className="accent-blue-600 w-5 h-5 mr-2 transform scale-110" />
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center p-2 shadow-sm">
                                                <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-bold text-[#23294a] text-lg">{p.name}</h3>
                                                {p.subtitle && <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">({p.subtitle})</span>}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3 font-medium">{p.plan}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-gray-700">Medical Expenses <span className="font-bold text-[#2968d6]">{p.medical}</span></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <span className="text-gray-700">Loss of Passport <span className="font-bold text-[#2968d6]">{p.passport}</span></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                    <span className="text-gray-700">Baggage Loss <span className="font-bold text-[#2968d6]">{p.baggage}</span></span>
                                                </div>
                                            </div>
                                            <a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold mt-3 transition-colors">
                                                {p.details}
                                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <div className="text-center">
                                                <div className="text-xs text-gray-500 mb-1">Total Premium</div>
                                                <div className="text-xs text-gray-400">(GST included)</div>
                                            </div>
                                            <div className="text-2xl font-bold text-[#2968d6] mb-2">₹{p.premium}</div>
                                            {p.buy && (
                                                <button
                                                    onClick={() => handleBuyNowClick(p)}
                                                    className="bg-gradient-to-r from-[#2968d6] to-[#2447b5] hover:from-[#2447b5] hover:to-[#1e3a8a] text-white rounded-xl px-8 py-3 font-semibold text-[15px] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 transform"
                                                >
                                                    Buy now
                                                </button>
                                            )}
                                        </div>
                                        {/* Banner (Tata AIG) */}
                                        {p.banner && (
                                            <div className="absolute left-0 right-0 -bottom-8 bg-gradient-to-r from-[#ede7fb] to-[#dfd3f8] text-[#7953c4] text-xs px-8 py-2 rounded-b-2xl border-t border-[#dfd3f8] font-medium">
                                                {p.banner}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                        {/* Disclaimer and support */}
                        <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg p-8 mt-8">
                            <h3 className="text-lg font-bold text-[#23294a] mb-4 flex items-center gap-2">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Important Information
                            </h3>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Above mentioned quotes are inclusive of 18% GST</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Guaranteed approval by insurer on all legitimate claims for PolicyBazaar customers</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Please read the policy wordings for detailed coverage on COVID-19 related interruptions and cancellations</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Policy purchase basis features/benefits is required to avoid policy lapse</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>Please note that these features/benefits shown above are to make it easier to read and find the product details to know about more features/benefits</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>$5000 is net across loss events/benefit and is not limited to the number of claims</span>
                                </li>
                            </ul>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg width="24" height="24" fill="none" stroke="#2968d6" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#23294a]">Need Help?</p>
                                        <p className="text-sm text-gray-600">We're just one click away</p>
                                    </div>
                                </div>
                                <button className="bg-gradient-to-r from-[#2968d6] to-[#2447b5] hover:from-[#2447b5] hover:to-[#1e3a8a] text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200 hover:scale-105 transform shadow-lg">
                                    Call me now
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Right filter */}
                    <aside className="w-full lg:w-[300px] mt-3">
                        <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg p-6 sticky top-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                                    <svg width="20" height="20" fill="none" stroke="#2968d6" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg text-[#23294a]">Looking for other plans?</h3>
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center gap-4 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="planType"
                                            checked={planType === "single"}
                                            onChange={() => setPlanType("single")}
                                            className="accent-blue-600 w-5 h-5"
                                        />
                                        <div className={`absolute inset-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${planType === "single" ? "border-blue-600" : "border-gray-300"}`}></div>
                                    </div>
                                    <div className="flex-1">
                                        <span className={`font-semibold transition-all duration-200 ${planType === "single" ? "text-[#2968d6]" : "text-gray-700"}`}>Single trip plans</span>
                                        <p className="text-xs text-gray-500 mt-1">Perfect for one-time travelers</p>
                                    </div>
                                    {planType === "single" && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                    )}
                                </label>
                                
                                <div className="border-t border-gray-100 my-4"></div>
                                
                                <label className="flex items-center gap-4 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="planType"
                                            checked={planType === "frequent"}
                                            onChange={() => setPlanType("frequent")}
                                            className="accent-blue-600 w-5 h-5"
                                        />
                                        <div className={`absolute inset-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${planType === "frequent" ? "border-blue-600" : "border-gray-300"}`}></div>
                                    </div>
                                    <div className="flex-1">
                                        <span className={`font-semibold transition-all duration-200 ${planType === "frequent" ? "text-[#2968d6]" : "text-gray-700"}`}>Frequent flyer plans</span>
                                        <p className="text-xs text-gray-500 mt-1">Ideal for business travelers</p>
                                    </div>
                                    {planType === "frequent" && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                    )}
                                </label>
                                
                                <div className="border-t border-gray-100 my-4"></div>
                                
                                <label className="flex items-center gap-4 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="planType"
                                            checked={planType === "student"}
                                            onChange={() => setPlanType("student")}
                                            className="accent-blue-600 w-5 h-5"
                                        />
                                        <div className={`absolute inset-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${planType === "student" ? "border-blue-600" : "border-gray-300"}`}></div>
                                    </div>
                                    <div className="flex-1">
                                        <span className={`font-semibold transition-all duration-200 ${planType === "student" ? "text-[#2968d6]" : "text-gray-700"}`}>Student plans</span>
                                        <p className="text-xs text-gray-500 mt-1">Specialized for students abroad</p>
                                    </div>
                                    {planType === "student" && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                                    )}
                                </label>
                            </div>
                            
                            {/* Quick Stats */}
                            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                                <h4 className="font-semibold text-[#23294a] mb-3 flex items-center gap-2">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Quick Stats
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Plans</span>
                                        <span className="font-semibold text-[#2968d6]">{plans.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Avg. Premium</span>
                                        <span className="font-semibold text-[#2968d6]">₹3,200</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Coverage Range</span>
                                        <span className="font-semibold text-[#2968d6]">$100K-$250K</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={isModalOpen}
                onClose={closeModal}
                selectedPlan={selectedPlan}
                onSkip={handleSkip}
                onUpgrade={handleUpgrade}
            />

            <Footer />
        </>
    );
}
