import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../headers/Header";
import Footer from "../Footer";
import a from "../assets/l.png"
import b from "../assets/m.png"
import c from "../assets/n.png"
import d from "../assets/o.png"

export default function GroupHealthPlanUpgrade() {
  const navigate = useNavigate();
  const [selectedSumInsured, setSelectedSumInsured] = useState("₹2 lakhs");
  const [selectedInsurer, setSelectedInsurer] = useState("SHRIRAM");
  const [industryType, setIndustryType] = useState("Administrative Functions including Desk");

  const plans = [
    {
      id: 1,
      title: "Group Personal Accident",
      description: "Group Personal Accident Policy provides comprehensive coverage upto 100% of Sum Insured against Accidental Death, Permanent Total Disability (PTD), Permanent Partial Disability (PPD) and upto 1% of Actual Salary incase of Temporary Total Disability (TTD).",
      type: "accident",
      sumInsuredOptions: ["₹2 lakhs", "₹3 lakhs", "₹5 lakhs"],
      insurers: [
        { name: "SHRIRAM General Insurance Company Ltd", price: "₹826/yr", logo: "/assets/images/shriram-logo.png" },
        { name: "SBI general", price: "₹1,038/yr", logo: "/assets/images/sbi-logo.png" },
        { name: "care HEALTH INSURANCE", price: "₹3,806/yr", logo: "/assets/images/care-logo.png" }
      ]
    },
    {
      id: 2,
      title: "CARE 360",
      description: "Get Unlimited in-app Doctor Consultations & Prescriptions. Earn daily rewards as FIT Coins which can be redeemed at Amazon, BookMyShow etc. Get unlimited digital fitness and yoga classes at your fingertips. Loaded with personalized mindfulness and meditation sessions.",
      type: "care",
      coverage: "Employees & Dependents",
      price: "₹10/ employee + GST"
    },
    {
      id: 3,
      title: "Mental Wellness Plan",
      description: "Unlimited phone/video consultations with experts about personal/financial or legal issues. Get Unlimited in-app Doctor Consultations & Prescriptions. Earn daily rewards as FIT Coins which can be redeemed at Amazon, BookMyShow etc. Get unlimited digital fitness and yoga classes at your fingertips. Loaded with personalized mindfulness and meditation sessions.",
      type: "wellness",
      coverage: "Employees & Dependents",
      price: "₹599/ employee + GST"
    },
    {
      id: 4,
      title: "Specialist E-Consultation Plan",
      description: "Unlimited phone/video consultations with specialists like Gynecologists, Dermatologists, Internal Medicine doctors, etc. Covers family of 6 with accessibility to over 3500 doctors. Get Unlimited in-app Doctor Consultations & Prescriptions. Earn daily rewards as FIT Coins which can be redeemed at Amazon, BookMyShow etc. Get unlimited digital fitness and yoga classes at your fingertips. Loaded with personalized mindfulness and meditation sessions.",
      type: "consultation",
      coverage: "Employees & Dependents",
      price: "₹599/ employee + GST"
    },
    {
      id: 5,
      title: "Health Checkup Plan",
      description: "Full body health checkup with 61 tests including CPC, Liver function test & Cholesterol screening. Samples collected from home & digitized reports will be available for future references. Get Unlimited in-app Doctor Consultations & Prescriptions. Earn daily rewards as FIT Coins which can be redeemed at Amazon, BookMyShow etc. Get unlimited digital fitness and yoga classes at your fingertips. Loaded with personalized mindfulness and meditation sessions.",
      type: "checkup",
      coverage: "Employees & Dependents",
      price: "₹649/ employee + GST"
    }
  ];

  const summaryData = {
    insurer: "SBI General Insurance Company Ltd",
    totalLives: "18",
    sumInsured: "₹5,00,000",
    policyPeriod: "1 year",
    coverage: "Employee, Spouse & 2 Kids",
    netPremium: "₹60,765",
    gst: "₹10,938",
    totalPremium: "₹71,703"
  };

  return (
    <>
      <Header />
      <div className="max-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">

          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => navigate('/policy-suggestions')}
                  className="text-blue-600 hover:text-blue-800 mr-2 text-lg"
                >
                  &lt;
                </button>
                <h1 className="text-2xl text-gray-800">
                  Upgrade your Group Health Plan
                </h1>
              </div>

              {/* Plan Cards */}
              <div className="space-y-6">
                {plans.map((plan) => (
                  <PlanCard 
                    key={plan.id} 
                    plan={plan} 
                    selectedSumInsured={selectedSumInsured}
                    setSelectedSumInsured={setSelectedSumInsured}
                    selectedInsurer={selectedInsurer}
                    setSelectedInsurer={setSelectedInsurer}
                    industryType={industryType}
                    setIndustryType={setIndustryType}
                  />
                ))}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="w-80">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Insurer:</span>
                    <span className="text-sm font-medium">{summaryData.insurer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Lives:</span>
                    <span className="text-sm font-medium">{summaryData.totalLives}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sum Insured:</span>
                    <span className="text-sm font-medium">{summaryData.sumInsured}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Policy Period:</span>
                    <span className="text-sm font-medium">{summaryData.policyPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Coverage:</span>
                    <span className="text-sm font-medium">{summaryData.coverage}</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Net Premium:</span>
                    <span className="text-sm font-medium">{summaryData.netPremium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">GST:</span>
                    <span className="text-sm font-medium">{summaryData.gst}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTAL PREMIUM:</span>
                    <span>{summaryData.totalPremium}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/know-your-exact-premium')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold mt-6 hover:bg-blue-700 transition-colors"
                >
                  PROCEED
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function PlanCard({ plan, selectedSumInsured, setSelectedSumInsured, selectedInsurer, setSelectedInsurer, industryType, setIndustryType }) {
  // Map plan IDs to image variables
  const getIconImage = (planId) => {
    switch (planId) {
      case 1: return a;
      case 2: return b;
      case 3: return c;
      case 4: return d;
      default: return a;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start space-x-4">
        <div className="w-auto h-auto flex items-center justify-center">
          <img src={getIconImage(plan.id)} alt={plan.title} className="w-8 h-8 object-contain" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{plan.description}</p>
          
          {plan.type === "accident" ? (
            <div className="space-y-4">
              {/* Sum Insured Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Sum Insured</label>
                <div className="flex space-x-2">
                  {plan.sumInsuredOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedSumInsured(option)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedSumInsured === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Industry Type</label>
                <input
                  type="text"
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Insurer Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Insurer</label>
                <div className="space-y-2 flex flex-wrap gap-4">
                  {plan.insurers.map((insurer) => (
                    <label key={insurer.name} className="flex items-center space-x-3 cursor-pointer border border-gray-300 rounded-lg p-2">
                      <input
                        type="radio"
                        name="insurer"
                        value={insurer.name}
                        checked={selectedInsurer === insurer.name}
                        onChange={() => setSelectedInsurer(insurer.name)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-medium">{insurer.name.split(' ')[0]}</span>
                        </div>
                        <span className="text-sm font-medium">{insurer.name}</span>
                        <span className="text-sm text-blue-600 font-semibold">{insurer.price}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {/* <div> */}
                <p className="text-sm text-gray-600">Coverage-{plan.coverage}</p>
                <p className="text-lg font-bold text-blue-600">{plan.price}</p>
              {/* </div> */}
            </div>
          )}

          {plan.type === "accident" && (
            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <span>+</span>
                <span>Add</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
