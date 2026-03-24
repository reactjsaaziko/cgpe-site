import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FundPerformance({ onClose }) {
  const navigate = useNavigate();
  const [returnType, setReturnType] = useState("pointToPoint");
  const [performanceTab, setPerformanceTab] = useState("fundPerformance");

  const funds = [
    {
      id: 1,
      name: "Midcap Index Fund",
      type: "Mid Cap 150 Index",
      risk: "high",
      tag: "New Fund Offer",
      fundSize: "N.A",
      nav: "N.A",
      performance: {
        "7Years": "NFO",
        "10Years": "NFO",
        "RSI": "NFO"
      },
      rsiValue: "16.2%",
      isNewFund: true
    },
    {
      id: 2,
      name: "Accelerator Mid-Cap Fund",
      type: "",
      risk: "high",
      fundSize: "5,198 Cr",
      nav: "59.18",
      navChange: "0%",
      performance: {
        "7Years": "12.2%",
        "10Years": "18%",
        "RSI": "13.7%"
      }
    },
    {
      id: 3,
      name: "Small Cap Fund",
      type: "",
      risk: "high",
      tag: "New Fund",
      fundSize: "523 Cr",
      performance: {
        "7Years": "N.A",
        "10Years": "N.A",
        "RSI": "26.7%"
      },
      isHighestRSI: true
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high":
        return "bg-red-500";
      case "moderate":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full mx-auto relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex gap-8">
            <button 
              onClick={onClose}
              className="text-gray-400 font-semibold text-base hover:text-gray-600 transition"
            >
              Plan Benefits
            </button>
            <button className="text-[#2b2d42] font-semibold text-base border-b-2 border-[#4b93f6] pb-1">
              Fund Performance
            </button>
          </div>
          <button 
            onClick={onClose}
            className="bg-[#4b93f6] p-2 rounded-full hover:bg-blue-600 transition"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Return Type Toggle */}
        <div className="bg-purple-50 p-4">
          <div className="flex items-center justify-center gap-4">
            <span className={`font-medium ${returnType === "pointToPoint" ? "text-[#4b93f6]" : "text-gray-500"}`}>
              Point to Point Returns
            </span>
            <div className="relative">
              <input
                type="checkbox"
                id="returnToggle"
                className="sr-only"
                checked={returnType === "rolling"}
                onChange={() => setReturnType(returnType === "pointToPoint" ? "rolling" : "pointToPoint")}
              />
              <label
                htmlFor="returnToggle"
                className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out cursor-pointer ${
                  returnType === "rolling" ? "bg-[#4b93f6]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                    returnType === "rolling" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </label>
            </div>
            <span className={`font-medium ${returnType === "rolling" ? "text-[#4b93f6]" : "text-gray-500"}`}>
              Rolling Returns
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Fund Performance Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setPerformanceTab("fundPerformance")}
                className={`flex-1 py-3 px-4 font-medium text-sm transition ${
                  performanceTab === "fundPerformance"
                    ? "text-[#4b93f6] border-b-2 border-[#4b93f6]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Fund Performance
              </button>
              <button
                onClick={() => setPerformanceTab("fundVSBenchmarks")}
                className={`flex-1 py-3 px-4 font-medium text-sm transition ${
                  performanceTab === "fundVSBenchmarks"
                    ? "text-[#4b93f6] border-b-2 border-[#4b93f6]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Fund VS Benchmarks
              </button>
            </div>

            {/* Fund Overview */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/images/BAJAJ_logo.png.png"
                    alt="Bajaj Allianz Life"
                    className="h-8"
                  />
                  <div>
                    <div className="text-sm text-gray-600">AUM: ₹ 21,515 Cr</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Return Combination:</span>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>7yr - 10yr - RSI*</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Risk Legend */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>High Risk High Return</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Moderate Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Low Risk</span>
                </div>
              </div>
            </div>

            {/* Performance Table */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  Performance (as on 01-Nov-2023)
                </div>
                <div className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  Includes 13 Funds
                </div>
              </div>

              {/* Table Headers */}
              <div className="grid grid-cols-4 gap-4 mb-3 text-sm font-medium text-gray-600 border-b border-gray-200 pb-2">
                <div>Fund Name</div>
                <div className="text-center">7 Years</div>
                <div className="text-center">10 Years</div>
                <div className="text-center">RSI*</div>
              </div>

              {/* Fund Listings */}
              {funds.map((fund) => (
                <div key={fund.id} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100">
                  {/* Fund Name Column */}
                  <div className="flex items-start gap-2">
                    <div className={`w-3 h-3 ${getRiskColor(fund.risk)} rounded-full mt-2 flex-shrink-0`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{fund.name}</div>
                      {fund.type && <div className="text-xs text-gray-500">{fund.type}</div>}
                      {fund.tag && (
                        <div className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded mt-1">
                          {fund.tag}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Fund Size: {fund.fundSize}
                      </div>
                      {fund.nav !== "N.A" && (
                        <div className="text-xs text-gray-500">
                          NAV: {fund.nav} <span className="text-green-600">{fund.navChange}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 7 Years Column */}
                  <div className="text-center">
                    <div className="text-sm font-medium">{fund.performance["7Years"]}</div>
                    {fund.performance["7Years"] !== "NFO" && fund.performance["7Years"] !== "N.A" && (
                      <div className="text-xs text-green-600">{fund.performance["7Years"]}</div>
                    )}
                  </div>

                  {/* 10 Years Column */}
                  <div className="text-center">
                    <div className="text-sm font-medium">{fund.performance["10Years"]}</div>
                    {fund.performance["10Years"] !== "NFO" && fund.performance["10Years"] !== "N.A" && (
                      <div className="text-xs text-green-600">{fund.performance["10Years"]}</div>
                    )}
                    {fund.performance["10Years"] === "NFO" && (
                      <div className="text-xs text-green-600">21%</div>
                    )}
                  </div>

                  {/* RSI Column */}
                  <div className="text-center relative">
                    <div className="text-sm font-medium">{fund.performance["RSI"]}</div>
                    {fund.performance["RSI"] !== "NFO" && fund.performance["RSI"] !== "N.A" && (
                      <div className="text-xs text-green-600">{fund.performance["RSI"]}</div>
                    )}
                    {fund.performance["RSI"] === "NFO" && (
                      <div className="text-xs text-green-600">{fund.rsiValue}</div>
                    )}
                    {fund.isHighestRSI && (
                      <div className="text-xs text-blue-600 font-medium">Highest RSI*</div>
                    )}
                    {fund.performance["RSI"] !== "NFO" && fund.performance["RSI"] !== "N.A" && (
                      <button className="absolute right-0 top-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Lumpsum Payout</div>
              <div className="text-2xl font-bold text-gray-800">₹1.41 Cr</div>
              <div className="text-sm text-gray-500">If you had invested 20 yrs ago</div>
            </div>
            <button 
              onClick={() => navigate("/investment-plan-config")}
              className="bg-[#4b93f6] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200 shadow-md"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 