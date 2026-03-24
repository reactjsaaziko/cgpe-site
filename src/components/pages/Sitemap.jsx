import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';
import s5 from '../assets/s5.png';
import s6 from '../assets/s6.png';
import s7 from '../assets/s7.png';
import s8 from '../assets/s8.png';
import s9 from '../assets/s9.png';
import s10 from '../assets/s10.png';


const Sitemap = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const sitemapData = [
    {
      title: "Life Insurance", 
      icon: (
        <img
          src={s1}
          alt="Life Insurance"
          className="w-10 h-9"
        />
      ),
      items: [
        { name: "Life Insurance Companies", route: "/insurance" },
        { name: "Tearm Insurance", route: "/register", popular: true },
        { name: "Tearm Insurance Sitemap", route: "/insurance" }
      ]
    },
    {
      title: "Health Insurance",
      icon: (
        <img
        src={s2}
        alt="Life Insurance"
        className="w-10 h-9"
      />
      ),
      items: [
        { name: "Health Insurance Plan", route: "/helthregister", popular: true },
        { name: "Family Health Insurance", route: "/familyhealth-register" },
        { name: "Senior Citizen Health Insurance", route: "/helthregister" },
        { name: "Cashless Hospitalization", route: "/helthregister" },
        { name: "Preventive Health Care", route: "/helthregister" },
        { name: "Mediclaim Policy", route: "/helthregister" },
        { name: "Group Health Insurance", route: "/group-health-insurance" },
        { name: "Coronavirus Health Insurance", route: "/helthregister" },
        { name: "Corona Kavach Policy", route: "/helthregister" },
        { name: "Corona Rakshak Policy", route: "/helthregister" },
        { name: "Arogya Sanjeevani Policy", route: "/helthregister" }
      ]
    },
    {
      title: "Health Insurance",
      icon: (
        <img
        src={s3}
        alt="Life Insurance"
        className="w-10 h-9"
      />
      ),
      items: [
        { name: "Car Insurance", route: "/motor-renewal", popular: true },
        { name: "Two Wheel Insurance", route: "/bike-renewal" },
        { name: "Third Party Insurance", route: "/motor-renewal" },
        { name: "Third Party Bike Insurance", route: "/bike-renewal" },
        { name: "Used Car Insurance", route: "/motor-renewal" },
        { name: "Play As You Drive Insurance", route: "/motor-renewal" },
        { name: "Car Insurance Calculator", route: "/motor-renewal" },
        { name: "Car Insurance Claim", route: "/motor-renewal" },
        { name: "Best Car Insurance Companies", route: "/motor-renewal" }
      ]
    },
    {
      title: "Investment Plans",
      icon: (
        <img
        src={s4}
        alt="Life Insurance"
        className="w-10 h-9"
      />
      ),
      items: [
        { name: "Investment Plan Provider", route: "/investment-landing" },
        { name: "Child Plans - Child Plan Providers", route: "/child-saving-insurance" },
        { name: "Retirement Plans - Pension Plan Providers", route: "/retirement-insurance" },
        { name: "Tax Saving Plans", route: "/investment-landing" },
        { name: "Money Back", route: "/investment-landing" },
        { name: "Guaranteed Income", route: "/guaranteed-returns-plan" },
        { name: "Monthly Income", route: "/investment-landing" },
        { name: "ULIPs or High Potential plans - ULIP Plan Providers", route: "/investment-landing" },
        { name: "Short Term Guaranteed Plans", route: "/guaranteed-returns-plan" },
        { name: "SIP", route: "/investment-landing" },
        { name: "Mutual Funds & SIP", route: "/mutual-funds-sip", popular: true },
        { name: "Income replacement", route: "/investment-landing" },
        { name: "Income Tax", route: "/investment-landing" }
      ]
    },
    // {
    //   title: "My Account",
    //   icon: (
    //     <img
    //     src={s5}
    //     alt="Life Insurance"
    //     className="w-10 h-9"
    //   />
    //   ),
    //   items: [
    //     { name: "My Policies", route: "/insurance", popular: true },
    //     { name: "My Profile", route: "/insurance" },
    //     { name: "My Transactions", route: "/insurance" },
    //     { name: "Claim Support", route: "/insurance" },
    //     { name: "Get Help", route: "/insurance" },
    //     { name: "Manage Communication Preferences", route: "/insurance" }
    //   ]
    // },
    {
      title: "Government Plans",
      icon: (
        <img
        src={s6}
        alt="Life Insurance"
        className="w-10 h-9"
      />
      ),
      items: [
        { name: "Post Office Monthly Income Scheme", route: "/insurance" },
        { name: "Post Office Saving Scheme", route: "/insurance" },
        { name: "Post Office Senior Citizen Saving Scheme", route: "/insurance" },
        { name: "NPS Pension Scheme", route: "/insurance" },
        { name: "Pradhan Mantri Jeevan Jyoti Bima Yojana", route: "/insurance" },
        { name: "Sukanya Samriddhi Yojana", route: "/insurance" },
        { name: "Pradhan Mantri Suraksha Bima Yojana", route: "/insurance" },
        { name: "Atal Pension Yojana Details", route: "/insurance" },
        { name: "Sukanya Samriddhi Yojana Calculator", route: "/insurance" },
        { name: "Postal Life Insurance", route: "/insurance" },
        { name: "Postal Life Insurance Calculator", route: "/insurance" }
      ]
    },
    {
      title: "Travel Insurance",
      icon: (
        <img
        src={s7}
        alt="Life Insurance"
        className="w-10 h-9"
      />
      ),
      items: [
        { name: "Travel Insurance - Travel Insurers", route: "/travelinsurance" },
        { name: "Domestic Travel Insurance", route: "/travelinsurance" },
        { name: "International Travel Insurance", route: "/travelinsurance" },
        { name: "Student Travel Insurance", route: "/travelinsurance" },
        { name: "Medical Travel Insurance", route: "/travelinsurance" },
        { name: "Group Travel Insurance", route: "/travelinsurance" },
        { name: "Senior Citizen Travel Insurance", route: "/travelinsurance" },
        { name: "Schengen Travel Insurance", route: "/travelinsurance" },
        { name: "Family Travel Insurance", route: "/travelinsurance" },
        { name: "Flight Insurance", route: "/travelinsurance" },
        { name: "Baggage Insurance", route: "/travelinsurance" },
        { name: "Multi-Trip Travel Insurance", route: "/travelinsurance" }
      ]
    },
    {
      title: "General Insurance",
      icon: (
        <img
        src={s8}
        alt="Life Insurance"
        className="w-10 h-9"
      />
      ),
      items: [
        { name: "General Insurance - General Insurers", route: "/insurance" },
        { name: "Home Insurance - Home Insurers", route: "/insurance" },
        { name: "Personal Accident Insurance - Personal Accident Insurers", route: "/insurance" },
        { name: "Corporate Insurance - Corporate Insurance Products", route: "/insurance" }
      ]
    },
    {
      title: "Financial Tools",
      icon: (
        <img
        src={s9}
        alt="Life Insurance"
        className="w-10 h-9"
      />
      ),
      items: [
        { name: "Financial Tools", route: "/insurance" },
        { name: "Fixed Deposit - FD Banks", route: "/insurance" },
        { name: "Gold Rate - Gold Rate by Cities", route: "/insurance" },
        { name: "Silver Rate - Silver Rate by Cities", route: "/insurance" },
        { name: "RTO - RTO by Cities / State", route: "/insurance" }
      ]
    },
    {
      title: "Learn & Resources",
      icon: (
        <img
        src={s10}
        alt="Life Insurance"
        className="w-10 h-9"
      />
      ),
      items: [
        { name: "Network Hospitals", route: "/insurance" },
        { name: "Articles", route: "/insurance" },
        { name: "Customer Reviews", route: "/insurance" },
        { name: "Insurance Companies", route: "/insurance" },
        { name: "Newsroom", route: "/insurance" },
        { name: "Our Investor", route: "/insurance" },
        { name: "Awards", route: "/insurance" },
        { name: "Hi life", route: "/insurance" }
      ]
    }
  ];

  const handleItemClick = (route) => {
    navigate(route);
  };

  const filteredData = sitemapData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CGPE Header */}
      <CGPEHeader />
      
      {/* Header Section */}
      <div 
        className="relative bg-cover bg-center py-16 px-4"
        style={{
          backgroundImage: "url('assets/images/sitemap.png')"
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sitemap
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Find all our insurance products and services organized for easy navigation
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search insurance products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-white focus:ring-2 focus:ring-white focus:outline-none text-white placeholder-white"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-3">{category.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <button
                      onClick={() => handleItemClick(item.route)}
                      className="flex items-center justify-between w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200 py-1"
                    >
                      <span>{item.name}</span>
                      {item.popular && (
                        <span className="bg-white text-black border border-black text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* CGPE Footer */}
      <Footer />
    </div>
  );
};

export default Sitemap;
