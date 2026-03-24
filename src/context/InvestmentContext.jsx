import React, { createContext, useContext, useState } from 'react';

const InvestmentContext = createContext();

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
};

export const InvestmentProvider = ({ children }) => {
  const [selectedYears, setSelectedYears] = useState(10);
  const [selectedAmount, setSelectedAmount] = useState(5000);

  const value = {
    selectedYears,
    setSelectedYears,
    selectedAmount,
    setSelectedAmount,
  };

  return (
    <InvestmentContext.Provider value={value}>
      {children}
    </InvestmentContext.Provider>
  );
}; 