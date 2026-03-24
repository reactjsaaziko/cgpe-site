import React, { useState } from 'react';

const FAQModal = ({ isOpen, onClose, onTabChange, onProceed, planData, currentPlan = 'Monthly' }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  if (!isOpen) return null;

  // Get the correct price based on selected plan
  const getCurrentPrice = () => {
    if (!planData) return { price: '₹ 1,068', period: '/month' };
    
    if (selectedPlan === 'Yearly') {
      return { 
        price: planData.yearlyPrice || '₹ 12,816', 
        period: '/year' 
      };
    } else {
      return { 
        price: planData.monthlyPrice || '₹ 1,068', 
        period: '/month' 
      };
    }
  };

  const faqs = [
    {
      question: "Why should I buy Term insurance?",
      answer: "A term insurance plan not only offers a financial safety net to your family against day to day expenses, loans, liabilities, EMIs etc but is also capable of fulfilling its future needs such as your child's higher education, child's marriage, etc. Among all the life insurance products, term life insurance offers the highest life coverage for the minimal premiums."
    },
    {
      question: "How much life cover do I need to protect my family?",
      answer: "The amount of life cover you need depends on various factors including your current income, family expenses, outstanding loans, future financial goals, and the number of dependents. A general rule of thumb is to have coverage that is 10-15 times your annual income."
    },
    {
      question: "What is the suitable cover till age for a Term insurance policy?",
      answer: "The suitable cover till age depends on your retirement plans and financial goals. Most people choose coverage till age 60-65 years, which covers them during their working years and ensures their family is protected until retirement."
    },
    {
      question: "When is the right time to buy Term insurance?",
      answer: "The earlier you buy term insurance, the better. Premiums are lower when you're younger and healthier. Ideally, you should purchase term insurance as soon as you start earning and have dependents who rely on your income."
    },
    {
      question: "For a term plan purchased today, would the premium change in the future?",
      answer: "For most term insurance plans, the premium remains fixed throughout the policy term. However, some plans may have increasing premiums or riders that could affect the total cost. It's important to read the policy terms carefully."
    },
    {
      question: "Is it recommended to have addons in my Term plan?",
      answer: "Add-ons or riders can enhance your term insurance coverage by providing additional benefits like critical illness cover, accidental death benefit, or waiver of premium. However, they come at an extra cost, so you should evaluate if the additional coverage is worth the premium increase."
    },
    {
      question: "How to ensure that your Claim is not rejected?",
      answer: "To avoid claim rejection, ensure you disclose all relevant information truthfully during the application process, keep your policy documents safe, pay premiums on time, and inform the insurance company about any changes in your health or lifestyle that might affect the policy."
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? -1 : index);
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
            <button 
              onClick={() => onTabChange('addon')}
              className="text-gray-500 hover:text-gray-700 font-medium pb-1"
            >
              Add-on Benefits
            </button>
            <button className="text-black border-b-2 border-orange-500 pb-1 font-medium">
              FAQs
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Plan Price Toggle */}
          <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-lg p-4 mb-6">
            <span className="text-sm text-gray-600 font-medium">Premium Payment:</span>
            <div className="flex items-center gap-0 bg-white border border-gray-200 px-2 py-1 rounded-xl">
              <button
                className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
                  selectedPlan === "Monthly" ? "bg-blue-600 text-white shadow" : "text-gray-400"
                }`}
                onClick={() => setSelectedPlan("Monthly")}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
                  selectedPlan === "Yearly" ? "bg-blue-600 text-white shadow" : "text-gray-400"
                }`}
                onClick={() => setSelectedPlan("Yearly")}
              >
                Yearly
              </button>
            </div>
            {selectedPlan === "Yearly" && (
              <span className="text-[11px] text-green-600 font-medium">
                Save 5%<span className="text-xs align-super">&#8635;</span> on Yearly
              </span>
            )}
          </div>

          {/* FAQs List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {faq.question}
                  </h3> 
                  <span className="text-gray-500 text-xl font-bold ml-4">
                    {expandedFAQ === index ? '−' : '+'}
                  </span>
                </button>
                
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action Bar */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-800">
              Total Premium {getCurrentPrice().price} {getCurrentPrice().period}
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

FAQModal.displayName = "FAQModal";

export default FAQModal; 