import React, { useState } from "react";
import Footer from "../Footer";
import Header from "../headers/Header";

export default function TravelMedicalHistory() {
    const [hasMedicalCondition, setHasMedicalCondition] = useState(null);
    const [hasSevereDisease, setHasSevereDisease] = useState(null);

    return (
        <>
            <Header />
            <div className="flex max-h-screen items-start justify-center bg-gray-50 px-2 py-8">
                <div className="flex gap-8">
                    {/* Left - Medical Form */}
                    <div className="bg-white rounded-xl shadow-xl p-8 w-[650px]">
                        <button className="mb-4 text-[#30365f] font-semibold text-lg focus:outline-none">
                            Go back to personal details
                        </button>
                        <div className="mb-2 text-sm text-gray-600">Step 2:</div>
                        <div className="flex items-center mb-6">
                            <h2 className="text-2xl font-semibold mr-4">Medical history</h2>
                            <div className="flex space-x-2 ml-auto">
                                <span className="rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold bg-gray-200 text-gray-600">1</span>
                                <span className="rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold bg-green-500">2</span>
                                <span className="rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold bg-gray-200 text-gray-600">3</span>
                            </div>
                        </div>
                        <div className="mb-2 text-gray-800 font-medium text-base">
                            Does any of the traveller(s) have pre-existing medical conditions?
                        </div>
                        <div className="text-gray-600 text-sm mb-4">
                            Select YES if any of the traveller(s) have health issues for which they need to take regular medication as part of the long-term treatment.
                        </div>
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setHasMedicalCondition(true)}
                                className={`flex-1 px-6 py-4 rounded-lg border-2 ${hasMedicalCondition === true
                                        ? "border-blue-500 bg-blue-50 shadow"
                                        : "border-gray-300"
                                    } flex items-center gap-3 font-medium text-lg`}
                            >
                                <span
                                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${hasMedicalCondition === true
                                            ? "border-blue-500"
                                            : "border-gray-300"
                                        }`}
                                >
                                    {hasMedicalCondition === true && (
                                        <span className="w-3 h-3 rounded-full bg-blue-500 block" />
                                    )}
                                </span>
                                Yes
                            </button>
                            <button
                                onClick={() => setHasMedicalCondition(false)}
                                className={`flex-1 px-6 py-4 rounded-lg border-2 ${hasMedicalCondition === false
                                        ? "border-blue-500 bg-blue-50 shadow"
                                        : "border-gray-300"
                                    } flex items-center gap-3 font-medium text-lg`}
                            >
                                <span
                                    className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${hasMedicalCondition === false
                                            ? "border-blue-500"
                                            : "border-gray-300"
                                        }`}
                                >
                                    {hasMedicalCondition === false && (
                                        <span className="w-3 h-3 rounded-full bg-blue-500 block" />
                                    )}
                                </span>
                                No
                            </button>
                        </div>

                        {/* Additional Questions */}
                        <div className="bg-gray-50 rounded-xl border px-6 py-5 mb-8">
                            <div className="text-gray-700 font-semibold mb-3">
                                Additional Questions
                            </div>
                            <div className="mb-2 text-gray-800 font-medium">
                                Have any of the traveller suffered or suffering from any of the following diseases?
                            </div>
                            <div className="grid grid-cols-2 gap-y-1 gap-x-8 text-gray-600 text-sm mb-6">
                                <div>
                                    Cancer/ Leukemia/ Malignant Tumor <br />
                                    Major organ failure (Kidney, Liver, Heart, Lungs etc) <br />
                                    Chronic Obstructive Pulmonary Disease (COPD)/ Progressive lung disease <br />
                                    Any anaemia other than iron deficiency anaemia
                                </div>
                                <div>
                                    Cardiac Ailments <br />
                                    Neurological disorder/ Stroke/ Paralysis <br />
                                    Hepatitis B or C, Chronic liver disease, Crohns disease, Ulcerative colitis
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <button
                                    onClick={() => setHasSevereDisease(true)}
                                    className={`flex-1 py-3 rounded-lg border-2 ${hasSevereDisease === true
                                            ? "border-blue-500 bg-blue-50 shadow"
                                            : "border-gray-300"
                                        } font-medium text-lg`}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setHasSevereDisease(false)}
                                    className={`flex-1 py-3 rounded-lg border-2 ${hasSevereDisease === false
                                            ? "border-blue-500 bg-blue-50 shadow"
                                            : "border-gray-300"
                                        } font-medium text-lg`}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition">
                            Continue
                        </button>
                    </div>

                    {/* Right - Premium Summary (same as previous step) */}
                    <div className="bg-white rounded-xl shadow-xl w-[350px]">
                        <div className="border-b px-6 py-4 font-semibold text-lg text-gray-800">
                            Premium Summary
                        </div>
                        <div className="px-6 py-2 bg-blue-50 border-b text-gray-600 font-semibold">
                            Trip Details
                        </div>
                        <div className="px-6 py-4 border-b">
                            <div className="text-gray-800 font-medium mb-1">
                                Plan for: Traveller 1 (23 yrs)
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <img
                                    src="https://www.nivabupa.com/content/dam/nivabupa/icons/logo.png"
                                    alt="niva logo"
                                    className="w-8 h-8"
                                />
                                <div className="text-gray-700 text-sm">
                                    Travel Assure Lite<br />
                                    <span className="text-gray-500">Sum Insured: $100,000</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-gray-600">Premium</span>
                                <span className="text-gray-800 font-semibold">₹1,280/-</span>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-b">
                            <div className="text-gray-800 font-medium mb-1">
                                Plan for: Traveller 2 (22 yrs)
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                                <img
                                    src="https://www.nivabupa.com/content/dam/nivabupa/icons/logo.png"
                                    alt="niva logo"
                                    className="w-8 h-8"
                                />
                                <div className="text-gray-700 text-sm">
                                    Travel Assure Lite<br />
                                    <span className="text-gray-500">Sum Insured: $100,000</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-gray-600">Premium</span>
                                <span className="text-gray-800 font-semibold">₹1,280/-</span>
                            </div>
                        </div>
                        <div className="px-6 py-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>TOTAL PREMIUM</span>
                                <span>2,560/-</span>
                            </div>
                            <div className="text-sm text-gray-500 text-right">
                                (GST included)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
