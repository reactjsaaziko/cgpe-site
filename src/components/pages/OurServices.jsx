import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const OurServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the selected service from URL state or query params
  const selectedService = location.state?.selectedService || null;

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to selected service when component mounts
  React.useEffect(() => {
    if (selectedService) {
      const serviceElement = document.getElementById(`service-${selectedService.replace(/\s+/g, '-').toLowerCase()}`);
      if (serviceElement) {
        serviceElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedService]);

  const services = [
    {
      id: 1,
      title: "Life Insurance",
      description: "Protect your loved ones' financial future with a variety of life insurance plans, including term life, whole life, and unit-linked insurance plans (ULIPs).",
      // path: "/register",
      iconColor: "green",
      icon: "/assets/images/cu1.jpg"
    },
    {
      id: 2,
      title: "General Insurance",
      description: "Safeguard your assets and investments with comprehensive general insurance coverage, including car insurance, home insurance, travel insurance, and more.",
      // path: "/motor-renewal",
      iconColor: "blue",
      icon: "/assets/images/cu2.jpg"
    },
    {
      id: 3,
      title: "Health Insurance",
      description: "Ensure your health and well-being with a range of health insurance plans that cover hospitalization costs, critical illness, and other medical expenses.",
      // path: "/helthregister",
      iconColor: "red",
      icon: "/assets/images/cu3.jpg"
    },
    {
      id: 4,
      title: "Fire & Burglary Insurance",
      description: "Protect your property from unforeseen events like fire, theft, and natural disasters.",
      // path: "/services/insurance",
      iconColor: "orange",
      icon: "/assets/images/cu4.jpg"
    },
    {
      id: 5,
      title: "Jeweler's Policy",
      description: "Secure your valuable jewelry and precious possessions with a specialized insurance policy tailored to their worth.",
      // path: "/services/insurance",
      iconColor: "yellow",
      icon: "/assets/images/cu5.jpg"
    },
    {
      id: 6,
      title: "Mutual Funds",
      description: "Grow your wealth with confidence through mutual funds, a secure investment option tailored to your financial goals.",
      // path: "/mutual-funds-sip",
      iconColor: "green",
      icon: "/assets/images/cu6.png"
    }
  ];

  const handleCallUs = (service) => {
    navigate('/contact', { state: { fromService: service.title } });
  };

  const handleServiceClick = (service) => {
    navigate(service.path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CGPEHeader />
      
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-0.5 bg-blue-600"></div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider mx-4">
                OUR SERVICES
              </span>
              <div className="w-12 h-0.5 bg-blue-600"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Tailored to Your Needs
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={`service-${service.title.replace(/\s+/g, '-').toLowerCase()}`}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleServiceClick(service)}
              >
                {/* Service Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-52 h-52 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                    <img
                      src={service.icon}
                      alt={`${service.title} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                    className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 group-hover:bg-blue-700"
                  >
                    Get Started
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCallUs(service);
                    }}
                    className="inline-flex items-center justify-center px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
                  >
                    Call Us
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OurServices;
