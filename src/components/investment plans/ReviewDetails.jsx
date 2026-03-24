import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderInvest from "../headers/HeaderInvest";
import Footer from "../Footer";


export default function ReviewDetails() {
  const [agreementChecked, setAgreementChecked] = useState(false);
  const navigate = useNavigate();

  const handleEditDetails = () => {
    navigate("/investment-plan-config");
  };

  const handleCheckout = () => {
    // Navigate to payment or next step
    console.log("Proceeding to checkout...");
  };

  return (
    <div className="max-h-screen bg-white">
      {/* Header */}
      <HeaderInvest />
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Bajaj Allianz Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600 mr-2">B</div>
              <div>
                <div className="font-semibold text-gray-800">Bajaj Allianz</div>
                <div className="text-xs text-gray-500">LIFE GOALS. DONE</div>
              </div>
            </div>

            {/* Center Message */}
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">
                Please review below details before proceeding.
              </div>
              <div className="text-sm text-orange-500 mt-1">
                These cannot be changed at a later stage
              </div>
            </div>

            {/* Plan Icon and Name */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-700">Capital Goal Suraksha</div>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="mb-6">
          <div className="bg-purple-50 px-4 py-3 rounded-t-lg">
            <h3 className="font-semibold text-gray-800">Personal Details</h3>
          </div>
          <div className="border border-gray-200 rounded-b-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">Full Name</div>
                <div className="font-medium text-gray-800">Sagar Patel</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email Address</div>
                <div className="font-medium text-gray-800">aaz***@gmail.com</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Nationality</div>
                <div className="font-medium text-gray-800">Indian</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="mb-6">
          <div className="bg-purple-50 px-4 py-3 rounded-t-lg">
            <h3 className="font-semibold text-gray-800">Profile Details</h3>
          </div>
          <div className="border border-gray-200 rounded-b-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-500">Gender</div>
                <div className="font-medium text-gray-800">Male</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Date of Birth</div>
                <div className="font-medium text-gray-800">25/05/1999</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Armed Force</div>
                <div className="font-medium text-gray-800">No</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone Number</div>
                <div className="font-medium text-gray-800">76******53</div>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Details Section */}
        <div className="mb-6">
          <div className="bg-purple-50 px-4 py-3 rounded-t-lg">
            <h3 className="font-semibold text-gray-800">Plan Details</h3>
          </div>
          <div className="border border-gray-200 rounded-b-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-500">Plan Name</div>
                <div className="font-medium text-gray-800">Capital Goal Suraksha</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Investment Amount</div>
                <div className="font-medium text-gray-800">20,000 Monthly</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Withdraw after</div>
                <div className="font-medium text-gray-800">20 Years</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Pay For</div>
                <div className="font-medium text-gray-800">10 Years</div>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="text-sm text-gray-700">
              I Agree to the{" "}
              <span className="text-blue-600 cursor-pointer underline">terms and conditions</span>
            </div>
          </div>
        </div>

        {/* Premium Summary and Action Buttons */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-gray-800">
                Total Premium ₹20,333 Monthly
              </div>
              <div className="text-sm text-gray-500">
                (Base Premium ₹20,000 + GST ₹333)
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleEditDetails}
                className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
              >
                EDIT DETAILS
              </button>
              <button
                onClick={handleCheckout}
                disabled={!agreementChecked}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${agreementChecked
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 py-8 px-6">
        <div className="max-w-4xl mx-auto text-xs text-gray-600 space-y-2">
          <div>
            Policybazaar Insurance Brokers Private Limited CIN: U74999HR2014PTC053454 |
            Registered Office - Plot No.119, Sector - 44, Gurgaon, Haryana - 122001
          </div>
          <div>
            <span className="text-blue-600 cursor-pointer underline">Contact Us</span> |
            <span className="text-blue-600 cursor-pointer underline"> Legal and Admin Policies</span>
          </div>
          <div>
            Policybazaar is registered as a Direct Broker | Registration No. 742,
            Registration Code No. IRDA/ DB 797/19, Valid till 09/06/2024,
            License category- Direct Broker (Life & General)
          </div>
          <div>
            Visitors are hereby informed that their information submitted on the website may be shared with insurers.
            Product information is authentic and solely based on the information received from the insurers.
          </div>
          <div>
            © Copyright 2008-2023 policybazaar.com. All Rights Reserved.
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
} 