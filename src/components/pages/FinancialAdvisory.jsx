import React from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import fi1 from "../assets/fi1.png"
import fi2 from "../assets/fi2.png"
import fi3 from "../assets/fi3.png"
import fi4 from "../assets/fi4.png"
import fi5 from "../assets/fi5.png"
import fi6 from "../assets/fi6.png"

const FinancialAdvisory = () => {
  const navigate = useNavigate();

  const financialServices = [
    {
      id: 1,
      title: "Financial Planning",
      targetAudience: "Individuals & Families",
      description: "Comprehensive financial planning to achieve your life goals and secure your future.",
      services: ["Goal-based Planning", "Retirement Planning", "Tax Planning", "Estate Planning"],
      icon: (
        <img src={fi1} alt="Financial Planning" className="w-full h-full" />
      ),
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 2,
      title: "Investment Advisory",
      targetAudience: "Investors",
      description: "Professional investment guidance to maximize returns while managing risk.",
      services: ["Portfolio Management", "Asset Allocation", "Risk Assessment", "Performance Review"],
      icon: (
        <img src={fi2} alt="Financial Planning" className="w-full h-full" />
      ),
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: 3,
      title: "Wealth Management",
      targetAudience: "HNI Clients",
      description: "Comprehensive wealth management services for high-net-worth individuals.",
      services: ["Portfolio Diversification", "Alternative Investments", "Private Banking", "Family Office Services"],
      icon: (
        <img src={fi3} alt="Financial Planning" className="w-full h-full" />
      ),
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 4,
      title: "Tax Optimization",
      targetAudience: "All Clients",
      description: "Strategic tax planning to minimize tax liability and maximize savings.",
      services: ["Tax Efficient Investments", "Section 80C Planning", "Capital Gains Planning", "Tax Filing Support"],
      icon: (
        <img src={fi4} alt="Financial Planning" className="w-full h-full" />
      ),
      iconColor: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      id: 5,
      title: "Loan Advisory",
      targetAudience: "Borrowers",
      description: "Expert guidance on loans and financing options for your needs.",
      services: ["Home Loans", "Personal Loans", "Business Loans", "Loan Against Property"],
      icon: (
        <img src={fi5} alt="Financial Planning" className="w-full h-full" />
      ),
      iconColor: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      id: 6,
      title: "Corporate Finance",
      targetAudience: "Businesses",
      description: "Financial solutions and advisory services for businesses and corporations.",
      services: ["Business Valuation", "IPO Advisory", "Mergers & Acquisitions", "Working Capital Management"],
      icon: (
        <img src={fi6} alt="Financial Planning" className="w-full h-full " />
      ),
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  const handleLearnMore = (service) => {
    // Navigate to specific service page or contact form
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CGPEHeader />
      
      {/* Hero Section */}
      <section className="relative text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/bkfi.png')",
            filter: "blur(2px)"
          }}
        >
          {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Financial Planning & Advisory
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Expert financial guidance to help you build wealth, plan for retirement, and achieve your financial goals. Get personalized strategies from certified financial planners.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Financial Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Financial Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial solutions designed to help you achieve your financial objectives.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {financialServices.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <div className={service.iconColor}>
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>

              {/* Target Audience */}
              <p className="text-sm text-gray-500 mb-3">
                {service.targetAudience}
              </p>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Services List */}
              <ul className="space-y-2 mb-6">
                {service.services.map((item, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <svg 
                      className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Learn More Button */}
              <button
                onClick={() => handleLearnMore(service)}
                className="w-full bg-blue-400 hover:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Our Planning Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Planning Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A systematic approach to financial planning that ensures your success.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              number: "01",
              title: "Financial Assessment",
              description: "Comprehensive analysis of your current financial situation and goals."
            },
            {
              number: "02",
              title: "Strategy Development",
              description: "Creating a customized financial plan tailored to your specific needs."
            },
            {
              number: "03",
              title: "Implementation",
              description: "Executing the financial plan with appropriate investment vehicles."
            },
            {
              number: "04",
              title: "Monitoring & Review",
              description: "Regular monitoring and adjustments to keep you on track."
            }
          ].map((step, index) => (
            <div key={index} className="text-center">
              {/* Number Circle */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">{step.number}</span>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Our Financial Advisory Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Financial Advisory?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our professional financial advisory services.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Certified Financial Planners",
              "Personalized Investment Strategies",
              "Regular Portfolio Reviews",
              "24/7 Market Updates",
              "Tax-efficient Solutions",
              "Transparent Fee Structure",
              "Risk Management Tools",
              "Retirement Planning Expertise"
            ].map((benefit, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 flex items-start space-x-4 hover:shadow-md transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Your Financial Journey Today Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Start Your Financial Journey Today
          </h2>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            Schedule a free consultation with our certified financial planners and take the first step towards financial freedom.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-blue-400 text-white font-medium py-3 px-8 rounded-lg hover:bg-gray-100 hover:text-black transition-colors duration-200 transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FinancialAdvisory;
