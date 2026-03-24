import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { usePricing } from '../../context/PricingContext';

const paymentModes = [
    { name: "Debit Card", icon: "💳" },
    { name: "Credit Card", icon: "💳" },
    { name: "Net Banking", icon: "🏦" },
    { name: "UPI", icon: <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" alt="GPay" className="h-4 inline-block" /> },
];

export default function PaymentScreen() {
    const [mode, setMode] = useState("Debit Card");
    const { getFormattedPrice, paymentMode } = usePricing();
    const location = useLocation();
    
    // Get plan data from location state or localStorage
    const getPlanData = () => {
        if (location.state && location.state.planData) {
            return location.state.planData;
        }
        // Fallback to localStorage
        const savedPlanData = localStorage.getItem('paymentPlanData');
        if (savedPlanData) {
            try {
                return JSON.parse(savedPlanData);
            } catch (e) {
                console.error('Error parsing saved plan data:', e);
            }
        }
        return null;
    };
    
    // Fallback price calculation if pricing context fails
    const getFallbackPrice = () => {
        const planData = getPlanData();
        if (planData) {
            const price = paymentMode === 'yearly' ? planData.yearlyPrice : planData.monthlyPrice;
            const period = paymentMode === 'yearly' ? 'Yearly' : 'Monthly';
            if (price) {
                return `₹ ${price} ${period}`;
            }
        }
        return getFormattedPrice() || '₹ 10000 Monthly';
    };
    
    // Get the numeric price for payment buttons
    const getNumericPrice = () => {
        const planData = getPlanData();
        if (planData) {
            const price = paymentMode === 'yearly' ? planData.yearlyPrice : planData.monthlyPrice;
            if (price && typeof price === 'string') {
                return price.replace(/[^\d]/g, '');
            } else if (price && typeof price === 'number') {
                return price.toString();
            }
        }
        // Extract numeric value from getFormattedPrice
        const formattedPrice = getFormattedPrice();
        if (formattedPrice && typeof formattedPrice === 'string') {
            return formattedPrice.replace(/[^\d]/g, '');
        }
        // Fallback to default price
        return '10000';
    };

    return (
        <div>
            <div className="max-h-[1000px] h-[790px] bg-white flex flex-col items-center pt-6 pb-12 px-2">
                {/* Header */}
                <div className="flex flex-col items-center mb-5">
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
                {/* Payment Card */}
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6 border">
                    {/* Main Content: Left - Payment Form | Right - User & Cart */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Payment Mode and Details */}
                        <div className="flex flex-1 gap-5">
                            {/* Payment Mode List */}
                            <div className="flex flex-col gap-0.5">
                                {paymentModes.map(({ name, icon }) => (
                                    <button
                                        key={name}
                                        className={`flex items-center gap-3 px-5 py-3 border rounded-md text-base font-medium w-44 mb-1 transition 
                    ${mode === name
                                                ? "border-blue-600 bg-blue-50 text-blue-700"
                                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                        onClick={() => setMode(name)}
                                        type="button"
                                    >
                                        <span className="text-2xl">{icon}</span> {name}
                                    </button>
                                ))}
                            </div>
                            {/* Payment Details */}
                            <div className="flex-1">
                                {/* Section Heading */}
                                <div className="font-semibold text-lg mb-5">{mode} Details</div>
                                {/* Debit/Credit Card Fields */}
                                {(mode === "Debit Card" || mode === "Credit Card") && (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="****  ****  ****  ****"
                                                className="w-full border rounded px-3 py-2 mb-2 text-lg tracking-widest"
                                                maxLength={19}
                                                disabled
                                            />
                                            <span className="ml-2 text-xs font-medium text-gray-500">
                                                cardtypes 1
                                            </span>
                                            <span className="flex items-center gap-1 ml-2">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/RuPay.svg/50px-RuPay.svg.png" alt="RuPay" className="h-5" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Mastercard-logo.png" alt="Mastercard" className="h-5" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter Name Given On Card"
                                            className="w-full border rounded px-3 py-2 mb-3"
                                            disabled
                                        />
                                        <div className="flex gap-3 mb-6">
                                            <select className="border rounded px-2 py-2" disabled>
                                                <option>MM</option>
                                            </select>
                                            <select className="border rounded px-2 py-2" disabled>
                                                <option>YY</option>
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="CVV"
                                                className="w-16 border rounded px-3 py-2"
                                                maxLength={3}
                                                disabled
                                            />
                                        </div>
                                        <button
                                            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded mb-4 text-lg transition"
                                            type="button"
                                            disabled
                                        >
                                            PAY ₹ {getNumericPrice()}.00
                                        </button>
                                    </>
                                )}
                                {/* Net Banking Fields */}
                                {mode === "Net Banking" && (
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            className="w-full border rounded px-3 py-2 mb-3"
                                            placeholder="Enter Bank Name"
                                            disabled
                                        />
                                        <button className="w-full bg-blue-700 text-white font-semibold py-3 rounded mb-4 text-lg" disabled>
                                            PAY ₹ {getNumericPrice()}.00
                                        </button>
                                    </div>
                                )}
                                {/* UPI Fields */}
                                {mode === "UPI" && (
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            className="w-full border rounded px-3 py-2 mb-3"
                                            placeholder="Enter UPI ID"
                                            disabled
                                        />
                                        <button className="w-full bg-blue-700 text-white font-semibold py-3 rounded mb-4 text-lg" disabled>
                                            PAY ₹ {getNumericPrice()}.00
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Right: Proposer Details & Cart */}
                        <div className="flex flex-col gap-5 min-w-[310px]">
                            {/* Proposer's Details */}
                            <div className="bg-gray-50 border rounded-xl p-4 flex flex-col gap-2">
                                <div className="font-semibold text-gray-700 text-base mb-2">Proposer's Details</div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <span>
                                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/gmail.svg" alt="Gmail" className="h-5 w-5 mr-1" style={{ display: "inline-block" }} />
                                    </span>
                                    <span>Aa**Ko@Gmail.Com</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <span>
                                        <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="phone" className="h-5 w-5 mr-1" style={{ display: "inline-block" }} />
                                    </span>
                                    <span>76******53</span>
                                </div>
                            </div>
                            {/* Cart */}
                            <div className="bg-gray-50 border rounded-xl p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="font-semibold text-gray-700 text-base">Your Cart</div>
                                    <div className="text-sm text-gray-500 font-medium">
                                        Order No. PB80234446
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/ICICI_Prudential_Life_Logo.svg" alt="ICICI" className="h-5" />
                                    <span className="text-gray-700 text-sm">ICICI Pru IProtect Return Of Premium</span>
                                </div>
                                <div className="text-xs text-gray-600 mb-1 flex flex-wrap gap-3">
                                    <span>
                                        <b>Policy Type:</b> TermLife
                                    </span>
                                    <span>
                                        <b>Proposal No.:</b> OP00654621
                                    </span>
                                    <span>
                                        <b>Amount:</b> {getNumericPrice()}.00
                                    </span>
                                </div>
                                <hr className="my-2 border-gray-300" />
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-semibold text-gray-700 text-lg">Total Amount</span>
                                    <span className="font-bold text-xl text-gray-900">₹ {getNumericPrice()}.00</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">(Inclusive GST)</div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center items-center gap-8 pt-5 border-t">
                        <a href="#" className="text-blue-700 text-sm font-medium hover:underline">Privacy Policy</a>
                        <a href="#" className="text-blue-700 text-sm font-medium hover:underline">Terms & Conditions</a>
                        <a href="#" className="text-blue-700 text-sm font-medium hover:underline">FAQ</a>
                        <a href="#" className="text-blue-700 text-sm font-medium hover:underline">How SI Works?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
