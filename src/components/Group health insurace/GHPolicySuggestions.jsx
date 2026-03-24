import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../headers/Header";
import Footer from "../Footer";
import { useUserData } from "../../context/UserDataContext";

export default function GHPolicySuggestions() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, [userData]);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      
      // If user data is available, use filtered API
      if (userData && userData.insuranceType === 'group-health') {
        const response = await fetch('/api/group-health-insurance/filtered', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeCount: userData.employeeCount,
            coverageType: userData.coverageType
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setPolicies(data.groupHealthInsurance || []);
        } else {
          setError('Failed to fetch filtered policies');
        }
      } else {
        // Fallback to all active policies if no user data
        const response = await fetch('/api/group-health-insurance/active');
        
        if (response.ok) {
          const data = await response.json();
          setPolicies(data.groupHealthInsurance || []);
        } else {
          setError('Failed to fetch policies');
        }
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
      setError('Failed to fetch policies');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatSumInsured = (amount) => {
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)} Lacs`;
    }
    return formatCurrency(amount);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen p-4">
        <div className="mx-auto max-w-[980px]">
          <div className="flex items-center w-full my-6 bg-white p-2 rounded-xl">
            <input
              type="text"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-base bg-gray-50 focus:ring-2 focus:ring-blue-200"
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

          {/* User Details Summary */}
          {/* {userData && userData.insuranceType === 'group-health' && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Requirements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-blue-700 font-medium">Employees:</span>
                  <span className="ml-2 text-blue-900">{userData.employeeCount}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Coverage:</span>
                  <span className="ml-2 text-blue-900 capitalize">{userData.coverageType}</span>
                </div> */}
                {/* <div>
                  <span className="text-blue-700 font-medium">Company:</span>
                  <span className="ml-2 text-blue-900">{userData.companyName}</span>
                </div> */}
                {/* <div>
                  <span className="text-blue-700 font-medium">City:</span>
                  <span className="ml-2 text-blue-900">{userData.city}</span>
                </div>
              </div>
              <p className="text-blue-600 text-sm mt-2">
                Showing {policies.length} plan{policies.length !== 1 ? 's' : ''} that match your requirements
              </p>
            </div>
          )} */}

          {/* Loading State */}
          {loading && ( 
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                {userData && userData.insuranceType === 'group-health' 
                  ? 'Finding policies that match your requireme2nts...' 
                  : 'Loading policies...'
                }
              </span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 font-medium mb-2">Error Loading Policies</div>
              <div className="text-red-500 text-sm">{error}</div>
              <button 
                onClick={fetchPolicies}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Policies State */}
          {!loading && !error && policies.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
              <div className="text-gray-600 font-medium mb-2">
                {userData && userData.insuranceType === 'group-health' 
                  ? 'No Matching Policies Found' 
                  : 'No Policies Available'
                }
              </div>
              <div className="text-gray-500 text-sm">
                {userData && userData.insuranceType === 'group-health' 
                  ? `No group health insurance policies match your requirements for ${userData.employeeCount} employees. Try adjusting your criteria or contact us for assistance.`
                  : 'No group health insurance policies are currently available.'
                }
              </div>
              {userData && userData.insuranceType === 'group-health' && (
                <button 
                  onClick={() => navigate('/group-health-insurance')}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Modify Requirements
                </button>
              )}
            </div>
          )}

          {/* Policy Cards */}
          {!loading && !error && policies.length > 0 && (
            policies.map((policy) => (
              <PolicyCard key={policy._id} policy={policy} onPriceClick={() => navigate('/group-health-plan-upgrade')} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

function PolicyCard({ policy, onPriceClick }) {
  // Generate ribbons based on plan features
  const generateRibbons = () => {
    const ribbons = [];
    if (policy.maternityCover) ribbons.push("Maternity Cover");
    if (policy.dentalCover) ribbons.push("Dental Cover");
    if (policy.opticalCover) ribbons.push("Optical Cover");
    if (policy.preExistingDiseases) ribbons.push("Pre-existing Diseases");
    if (policy.planType === "Corporate Health Insurance") ribbons.push("Corporate Plan");
    return ribbons;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatSumInsured = (amount) => {
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)} Lacs`;
    }
    return formatCurrency(amount);
  };

  const ribbons = generateRibbons();

  return (
    <div className="mb-7 rounded-[14px] border border-slate-200 bg-white shadow-sm">
      {/* Ribbons */}
      {ribbons.length > 0 && (
        <div className="flex flex-wrap gap-2 w-3/6 rounded-t-[14px] bg-[#00a1bf] text-white px-4 py-2">
          {ribbons.map((ribbon, index) => (
            <span
              key={index}
              className="rounded-md px-2 py-1 text-[11px] font-semibold bg-[#dfe8ff] text-[#3567ff]"
            >
              {ribbon}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 px-4 py-4 md:grid-cols-[1.15fr_1fr_170px] justify-between">
        {/* Left: Logo, Stats, and Features */}
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={policy.companyLogo}
              alt={policy.companyName}
              className="h-7 w-[86px] object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback for missing logos */}
            <div className="hidden h-7 w-[86px] rounded bg-gray-200 flex items-center justify-center">
              <span className="text-[10px] font-semibold text-gray-600">{policy.companyName.split(' ')[0]}</span>
            </div>
          </div>

          {/* Stats and Features */}
          <div className="min-w-0 flex-1">
          </div>
        </div>

        {/* Right: Price and Coverage */}
        {/* Stats Row */}
        <div className="flex w-[300px] justify-between gap-2 text-right">
          <div className="px-1">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">Sum Insured</div>
            <div className="text-[13px] font-semibold text-slate-800">{formatSumInsured(policy.sumInsured)}</div>
          </div>
          <div className="px-1">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">Employees</div>
            <div className="text-[13px] font-semibold text-slate-800">{policy.minimumEmployees}-{policy.maximumEmployees}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={onPriceClick}
            className="rounded-[10px] bg-[#2e63ff] px-4 py-1 text-sm font-bold text-white hover:bg-[#1e53ef] transition-colors cursor-pointer"
          >
            {formatCurrency(policy.premiumPerEmployee)}/employee
          </button>
          <div className="text-right text-[11px] leading-snug text-slate-500">
            For {policy.minimumEmployees}-{policy.maximumEmployees} employees
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-around gap-2 text-[12px] text-slate-600">
        {policy.features && policy.features.slice(0, 3).map((feature, index) => (
          <div key={index} className="truncate">{feature}</div>
        ))}
        <div className="flex items-center justify-end">
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50">
            {policy.features ? policy.features.length : 0} Features
            <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 5l5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
      {/* Center: Compare and Policy Info */}
      <div className="flex justify-around gap-4 p-2 bg-[#eef3ff]">
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-slate-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Add to compare
        </label>
        <div className="text-[13px] text-slate-500">
          <span className="font-semibold">{policy.policyTerm} year{policy.policyTerm > 1 ? 's' : ''} </span>
          Policy Term
        </div>
      </div>
    </div>
  );
}
