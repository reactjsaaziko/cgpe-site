import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../headers/Header';
import Footer from '../Footer';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('debit');
    const [selectedBank, setSelectedBank] = useState('icici');
    const [selectedEmiType, setSelectedEmiType] = useState('credit');
    const [showBankDropdown, setShowBankDropdown] = useState(false);
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        nameOnCard: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });

    // Get data from navigation state
    const policyData = location.state?.policyData || {
        company: 'National Insurance',
        planType: '1+3 Long Term',
        idvCover: '₹8,41,120',
        premiumAmount: '₹13,861',
        gst: '₹2,495',
        totalAmount: '₹16,356'
    };

    const carDetails = location.state?.carDetails || {
        selectedBrand: 'HYUNDAI',
        selectedModel: 'VERNA',
        selectedFuelType: 'Diesel',
        selectedVariant: '1.5 CRDi VGT (1493cc)',
        selectedYear: '2023',
        registration: 'GJ05',
        carPrice: '₹26,60,000',
        userDetails: {
            fullName: 'Aakash Kumar',
            mobileNumber: '7698765453',
            emailId: 'aakash@gmail.com'
        }
    };

    const paymentModes = [
        { id: 'debit', name: 'Debit Card', icon: '💳' },
        { id: 'credit', name: 'Credit Card', icon: '💳' },
        { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
        { id: 'upi', name: 'UPI', icon: '📱' },
        { id: 'emi', name: 'EMI', icon: '💰' }
    ];

    const banks = [
        { id: 'hdfc', name: 'HDFC BANK', logo: '/assets/images/hdfc-bank.png' },
        { id: 'axis', name: 'AXIS BANK', logo: '/assets/images/axis-bank.png' },
        { id: 'sbi', name: 'State Bank of India', logo: '/assets/images/sbi-bank.png' },
        { id: 'icici', name: 'ICICI Bank', logo: '/assets/images/icici-bank.png' }
    ];

    const emiBanks = [
        { id: 'axis', name: 'Axis Bank' },
        { id: 'sbi', name: 'SBI Bank' },
        { id: 'icici', name: 'ICICI Bank' },
        { id: 'hdfc', name: 'HDFC Bank' }
    ];

    const handlePaymentModeChange = (mode) => {
        setSelectedPaymentMode(mode);
    };

    const handleBankSelection = (bankId) => {
        setSelectedBank(bankId);
    };

    const handleEmiTypeChange = (emiType) => {
        setSelectedEmiType(emiType);
    };

    const handleGenerateQRCode = () => {
        setQrCodeGenerated(true);
        // In a real app, this would generate an actual QR code
        setTimeout(() => {
            alert('QR Code generated successfully! Please scan with your UPI app.');
        }, 1000);
    };

    const handleCardDetailChange = (field, value) => {
        setCardDetails(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePayment = () => {
        // Validate card details
        if (!cardDetails.cardNumber || !cardDetails.nameOnCard || !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.cvv) {
            alert('Please fill in all card details');
            return;
        }

        // Process payment logic here
        alert('Payment processing... Redirecting to success page');
        navigate('/payment-success', {
            state: {
                policyData,
                carDetails,
                paymentDetails: cardDetails
            }
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen">
            <Header />

            <div className="bg-[#f8fafc] min-h-screen py-8 px-4">
                {/* Header */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between border-b pb-2 mb-4">
                        <img src="/assets/images/ICICI_logo.png.png" alt="ICICI Prudential" className="h-10" />
                        <div className="flex-1 text-center">
                            <span className="font-semibold text-lg text-[#23294a]">
                                Please Review Below Details Before Proceeding Ahead.
                            </span>
                            <div className="text-yellow-600 flex items-center justify-center text-[15px] mt-1">
                                <span className="mr-2 text-lg">⚠️</span>
                                <span className="font-semibold">
                                    These Cannot Be Changed At A Later Stage
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-7">
                    {/* Left: Payment section */}
                    <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 p-7">
                        <div className="font-semibold text-xl text-[#23294a] mb-6">
                            Choose Payment Mode
                        </div>
                        <div className="flex gap-6">
                            {/* Payment Modes */}
                            <div className="flex flex-col gap-2 w-48">
                                {[
                                    { id: "debit", label: "Debit Card", icon: "../assets/images/debit.png" },
                                    { id: "credit", label: "Credit Card", icon: "../assets/images/credit.png" },
                                    { id: "netbanking", label: "Net Banking", icon: "../assets/images/netbanking.png" },
                                    { id: "upi", label: "UPI", icon: "../assets/images/upi.png" },
                                    { id: "emi", label: "EMI", icon: "../assets/images/emi.png" },
                                ].map((m, idx) => (
                                    <button
                                        key={m.id}
                                        onClick={() => handlePaymentModeChange(m.id)}
                                        className={`flex items-center px-4 py-3 text-[17px] font-semibold rounded-md border
                  ${selectedPaymentMode === m.id
                                                ? "bg-[#e8f0fe] border-blue-400 text-[#2447b5]"
                                                : "bg-white border-gray-200 text-[#23294a]"}
                `}
                                    >
                                        <img src={m.icon} alt={m.label} className="w-7 h-7 mr-3" />
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                            {/* Payment Form */}
                            <div className="flex-1 pl-10">
                                <div className="text-lg font-semibold text-[#23294a] mb-4">
                                    {selectedPaymentMode === 'debit' ? 'Debit Card Details' : 
                                     selectedPaymentMode === 'credit' ? 'Credit Card Details' :
                                     selectedPaymentMode === 'netbanking' ? 'Net Banking Details' :
                                     selectedPaymentMode === 'upi' ? 'UPI Details' :
                                     selectedPaymentMode === 'emi' ? 'EMI Details' : 'Debit Card Details'}
                                </div>
                                {selectedPaymentMode === 'netbanking' ? (
                                    <div className="space-y-4">
                                        {/* Bank Selection Grid */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {banks.map((bank) => (
                                                <button
                                                    key={bank.id}
                                                    onClick={() => handleBankSelection(bank.id)}
                                                    className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                                                        selectedBank === bank.id
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-gray-100 rounded mr-3 flex items-center justify-center">
                                                            <span className="text-xs font-semibold text-gray-600">
                                                                {bank.name.split(' ')[0]}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {bank.name}
                                                        </span>
                                                    </div>
                                                    <svg className={`w-5 h-5 ${
                                                        selectedBank === bank.id ? 'text-blue-600' : 'text-gray-400'
                                                    }`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Select Other Bank */}
                                        <div className="border-t pt-4">
                                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                                Select Other Bank
                                            </label>
                                            <select 
                                                className="border border-gray-300 rounded-md px-3 py-2 w-full text-base"
                                                onChange={(e) => handleBankSelection(e.target.value)}
                                                value={selectedBank}
                                            >
                                                <option value="">Select Bank</option>
                                                {banks.map((bank) => (
                                                    <option key={bank.id} value={bank.id}>
                                                        {bank.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                                                                 <button className="bg-[#2447b5] text-white font-semibold text-lg rounded-md px-6 py-3 mt-3 hover:bg-[#17337e] transition w-full">
                                             PAY ₹ {policyData.totalAmount.replace('₹', '')}
                                         </button>
                                     </div>
                                 ) : selectedPaymentMode === 'upi' ? (
                                     <div className="space-y-4">
                                         <div className="text-center">
                                             <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                 Pay Using QR Code
                                             </h3>
                                             <p className="text-sm text-gray-600 mb-6">
                                                 Click To View & Scan QR Code With Your Preferred UPI App
                                             </p>
                                             
                                             {/* QR Code Container */}
                                             <div className="relative bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-6 shadow-sm">
                                                 <div className="w-64 h-64 mx-auto bg-white rounded-lg flex items-center justify-center">
                                                     {qrCodeGenerated ? (
                                                         <div className="text-center">
                                                             {/* QR Code Placeholder */}
                                                             <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                                                 <div className="grid grid-cols-8 gap-1 w-32 h-32">
                                                                     {/* QR Code Pattern */}
                                                                     {Array.from({ length: 64 }, (_, i) => (
                                                                         <div 
                                                                             key={i} 
                                                                             className={`w-3 h-3 rounded-sm ${
                                                                                 Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'
                                                                             }`}
                                                                         />
                                                                     ))}
                                                                 </div>
                                                             </div>
                                                             <p className="text-sm text-gray-600">
                                                                 Amount: ₹{policyData.totalAmount.replace('₹', '')}
                                                             </p>
                                                         </div>
                                                     ) : (
                                                         <div className="text-center">
                                                             <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                                                 <span className="text-gray-400 text-sm">QR Code will appear here</span>
                                                             </div>
                                                         </div>
                                                     )}
                                                 </div>
                                                 
                                                 {/* Generate QR Code Button */}
                                                 <button
                                                     onClick={handleGenerateQRCode}
                                                     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2447b5] text-white font-semibold text-lg rounded-lg px-8 py-3 hover:bg-[#17337e] transition shadow-lg"
                                                     disabled={qrCodeGenerated}
                                                 >
                                                     {qrCodeGenerated ? 'QR CODE GENERATED' : 'GENERATE QR CODE'}
                                                 </button>
                                             </div>
                                             
                                             <div className="text-center">
                                                 <p className="text-xs text-gray-500 mb-4">
                                                     Supported UPI Apps: Google Pay, PhonePe, Paytm, BHIM, and more
                                                 </p>
                                             </div>
                                         </div>
                                     </div>
                                 ) : selectedPaymentMode === 'emi' ? (
                                     <div className="space-y-4">
                                         {/* EMI Type Tabs */}
                                         <div className="flex border-b border-gray-200 mb-6">
                                             {[
                                                 { id: 'credit', label: 'Credit Card' },
                                                 { id: 'debit', label: 'Debit Card' },
                                                 { id: 'cardless', label: 'Cardless EMI' }
                                             ].map((emiType) => (
                                                 <button
                                                     key={emiType.id}
                                                     onClick={() => handleEmiTypeChange(emiType.id)}
                                                     className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                                         selectedEmiType === emiType.id
                                                             ? 'border-gray-400 text-gray-700'
                                                             : 'border-transparent text-gray-500 hover:text-gray-700'
                                                     }`}
                                                 >
                                                     {emiType.label}
                                                 </button>
                                             ))}
                                         </div>

                                                                                   {/* Bank Selection or Early Salary based on EMI type */}
                                          <div className="space-y-4">
                                              {selectedEmiType === 'cardless' ? (
                                                  // Cardless EMI - Early Salary field
                                                  <div className="relative">
                                                      <label className="block text-gray-700 text-sm font-medium mb-2">
                                                          Early Salary
                                                      </label>
                                                      <div className="relative">
                                                          <input
                                                              type="text"
                                                              className="w-full border border-gray-300 rounded-md px-4 py-3 text-left bg-white text-gray-500"
                                                              placeholder="Early Salary"
                                                              readOnly
                                                          />
                                                      </div>
                                                  </div>
                                              ) : (
                                                  // Credit/Debit Card EMI - Bank Selection
                                                  <div className="relative">
                                                      <label className="block text-gray-700 text-sm font-medium mb-2">
                                                          Select Bank
                                                      </label>
                                                      <div className="relative">
                                                          <button
                                                              className="w-full border border-gray-300 rounded-md px-4 py-3 text-left bg-white flex items-center justify-between"
                                                              onClick={() => setShowBankDropdown(!showBankDropdown)}
                                                          >
                                                              <span className={selectedBank ? 'text-gray-900' : 'text-gray-500'}>
                                                                  {selectedBank ? emiBanks.find(bank => bank.id === selectedBank)?.name : 'Select Bank'}
                                                              </span>
                                                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                              </svg>
                                                          </button>
                                                          
                                                          {/* Bank Dropdown */}
                                                          {showBankDropdown && (
                                                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                                  {emiBanks.map((bank) => (
                                                                      <button
                                                                          key={bank.id}
                                                                          onClick={() => {
                                                                              setSelectedBank(bank.id);
                                                                              setShowBankDropdown(false);
                                                                          }}
                                                                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                                                      >
                                                                          {bank.name}
                                                                      </button>
                                                                  ))}
                                                              </div>
                                                          )}
                                                      </div>
                                                  </div>
                                              )}

                                              <button className="bg-[#2447b5] text-white font-semibold text-lg rounded-md px-6 py-3 mt-3 hover:bg-[#17337e] transition w-full">
                                                  PAY ₹ {policyData.totalAmount.replace('₹', '')}
                                              </button>
                                          </div>
                                     </div>
                                 ) : (
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm mb-1">Card Number</label>
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg bg-[#fafbfc]"
                                                placeholder="****  ****  ****  ****"
                                                readOnly
                                            />          
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm mb-1">Name On Card</label>
                                            <input
                                                type="text"
                                                className="border border-gray-300 rounded-md px-4 py-2 w-full text-lg"
                                                placeholder="Enter Name Given On Card"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div>
                                                <label className="block text-gray-700 text-sm mb-1">Expiry Date</label>
                                                <div className="flex gap-2">
                                                    <select className="border border-gray-300 rounded-md px-2 py-2 bg-[#fafbfc] text-base">
                                                        <option>MM</option>
                                                    </select>
                                                    <select className="border border-gray-300 rounded-md px-2 py-2 bg-[#fafbfc] text-base">
                                                        <option>YY</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-sm mb-1">CVV</label>
                                                <input
                                                    type="password"
                                                    className="border border-gray-300 rounded-md px-4 py-2 w-24 text-lg"
                                                    maxLength={3}
                                                    placeholder="***"
                                                />
                                            </div>
                                        </div>
                                        <button className="bg-[#2447b5] text-white font-semibold text-lg rounded-md px-6 py-3 mt-3 hover:bg-[#17337e] transition w-full">
                                            PAY ₹ {policyData.totalAmount.replace('₹', '')}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                        {/* Footer links */}
                        <div className="flex flex-wrap items-center justify-center gap-7 mt-10 text-blue-600 text-[15px]">
                            <a href="#" className="hover:underline">Privacy Policy</a>
                            <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                            <a href="#" className="hover:underline">FAQ</a>
                            <a href="#" className="hover:underline">How SI Works?</a>
                        </div>
                    </div>
                    {/* Right: Proposer/Cart summary */}
                    <div className="w-full md:w-[500px] flex flex-col gap-6">
                        {/* Proposer Details */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 px-6 py-4 mb-4">
                            <div className="font-semibold text-[16px] mb-3">Proposer’s Details</div>
                            <div className="flex items-center mb-2">
                                <img src="/assets/images/mail.png" alt="Gmail" className="w-6 h-6 mr-2" />
                                <span className="text-[15px] font-medium">Aa**Ko@Gmail.Com</span>
                            </div>
                            <div className="flex items-center">
                                <img src="/assets/images/phone.png" alt="Phone" className="w-6 h-6 mr-2" />
                                <span className="text-[15px]">76******53</span>
                            </div>
                        </div>
                        {/* Cart */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 px-6 py-4">
                            <div className="flex justify-between mb-1">
                                <div className="font-semibold text-[16px]">Your Cart</div>
                                <div className="text-gray-500 text-sm">Order No. PB80234446</div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 mb-1">
                                <img src="/assets/images/ICICI_logo.png.png" alt="ICICI" className="w-20 h-8" />
                                <div className="font-semibold text-[15px] text-[#283356]">
                                    ICICI Pru IProtect Return Of Premium
                                </div>
                            </div>
                            <div className="grid grid-cols-3 text-[15px] mb-2 mt-3">
                                <div>
                                    <div className="text-gray-500 text-xs">Policy Type</div>
                                    <div className="font-bold">TermLife</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs">Proposal No.</div>
                                    <div className="font-bold">OP00654621</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs">Amount</div>
                                    <div className="font-bold">49,079.00</div>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 mt-2 pt-2">
                                <div className="text-gray-500 text-xs mb-1">Total Amount (Inclusive GST)</div>
                                <div className="text-right font-bold text-lg text-[#283356]">
                                    ₹ 10,3056.00
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PaymentPage; 