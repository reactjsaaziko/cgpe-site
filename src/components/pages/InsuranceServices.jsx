import React from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import ii1 from "../assets/ii1.png"
import ii2 from "../assets/ii2.png"
import ii3 from "../assets/ii3.png"
import ii4 from "../assets/ii4.png"
import ii5 from "../assets/ii5.png"
import ii6 from "../assets/ii6.png"  


const InsuranceServices = () => {
  const navigate = useNavigate();

  const insuranceProducts = [
    {
      id: 1,
      title: "Life Insurance",
      startingPrice: "₹500/month",
      description: "Secure your family's financial future with comprehensive life insurance coverage.",
      features: ["Term Life Insurance", "Whole Life Insurance", "Universal Life Insurance"],
      icon: (
        <img src={ii1} alt="Life Insurance" className="w-full h-full object-contain" />
      ),
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      route: "/register"
    },
    {
      id: 2,
      title: "Health Insurance",
      startingPrice: "₹1,200/month",
      description: "Complete medical coverage for you and your family's healthcare needs.",
      features: ["Individual Health Plans", "Family Floater Plans", "Critical Illness Cover"],
      icon: (
        <img src={ii2} alt="Health Insurance" className="w-full h-full object-contain" />
      ),
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      route: "/helthregister"
    },
    {
      id: 3,
      title: "Auto Insurance",
      startingPrice: "₹2,500/year",
      description: "Comprehensive vehicle protection for cars, bikes, and commercial vehicles.",
      features: ["Third Party Coverage", "Comprehensive Coverage", "Zero Depreciation"],
      icon: (
        <img src={ii3} alt="Health Insurance" className="w-full h-full object-contain" />
      ),
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      route: "/motor-renewal"
    },
    {
      id: 4,
      title: "Home Insurance",
      startingPrice: "₹3,000/year",
      description: "Protect your home and belongings against natural disasters and theft.",
      features: ["Structure Coverage", "Contents Insurance", "Personal Liability"],
      icon: (
        <img src={ii4} alt="Health Insurance" className="w-full h-full object-contain" />
      ),
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      route: "/contact"
    },
    {
      id: 5,
      title: "Business Insurance",
      startingPrice: "₹5,000/year",
      description: "Comprehensive business protection for various commercial risks.",
      features: ["General Liability", "Property Insurance", "Professional Indemnity"],
      icon: (
        <img src={ii5} alt="Health Insurance" className="w-full h-full object-contain" />
      ),
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      route: "/contact"
    },
    {
      id: 6,
      title: "Group Insurance",
      startingPrice: "₹200/employee/month",
      description: "Employee benefits and group coverage solutions for organizations.",
      features: ["Group Life Insurance", "Group Health Insurance", "Employee Benefits"],
      icon: (
        <img src={ii6} alt="Health Insurance" className="w-full h-full object-contain" />
      ),
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      route: "/group-health-insurance"
    }
  ];

  const handleGetQuote = (product) => {
    if (product.route) {
      navigate(product.route);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CGPEHeader />
      {/* Hero Banner Section */}
      <section className="relative text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/bkin.png')"
          }}
        ></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-52">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Insurance Solutions
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Comprehensive insurance coverage to protect what matters most. Get peace of mind with our tailored insurance solutions for individuals, families, and businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Insurance Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of insurance products designed to meet your specific needs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insuranceProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${product.iconColor} rounded-lg flex items-center justify-center mb-4`}>
                {product.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {product.title}
              </h3>

              {/* Starting Price */}
              <p className="text-base bg-gray-100 w-auto rounded-full font-bold text-black-600 text-center mb-3">
                {product.startingPrice}
              </p>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
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
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Get Quote Button */}
              <button
                onClick={() => handleGetQuote(product)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Our Insurance Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Insurance?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive coverage with exceptional service and support.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              "24/7 Claim Support",
              "Quick Claim Settlement", 
              "Online Policy Management",
              "No Medical Checkup for Basic Plans",
              "Cashless Network Hospitals",
              "Tax Benefits Under Section 80C & 80D"
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

      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Ready to Get Protected?
          </h2>
          <p className="text-lg text-black mb-8 max-w-3xl mx-auto">
            Get a personalized insurance quote in minutes. Our experts will help you find the perfect coverage for your needs.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
            >
              Get Free Quote
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-gray-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors duration-200 transform hover:scale-105"
            >
              Contact Expert
            </button>
          </div> */}
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default InsuranceServices;
