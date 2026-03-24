// import React from "react";
import Header from "../headers/Header";
import Footer from "../Footer";

import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useUserData } from '../../context/UserDataContext';
import { usePricing } from '../../context/PricingContext';
import Confirtfirst from "./Confirtfirst";
import Confirmpage from "./Confirmpage";
import InsurancePlanCards from "./InsurancePlanCards";
import AddonBenefitsCards from "./AddonBenefitsCards";
import CheckConfirmation from "./Checkconfirmation";


export default function ConfirmationModel() {
  const { userData } = useUserData();
  const { getFormattedPrice, selectedPlan, setSelectedPlan, getSelectedPlanDetails, paymentMode } = usePricing();
  const location = useLocation();
  
  // Fallback price calculation if pricing context fails
  const getFallbackPrice = () => {
    if (location.state && location.state.planData) {
      const planData = location.state.planData;
      const price = paymentMode === 'yearly' ? planData.yearlyPrice : planData.monthlyPrice;
      const period = paymentMode === 'yearly' ? 'Yearly' : 'Monthly';
      return `₹ ${price} ${period}`;
    }
    return getFormattedPrice();
  };

  // Check if we need to update the pricing context based on navigation state or localStorage
  useEffect(() => {
    // First check navigation state
    if (location.state && location.state.selectedPlan) {
      const planMap = {
        'ICICI PRUDENTIAL': 'icici',
        'HDFC Life': 'hdfc',
        'Max Life': 'max',
        'TATA AIA': 'tata',
        'Bajaj Allianz': 'bajaj'
      };
      
      const pricingPlan = planMap[location.state.selectedPlan];
      if (pricingPlan && pricingPlan !== selectedPlan) {
        setSelectedPlan(pricingPlan);
        localStorage.setItem('selectedPlan', pricingPlan);
        return;
      }
    }
    
    // Fallback to localStorage
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan && savedPlan !== selectedPlan) {
      setSelectedPlan(savedPlan);
    }
  }, [location.state, selectedPlan, setSelectedPlan]);

  // Form data for all steps
  const [confirtfirstData, setConfirtfirstData] = useState({});
  const [confirmpageData, setConfirmpageData] = useState({
    pincode: '',
    city: '',
    nationality: 'Resident Indian',
    covidVaccination: ''
  });
  const [insurancePlanData, setInsurancePlanData] = useState({});
  const [addonBenefitsData, setAddonBenefitsData] = useState([]);

  const [currentStep, setCurrentStep] = useState('initial'); // 'initial', 'confirmpage', 'insuranceplan', 'addonbenefits', 'checkconfirmation'
  const [step, setStep] = useState(0); // For step management

  // Handlers for form data changes
  const handleConfirtfirstDataChange = (data) => {
    setConfirtfirstData(data);
  };

  const handleConfirmpageDataChange = (data) => {
    setConfirmpageData(data);
  };

  const handleInsurancePlanDataChange = (data) => {
    setInsurancePlanData(data);
  };

  const handleAddonBenefitsDataChange = (data) => {
    setAddonBenefitsData(data);
  };

  const handleInputChange = (field, value) => {
    setConfirmpageData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = confirmpageData.pincode && confirmpageData.city && confirmpageData.covidVaccination;

  const handleSubmit = () => {
    if (isFormValid) {
      console.log('Form submitted:', confirmpageData);
      alert('Form submitted successfully!');
    }
  };

  // Calculate age from date of birth
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  // Generate user info string for confirmation modal
  const getUserInfoString = () => {
    if (!userData) {
      return {
        gender: 'Male',
        dob: '01/01/1995',
        smokingStatus: 'Non Smoker',
        mobile: '******7053'
      };
    }

    const gender = userData.gender || 'Male';
    const dob = formatDate(userData.dateOfBirth) || '01/01/1995';
    const smokingStatus = userData.smokingStatus === 'Yes' ? 'Smoker' : 'Non Smoker';
    const mobile = userData.mobileNumber ? `******${userData.mobileNumber.slice(-4)}` : '******7053';

    return { gender, dob, smokingStatus, mobile };
  };

  const handleProceed = () => {
    if (step >= 3) {
      // If we're at the last step, show the CheckConfirmation page
      setStep(4);
    } else {
      setStep(prev => prev + 1);
    }
  };

  return (
    <>
      {step === 4 ? (
        <CheckConfirmation
          confirtfirstData={confirtfirstData}
          confirmpageData={confirmpageData}
          insurancePlanData={insurancePlanData}
          addonBenefitsData={addonBenefitsData}
          userData={userData}
        />
      ) : (
        <>
          <Header formData={userData} />
          <div>
            <div className="bg-[#f8fafc] min-h-screen w-full pt-6">
              {/* Header */}
              <div className="max-w-7xl mx-auto flex items-center justify-between mb-3 px-4">
                <div className="text-xs text-gray-500 space-x-3">
                  {(() => {
                    const userInfo = getUserInfoString();
                    return (
                      <>
                        <span>{userInfo.gender}</span>
                        <span>| DOB : {userInfo.dob}</span>
                        <span>| {userInfo.smokingStatus}</span>
                        <span>| {userInfo.mobile}</span>
                        <span className="text-blue-600 font-semibold cursor-pointer ml-2">EDIT</span>
                      </>
                    );
                  })()}
                </div>
                <button className="bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-semibold shadow hover:bg-blue-800">
                  Know Your Plan in 2 mins
                </button>
              </div>
              {/* <div> */}
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {/* Left Plan Card */}
                <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 flex flex-col justify-between min-h-[410px]">
                  <div>
                    <img
                      src="https://seeklogo.com/images/I/icici-prudential-logo-8C1EAC7EAF-seeklogo.com.png"
                      className="h-7 mb-2"
                      alt="ICICI Prudential"
                    />
                    <div className="font-semibold text-gray-700 text-base mb-1">ICICI Pru iProtect Return of Premium</div>
                    <div className="flex flex-col gap-2 mt-3">
                      <div className="flex justify-between items-center border-b border-gray-100 py-1">
                        <span className="text-xs text-gray-400">Life Cover</span>
                        <span className="text-xs font-semibold">₹ 3 Crores</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-100 py-1">
                        <span className="text-xs text-gray-400">Cover Till Age</span>
                        <span className="text-xs font-semibold">60 Years</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-gray-100 py-1">
                        <span className="text-xs text-gray-400">Pay for</span>
                        <span className="text-xs font-semibold">32 Years</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-xs text-gray-400">Mode of premium payment</span>
                        <span className="text-xs font-semibold">Annual</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-7">
                    <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 flex flex-col items-center">
                      <svg width="24" height="24" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      <div className="text-xs text-gray-800 font-bold mt-2">97.8%</div>
                      <div className="text-[10px] text-gray-400">claim settlement ratio</div>
                    </div>
                    <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 flex flex-col items-center">
                      <svg width="24" height="24" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 12h8" /></svg>
                      <div className="text-xs text-gray-800 font-bold mt-2">30 Days</div>
                      <div className="text-[10px] text-gray-400 text-center">Easy Refund Policy*</div>
                    </div>
                  </div>
                </div>
                {/* 
              The previous code attempted to use React hooks (useState) inside an IIFE, which is not allowed.
              Instead, move the state and handler to the parent component, and render the step here.
              Assuming this is inside a functional component, and useState is imported.
            */}

                {/* Form Card */}
                <div className="col-span-2 flex flex-col">

                  <div className="bg-white rounded-2xl shadow border border-gray-100 mb-6 flex flex-col">
                    <div className="flex border-b">
                      <button className="flex-1 py-4 font-semibold text-blue-700 border-b-2 border-blue-700 bg-white rounded-tl-2xl">Your Details</button>
                      <button className="flex-1 py-4 font-semibold text-gray-500 hover:bg-gray-50">Upgrade Your Plan</button>
                      <button className="flex-1 py-4 font-semibold text-gray-500 hover:bg-gray-50 rounded-tr-2xl">Add-On Riders</button>
                    </div>
                    {step === 0 && (
                      <Confirtfirst
                        onFormDataChange={handleConfirtfirstDataChange}
                      />
                    )}
                    {step === 1 && <Confirmpage />}
                    {step === 2 && <InsurancePlanCards />}
                    {step === 3 && <AddonBenefitsCards />}
                  </div>
                </div>
              </div>

              {/* Free Benefits */}
              <div className="max-w-7xl mx-auto mt-10">
                <div className="text-gray-700 font-semibold text-lg text-center mb-5">
                  Free Benefits available under this plan
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 rounded-full p-3 flex items-center justify-center">
                      <svg width="32" height="32" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 12h8" /><path d="M8 16h8" /><path d="M8 8h8" /></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-800">Tax benefit</div>
                      <div className="text-xs text-gray-500">Save tax upto ₹ 46,800 every year under Section 80C and get 100% tax free returns on maturity</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boundary Conditions */}
              <div className="max-w-7xl mx-auto mt-10">
                <div className="text-gray-700 font-semibold text-lg text-center mb-4">
                  Boundary Conditions for this plan
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-blue-100 rounded-2xl p-5 flex flex-col items-center">
                    <svg width="36" height="36" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>
                    <div className="font-semibold text-gray-700 mt-3 mb-1 text-sm">Life Cover Amount</div>
                    <div className="text-xs text-gray-500">Minimum : <b>₹ 25 Lacs</b></div>
                    <div className="text-xs text-gray-500">Maximum : <b>₹ 10 Crores</b></div>
                  </div>
                  <div className="bg-white border border-blue-100 rounded-2xl p-5 flex flex-col items-center">
                    <svg width="36" height="36" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 12h8" /><path d="M8 16h8" /><path d="M8 8h8" /></svg>
                    <div className="font-semibold text-gray-700 mt-3 mb-1 text-sm">Cover yourself Upto</div>
                    <div className="text-xs text-gray-500">Minimum : <b>33 Years</b> <span className="text-gray-400">(Policy Term 5 years)</span></div>
                    <div className="text-xs text-gray-500">Maximum : <b>68 Years</b> <span className="text-gray-400">(Policy Term 40 Years)</span></div>
                  </div>
                  <div className="bg-white border border-blue-100 rounded-2xl p-5 flex flex-col items-center">
                    <svg width="36" height="36" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 12h8" /><path d="M8 16h8" /><path d="M8 8h8" /></svg>
                    <div className="font-semibold text-gray-700 mt-3 mb-1 text-sm">Frequency of payment</div>
                    <div className="text-xs text-gray-500">Monthly &nbsp;&nbsp;&nbsp;<b>₹ 4,190</b></div>
                    <div className="text-xs text-gray-500">Half Yearly &nbsp;<b>₹ 24,847</b></div>
                    <div className="text-xs text-gray-500">Annually &nbsp;&nbsp;&nbsp;&nbsp;<b>₹ 49,079</b></div>
                  </div>
                </div>

                {/* Payment Methods Block */}
                <div className="mt-4 bg-white border border-blue-100 rounded-2xl p-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex gap-3 items-center">
                      <div className="bg-blue-50 rounded-full p-2 flex items-center justify-center">
                        <svg width="32" height="32" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M15 16h-6v-2a2 2 0 1 1 4 0h2a4 4 0 0 0-8 0h2a6 6 0 0 1 12 0h2" /></svg>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-700">Regular Pay</div>
                        <div className="text-xs text-gray-500">You pay premiums throughout the policy duration</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="bg-blue-50 rounded-full p-2 flex items-center justify-center">
                        <svg width="32" height="32" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-700">Limited Pay</div>
                        <div className="text-xs text-gray-500">
                          Pay premiums for a few years and stay covered for the entire policy duration. Choose from 5,7,10,12,15 and Pay till age of 60 years.
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="bg-blue-50 rounded-full p-2 flex items-center justify-center">
                        <svg width="32" height="32" fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M20 12H4" /></svg>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-700">Single Pay</div>
                        <div className="text-xs text-gray-500">You pay premium only once and stay covered for the entire policy duration</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Disclaimer */}
                <div className="text-xs text-gray-400 my-7">
                  * You can cancel the policy within 30 days of buying and get an easy refund for your policy. However for cancellation requests within 30 days of issuance of the policy, the expenses incurred by the company on medical examination and stamp duty charges shall be deducted.
                </div>
              </div>

              {/* Footer Premium Bar */}
              <div className="max-w-7xl mx-auto bg-white border-t border-gray-200 shadow-lg z-20">
                <div className=" flex items-center justify-between py-4 px-6 max-w-none">
                  <div className="font-semibold text-gray-700">
                    Total Premium <span className="text-lg font-bold text-gray-900 ml-1">{getFallbackPrice()}</span>
                    <svg className="inline ml-1 -mt-1" width={16} height={16} fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><circle cx="12" cy="8" r="1" /></svg>
                  </div>
                  <button
                    onClick={handleProceed}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-blue-700 transition shadow">
                    PROCEED
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
