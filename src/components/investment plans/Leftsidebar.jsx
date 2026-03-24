import React, { useState } from "react";
import { useInvestment } from "../../context/InvestmentContext";

export default function LeftSidebar() {
  const { selectedYears, setSelectedYears, selectedAmount, setSelectedAmount } = useInvestment();
  
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isAmountDropdownOpen, setIsAmountDropdownOpen] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => i + 1); // 1 to 30 years
  
  const amountOptions = [1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 50000];

  const handleYearSelect = (years) => {
    setSelectedYears(years);
    setIsYearDropdownOpen(false);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setIsAmountDropdownOpen(false);
  };

  return (
    <aside className="w-[270px] min-w-[220px] max-w-[340px] bg-white border-r h-[100%] flex flex-col items-center pt-6 pb-4 px-4 overflow-y-auto">
      {/* Logo */}
      <img
        src="./assets/images/C.G3.png"
        alt="CG Patel Logo"
        className="w-28 mb-2"
      />

      <hr className="w-full border-dashed border-gray-300 my-4" />

      {/* Profile Select */}
      <button className="w-full flex items-center justify-between bg-[#3978cb] text-white font-semibold px-4 py-3 rounded-xl shadow mb-4">
        <div className="flex items-center gap-2">
          <span className="bg-white text-[#3978cb] rounded-full w-7 h-7 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/>
              <path d="M6 20v-1a4 4 0 014-4h0a4 4 0 014 4v1" />
            </svg>
          </span>
          Sagar | 30 Yrs
        </div>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Investment Amount Dropdown */}
      <div className="w-full mb-3 relative">
        <div className="text-sm text-gray-500 mb-1">Investment Amount</div>
        <div className="relative">
          <button
            onClick={() => setIsAmountDropdownOpen(!isAmountDropdownOpen)}
            className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <div className="flex items-center">
              <span className="text-xl font-bold mr-2">₹{selectedAmount.toLocaleString()}</span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                Monthly
              </span>
            </div>
            <svg 
              className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${isAmountDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isAmountDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {amountOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 focus:bg-gray-100 transition ${
                    selectedAmount === amount ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <span className="text-lg font-semibold">₹{amount.toLocaleString()}</span>
                  {selectedAmount === amount && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <hr className="border-gray-300 mt-2" />
      </div>

      {/* Investment Duration Dropdown */}
      <div className="w-full mb-4 relative">
        <div className="text-sm text-gray-500 mb-1">Investment Duration</div>
        <div className="relative">
          <button
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <div className="flex items-center">
              <span className="text-xl font-bold mr-3">{selectedYears} Yrs</span>
              <span className="bg-blue-100 text-[#3978cb] text-xs font-semibold px-3 py-1 rounded-full">
                Till {currentYear + selectedYears}
              </span>
            </div>
            <svg 
              className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isYearDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {yearOptions.map((years) => (
                <button
                  key={years}
                  onClick={() => handleYearSelect(years)}
                  className={`w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 focus:bg-gray-100 transition ${
                    selectedYears === years ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-3">{years} Yrs</span>
                    <span className="bg-blue-100 text-[#3978cb] text-xs font-semibold px-3 py-1 rounded-full">
                      Till {currentYear + years}
                    </span>
                  </div>
                  {selectedYears === years && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <hr className="border-gray-300 mt-2" />
      </div>

      <hr className="w-full border-dashed border-gray-300 my-2" />

      {/* Menu */}
      <nav className="w-full">
        <SidebarMenuItem title="Compare ULIPs / MFs" />
        <SidebarMenuItem title="Calculators" />
        <SidebarMenuItem title="Market Info" />
      </nav>
    </aside>
  );
}

function SidebarMenuItem({ title }) {
  return (
    <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 focus:bg-gray-100 transition">
      <span className="font-medium text-[15px] text-gray-700 underline">{title}</span>
      <svg className="w-5 h-5 text-gray-500 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
