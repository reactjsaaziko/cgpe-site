import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import HeaderHI from "../headers/HeaderHI";
import StartBlock from "../StartBlock";
import ContactConfirmation from "../term insurance/ContactConfirmation";

export default function PlansListHI() {
    const location = useLocation();
    const [selectedPlans, setSelectedPlans] = useState([]);
    const [plans, setPlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openFeaturesDropdown, setOpenFeaturesDropdown] = useState(null);
    const navigate = useNavigate();

    // Get data from previous screens
    const selectedMembers = location.state?.selectedMembers || ["self"];
    const selectedAge = location.state?.selectedAge || "";
    const selectedCity = location.state?.selectedCity || "";
    const currentMember = location.state?.currentMember || "self";
    const mobileNumber = location.state?.mobileNumber || "";
    const medicalHistory = location.state?.medicalHistory || [];
    const specificConditions = location.state?.specificConditions || null;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openFeaturesDropdown && !event.target.closest('.features-dropdown')) {
                setOpenFeaturesDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openFeaturesDropdown]);

    // Fetch health insurance policies from API
    useEffect(() => {
        const fetchHealthInsurancePlans = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/health-insurance/policies?isActive=true&limit=50');
                const result = await response.json();

                if (result.success) {
                    // Transform API data to match the component's expected format
                    const transformedPlans = result.data.map(policy => ({
                        id: policy._id,
                        logo: policy.companyLogo || "/default-insurance-logo.png",
                        planName: policy.policyName,
                        badges: policy.badges || [],
                        claimPaid: policy.claimPaidText || "95% of claims paid within 3 months*",
                        features: [
                            `Waiting period ${policy.waitingPeriod} days`,
                            policy.roomRentLimit === 'no-limit' ? 'No Room Rent Limit' : `Room Rent: ${formatRoomRentLimit(policy.roomRentLimit)}`,
                            formatRestorationBenefit(policy.restorationBenefit)
                        ],
                        allFeatures: "View all features ›",
                        cover: policy.coverageAmountText,
                        hospitals: policy.cashlessHospitals,
                        price: `${Math.round(policy.premiumAmount / (policy.premiumFrequency === 'yearly' ? 12 : policy.premiumFrequency === 'monthly' ? 1 : policy.premiumFrequency === 'quarterly' ? 3 : 6))}/month`,
                        annually: `₹${policy.premiumAmount.toLocaleString()} ${policy.premiumFrequency}`,
                        morePlans: policy.morePlansText || "1 more plan",
                        compare: "Add to compare",
                        companyName: policy.companyName,
                        // Add love section for popular policies
                        ...(policy.isPopular && {
                            love: {
                                icon: "❤️",
                                title: "What we love?",
                                desc: policy.description.substring(0, 100) + "..."
                            }
                        }),
                        // Store original policy data for filtering
                        originalPolicy: policy
                    }));
                    setPlans(transformedPlans);
                } else {
                    setError('Failed to fetch health insurance plans');
                }
            } catch (err) {
                setError('Error loading health insurance plans');
                console.error('Error fetching health insurance plans:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHealthInsurancePlans();
    }, []);

    // Filter plans based on user input
    useEffect(() => {
        if (plans.length > 0) {
            const filtered = plans.filter(plan => {
                const policy = plan.originalPolicy;

                // Filter by age range
                const userAge = parseInt(selectedAge);
                if (userAge && (userAge < policy.minAge || userAge > policy.maxAge)) {
                    return false;
                }

                // Filter by family type (individual vs family)
                if (selectedMembers.length > 1 && policy.policyType === 'individual') {
                    return false;
                }
                if (selectedMembers.length === 1 && policy.policyType === 'family') {
                    return false;
                }

                // Filter by medical history
                if (medicalHistory.length > 0 && !medicalHistory.includes('none')) {
                    // If user has medical conditions, prioritize plans with pre-existing disease cover
                    if (specificConditions && specificConditions.length > 0) {
                        // For specific conditions like diabetes, BP, heart ailments
                        if (specificConditions.includes('diabetes') || specificConditions.includes('bp') || specificConditions.includes('heart')) {
                            // Prefer plans with pre-existing disease cover
                            if (!policy.preExistingDiseaseCover) {
                                return false;
                            }
                        }
                    }
                }

                // Filter by city (if policy has city restrictions)
                // This is a basic implementation - you might want to enhance this based on your business logic
                if (selectedCity && policy.cityRestrictions && policy.cityRestrictions.length > 0) {
                    if (!policy.cityRestrictions.includes(selectedCity)) {
                        return false;
                    }
                }

                return true;
            });

            // Sort plans by relevance (popular first, then by rating, then by premium)
            const sortedPlans = filtered.sort((a, b) => {
                const policyA = a.originalPolicy;
                const policyB = b.originalPolicy;

                // Popular plans first
                if (policyA.isPopular && !policyB.isPopular) return -1;
                if (!policyA.isPopular && policyB.isPopular) return 1;

                // Then by rating
                if (policyA.rating !== policyB.rating) {
                    return policyB.rating - policyA.rating;
                }

                // Then by premium amount (lower first)
                return policyA.premiumAmount - policyB.premiumAmount;
            });

            setFilteredPlans(sortedPlans);
        }
    }, [plans, selectedAge, selectedMembers, medicalHistory, specificConditions, selectedCity]);

    const formatRoomRentLimit = (limit) => {
        const formatMap = {
            'no-limit': 'No Limit',
            'single-room': 'Single Room',
            'shared-room': 'Shared Room',
            'icu-only': 'ICU Only'
        };
        return formatMap[limit] || limit;
    };

    const formatRestorationBenefit = (benefit) => {
        const formatMap = {
            'none': 'No Restoration',
            'once-a-year': 'Restoration once a year',
            'unlimited': 'Unlimited Restoration of cover',
            'family-floater': 'Family Floater Restoration'
        };
        return formatMap[benefit] || benefit;
    };

    // Format member name for display
    const getMemberDisplayName = (member) => {
        return member.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    // Handle plan selection for comparison
    const handlePlanSelection = (planId) => {
        if (selectedPlans.includes(planId)) {
            setSelectedPlans(selectedPlans.filter(id => id !== planId));
        } else {
            setSelectedPlans([...selectedPlans, planId]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f9fafb] flex flex-col">
                <HeaderHI />
                <hr />
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600">Loading health insurance plans...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#f9fafb] flex flex-col">
                <HeaderHI />
                <hr />
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md mb-4">
                        <p className="font-medium">Error loading plans</p>
                        <p className="text-sm">{error}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    if (filteredPlans.length === 0) {
        return (
            <div className="min-h-screen bg-[#f9fafb] flex flex-col">
                <HeaderHI />
                <hr />
                <div className="flex flex-col items-center justify-center h-[70vh]">
                    <div className="text-center">
                        <div className="text-4xl mb-4">🏥</div>
                        <p className="text-gray-600 text-lg font-medium mb-2">No matching health insurance plans found</p>
                        <p className="text-gray-500 mb-4">We couldn't find plans that match your criteria.</p>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>Your criteria: Age {selectedAge}, {selectedCity}</p>
                            {medicalHistory.length > 0 && !medicalHistory.includes('none') && (
                                <p>Medical conditions: {medicalHistory.join(', ')}</p>
                            )}
                            {specificConditions && specificConditions.length > 0 && (
                                <p>Specific conditions: {specificConditions.join(', ')}</p>
                            )}
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Modify Search Criteria
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f9fafb] flex flex-col">
            <HeaderHI />

            <hr />
            <div className="flex flex-col items-center px-4">
                <div className="max-w-7xl bg-white border-b border-gray-200 mb-4">
                    {/* Top row */}
                    <div className="flex items-center justify-between px-8 pt-2 pb-1">
                        <div className="flex items-center space-x-8">
                            <div className="text-[15px] text-gray-700">
                                Showing {filteredPlans.length} plans for <span className="block font-bold text-[#1d2746]">{getMemberDisplayName(currentMember)} ({selectedAge || '24'} Yrs)</span>
                            </div>
                            <div className="block  items-center space-x-2 ml-6">
                                <button className="flex items-center px-2 py-1 rounded hover:bg-gray-100 text-[15px] text-[#283356] font-medium border-none bg-transparent focus:outline-none">
                                    <svg width="18" height="18" fill="none" stroke="#283356" strokeWidth="2" className="mr-1" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-8" />
                                        <path d="M8 12h8" />
                                    </svg>
                                    Edit
                                </button>
                                <span className="text-[#a1a8ba] text-[15px]">Your search</span>
                            </div>
                        </div>
                    </div>
                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>
                    {/* Filters row */}
                    <div className="flex items-center space-x-3 px-8 py-3">
                        <span className="text-[15px] text-[#283356] mr-2">Quick filters</span>
                        {[
                            "Diabetes waiting period",
                            "Cover",
                            "Sort by",
                            "No room rent limit",
                            "Policy benefits",
                            "Discount",
                        ].map((txt, i) => (
                            <button
                                key={txt}
                                className="flex items-center px-4 py-1 rounded-full border border-[#d9dde8] bg-white text-[#283356] text-[15px] font-medium hover:bg-blue-50 focus:outline-none"
                            >
                                {txt}
                                <svg width="15" height="15" fill="none" stroke="#b6b9c8" strokeWidth="2" className="ml-2" viewBox="0 0 24 24">
                                    <path d="M9 9l3 3 3-3" />
                                </svg>
                            </button>
                        ))}
                        <button
                            className="rounded-full shadow-sm px-2 py-1 bg-white border border-[#d9dde8] ml-2"
                        >
                            <svg width="16" height="16" fill="none" stroke="#a1a8ba" strokeWidth="2" className="mx-auto" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M9 9l3 3 3-3" />
                            </svg>
                        </button>
                        <button
                            className="flex items-center px-4 py-1 rounded-full border border-[#d9dde8] bg-white text-[#283356] text-[15px] font-medium ml-2 hover:bg-blue-50 focus:outline-none"
                        >
                            <svg width="18" height="18" fill="none" stroke="#283356" strokeWidth="2" className="mr-2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                                <path d="M8 11h6" />
                                <path d="M11 8v6" />
                            </svg>
                            All filters
                        </button>
                    </div>
                    <StartBlock />
                </div>
                <ContactConfirmation />
                {/* Plan cards */}
                <div className="min-h-screen bg-[#f9fafb] flex flex-col">
                    <div className="flex flex-col items-center py-6 px-4">
                        {/* Plan comparison cards */}
                        <div className="w-full max-w-5xl flex flex-col gap-6 mt-4">
                            {filteredPlans.map((plan, idx) => (
                                <div key={plan.id} className="relative bg-white rounded-xl shadow-md border border-gray-100 p-0 overflow-visible">
                                    {/* Claim paid badge */}
                                    <div className="absolute left-8 top-0 -translate-y-1/2">
                                        <div className="bg-green-50 border border-green-100 text-green-700 font-medium text-xs px-3 py-1 rounded-xl flex items-center shadow">
                                            <svg width="18" height="18" fill="none" stroke="#31b85f" strokeWidth="2" className="mr-1" viewBox="0 0 24 24">
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                            {plan.claimPaid}
                                        </div>
                                    </div>

                                    {/* Special badge for second plan */}
                                    {plan.id === 2 && plan.badges.length > 0 && (
                                        <div className="absolute right-8 top-0 -translate-y-1/2">
                                            <span className="bg-blue-400 text-white text-xs font-semibold px-3 py-1 rounded shadow">
                                                {plan.badges[0]}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex pt-8 pb-6">
                                        {/* Logo + Company + More plans */}
                                        <div className="flex flex-col items-center px-6 min-w-[140px]">
                                            <img src={plan.logo} alt={plan.companyName} className="w-16 h-16 object-contain rounded mb-2" />
                                            <div className="text-center">
                                                <div className="text-xs text-gray-600 font-medium">{plan.companyName}</div>
                                                <div className="text-green-700 text-xs font-semibold mt-1">{plan.morePlans}</div>
                                            </div>
                                            <button className="mt-2 text-gray-400 hover:text-blue-700">
                                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M12 15l-5-5h10l-5 5z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Main content */}
                                        <div className="flex-1 pr-6 pl-2 flex flex-col justify-between">
                                            <div>
                                                {/* Plan name and badge */}
                                                <div className="flex items-center mb-2">
                                                    <div className="text-lg font-semibold text-[#1d2746]">{plan.planName}</div>
                                                    {plan.id === 1 && plan.badges.length > 0 && (
                                                        <span className="ml-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                                                            {plan.badges[0]}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Features */}
                                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                                    {plan.features.map((f, i) => (
                                                        <span key={i} className="bg-gray-50 border border-gray-200 rounded px-3 py-1 text-gray-700 text-sm">
                                                            {f}
                                                        </span>
                                                    ))}
                                                    <div className="relative features-dropdown">
                                                        <button
                                                            onClick={() => setOpenFeaturesDropdown(openFeaturesDropdown === plan.id ? null : plan.id)}
                                                            className="bg-white border border-green-200 rounded px-3 py-1 text-green-600 text-sm cursor-pointer hover:bg-green-50 focus:outline-none flex items-center"
                                                        >
                                                            <span>{plan.allFeatures}</span>
                                                            <svg
                                                                className={`w-3 h-3 ml-1 transition-transform duration-200 ${openFeaturesDropdown === plan.id ? 'rotate-180' : ''}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>

                                                        {/* Features Dropdown */}
                                                        {openFeaturesDropdown === plan.id && (
                                                            <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                                                                <div className="p-4">
                                                                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Plan Features</h3>
                                                                    <ul className="space-y-2">
                                                                        {plan.features.map((feature, index) => (
                                                                            <li key={index} className="flex items-start space-x-2">
                                                                                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                                                                <span className="text-sm text-gray-700">{feature}</span>
                                                                            </li>
                                                                        ))}
                                                                        {/* Add additional features from the policy data */}
                                                                        {plan.originalPolicy && (
                                                                            <>
                                                                                <li className="flex items-start space-x-2">
                                                                                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                                                                    <span className="text-sm text-gray-700">Coverage Amount: {plan.originalPolicy.coverageAmountText}</span>
                                                                                </li>
                                                                                <li className="flex items-start space-x-2">
                                                                                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                                                                    <span className="text-sm text-gray-700">Cashless Hospitals: {plan.originalPolicy.cashlessHospitals}</span>
                                                                                </li>
                                                                                <li className="flex items-start space-x-2">
                                                                                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                                                                    <span className="text-sm text-gray-700">Premium: {plan.originalPolicy.premiumAmountText}</span>
                                                                                </li>
                                                                            </>
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Compare checkbox */}
                                                {/* <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="compare"
                                                        className="form-radio h-4 w-4 text-blue-600"
                                                        checked={selectedPlans.includes(plan.id)}
                                                        onChange={() => handlePlanSelection(plan.id)}
                                                    />
                                                    <span className="text-sm">{plan.compare}</span>
                                                </label> */}
                                            </div>

                                            {/* What we love section */}
                                            {plan.love && (
                                                <div className="mt-4 bg-green-50 rounded-lg p-3 border border-green-100">
                                                    <div className="flex items-start">
                                                        <span className="text-lg mr-2 text-red-500">{plan.love.icon}</span>
                                                        <div>
                                                            <b className="text-[#1d2746] text-sm">{plan.love.title}</b>
                                                            <div className="text-gray-700 text-sm mt-1">{plan.love.desc}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Pricing section */}
                                        <div className="items-end justify-between px-6 py-2 min-w-[200px]">
                                            <div>
                                                <div className="text-gray-700 text-sm">Cover amount</div>
                                                <div className="font-bold text-lg text-[#1d2746] mb-3 block items-center">
                                                    {plan.cover}
                                                </div>
                                                <div className="text-gray-700 text-sm">Cashless hospitals</div>
                                                <div className="font-bold text-lg text-[#1d2746] mb-4 block items-center">
                                                    {plan.hospitals}
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 w-full rounded-md py-2 text-white text-[15px] font-semibold mb-1"
                                                    onClick={() => navigate("/plan-details", {
                                                        state: {
                                                            selectedPlan: {
                                                                logo: plan.logo,
                                                                companyName: plan.planName.split(' ')[0] + " HEALTH INSURANCE",
                                                                planName: plan.planName,
                                                                hospitals: plan.hospitals,
                                                                cover: plan.cover,
                                                                basePremium: plan.annually,
                                                                annually: plan.annually
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
                                                    {plan.price}
                                                </button>
                                                <div className="text-gray-400 text-xs text-center">{plan.annually}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
