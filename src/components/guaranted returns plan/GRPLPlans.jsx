import React, { useState, useEffect } from 'react';
import Header from '../headers/Header';
import Footer from '../Footer';
import TaxSavingsPopup from './TaxSavingsPopup';
import PlanBenefitsPopup from './PlanBenefitsPopup';
import CompareWithFDPopup from './CompareWithFDPopup';
import GRPLPlanconfig from './GRPLPlanconfig';
import ContactConfirmation from '../term insurance/ContactConfirmation';
import EmptyState from '../common/EmptyState';
import LoadingState from '../common/LoadingState';

// const GRPLPlans = () => {
//     const [formData, setFormData] = useState({
//         investedAmount: '20000',
//         investFor: '5 Yrs',
//         withdrawAfter: '10 Yrs',
//         taxAdjustedReturn: false
//     });

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const specialPlans = [
//         {
//             id: 1,
//             company: 'MAXLIFE',
//             logo: '/assets/images/MAX_logo.png.png',
//             planName: 'Smart Fixed Return Digital - Titanium',
//             youGive: '₹12 L',
//             youGivePeriod: 'in 5 Years',
//             interestRate: '7.3%',
//             youGet: '₹20.5 L',
//             youGetPeriod: 'In 10 Years',
//             taxSaving: '₹5.01 L',
//             hasMorePlans: true
//         },
//         {
//             id: 2,
//             company: 'AEGONLife',
//             logo: '/assets/images/AEGON_logo.png',
//             planName: 'Smart Fixed Return Digital - Titanium',
//             youGive: '₹12 L',
//             youGivePeriod: 'in 5 Years',
//             interestRate: '5.9%',
//             youGet: '₹18.6 L',
//             youGetPeriod: 'In 10 Years',
//             taxSaving: '₹5.01 L',
//             hasMorePlans: false
//         },
//         {
//             id: 3,
//             company: 'Canara HSBC LIFE INSURANCE',
//             logo: '/assets/images/HSBC_logo.png.png',
//             planName: 'Smart Fixed Return Digital - Titanium',
//             youGive: '₹12 L',
//             youGivePeriod: 'in 5 Years',
//             interestRate: '5.6%',
//             youGet: '₹18.6 L',
//             youGetPeriod: 'In 10 Years',
//             taxSaving: '₹5.01 L',
//             hasMorePlans: true
//         },
//         {
//             id: 4,
//             company: 'Pramerica LIFE INSURANCE',
//             logo: '/assets/images/Pramerica_logo.png',
//             planName: 'Smart Fixed Return Digital - Titanium',
//             youGive: '₹12 L',
//             youGivePeriod: 'in 5 Years',
//             interestRate: '5.3%',
//             youGet: '₹17.7 L',
//             youGetPeriod: 'In 10 Years',
//             taxSaving: '₹5.01 L',
//             hasMorePlans: false
//         },
//         {
//             id: 5,
//             company: 'Edelweiss Tokio zindagi unlimited',
//             logo: '/assets/images/Edelweiss_logo.png',
//             planName: 'Smart Fixed Return Digital - Titanium',
//             youGive: '₹12 L',
//             youGivePeriod: 'in 5 Years',
//             interestRate: '5.1%',
//             youGet: '₹17.5 L',
//             youGetPeriod: 'In 10 Years',
//             taxSaving: '₹5.01 L',
//             hasMorePlans: true,
//             banner: 'Buy Online & Get Extra 13K'
//         }
//     ];

//     const belowPlans = [
//         {
//             id: 6,
//             company: 'MAXLIFE',
//             logo: '/assets/images/MAX_logo.png.png',
//             planName: 'Smart Wealth Plan',
//             youGive: '₹12 L',
//             youGivePeriod: 'in 5 Years',
//             interestRate: '5.8%',
//             youGet: '₹20.7 L',
//             youGetPeriod: 'In 10 Years',
//             taxSaving: '₹5.01 L',
//             hasMorePlans: false
//         },
//         {
//             id: 7,
//             company: 'B Allianz',
//             logo: '/assets/images/Allianz_logo.png',
//             planName: 'Goal Suraksha',
//             youGive: '₹12 L',
//             youGivePeriod: 'in 5 Years',
//             interestRate: '6%',
//             youGet: '₹25 L',
//             youGetPeriod: 'In 10 Years',
//             taxSaving: '₹5.01 L',
//             hasMorePlans: true
//         }
//     ];

//     return (
//         <>
//             <Header />
//             <div className="w-full bg-gray-50 min-h-screen py-8">
//                 <div className="max-w-7xl mx-auto px-4">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                         {/* Left Panel - User Input */}
//                         <div className="bg-white rounded-xl p-6 shadow-sm">
//                             {/* Profile Section */}
//                             <div className="flex items-center gap-3 mb-6">
//                                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                                     <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <div className="font-semibold text-gray-800">Sasasas | 28 Yrs</div>
//                                 </div>
//                             </div>

//                             {/* Input Fields */}
//                             <div className="space-y-4">
//                                 {/* Invested Amount */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Invested Amount
//                                     </label>
//                                     <div className="flex items-center gap-2">
//                                         <div className="relative flex-1">
//                                             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
//                                             <input
//                                                 type="text"
//                                                 name="investedAmount"
//                                                 value={formData.investedAmount}
//                                                 onChange={handleInputChange}
//                                                 className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                                 placeholder="20000"
//                                             />
//                                         </div>
//                                         <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                                             <option>/ Month</option>
//                                             <option>/ Year</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Invest For */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Invest for
//                                     </label>
//                                     <select
//                                         name="investFor"
//                                         value={formData.investFor}
//                                         onChange={handleInputChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         <option>5 Yrs</option>
//                                         <option>10 Yrs</option>
//                                         <option>15 Yrs</option>
//                                         <option>20 Yrs</option>
//                                     </select>
//                                     <div className="text-xs text-gray-500 mt-1">Till 2028</div>
//                                 </div>

//                                 {/* Withdraw After */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Withdraw After
//                                     </label>
//                                     <select
//                                         name="withdrawAfter"
//                                         value={formData.withdrawAfter}
//                                         onChange={handleInputChange}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     >
//                                         <option>10 Yrs</option>
//                                         <option>15 Yrs</option>
//                                         <option>20 Yrs</option>
//                                     </select>
//                                     <div className="text-xs text-gray-500 mt-1">2023</div>
//                                 </div>

//                                 {/* Tax Adjusted Return */}
//                                 <div className="flex items-center justify-between">
//                                     <label className="text-sm font-medium text-gray-700">
//                                         Tax Adjusted Return
//                                     </label>
//                                     <button
//                                         type="button"
//                                         onClick={() => setFormData(prev => ({ ...prev, taxAdjustedReturn: !prev.taxAdjustedReturn }))}
//                                         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                                             formData.taxAdjustedReturn ? 'bg-blue-600' : 'bg-gray-200'
//                                         }`}
//                                     >
//                                         <span
//                                             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                                                 formData.taxAdjustedReturn ? 'translate-x-6' : 'translate-x-1'
//                                             }`}
//                                         />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Panel - Policy Suggestions */}
//                         <div className="bg-white rounded-xl p-6 shadow-sm">
//                             {/* Header */}
//                             <div className="flex items-center justify-between mb-6">
//                                 <h2 className="text-xl font-bold text-gray-800">Suggest Best Policy</h2>
//                                 <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
//                                     <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
//                                         <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                                     </svg>
//                                 </div>
//                             </div>

//                             {/* Special Plans Section */}
//                             <div className="mb-8">
//                                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Special plan for customers</h3>
//                                 <div className="space-y-4">
//                                     {specialPlans.map((plan) => (
//                                         <div key={plan.id} className="border border-gray-200 rounded-lg p-4 relative">
//                                             {plan.banner && (
//                                                 <div className="absolute -top-2 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
//                                                     {plan.banner}
//                                                 </div>
//                                             )}
//                                             <div className="flex items-start justify-between mb-3">
//                                                 <div className="flex items-center gap-3">
//                                                     <img
//                                                         src={plan.logo}
//                                                         alt={plan.company}
//                                                         className="w-12 h-8 object-contain"
//                                                         onError={(e) => {
//                                                             e.target.style.display = 'none';
//                                                             e.target.nextSibling.style.display = 'block';
//                                                         }}
//                                                     />
//                                                     <div className="w-12 h-8 bg-gray-200 rounded hidden flex items-center justify-center text-xs font-semibold text-gray-600">
//                                                         {plan.company.split(' ')[0]}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <div className="font-semibold text-gray-800 text-sm">{plan.planName}</div>
//                                             </div>
//                                             <div className="grid grid-cols-2 gap-4 mb-4">
//                                                 <div>
//                                                     <div className="text-xs text-gray-500">You Give</div>
//                                                     <div className="font-semibold text-gray-800">{plan.youGive}</div>
//                                                     <div className="text-xs text-gray-500">{plan.youGivePeriod}</div>
//                                                 </div>
//                                                 <div>
//                                                     <div className="text-xs text-gray-500">You Get</div>
//                                                     <div className="text-xs text-green-600 font-semibold">Tax Free</div>
//                                                     <div className="font-semibold text-gray-800">{plan.interestRate}</div>
//                                                     <div className="text-xs text-gray-500">Interest Rate</div>
//                                                     <div className="font-semibold text-gray-800">{plan.youGet}</div>
//                                                     <div className="text-xs text-gray-500">{plan.youGetPeriod}</div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-xs text-gray-500">Tax Saving:</span>
//                                                     <span className="font-semibold text-gray-800">{plan.taxSaving}</span>
//                                                     <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                                     </svg>
//                                                 </div>
//                                                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
//                                                     Get Details
//                                                 </button>
//                                             </div>
//                                             {plan.hasMorePlans && (
//                                                 <div className="mt-3 text-center">
//                                                     <button className="text-blue-600 text-sm hover:underline">1 More Plan</button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Below Plans Section */}
//                             <div>
//                                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Below plans give returns after 10 years</h3>
//                                 <div className="space-y-4">
//                                     {belowPlans.map((plan) => (
//                                         <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
//                                             <div className="flex items-start justify-between mb-3">
//                                                 <div className="flex items-center gap-3">
//                                                     <img
//                                                         src={plan.logo}
//                                                         alt={plan.company}
//                                                         className="w-12 h-8 object-contain"
//                                                         onError={(e) => {
//                                                             e.target.style.display = 'none';
//                                                             e.target.nextSibling.style.display = 'block';
//                                                         }}
//                                                     />
//                                                     <div className="w-12 h-8 bg-gray-200 rounded hidden flex items-center justify-center text-xs font-semibold text-gray-600">
//                                                         {plan.company.split(' ')[0]}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="mb-3">
//                                                 <div className="font-semibold text-gray-800 text-sm">{plan.planName}</div>
//                                             </div>
//                                             <div className="grid grid-cols-2 gap-4 mb-4">
//                                                 <div>
//                                                     <div className="text-xs text-gray-500">You Give</div>
//                                                     <div className="font-semibold text-gray-800">{plan.youGive}</div>
//                                                     <div className="text-xs text-gray-500">{plan.youGivePeriod}</div>
//                                                 </div>
//                                                 <div>
//                                                     <div className="text-xs text-gray-500">You Get</div>
//                                                     <div className="text-xs text-green-600 font-semibold">Tax Free</div>
//                                                     <div className="font-semibold text-gray-800">{plan.interestRate}</div>
//                                                     <div className="text-xs text-gray-500">Interest Rate</div>
//                                                     <div className="font-semibold text-gray-800">{plan.youGet}</div>
//                                                     <div className="text-xs text-gray-500">{plan.youGetPeriod}</div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-xs text-gray-500">Tax Saving:</span>
//                                                     <span className="font-semibold text-gray-800">{plan.taxSaving}</span>
//                                                     <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                                                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                                     </svg>
//                                                 </div>
//                                                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
//                                                     Get Details
//                                                 </button>
//                                             </div>
//                                             {plan.hasMorePlans && (
//                                                 <div className="mt-3 text-center">
//                                                     <button className="text-blue-600 text-sm hover:underline">1 More Plan</button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default GRPLPlans;


// import React from "react";
// import Header from "../Header";
// import Footer from "../Footer";

/** --- Dynamic data from backend --- */
const useGuaranteedReturnsPlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('/api/guaranteed-returns');
                const data = await response.json();
                
                if (data.success && data.data && Array.isArray(data.data)) {
                    // Transform backend data to match frontend format
                    const transformedPlans = data.data.map(plan => ({
                        id: plan._id,
                        badgeLeft: plan.badgeLeft || "",
                        badgeRight: plan.badgeRight || "",
                        logo: plan.companyLogo || "",
                        company: plan.companyName || "",
                        product: plan.planName || "",
                        give: plan.youGive || "",
                        giveHint: plan.youGivePeriod || "",
                        get: plan.youGet || "",
                        getHint: plan.youGetPeriod || "",
                        rate: `${plan.guaranteedReturnRate}%`,
                        taxFree: true,
                        saving: plan.taxSaving || "",
                        bandColor: plan.isPopular ? "bg-indigo-50" : "",
                        moreLink: plan.morePlansText || "",
                        description: plan.description || "",
                        features: plan.features || [],
                        benefits: plan.benefits || [],
                        exclusions: plan.exclusions || [],
                        maturityBenefit: plan.maturityBenefit || "",
                        deathBenefit: plan.deathBenefit || "",
                        claimProcess: plan.claimProcess || "",
                        taxBenefits: plan.taxBenefits || "",
                        documentsRequired: plan.documentsRequired || [],
                        rating: plan.rating || 4.0,
                        reviews: plan.reviews || 0,
                        discountPercentage: plan.discountPercentage || 0,
                        isActive: plan.isActive,
                        isPopular: plan.isPopular
                    }));
                    setPlans(transformedPlans);
                } else {
                    setError('Unable to load plans at this time');
                    console.error('API response:', data);
                }
            } catch (err) {
                setError('Unable to load plans. Please check your connection.');
                console.error('Error fetching guaranteed returns plans:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    return { plans, loading, error };
};

/** --- Small tags/pills --- */
const Chip = ({ children, color = "indigo" }) => (
    <span
        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold bg-${color}-50 text-${color}-700 border border-${color}-200`}
    >
        {children}
    </span>
);

/** --- One plan row --- */
function PlanCard({
    badgeLeft,
    badgeRight,
    logo,
    company,
    product,
    give,
    giveHint,
    get,
    getHint,
    rate,
    taxFree,
    saving,
    moreLink,
    highlightBand,
    onTaxSavingClick,
    onGetDetailsClick,
}) {
    return (
        <div className="relative">
            {highlightBand ? (
                <div className={`absolute -top-2 left-0 right-0 h-7 ${highlightBand} rounded-t-xl`} />
            ) : null}

            <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-5 flex flex-col gap-3">
                {/* Top badges */}
                {(badgeLeft || badgeRight) && (
                    <div className="flex items-center gap-2 text-[10px] font-semibold">
                        {badgeLeft && <Chip color="green">{badgeLeft}</Chip>}
                        {badgeRight && <Chip color="sky">{badgeRight}</Chip>}
                    </div>
                )}

                {/* Main Row */}
                <div className="flex items-center gap-4">
                    {/* Logo + title */}
                    <div className="flex items-center gap-3 w-[260px]">
                        <img src={logo} alt={company} className="h-9 w-9 object-contain" />
                        <div>
                            <div className="text-[13px] font-semibold text-slate-800">{company}</div>
                            <div className="text-[11px] text-slate-500">{product}</div>
                        </div>
                    </div>

                    {/* You Give */}
                    <div className="flex-1 grid grid-cols-3 gap-3 items-center">
                        <div className="text-center">
                            <div className="text-[11px] text-slate-500">You Give</div>
                            <div className="text-sm font-bold text-slate-800">{give}</div>
                            <div className="text-[10px] text-slate-400">{giveHint}</div>
                        </div>

                        {/* You Get + rate */}
                        <div className="text-center">
                            <div className="text-[11px] text-slate-500">You Get</div>
                            <div className="flex items-center justify-center gap-2">
                                {/* {taxFree && <Chip color="emerald">Tax Free</Chip>} */}
                                <span className="text-[12px] text-slate-500">Interest Rate</span>
                            </div>
                            <div className="text-[13px] font-bold text-blue-600 mt-0.5">{rate}</div>
                        </div>

                        {/* Payout */}
                        <div className="text-center">
                            <div className="text-[11px] text-slate-500">Payout</div>
                            <div className="text-sm font-bold text-slate-800">{get}</div>
                            <div className="text-[10px] text-slate-400">{getHint}</div>
                        </div>
                    </div>

                    {/* Right controls */}
                    <div className="w-[160px] flex flex-col items-center justify-end gap-2">
                        <button 
                            onClick={onTaxSavingClick}
                            className="text-[10px] text-slate-500 text-xs mr-2 flex items-center gap-1 hover:text-blue-600 transition-colors"
                        >
                            Tax Saving <span className="font-bold">{saving}</span>
                            <svg className="w-3 h-3 text-slate-400 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                            </svg>
                        </button>   
                        <button 
                            onClick={onGetDetailsClick}
                            className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold"
                        >
                            Get Details
                        </button> 
                    </div>
                </div>
 
                {/* more link band */}
                {moreLink && (
                    <div className="pt-1">
                        <div className="mx-auto bg-indigo-50 text-[11px] text-indigo-700 rounded-full w-[110px] text-center py-0.5">
                            {moreLink}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

/** --- Left filter column (static UI) --- */
function FilterSidebar() {
    return (
        <aside className="w-[280px] bg-white border-r border-slate-200 h-full">
            <div className="p-4 min-h-screen">
                <button className="w-full flex items-center justify-between bg-slate-100 text-slate-700 px-3 py-2 rounded-lg">
                    <span className="flex items-center gap-2">
                        <span className="h-6 w-6 bg-blue-600 text-white grid place-items-center rounded-full text-[12px]">S</span>
                        <span className="text-[13px]">Sasasas | 28 Yrs</span>
                    </span>
                    <span>▾</span>
                </button>

                {/* Amount */}
                <div className="mt-5">
                    <div className="text-[11px] text-slate-500">Invested Amount</div>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="text-[13px]">₹</span>
                        <input
                            className="flex-1 border border-slate-300 rounded-md px-2 py-1 text-[13px] outline-none focus:border-blue-500"
                            defaultValue=" "
                        />
                        <span className="text-[11px] text-slate-500">/ Month</span>
                    </div>
                </div>

                {/* Invest for */}
                <div className="mt-5">
                    <div className="text-[11px] text-slate-500">Invest for</div>
                    <div className="mt-1 flex items-center justify-between">
                        <button className="px-2 py-1 text-[12px] bg-slate-100 rounded-md">5 Yrs</button>
                        <span className="text-[11px] text-slate-400">Till 2029 ▾</span>
                    </div>
                </div>

                {/* Withdraw after */}
                <div className="mt-5">
                    <div className="text-[11px] text-slate-500">Withdraw After</div>
                    <div className="mt-1 flex items-center justify-between">
                        <button className="px-2 py-1 text-[12px] bg-slate-100 rounded-md">10 Yrs</button>
                        <span className="text-[11px] text-slate-400">2039 ▾</span>
                    </div>
                </div>

                {/* Tax checkbox */}
                <div className="mt-5">
                    <label className="flex items-center gap-2 text-[12px] text-slate-700">
                        <input type="checkbox" defaultChecked className="accent-blue-600" />
                        Tax Adjusted Return
                    </label>
                </div>
            </div>
        </aside>
    );
}

/** --- PAGE: GRPLanding --- */
export default function GRPLanding() {
    const [isTaxPopupOpen, setIsTaxPopupOpen] = useState(false);
    const [isPlanBenefitsOpen, setIsPlanBenefitsOpen] = useState(false);
    const [isCompareWithFDOpen, setIsCompareWithFDOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPlanConfig, setShowPlanConfig] = useState(false);
    
    // Fetch dynamic plans from backend
    const { plans, loading, error } = useGuaranteedReturnsPlans();
    
    // Filter plans for different sections - only show active plans
    const activePlans = plans.filter(plan => plan.isActive !== false);
    const specialPlans = activePlans.filter(plan => plan.isPopular || plan.badgeLeft || plan.badgeRight);
    const regularPlans = activePlans.filter(plan => !plan.isPopular && !plan.badgeLeft && !plan.badgeRight);

    const handleTaxSavingClick = () => {
        setIsTaxPopupOpen(true);
    };

    const closeTaxPopup = () => {
        setIsTaxPopupOpen(false);
    };

    const handleGetDetailsClick = (plan) => {
        setSelectedPlan(plan);
        setIsPlanBenefitsOpen(true);
    };

    const closePlanBenefits = () => {
        setIsPlanBenefitsOpen(false);
        setSelectedPlan(null);
    };

    const handleProceedToPlanConfig = (planData) => {
        setIsPlanBenefitsOpen(false);
        setShowPlanConfig(true);
    };

    const handleDirectToPlanConfig = (plan) => {
        setSelectedPlan(plan);
        setShowPlanConfig(true);
    };

    const handleCompareWithFDClick = () => {
        setIsPlanBenefitsOpen(false);
        setIsCompareWithFDOpen(true);
    };

    const closeCompareWithFD = () => {
        setIsCompareWithFDOpen(false);
    };

    const handlePlanBenefitsFromCompareClick = () => {
        setIsCompareWithFDOpen(false);
        setIsPlanBenefitsOpen(true);
    };

    const handleProceedFromCompareWithFD = (planData) => {
        setIsCompareWithFDOpen(false);
        setShowPlanConfig(true);
    };

    // If showing plan config, render that component instead
    if (showPlanConfig) {
        return <GRPLPlanconfig />;
    }

    return (
        <>
            <Header />
            
            <div className="min-h-screen bg-[#f5f7fb]">

                <div className="max-w-7xl mx-auto py-4">
                    <div className="flex">
                        {/* Left column */}
                        <FilterSidebar />

                        {/* Right column */}
                        <main className="flex-1 p-4 md:p-6">
                            {/* Search/Title bar */}
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
                            {/* Loading state */}
                            {loading && (
                                <div className="mt-4">
                                    <LoadingState message="Loading guaranteed returns plans..." />
                                </div>
                            )}

                            {/* Error state */}
                            {error && (
                                <div className="mt-4">
                                    <EmptyState 
                                        icon="⚠️"
                                        title="Unable to load plans"
                                        description="Please check your connection and try again later."
                                        variant="warning"
                                        actionButton={
                                            <button 
                                                onClick={() => window.location.reload()}
                                                className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700"
                                            >
                                                Try Again
                                            </button>
                                        }
                                    />
                                </div>
                            )}

                            {/* Plans display */}
                            {!loading && !error && activePlans.length > 0 && (
                                <>
                                    {/* Special plans (with badges or popular) */}
                                    {specialPlans.length > 0 && (
                                        <>
                                            <div className="mt-4">
                                                <PlanCard
                                                    {...specialPlans[0]}
                                                    highlightBand="bg-indigo-100"
                                                    onTaxSavingClick={handleTaxSavingClick}
                                                    onGetDetailsClick={() => handleGetDetailsClick(specialPlans[0])}
                                                />
                                            </div>

                                            {/* Other special plans */}
                                            <div className="mt-3 space-y-3">
                                                {specialPlans.slice(1).map((p) => (
                                                    <PlanCard 
                                                        key={p.id} 
                                                        {...p} 
                                                        onTaxSavingClick={handleTaxSavingClick}
                                                        onGetDetailsClick={() => handleGetDetailsClick(p)}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {/* Regular plans */}
                                    {regularPlans.length > 0 && (
                                        <>
                                            {/* Divider text */}
                                            <div className="mt-6 mb-2 text-[11px] text-slate-500">
                                                <div className="inline-block bg-slate-100 rounded-full px-3 py-1 bg-indigo-50">
                                                    Below plans give returns after 10 years
                                                </div>
                                            </div>

                                            {/* Regular plans */}
                                            <div className="space-y-3">
                                                {regularPlans.map((p, idx) => (
                                                    <PlanCard
                                                        key={p.id}
                                                        {...p}
                                                        highlightBand={idx === 0 ? "bg-sky-50" : undefined}
                                                        onTaxSavingClick={handleTaxSavingClick}
                                                        onGetDetailsClick={() => handleGetDetailsClick(p)}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            {/* No plans state */}
                            {!loading && !error && activePlans.length === 0 && (
                                <div className="mt-4">
                                    <EmptyState 
                                        icon="💼"
                                        title="No guaranteed returns plans available"
                                        description="We're working on adding new plans. Please check back soon!"
                                        variant="info"
                                    />
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
            
            {/* Tax Savings Popup */}
            <TaxSavingsPopup 
                open={isTaxPopupOpen} 
                onClose={closeTaxPopup} 
            />
            
            {/* Plan Benefits Popup */}
            <PlanBenefitsPopup
                isOpen={isPlanBenefitsOpen}
                onClose={closePlanBenefits}
                planData={selectedPlan}
                onProceed={handleProceedToPlanConfig}
                onCompareWithFDClick={handleCompareWithFDClick}
            />
            
            {/* Compare With FD Popup */}
            <CompareWithFDPopup
                isOpen={isCompareWithFDOpen}
                onClose={closeCompareWithFD}
                planData={selectedPlan}
                onPlanBenefitsClick={handlePlanBenefitsFromCompareClick}
                onProceed={handleProceedFromCompareWithFD}
            />
            
            <Footer />
        </>
    );
}
