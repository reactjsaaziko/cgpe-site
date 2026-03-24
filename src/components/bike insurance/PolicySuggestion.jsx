import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../headers/Header";
import StartBlock from "../StartBlock";
import ContactConfirmation from "../term insurance/ContactConfirmation";


export default function PolicySuggestion() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get the selected data from navigation state or URL search parameters
    const stateData = location.state || {};
    const urlData = {
        selectedBrand: searchParams.get('brand'),
        selectedModel: searchParams.get('model'),
        selectedVariant: searchParams.get('variant'),
        selectedYear: searchParams.get('year'),
        bikeType: searchParams.get('type'),
        coverage: searchParams.get('coverage'),
        city: searchParams.get('city')
    };
    
    // Use state data if available, otherwise fall back to URL parameters
    const { 
        selectedBrand, 
        selectedModel, 
        selectedVariant, 
        selectedYear 
    } = Object.keys(stateData).length > 0 ? stateData : urlData;
    
    // Get additional parameters from URL if not in state
    const bikeType = searchParams.get('type') || urlData.bikeType;
    const coverage = searchParams.get('coverage') || urlData.coverage;
    const city = searchParams.get('city') || urlData.city;

    // Fetch bike insurance policies from backend based on user input
    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                // Build query parameters based on user's form input
                const queryParams = new URLSearchParams();
                
                // Add basic filters
                queryParams.append('isActive', 'true');
                queryParams.append('limit', '10');
                
                // Add bike-specific filters based on user input
                if (bikeType) {
                    // Use bikeType from URL if available
                    queryParams.append('bikeType', bikeType);
                } else if (selectedBrand) {
                    // Map brand names to bike types if needed
                    const brandToBikeType = {
                        'honda': 'scooter',
                        'bajaj': 'motorcycle',
                        'TVS': 'scooter',
                        'yamaha': 'motorcycle',
                        'hero': 'motorcycle',
                        'Royal enfield': 'cruiser',
                        'suzuki': 'motorcycle',
                        'mahindra': 'motorcycle',
                        'ktm': 'sports-bike',
                        'ola': 'scooter'
                    };
                    
                    const mappedBikeType = brandToBikeType[selectedBrand.toLowerCase()];
                    if (mappedBikeType) {
                        queryParams.append('bikeType', mappedBikeType);
                    }
                }
                
                // Add engine capacity based on variant (if it contains CC information)
                if (selectedVariant) {
                    const ccMatch = selectedVariant.match(/(\d+)\s*CC/i);
                    if (ccMatch) {
                        const cc = parseInt(ccMatch[1]);
                        let engineCapacity = '';
                        
                        if (cc <= 75) {
                            engineCapacity = 'up-to-75cc';
                        } else if (cc <= 150) {
                            engineCapacity = '75cc-to-150cc';
                        } else if (cc <= 350) {
                            engineCapacity = '150cc-to-350cc';
                        } else {
                            engineCapacity = 'above-350cc';
                        }
                        
                        queryParams.append('engineCapacity', engineCapacity);
                    }
                }
                
                // Add coverage type filter
                if (coverage) {
                    queryParams.append('policyType', coverage);
                }
                
                // Add city-based filters (if backend supports it)
                if (city) {
                    // Note: This would require backend support for city-based filtering
                    // For now, we'll just log it for debugging
                    console.log('City filter:', city);
                }
                
                // Add year-based filters (if needed for policy matching)
                if (selectedYear && selectedYear !== 'Brand New Bike') {
                    const year = parseInt(selectedYear);
                    const currentYear = new Date().getFullYear();
                    const bikeAge = currentYear - year;
                    
                    // You can add age-based filtering logic here if needed
                    // For now, we'll just use the basic filters
                }
                
                // Log the query parameters for debugging
                console.log('Fetching policies with parameters:', {
                    selectedBrand,
                    selectedModel,
                    selectedVariant,
                    selectedYear,
                    bikeType,
                    coverage,
                    city,
                    queryString: queryParams.toString()
                });
                
                // Make the API call with the constructed query parameters
                const response = await fetch(`/api/bike-insurance/policies?${queryParams.toString()}`);
                const result = await response.json();
                
                if (result.success) {
                    setPolicies(result.data);
                } else {
                    console.error('Failed to fetch policies:', result.message);
                    setPolicies([]);
                }
            } catch (error) {
                console.error('Error fetching policies:', error);
                setPolicies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPolicies();
    }, [selectedBrand, selectedModel, selectedVariant, selectedYear, bikeType, coverage, city]);

 
    const handlePlanSelect = (policy) => {
        // Navigate to bike insurance details page
        navigate("/bike-insurance-details", {
            state: {
                selectedPlan: {
                    ...policy,
                    price: `₹${policy.premiumAmount}`,
                    company: policy.companyName,
                    logo: policy.companyLogo || "/assets/images/i4.png",
                    idv: policy.coverageAmountText,
                    claimsSettled: `${policy.claimSettlementRatio}%`
                },
                vehicleDetails: {
                    vehicle: selectedBrand + " " + selectedModel,
                    year: selectedYear,
                    variant: selectedVariant,
                    registrationNumber: "GJ050505",
                    rto: "GJ050555( Surat )"
                }
            }
        });
    };

    const handleBack = () => {
        navigate(-1);
    }; 

    return (
        <>
            <Header />
           
            <div className="min-h-screen p-8 max-w-6xl mx-auto">
                    <StartBlock/>
                <div className="flex items-center justify-center max-w-6xl mx-auto my-6">
                    <input
                        type="text"
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-base bg-gray-50 focus:ring-2 focus:ring-blue-200 max-w-lg"
                        defaultValue="Suggest Best Policy"
                        readOnly
                    />
                    <button className="ml-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 hover:bg-blue-100 transition">
                        <img
                            src="/assets/images/assistant1.png"
                            alt="Assistant"
                            className="w-6 h-6 object-contain"
                        />
                    </button>
                </div>
                <ContactConfirmation />
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-7">
                    {/* Left column */}
                    <div className="flex flex-col gap-5"> 
                        {/* Your bike details */}
                        <div className="bg-white rounded-xl shadow border border-gray-200 px-6 py-5 flex flex-col relative">
                            <span className="absolute right-5 top-4 text-blue-600 font-medium cursor-pointer">Edit</span>
                            <div className="text-[16px] font-semibold text-[#23294a] mb-3">Your bike details</div>
                            <div className="flex items-center gap-2 mb-3">
                                <img src="/assets/images/bike.png" alt="Bike" className="w-8 h-8 object-contain" />
                                <span className="text-[15px] text-[#445670]">Vehicle</span>
                                <span className="font-semibold text-[15px] text-[#23294a]">{selectedBrand} {selectedModel}</span>
                            </div>
                            <div className="flex items-center text-sm mb-1">
                                <div className="mr-6">
                                    <div className="text-gray-400">Variant</div>
                                    <div className="font-semibold text-[#283356]">{selectedVariant}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400">Year</div>
                                    <div className="font-semibold text-[#283356]">{selectedYear}</div>
                                </div>
                            </div>
                        </div>
                        {/* Insured value */}
                        <div className="bg-white rounded-xl shadow border border-gray-200 px-6 py-5 flex flex-col relative">
                            <span className="absolute right-5 top-4 text-blue-600 font-medium cursor-pointer">Edit</span>
                            <div className="flex items-center text-[16px] font-semibold text-[#23294a] mb-2">
                                Insured value (IDV)
                                <span className="text-xs text-blue-600 ml-2 cursor-pointer border-b border-blue-600">Know more</span>
                            </div>
                            <div className="text-sm text-gray-500 mb-1">Currently set for lowest price:</div>
                            <div className="font-bold text-[18px] text-[#283356]">₹28,853</div>
                        </div>
                        {/* Add zero dep cover */}
                        <div className="bg-white rounded-xl shadow border border-gray-200 px-6 py-5 flex flex-col relative cursor-pointer">
                            <div className="flex items-center text-[16px] font-semibold text-[#23294a]">
                                Add zero dep cover
                                <span className="text-xs text-blue-600 ml-2 cursor-pointer border-b border-blue-600">Know more</span>
                            </div>
                        </div>
                    </div>
                    {/* Right: Plans */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
                            <div>
                                <div className="font-semibold text-lg text-[#283356] mb-1">
                                    You can also explore <span className="text-blue-700">16 other plans</span>
                                </div> 
                                <div className="text-sm text-gray-500">
                                    Best plans outside of your preferences
                                </div>
                            </div>
                        </div>
                        {/* Plans list */}
                        <div className="flex flex-col gap-5">
                            {loading ? (
                                <div className="flex justify-center items-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : policies.length > 0 ? (
                                policies.map((policy, index) => (
                                    <div key={policy._id} className={`bg-white rounded-xl shadow border border-gray-200 px-7 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${policy.isPopular ? 'relative' : ''}`}>
                                        {policy.isPopular && (
                                            <div className="absolute left-0 top-0 w-full bg-[#ede7fb] rounded-t-xl px-6 py-2 text-[#7953c4] font-semibold text-sm">
                                                Popular choice! <span className="font-normal text-gray-500 ml-3">483 people bought {policy.companyName} in the last 24 hrs</span>
                                            </div>
                                        )}
                                        <div className={`flex items-center gap-6 ${policy.isPopular ? 'mt-7 md:mt-4' : ''}`}>
                                            <img 
                                                src={policy.companyLogo || "./assets/images/i4.png"} 
                                                alt={policy.companyName} 
                                                className="w-16 h-8 object-contain" 
                                            />
                                            <div>
                                                <div className="text-sm text-gray-400 mb-1">IDV</div>
                                                <div className="font-semibold text-lg text-[#283356]">{policy.coverageAmountText}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-400 mb-1">Claims settled</div>
                                                <div className="font-semibold text-lg text-[#283356]">{policy.claimSettlementRatio}%</div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handlePlanSelect(policy)}
                                            className={`bg-[#4472c4] hover:bg-[#3356a8] text-white font-semibold rounded-lg px-7 py-2 text-lg flex items-center gap-2 ml-auto ${policy.isPopular ? 'mt-4 md:mt-0' : ''}`}
                                        >
                                            ₹{policy.premiumAmount} <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-500">No bike insurance policies available</div>
                                </div>
                            )}
                        </div>
                        {/* GST disclaimer */}
                        <div className="text-center text-xs text-gray-500 mt-7">
                            *Above mentioned quotes are exclusive of GST
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
        // <div className="min-h-screen bg-gray-50">
        //     {/* Header */}
        //     <div className="bg-white shadow-sm border-b">
        //         <div className="max-w-7xl mx-auto px-4 py-4">
        //             <div className="flex items-center justify-between">
        //                 <div className="flex items-center gap-4">
        //                     <button
        //                         onClick={handleBack}
        //                         className="text-gray-600 hover:text-gray-800"
        //                     >
        //                         <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        //                             <path d="M15 18l-6-6 6-6" />
        //                         </svg>
        //                     </button>
        //                     <h1 className="text-2xl font-bold text-gray-900">Suggest Best Policy</h1>
        //                 </div>
        //                 <div className="flex items-center gap-4">
        //                     <div className="relative">
        //                         <input
        //                             type="text"
        //                             placeholder="Search policies..."
        //                             value={searchQuery}
        //                             onChange={(e) => setSearchQuery(e.target.value)}
        //                             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        //                         />
        //                         <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                             <circle cx="11" cy="11" r="8" />
        //                             <path d="M21 21l-4.35-4.35" />
        //                         </svg>
        //                     </div>
        //                     <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
        //                         <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        //                             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="max-w-7xl mx-auto px-4 py-6">
        //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        //             {/* Left Sidebar - User Details */}
        //             <div className="lg:col-span-1 space-y-4">
        //                 {/* Scooter Details Card */}
        //                 <div className="bg-white rounded-lg p-4 shadow-sm border">
        //                     <div className="flex items-center justify-between mb-3">
        //                         <h3 className="text-lg font-semibold text-gray-900">Your scooter details</h3>
        //                         <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
        //                     </div>
        //                                                  <div className="flex items-center gap-3 mb-3">
        //                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        //                              <svg width="16" height="16" fill="currentColor" className="text-blue-600" viewBox="0 0 24 24">
        //                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        //                              </svg>
        //                          </div>
        //                          <div className="text-sm text-gray-600">
        //                              <div>Vehicle: {selectedBrand || "Honda"} {selectedModel || "Activa"}</div>
        //                              <div>Year: {selectedYear || "2023"}</div>
        //                              <div>RTO: GJ050555(Surat)</div>
        //                          </div>
        //                      </div>
        //                 </div>

        //                 {/* IDV Card */}
        //                 <div className="bg-white rounded-lg p-4 shadow-sm border">
        //                     <div className="flex items-center justify-between mb-3">
        //                         <div className="flex items-center gap-2">
        //                             <h3 className="text-lg font-semibold text-gray-900">Insured value (IDV)</h3>
        //                             <button className="text-blue-600 hover:text-blue-800 text-sm">Know more</button>
        //                         </div>
        //                         <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
        //                     </div>
        //                     <p className="text-sm text-gray-600">Currently set for lowest price: ₹28,853</p>
        //                 </div>

        //                 {/* Zero Dep Cover Card */}
        //                 <div className="bg-white rounded-lg p-4 shadow-sm border">
        //                     <div className="flex items-center justify-between">
        //                         <div className="flex items-center gap-2">
        //                             <h3 className="text-lg font-semibold text-gray-900">Add zero dep cover</h3>
        //                             <button className="text-blue-600 hover:text-blue-800 text-sm">Know more</button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Right Section - Insurance Plans */}
        //             <div className="lg:col-span-2">
        //                 <div className="mb-6">
        //                     <h2 className="text-xl font-bold text-gray-900 mb-2">You can also explore 16 other plans</h2>
        //                     <p className="text-gray-600">Best plans outside of your preferences</p>
        //                 </div>

        //                 <div className="space-y-4">
        //                     {insurancePlans.map((plan) => (
        //                         <div key={plan.id} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
        //                             {plan.isPopular && (
        //                                 <div className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full mb-3 inline-block">
        //                                     {plan.popularText}
        //                                 </div>
        //                             )}

        //                             <div className="flex items-center justify-between">
        //                                 <div className="flex items-center gap-4">
        //                                     {/* Company Logo */}
        //                                     <div className={`w-16 h-16 ${plan.logoColor} rounded-lg flex items-center justify-center`}>
        //                                         <span className="text-xs font-medium text-center leading-tight">
        //                                             {plan.logo}
        //                                         </span>
        //                                     </div>

        //                                     {/* Plan Details */}
        //                                     <div className="space-y-1">
        //                                         <div className="flex items-center gap-4 text-sm">
        //                                             <span className="text-gray-600">IDV: <span className="font-medium text-gray-900">{plan.idv}</span></span>
        //                                             <span className="text-gray-600">Claims settled: <span className="font-medium text-gray-900">{plan.claimsSettled}</span></span>
        //                                         </div>
        //                                     </div>
        //                                 </div>

        //                                 {/* Price Button */}
        //                                 <button
        //                                     onClick={() => handlePlanSelect(plan)}
        //                                     className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        //                                 >
        //                                     <span>{plan.price}</span>
        //                                     <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        //                                         <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        //                                     </svg>
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>

        //                 {/* Footer Note */}
        //                 <div className="mt-6 text-right">
        //                     <p className="text-xs text-gray-500">*Above mentioned quotes are exclusive of GST</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

    );
} 