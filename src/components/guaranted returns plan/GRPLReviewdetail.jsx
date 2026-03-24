import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useUserData } from '../../context/UserDataContext';
import { usePricing } from '../../context/PricingContext';
import Header from "../headers/Header";
import Footer from "../Footer";
import PaymentScreen from "../term insurance/Paymentscreen";

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-gray-500 text-sm">{label}</span>
    <span className="font-semibold text-base">{value}</span>
  </div>
);

export default function GRPLReviewdetail({ confirtfirstData, confirmpageData, insurancePlanData, addonBenefitsData, userData: contextUserData }) {
  const [showPayment, setShowPayment] = useState(false);
  const { userData } = useUserData();
  const { getFormattedPrice, paymentMode } = usePricing();
  const location = useLocation();
  
  // Get data from navigation state
  const navigationData = location.state || {};
  const { initialFormData, userDetails, personalDetails, planData } = navigationData;
  
  // Fallback price calculation if pricing context fails
  const getFallbackPrice = () => {
    if (planData) {
      return planData.investmentAmount || "₹ 10000";
    }
    if (location.state && location.state.planData) {
      const planData = location.state.planData;
      const price = paymentMode === 'yearly' ? planData.yearlyPrice : planData.monthlyPrice;
      const period = paymentMode === 'yearly' ? 'Yearly' : 'Monthly';
      if (price) {
        return `₹ ${price} ${period}`;
      }
    }
    return getFormattedPrice() || "₹ 10000";
  };

  // Combine all form data
  const combinedUserData = {
    ...contextUserData,
    ...confirtfirstData,
    ...confirmpageData,
    ...insurancePlanData,
    ...initialFormData,
    ...userDetails,
    ...personalDetails
  };

  const handleProceedToPayment = () => {
    // Save plan data to localStorage for PaymentScreen to access
    if (planData) {
      localStorage.setItem('paymentPlanData', JSON.stringify(planData));
    } else if (location.state?.planData) {
      localStorage.setItem('paymentPlanData', JSON.stringify(location.state.planData));
    }
    setShowPayment(true);
  };

  // Helper functions to format data
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return `${age} yrs`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  const formatMobile = (mobileNumber) => {
    if (!mobileNumber) return '******7053';
    return `******${mobileNumber.slice(-4)}`;
  };

  if (showPayment) {
    return (
      <>
      <Header/>
      <PaymentScreen/>
      <Footer/>
      </>
    );
  }

  return (
    <>
      <Header />
      <div>
        <div className="max-h-screen bg-white flex flex-col items-center py-8 px-2">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/ICICI_Prudential_Life_Logo.svg"
              alt="ICICI Prudential Life"
              className="h-8 mb-2"
            />
            <span className="font-medium text-gray-700 text-center">
              Please Review Below Details Before Proceeding Ahead.
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-500 text-lg">ℹ️</span>
              <span className="text-yellow-600 text-base font-medium">
                These Cannot Be Changed At A Later Stage
              </span>
            </div>
          </div>
          {/* Card */}
          <div className="bg-white shadow-md rounded-xl w-full max-w-3xl px-6 py-7 flex flex-col gap-8 border">
            {/* Personal Info */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
                <span className="font-semibold text-lg text-gray-700">
                  Personal Info
                </span>
                <div className="flex-1 border-t ml-2 border-blue-100"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                <InfoRow label="Full Name" value={combinedUserData?.fullName || "Not provided"} />
                <InfoRow label="Email" value={combinedUserData?.email || "Not provided"} />
                <InfoRow label="Annual Income" value={combinedUserData?.annualIncome || "Not provided"} />
                <InfoRow label="Occupation" value={combinedUserData?.occupation || "Not provided"} />
                <InfoRow label="Education" value={combinedUserData?.education || "Not provided"} />
                <InfoRow label="PIN Code" value={combinedUserData?.pincode || "Not provided"} />
                <InfoRow label="City" value={combinedUserData?.city || "Not provided"} />
                <InfoRow label="Nationality" value={combinedUserData?.nationality || "Resident Indian"} />
                <InfoRow label="PAN Number" value={combinedUserData?.panNumber || "Not provided"} />
                <InfoRow label="Height" value={combinedUserData?.heightFeet && combinedUserData?.heightInches ? `${combinedUserData.heightFeet}' ${combinedUserData.heightInches}"` : "Not provided"} />
                <InfoRow label="Weight" value={combinedUserData?.weightKg ? `${combinedUserData.weightKg} KG` : "Not provided"} />
                <InfoRow label="Politically Exposed" value={combinedUserData?.politicallyExposed === 'yes' ? 'Yes' : 'No'} />
                <InfoRow label="Health Declaration" value={combinedUserData?.healthDeclaration === 'agree' ? 'I Agree' : 'I Disagree'} />
              </div>
            </section>
            {/* Profile Details */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
                <span className="font-semibold text-lg text-gray-700">
                  Profile Details
                </span>
                <div className="flex-1 border-t ml-2 border-blue-100"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                <InfoRow label="Gender" value={combinedUserData?.gender || "Not provided"} />
                <InfoRow label="Date Of Birth" value={formatDate(combinedUserData?.dateOfBirth) || "Not provided"} />
                <InfoRow label="Smoking Status" value={combinedUserData?.smokingStatus === 'Yes' ? 'Smoker' : 'Non-smoker'} />
                <InfoRow label="Phone Number" value={formatMobile(combinedUserData?.mobileNumber)} />
              </div>
            </section>
            {/* Plan Info */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-blue-600 rounded-full inline-block"></span>
                <span className="font-semibold text-lg text-gray-700">
                  Plan Info
                </span>
                <div className="flex-1 border-t ml-2 border-blue-100"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                <InfoRow label="Selected Plan" value={planData?.selectedPlan || combinedUserData?.selectedPlan || "Capital Goal Suraksha"} />
                <InfoRow label="Life Cover" value={planData?.lifeCover || "₹12 Lacs"} />
                <InfoRow label="Investment Amount" value={planData?.investmentAmount || "₹ 10000"} />
                <InfoRow label="Payment Mode" value={planData?.paymentMode || "Monthly"} />
                <InfoRow label="Pay For" value={planData?.payFor || "10 Years"} />
                <InfoRow label="Withdraw After" value={planData?.withdrawAfter || "20 Years"} />
              </div>
            </section>
            {/* Checkbox Options */}
            <div className="flex flex-col gap-3">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked readOnly className="w-5 h-5 accent-blue-600 rounded" />
                <span className="text-gray-800 text-base font-medium">Get Updates On Whatsapp</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked readOnly className="w-5 h-5 accent-blue-600 rounded" />
                <span className="text-gray-800 text-base font-medium">
                  I Agree To The{" "}
                  <a href="#" className="text-blue-600 underline font-semibold">
                    Terms And Conditions
                  </a>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto bg-white border-t border-gray-200 shadow-lg z-20">
          <div className=" flex items-center justify-between py-4 px-6 max-w-none">
            <div className="font-semibold text-gray-700">
              Total Premium <span className="text-lg font-bold text-gray-900 ml-1">{getFallbackPrice()}</span>
              <svg className="inline ml-1 -mt-1" width={16} height={16} fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><circle cx="12" cy="8" r="1" /></svg>
            </div>
            <button
              onClick={handleProceedToPayment}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-blue-700 transition shadow">
              PROCEED
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
