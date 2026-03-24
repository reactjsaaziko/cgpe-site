import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../headers/Header';
import Footer from '../Footer';

const PolicySummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    manufacturingMonth: 'October',
    manufacturingYear: '2023',
    carOwnedBy: 'individual', // 'company' or 'individual'
    whatsappUpdates: true,
    termsAccepted: false
  });

  // Get policy data from navigation state
  const policyData = location.state?.policy || {
    company: 'National Insurance',
    planType: '1+3 Long Term',
    idvCover: '₹8,41,120',
    premiumAmount: '₹13,861',
    gst: '₹2,495',
    totalAmount: '₹16,356',
    claimsSettled: '93%',
    features: '1 Cashless Garages',
    claims: 'Self-Video Claims',
    addons: [],
    payAsYouConsume: false
  };

  const carDetails = location.state?.carDetails || {
    selectedBrand: 'HYUNDAI',
    selectedModel: 'VERNA',
    selectedFuelType: 'Diesel',
    selectedVariant: '1.5 CRDi VGT (1493cc)',
    selectedYear: '2023',
    registration: 'GJ05',
    carPrice: '₹26,60,000',
    userDetails: {}
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = () => {
    if (!formData.termsAccepted) {
      alert('Please accept the terms & conditions to proceed');
      return;
    }
    // Navigate to payment page or process payment
    navigate('/payment', {
      state: {
        policyData,
        carDetails,
        formData
      }
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Top Navigation Bar */}
      <div className="h-1"></div>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 mr-4 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Summary</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel: Confirm & Pay */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Confirm & Pay</h2>
            
            {/* Car Manufacturing Month */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Manufacturing Month (as per RC)
              </label>
              <div className="flex gap-4">
                <select
                  value={formData.manufacturingMonth}
                  onChange={(e) => handleInputChange('manufacturingMonth', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <select
                  value={formData.manufacturingYear}
                  onChange={(e) => handleInputChange('manufacturingYear', e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                </select>
              </div>
            </div>

            {/* Car is owned by */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car is owned by
              </label>
              <div className="space-y-2">
                <label className="items-center">
                  <input
                    type="checkbox"
                    name="carOwnedBy"
                    value="company"
                    checked={formData.carOwnedBy === 'company'}
                    onChange={(e) => handleInputChange('carOwnedBy', e.target.value)}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700">A Company</span>
                </label>
                <label className="pl-4 items-center">
                  <input
                    type="checkbox"
                    name="carOwnedBy"
                    value="individual"
                    checked={formData.carOwnedBy === 'individual'}
                    onChange={(e) => handleInputChange('carOwnedBy', e.target.value)}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-700">An Individual</span>
                </label>
              </div>
            </div>

            {/* Car Details Box */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-700">
                <div className="font-medium mb-1">
                  {carDetails.selectedBrand} {carDetails.selectedModel} {carDetails.selectedVariant}
                </div>
                <div className="mb-2">
                  {carDetails.selectedFuelType} {carDetails.selectedYear} {carDetails.registration}
                </div>
                <div className="text-xs text-gray-600">
                  Car Price: {carDetails.carPrice}
                </div>
              </div>
            </div>

            {/* User Details (if available) */}
            {carDetails.userDetails && Object.keys(carDetails.userDetails).length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">User Details</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  {carDetails.userDetails.fullName && (
                    <div>Name: {carDetails.userDetails.fullName}</div>
                  )}
                  {carDetails.userDetails.mobileNumber && (
                    <div>Mobile: {carDetails.userDetails.mobileNumber}</div>
                  )}
                  {carDetails.userDetails.emailId && (
                    <div>Email: {carDetails.userDetails.emailId}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Plan Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Plan Summary</h2>
            
            {/* Insurance Provider */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mr-3 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {policyData.company.split(' ')[0]}
                </span>
              </div>
              {/* <div>
                <h3 className="font-semibold text-gray-900">{policyData.company}</h3>
              </div> */}
            </div>

            {/* Policy Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Plan type</span>
                <span className="text-sm font-medium">{policyData.planType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">IDV Cover</span>
                <span className="text-sm font-medium">{policyData.idvCover}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-sm text-gray-600">Claims Settled</span>
                <span className="text-sm font-medium">{policyData.claimsSettled}</span>
              </div> */}
              <div className="flex justify-end">
                <a href="#" className="text-blue-600 text-sm hover:underline font-medium">
                  View Inclusions <span className="text-red-500">*</span>
                </a>
              </div>
            </div>

            {/* Policy Features */}
            {/* <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Policy Features</h4>
              <div className="flex flex-wrap gap-2">
                {policyData.claims && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    {policyData.claims}
                  </span>
                )}
                {policyData.features && (
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                    {policyData.features}
                  </span>
                )}
              </div>
            </div> */}

            {/* Policy Addons */}
            {policyData.addons && policyData.addons.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Included Addons</h4>
                <div className="space-y-1">
                  {policyData.addons.map((addon, index) => (
                    <div key={index} className="text-sm text-green-600 flex items-center">
                      <span className="mr-1">✓</span>
                      {addon}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pay As You Consume */}
            {policyData.payAsYouConsume && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800 mb-3 font-medium">
                  Pay As You Consume! Choose annual driving limit. Save more on premium.
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['3,000 km/yr', '5,000 km/yr', '7,500 km/yr'].map((option) => (
                    <span key={option} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-300">
                      {option}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-300">
                    +4 more
                  </span>
                </div>
                <a href="#" className="text-xs text-yellow-800 underline hover:no-underline">know more</a>
              </div>
            )}

            {/* Payment Breakdown */}
            <div className="border-t pt-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Premium Amount</span>
                  <span className="text-sm font-medium">{policyData.premiumAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">GST @18%</span>
                  <span className="text-sm font-medium">+ {policyData.gst}</span>
                </div>
              </div>
            </div>

            {/* Total Payment */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">You'll Pay</span>
                <span className="text-2xl font-bold text-orange-600">{policyData.totalAmount}</span>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              PAY SECURELY
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* WhatsApp Updates Toggle */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span className="text-sm text-gray-700">Get Updates on WhatsApp</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.whatsappUpdates}
                  onChange={(e) => handleInputChange('whatsappUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Terms & Conditions */}
            <div className="mt-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  className="mr-3 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">terms & conditions</a>
                  {' '}and confirm: my car is not a commercial vehicle and my car has a valid PUC certificate.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Section: Next step Information */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Next step</h3>
          <p className="text-sm text-gray-700">
            After payment, we'll ask you to fill a few details and complete your KYC for policy issuance.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PolicySummary; 