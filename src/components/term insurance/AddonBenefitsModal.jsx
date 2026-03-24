import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext';

const AddonBenefitsModal = ({ isOpen, onClose, onTabChange, onProceed, planData, currentPlan = 'Monthly' }) => {
  const [localSelectedPlan, setLocalSelectedPlan] = useState(currentPlan);
  const { paymentMode, setPaymentMode, getFormattedPrice, getSelectedPlanDetails } = usePricing();

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="text-black text-xl font-bold">
              ✕
            </button>
            <div className="flex items-center gap-2">
              <img
                src="./assets/images/ICICI_LOGO.png.png"
                alt="ICICI PRUDENTIAL Logo"
                className="w-8 h-8 object-contain rounded-full border w-[150px]"
              />
              <span className="font-bold text-gray-800">ICICI PRUDENTIAL</span>
            </div>
            <span className="text-lg font-semibold text-gray-700">iProtect Smart</span>
          </div>
          <div className="flex gap-6"> 
            <button 
              onClick={() => onTabChange('plan')}
              className="text-gray-500 hover:text-gray-700 font-medium pb-1"
            >
              Know your Plan
            </button>
            <button className="text-orange-500 border-b-2 border-orange-500 pb-1 font-medium">
              Add-on Benefits
            </button>
            <button 
              onClick={() => onTabChange('faq')}
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

          {/* FREE Benefits Section */}
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-6">FREE Benefits</h2>
            <div className="space-y-4">
              {/* Waiver of Premium Cover */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">Waiver of Premium Cover</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      In case of a permanent disability to the life insured all future premiums will be paid by the insurance company.
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full ml-4">
                    free
                  </span>
                </div>
              </div>

              {/* 100% payout on Terminal illness */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">100% payout on Terminal illness</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      In case the policyholder is diagnosed with a terminal illness, 100% of life cover will be paid out immediately instead of being paid on death.
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full ml-4">
                    free
                  </span>
                </div>
              </div>

              {/* Get your premium back for free */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">Get your premium back for free</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      As per your age you can exit the policy during the age of 60 years. All premiums paid (excluding GST) shall be returned & the policy will get terminated. For your age, this feature is included only if cover till age is 65.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paid Benefits Section */}
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-6">Paid Benefits</h2>
            <div className="space-y-4">
              {/* Extra Payout on Accidental death */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">Extra Payout on Accidental death</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Incase of accidental death an additional amount of Rs.10 Lac will be paid out to the nominee
                    </p>
                  </div>
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full ml-4">
                    ₹58/Month
                  </span>
                </div>
              </div>

              {/* Cover against 34 critical illnesses */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">Cover against 34 critical illnesses</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Incase the policyholder is diagnosed with a critical illness (34 illnesses covered) an amount of Rs.5 Lac will be paid out
                    </p>
                  </div>
                  <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full ml-4">
                    ₹183/Month
                  </span>
                </div>
              </div> 
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Bar */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-800">
              Total Premium {getFormattedPrice()}
            </div>
            <button 
              onClick={onProceed}
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

AddonBenefitsModal.displayName = "AddonBenefitsModal";

export default AddonBenefitsModal;
