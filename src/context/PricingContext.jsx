import React, { createContext, useContext, useState, useEffect } from 'react';

const PricingContext = createContext();

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};

export const PricingProvider = ({ children }) => {
  // Base pricing data
  const [basePricing] = useState({
    icici: {
      monthlyPrice: 4190,
      yearlyPrice: 47880,
      planName: "ICICI Pru iProtect Smart",
      company: "ICICI Prudential"
    },
    hdfc: {
      monthlyPrice: 6555,
      yearlyPrice: 74820,
      planName: "HDFC Click 2 Protect Super",
      company: "HDFC Life"
    },
    max: {
      monthlyPrice: 4627,
      yearlyPrice: 52740,
      planName: "Max Smart Secure Plus",
      company: "Max Life"
    },
    tata: {
      monthlyPrice: 3930,
      yearlyPrice: 44820,
      planName: "TATA AIA Sampoorna Raksha",
      company: "TATA AIA"
    },
    bajaj: {
      monthlyPrice: 4120,
      yearlyPrice: 47040,
      planName: "Bajaj Allianz Life eTouch",
      company: "Bajaj Allianz"
    }
  });

  // Selected plan and options
  const [selectedPlan, setSelectedPlan] = useState('icici');
  const [paymentMode, setPaymentMode] = useState('yearly'); // 'monthly' or 'yearly'
  const [payTerm, setPayTerm] = useState('10 Years');
  const [returnOption, setReturnOption] = useState('105%');
  const [addonBenefits, setAddonBenefits] = useState([]);

  // Calculate current price based on selections
  const getCurrentPrice = () => {
    const plan = basePricing[selectedPlan];
    if (!plan) return 0;

    let basePrice = paymentMode === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
    
    // Apply pay term discount
    if (payTerm === '5 Years') {
      basePrice = basePrice * 1.2; // 20% increase for shorter term
    } else if (payTerm === '15 Years') {
      basePrice = basePrice * 0.9; // 10% discount for longer term
    }

    // Apply return option premium
    if (returnOption === '105%') {
      basePrice = basePrice * 1.15; // 15% increase for return of premium
    }

    // Add addon benefits
    const addonTotal = addonBenefits.reduce((total, addon) => {
      return total + (addon.premium || 0);
    }, 0);

    return Math.round(basePrice + addonTotal);
  };

  // Get formatted price string
  const getFormattedPrice = () => {
    const price = getCurrentPrice();
    const period = paymentMode === 'yearly' ? 'Yearly' : 'Monthly';
    return `₹ ${price.toLocaleString('en-IN')} ${period}`;
  };

  // Get selected plan details
  const getSelectedPlanDetails = () => {
    return basePricing[selectedPlan] || basePricing.icici;
  };

  const value = {
    basePricing,
    selectedPlan,
    setSelectedPlan,
    paymentMode,
    setPaymentMode,
    payTerm,
    setPayTerm,
    returnOption,
    setReturnOption,
    addonBenefits,
    setAddonBenefits,
    getCurrentPrice,
    getFormattedPrice,
    getSelectedPlanDetails
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
}; 