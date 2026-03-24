import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InvestmentPayment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("netbanking");

  const handlePayment = () => {
    // Handle payment logic here
    alert("Payment processing...");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <img
            src="/assets/images/BAJAJ_logo.png.png"
            alt="Bajaj Allianz"
            className="h-8 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Payment Details</h1>
          <p className="text-gray-600 mt-2">Complete your investment</p>
        </div>

        <div className="space-y-6">
          {/* Investment Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Investment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Amount:</span>
                <span className="font-medium">₹10,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frequency:</span>
                <span className="font-medium">Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pay For:</span>
                <span className="font-medium">10 Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maturity:</span>
                <span className="font-medium">20 Years</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Premium:</span>
                  <span className="text-blue-600">₹12,00,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Select Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === "netbanking"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <img src="/assets/images/netbanking.png" alt="Net Banking" className="h-6 mr-3" />
                  <span>Net Banking</span>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <img src="/assets/images/upi.png" alt="UPI" className="h-6 mr-3" />
                  <span>UPI</span>
                </div>
              </label>

              <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <img src="/assets/images/credit.png" alt="Card" className="h-6 mr-3" />
                  <span>Credit/Debit Card</span>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/investment-plan-config")}
              className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Pay ₹10,000
            </button>
          </div>

          {/* Security Notice */}
          <div className="text-xs text-gray-500 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Payment Gateway
            </div>
            Your payment information is encrypted and secure
          </div>
        </div>
      </div>
    </div>
  );
} 