import React, { useState } from 'react';

const AddonBenefitsCards = () => {
  const [selectedBenefits, setSelectedBenefits] = useState({
    accidentalDeath: false,
    criticalIllness: false
  });

  const handleToggleBenefit = (benefit) => {
    setSelectedBenefits(prev => ({
      ...prev,
      [benefit]: !prev[benefit]
    }));
  };

  return (
    <div className="bg-gray-100   max-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Card: Accidental Death Benefit */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Accidental Death Benefit
            </h2>
            <button
              onClick={() => handleToggleBenefit('accidentalDeath')}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                selectedBenefits.accidentalDeath
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
              }`}
            >
              {selectedBenefits.accidentalDeath ? 'Added' : '+ Add'}
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            In Case Of Accidental Death, This Cover Value Will Be Paid In Addition To The Life Cover.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Cover Value */}
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">₹ 10 Lacs</div>
              <div className="text-xs text-gray-500">(Min 1 Lac - Max 2 Crores)</div>
            </div>

            {/* Additional Premium */}
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">₹ 703</div>
              <div className="text-xs text-gray-500">Annual</div>
            </div>

            {/* Policy Term */}
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">32 Years</div>
              <div className="text-xs text-gray-500">Policy Term</div>
            </div>
          </div>

          {/* Informational Block */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Recommended For People Who Travel Regularly Or Ride A Bike. Also, Very Cost Effective For Younger People (Most Deaths At Younger Ages Tend To Occur Due To Accidents And The Cover Comes At A Very Low Cost.
            </p>
          </div>
        </div>

        {/* Bottom Card: Critical Illness Benefit */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Critical Illness Benefit
            </h2>
            <button
              onClick={() => handleToggleBenefit('criticalIllness')}
              className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                selectedBenefits.criticalIllness
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
              }`}
            >
              {selectedBenefits.criticalIllness ? 'Added' : '+ Add'}
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-2">
            Pays You lumpsum Amount If You Are Diagnosed With A Critical Illness And This Cover Doesn't Require Hospital Bills
          </p>

          <button className="text-blue-600 text-sm underline hover:text-blue-800 mb-6">
            List Of 64 Critical Illnesses
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Cover Value */}
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">₹ 10 Lacs</div>
              <div className="text-xs text-gray-500">(Min 1 Lac - Max 2 Crores)</div>
            </div>

            {/* Additional Premium */}
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">₹ 703</div>
              <div className="text-xs text-gray-500">Annual</div>
            </div>

            {/* Policy Term */}
            <div>
              <div className="text-2xl font-bold text-gray-800 mb-1">32 Years</div>
              <div className="text-xs text-gray-500">Policy Term</div>
            </div>
          </div>

          {/* Informational Block */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Help You & Your Family Be At Peace During The Recovery Period (People End Up Taking Leave Without Pay). Also, Found To Be Helpful In Getting Better Treatment Even If Your Health Insurance Has Limits.
            </p>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Total Additional Premium</div>
              <div className="text-2xl font-bold text-gray-800">
                ₹ {selectedBenefits.accidentalDeath && selectedBenefits.criticalIllness ? '1,406' : 
                    selectedBenefits.accidentalDeath || selectedBenefits.criticalIllness ? '703' : '0'} Annual
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

AddonBenefitsCards.displayName = "AddonBenefitsCards";

export default AddonBenefitsCards; 