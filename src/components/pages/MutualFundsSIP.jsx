import React from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const MutualFundsSIP = () => {
  const navigate = useNavigate();

  const handleContactNavigation = () => {
    navigate('/contact');
  };
  const fundCategories = [
    {
      id: 1,
      title: "Equity Funds",
      icon: "/assets/images/mu1.png",
      riskLevel: "High Risk",
      riskColor: "bg-red-500",
      description: "High growth potential through equity investments for long-term wealth creation.",
      expectedReturns: "12-15% p.a.",
      minInvestment: "₹500/month",
      features: ["Large Cap Funds", "Mid Cap Funds", "Small Cap Funds", "Sectoral Funds"]
    },
    {
      id: 2,
      title: "Debt Funds",
      icon: "/assets/images/mu2.png",
      riskLevel: "Low Risk",
      riskColor: "bg-gray-400",
      description: "Stable returns with lower risk through debt instruments and bonds.",
      expectedReturns: "6-8% p.a.",
      minInvestment: "₹1,000/month",
      features: ["Liquid Funds", "Short Term Funds", "Long Term Funds", "Government Securities"]
    },
    {
      id: 3,
      title: "Hybrid Funds",
      icon: "/assets/images/mu3.png",
      riskLevel: "Medium Risk",
      riskColor: "bg-blue-500",
      description: "Balanced approach combining equity and debt for moderate risk and returns.",
      expectedReturns: "8-12% p.a.",
      minInvestment: "₹750/month",
      features: ["Conservative Hybrid", "Aggressive Hybrid", "Balanced Advantage", "Multi Asset"]
    },
    {
      id: 4,
      title: "ELSS Funds",
      icon: "/assets/images/mu4.png",
      riskLevel: "High Risk",
      riskColor: "bg-red-500",
      description: "Tax-saving equity funds with 3-year lock-in period under Section 80C.",
      expectedReturns: "12-18% p.a.",
      minInvestment: "₹500/month",
      features: ["Tax Savings", "3 Year Lock-in", "Equity Exposure", "High Growth Potential"]
    },
    {
      id: 5,
      title: "Index Funds",
      icon: "/assets/images/mu5.png",
      riskLevel: "Medium Risk",
      riskColor: "bg-blue-500",
      description: "Passive investment strategy tracking market indices with low expense ratio.",
      expectedReturns: "10-13% p.a.",
      minInvestment: "₹500/month",
      features: ["Nifty 50 Index", "Sensex Index", "Nifty Next 50", "Low Cost"]
    },
    {
      id: 6,
      title: "Hybrid Funds",
      icon: "/assets/images/mu6.png",
      riskLevel: "Variable Risk",
      riskColor: "bg-gray-400",
      description: "Balanced approach combining equity and debt for moderate risk and returns.",
      expectedReturns: "Based on Fund",
      minInvestment: "₹500/month",
      features: ["Monthly SIP", "Quarterly SIP", "Annual SIP", "Step-up SIP"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <CGPEHeader />
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-20 px-4"
        style={{
          backgroundImage: "url('/assets/images/bkmu.png')"
        }}
      >
        <div className="max-w-4xl mx-auto text-center my-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Mutual Funds & SIP
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Start your investment journey with systematic investment plans and carefully selected mutual funds. 
            Build wealth through disciplined investing and professional fund management.
          </p>
          <button 
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
            onClick={handleContactNavigation}
          >
            Start SIP
          </button>
        </div>
      </div>

      {/* Mutual Fund Categories Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Mutual Fund Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diversified investment options to match your risk appetite and financial goals.
            </p>
          </div>

          {/* Fund Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundCategories.map((fund) => (
              <div key={fund.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                {/* Header with Icon and Risk Level */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 mb-2">
                    <img src={fund.icon} alt={fund.title} className="w-full h-full object-contain" />
                  </div>
                  <span className={`${fund.riskColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {fund.riskLevel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {fund.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {fund.description}
                </p>

                {/* Key Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Expected Returns:</span>
                    <span className="text-blue-600 font-semibold">{fund.expectedReturns}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Min. Investment:</span>
                    <span className="text-gray-800 font-semibold">{fund.minInvestment}</span>
                  </div>
                </div>

                {/* Features/Checkboxes */}
                <div className="space-y-2 mb-6">
                  {fund.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button 
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                  onClick={handleContactNavigation}
                >
                  Invest Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Funds Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Top Performing Funds
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our carefully selected high-performing mutual funds with consistent track records.
            </p>
          </div>

          {/* Fund Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* ABC Large Cap Fund */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-2">ABC Large Cap Fund</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-blue-600">Equity</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Returns:</span>
                  <span className="font-semibold text-green-600">14.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className="font-semibold text-red-600">High</span>
                </div>
              </div>
              <button 
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={handleContactNavigation}
              >
                View Details
              </button>
            </div>

            {/* XYZ Balanced Advantage */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-2">XYZ Balanced Advantage</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-blue-600">Hybrid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Returns:</span>
                  <span className="font-semibold text-green-600">11.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className="font-semibold text-yellow-600">Medium</span>
                </div>
              </div>
              <button 
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={handleContactNavigation}
              >
                View Details
              </button>
            </div>

            {/* ABC Large Cap Fund (ELSS) */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-2">ABC Large Cap Fund</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-blue-600">ELSS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Returns:</span>
                  <span className="font-semibold text-green-600">15.6%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className="font-semibold text-red-600">High</span>
                </div>
              </div>
              <button 
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={handleContactNavigation}
              >
                View Details
              </button>
            </div>

            {/* ABC Large Cap Fund (Debt) */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg font-bold text-gray-800 mb-2">ABC Large Cap Fund</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                     <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-blue-600">Debt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Returns:</span>
                  <span className="font-semibold text-green-600">6.4%</span> 
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className="font-semibold text-green-600">Low</span>
                </div>
              </div>
              <button 
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                onClick={handleContactNavigation}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How to Start Investing Section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How to Start Investing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to begin your mutual fund investment journey.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 01 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">01</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">KYC Completion</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your Know Your Customer process with required documents.
              </p>
            </div>

            {/* Step 02 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">02</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Goal Setting</h3>
              <p className="text-gray-600 leading-relaxed">
                Define your investment goals and time horizon for better fund selection.
              </p>
            </div>

            {/* Step 03 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">03</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fund Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose appropriate funds based on your risk profile and goals.
              </p>
            </div>

            {/* Step 04 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">04</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Start SIP</h3>
              <p className="text-gray-600 leading-relaxed">
                Begin your systematic investment journey with automated monthly investments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIP Benefits Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Benefits Title Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Benefits of SIP Investment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic Investment Plans offer numerous advantages for building long-term wealth.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Rupee Cost Averaging */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Rupee Cost Averaging</h3>
              </div>
              {/* <p className="text-gray-600 leading-relaxed">
                Buy more units when prices are low and fewer when prices are high, reducing average cost.
              </p> */}
            </div>

            {/* Flexibility to Start/Stop */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Flexibility to Start/Stop</h3>
              </div>
              {/* <p className="text-gray-600 leading-relaxed">
                Start with small amounts and pause or modify your investments as per your convenience.
              </p> */}
            </div>

            {/* Diversification */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Diversification</h3>
              </div>
              {/* <p className="text-gray-600 leading-relaxed">
                Spread your investments across multiple stocks and sectors to reduce risk.
              </p> */}
            </div>

            {/* Power of Compounding */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Power of Compounding</h3>
              </div>
              {/* <p className="text-gray-600 leading-relaxed">
                Earn returns on your returns, creating exponential growth over the long term.
              </p> */}
            </div>

            {/* Tax Benefits (ELSS) */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Tax Benefits (ELSS)</h3>
              </div>
              {/* <p className="text-gray-600 leading-relaxed">
                Save taxes up to ₹1.5 lakhs annually under Section 80C with ELSS funds.
              </p> */}
            </div>

            {/* Liquidity (Open-ended Funds) */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Liquidity (Open-ended Funds)</h3>
              </div>
              {/* <p className="text-gray-600 leading-relaxed">
                Easy to buy and sell units anytime with open-ended mutual funds.
              </p> */}
            </div>

            {/* Disciplined Investing */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Disciplined Investing</h3>
              </div>
              {/* <p className="text-gray-600 leading-relaxed">
                Automate your investments and maintain financial discipline consistently.
              </p> */}
            </div>

            {/* Professional Fund Management */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Professional Fund Management</h3>
              </div>
              {/* <p className="text-gray-600 leading-relaxed">
                Expert fund managers handle your investments with research and analysis.
              </p> */}
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="rounded-2xl p-12 text-center">
            <h3 className="text-4xl font-bold text-black mb-6">
              Start Your SIP Journey Today
            </h3>
            <p className="text-xl text-black mb-8 max-w-3xl mx-auto leading-relaxed">
              Begin with as little as ₹500 per month and watch your money grow through the power of compounding and professional fund management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-blue-400 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:bg-blue-500 transition-colors duration-300"
                onClick={handleContactNavigation}
              >
                Start SIP Now
              </button>
              {/* <button className="bg-blue-400 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-300">
                Calculate Returns
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MutualFundsSIP;
