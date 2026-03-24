import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePricing } from '../../context/PricingContext';
import AddonBenefitsModal from './AddonBenefitsModal';
import FAQModal from './FAQModal';

const PlanDetailsModal = ({ isOpen, onClose, planData, currentPlan = 'Monthly' }) => {
  const [activeTab, setActiveTab] = useState('plan');
  const [localSelectedPlan, setLocalSelectedPlan] = useState(currentPlan); // Initialize with current plan
  const navigate = useNavigate();
  const { paymentMode, setPaymentMode, getFormattedPrice, getSelectedPlanDetails, setSelectedPlan } = usePricing();

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleClose = () => {
    setActiveTab('plan'); // Reset to default tab when closing
    setLocalSelectedPlan('Monthly'); // Reset to default plan when closing
    onClose();
  };

  const handleProceed = () => {
    // Update pricing context with the selected plan data before navigating
    if (planData) {
      // Map the plan title to the pricing context plan key
      const planMap = {
        'ICICI PRUDENTIAL': 'icici',
        'HDFC Life': 'hdfc',
        'Max Life': 'max',
        'TATA AIA': 'tata',
        'Bajaj Allianz': 'bajaj'
      };
      
      const pricingPlan = planMap[planData.title];
      if (pricingPlan) {
        setSelectedPlan(pricingPlan);
        // Save to localStorage for persistence
        localStorage.setItem('selectedPlan', pricingPlan);
      }
    }
    
    // Navigate to confirmation page with plan data
    navigate('/confirmation', { 
      state: { 
        selectedPlan: planData ? planData.title : 'ICICI PRUDENTIAL',
        planData: planData 
      } 
    });
  };

  // Get the correct price based on selected plan
  const getCurrentPrice = () => {
    if (!planData) {
      // Use pricing context as fallback
      const planDetails = getSelectedPlanDetails();
      const price = paymentMode === 'yearly' ? planDetails.yearlyPrice : planDetails.monthlyPrice;
      const period = paymentMode === 'yearly' ? '/year' : '/month';
      return { 
        price: `₹ ${price.toLocaleString('en-IN')}`, 
        period: period 
      };
    }
    
    if (paymentMode === 'yearly') {
      return { 
        price: planData.yearlyPrice || '₹ 47,880', 
        period: '/year' 
      };
    } else {
      return { 
        price: planData.monthlyPrice || '₹ 4,190', 
        period: '/month' 
      };
    }
  };

  // If Add-on Benefits tab is active, show the AddonBenefitsModal
  if (activeTab === 'addon') {
    return (
      <AddonBenefitsModal 
        isOpen={isOpen} 
        onClose={handleClose} 
        onTabChange={handleTabChange}
        onProceed={handleProceed}
        planData={planData}
        currentPlan={localSelectedPlan}
      />
    );
  }

  // If FAQ tab is active, show the FAQModal
  if (activeTab === 'faq') {
    return (
      <FAQModal 
        isOpen={isOpen} 
        onClose={handleClose} 
        onTabChange={handleTabChange}
        onProceed={handleProceed}
        planData={planData}
        currentPlan={localSelectedPlan}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button onClick={handleClose} className="text-black text-xl font-bold">
              ✕
            </button>
            <div className="flex items-center gap-2">
              <img
                src={planData?.logo || "./assets/images/ICICI_LOGO.png.png"}
                alt={`${planData?.title || 'ICICI PRUDENTIAL'} Logo`}
                className="w-8 h-8 object-contain rounded-full border w-[150px]"
              />
              <span className="font-bold text-gray-800">{planData?.title || 'ICICI PRUDENTIAL'}</span>
              {planData?.isPopular && (
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ POPULAR
                </span>
              )}
            </div>
            <span className="text-lg font-semibold text-gray-700">{planData?.plan || 'iProtect Smart'}</span>
          </div>
          <div className="flex gap-6">
            <button className="text-orange-500 border-b-2 border-orange-500 pb-1 font-medium">
              Know your Plan
            </button>
            <button 
              onClick={() => handleTabChange('addon')}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Add-on Benefits
            </button>
            <button 
              onClick={() => handleTabChange('faq')}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              FAQs
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Plan Price Toggle */}
          <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-lg p-4">
            <span className="text-sm text-gray-600 font-medium">Premium Payment:</span>
            <div className="flex items-center gap-0 bg-white border border-gray-200 px-2 py-1 rounded-xl">
              <button
                className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
                  paymentMode === "monthly" ? "bg-blue-600 text-white shadow" : "text-gray-400"
                }`}
                onClick={() => setPaymentMode("monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
                  paymentMode === "yearly" ? "bg-blue-600 text-white shadow" : "text-gray-400"
                }`}
                onClick={() => setPaymentMode("yearly")}
              >
                Yearly
              </button>
            </div>
            {paymentMode === "yearly" && (
              <span className="text-[11px] text-green-600 font-medium">
                Save 5%<span className="text-xs align-super">&#8635;</span> on Yearly
              </span>
            )}
          </div>

          {/* About Plan Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">About Plan</h2>
            <p className="text-gray-700 mb-6">
              In case of your death before age of 60 years, your nominee will get an amount of ₹1 Crore, Tax free.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">What's Covered</h3>
                <p className="text-green-700 text-sm">
                  Death due to any cause (e.g. natural, calamities, fire, accidental, illnesses, COVID-19 etc)
                </p>
              </div>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <h3 className="font-semibold text-pink-800 mb-2">What's not Covered</h3>
                <p className="text-pink-700 text-sm">
                  Suicide during first year of the policy
                </p>
              </div>
            </div>
          </div>

          {/* How Does it Work Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">How Does it Work?</h2>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Step 1 */}
              <div className="flex-1">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Choose Your Plan</h3>
                  </div>
                  <p className="text-gray-700">
                    Select the life cover amount and policy term that suits your needs. You can choose from ₹25 Lacs to ₹10 Crores.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex-1">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Pay Premium</h3>
                  </div>
                  <p className="text-gray-700">
                    Pay your premium regularly (monthly, half-yearly, or annually) to keep your policy active and your family protected.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex-1">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Stay Protected</h3>
                  </div>
                  <p className="text-gray-700">
                    Your family gets the life cover amount in case of your unfortunate demise, ensuring their financial security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">High Life Cover</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Get life cover up to ₹10 Crores to ensure your family's financial security.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Tax Benefits</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Save tax up to ₹46,800 under Section 80C and get tax-free returns on maturity.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Flexible Payment</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Choose from monthly, half-yearly, or annual premium payment options.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Easy Claims</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Simple and hassle-free claim process with 97.8% claim settlement ratio.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">30-Day Refund</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Easy refund policy within 30 days if you're not satisfied with the policy.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800">Secure & Reliable</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Backed by ICICI Prudential, one of India's leading life insurance companies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Bar */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-lg font-bold text-gray-800">
                Total Premium {getCurrentPrice().price} {getCurrentPrice().period}
              </div>
              {planData?.isPopular && (
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  ⭐ POPULAR PLAN
                </span>
              )}
            </div>
            <button
              onClick={handleProceed}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              PROCEED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PlanDetailsModal.displayName = "PlanDetailsModal";

export default PlanDetailsModal; 