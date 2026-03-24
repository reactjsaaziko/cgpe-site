import React, { useState } from 'react';
import { usePricing } from '../../context/PricingContext';

const InsurancePlanCards = () => {
  const { 
    payTerm, 
    setPayTerm, 
    returnOption, 
    setReturnOption, 
    getCurrentPrice, 
    getFormattedPrice 
  } = usePricing();

  return (
    <div className="bg-gray-100 max-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Card: Limited Pay */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Save Upto <span className="text-blue-600">9.40 Lac</span> On Your Premiums With Limited Pay
            </h2>
            <p className="text-gray-600 text-sm">
              Pay Premiums For A Few Years And Stay Covered For The Entire Policy Duration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Left Column - Payment Term */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Pay For</div>
              <div className="font-bold text-gray-800 mb-2">{payTerm}</div>
              <button className="text-blue-600 text-sm hover:text-blue-800 font-medium">
                Change Pay Term
              </button>
            </div>

            {/* Right Column - Savings */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Effective Saving</div>
              <div className="font-bold text-gray-800 mb-2">53%</div>
              <button className="text-blue-600 text-sm hover:text-blue-800 font-medium">
                See How?
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 mb-4"></div>

          {/* Price Section */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Price</span>
            <span className="text-lg font-bold text-gray-800">{getFormattedPrice()}</span>
          </div>
        </div>

        {/* Bottom Card: Return of Premium */}
        <div className="bg-white rounded-xl shadow-md p-6"> 
          <div className="mb-4"> 
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Return Of Premium
            </h2>
            <p className="text-gray-600 text-sm">
              Get Your Premiums Back In Case Nothing Happens To You.
            </p>
          </div>

          {/* Option Selection */}
          <div className="mb-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="returnOption"
                value="105%"
                checked={returnOption === '105%'}
                onChange={(e) => setReturnOption(e.target.value)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">
                Receive 105% Of Premium Paid ( Excluding GST ) On Survival At The Age Of 60 Years.
              </span>
            </label>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 mb-4"></div>

          {/* Price Section */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Price</span>
            <span className="text-lg font-bold text-gray-800">{getFormattedPrice()}</span>
          </div>
                </div>


      </div>
    </div>
  );
};

InsurancePlanCards.displayName = "InsurancePlanCards";

export default InsurancePlanCards; 