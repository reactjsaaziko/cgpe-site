// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../Header";
// import Footer from "../Footer";

// const TravelPersonalDetails = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         fullName: "",
//         noLastName: false,
//         gender: "",
//         dateOfBirth: "",
//         nationality: "Indian"
//     });

//     const handleInputChange = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     const handleContinue = () => {
//         // Validate form data
//         if (!formData.fullName || !formData.gender || !formData.dateOfBirth) {
//             alert("Please fill in all required fields");
//             return;
//         }

//         // Save form data to localStorage or context
//         localStorage.setItem("travelPersonalDetails", JSON.stringify(formData));

//         // Navigate to next step
//         navigate("/travel-step-2");
//     };

//     const handleBackToQuotes = () => {
//         navigate("/travel-policy-suggestions");
//     };

//     return (
//         <>
//             <Header />
//             <div className="min-h-screen bg-gray-50 py-8">
//                 <div className="max-w-6xl mx-auto px-4">
//                     {/* Back to quotes link */}
//                     <button
//                         onClick={handleBackToQuotes}
//                         className="text-blue-600 hover:text-blue-800 font-medium mb-6 flex items-center gap-2"
//                     >
//                         <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//                         </svg>
//                         Go back to quotes
//                     </button>

//                     <div className="flex flex-col lg:flex-row gap-8">
//                         {/* Left Section: Personal Details Form */}
//                         <div className="flex-1 bg-white rounded-xl shadow-sm p-8">
//                             <h1 className="text-2xl font-semibold text-gray-800 mb-6">
//                                 Step 1: Personal details
//                             </h1>

//                             {/* Progress Indicator */}
//                             <div className="flex items-center mb-8">
//                                 <div className="flex items-center">
//                                     <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
//                                         1
//                                     </div>
//                                     <div className="w-16 h-1 bg-gray-300 mx-2"></div>
//                                     <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
//                                         2
//                                     </div>
//                                     <div className="w-16 h-1 bg-gray-300 mx-2"></div>
//                                     <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
//                                         3
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Traveller Info */}
//                             <div className="mb-6">
//                                 <h2 className="text-lg font-medium text-gray-800 mb-4">
//                                     Traveller 1 (23 yrs)
//                                 </h2>

//                                 {/* Full Name */}
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Enter full name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.fullName}
//                                         onChange={(e) => handleInputChange("fullName", e.target.value)}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="Enter your full name"
//                                     />
//                                 </div>

//                                 {/* No Last Name Checkbox */}
//                                 <div className="mb-4">
//                                     <label className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             checked={formData.noLastName}
//                                             onChange={(e) => handleInputChange("noLastName", e.target.checked)}
//                                             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                         />
//                                         <span className="ml-2 text-sm text-gray-700">
//                                             Don't have a last name as per the passport
//                                         </span>
//                                     </label>
//                                 </div>

//                                 {/* Gender Selection */}
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Gender
//                                     </label>
//                                     <div className="flex gap-4">
//                                         <button
//                                             type="button"
//                                             onClick={() => handleInputChange("gender", "male")}
//                                             className={`px-6 py-3 rounded-lg border-2 font-medium transition ${
//                                                 formData.gender === "male"
//                                                     ? "border-blue-600 bg-blue-50 text-blue-600"
//                                                     : "border-gray-300 text-gray-700 hover:border-gray-400"
//                                             }`}
//                                         >
//                                             Male
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => handleInputChange("gender", "female")}
//                                             className={`px-6 py-3 rounded-lg border-2 font-medium transition ${
//                                                 formData.gender === "female"
//                                                     ? "border-blue-600 bg-blue-50 text-blue-600"
//                                                     : "border-gray-300 text-gray-700 hover:border-gray-400"
//                                             }`}
//                                         >
//                                             Female
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* Date of Birth */}
//                                 <div className="mb-4">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Enter date of birth (DD-MM-YYYY)
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.dateOfBirth}
//                                         onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         placeholder="DD-MM-YYYY"
//                                     />
//                                 </div>

//                                 {/* Nationality */}
//                                 <div className="mb-6">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Nationality
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={formData.nationality}
//                                         onChange={(e) => handleInputChange("nationality", e.target.value)}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Continue Button */}
//                             <button
//                                 onClick={handleContinue}
//                                 className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
//                             >
//                                 Continue
//                             </button>
//                         </div>

//                         {/* Right Section: Premium Summary */}
//                         <div className="lg:w-80">
//                             <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
//                                 <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                                     Premium Summary
//                                 </h2>

//                                 {/* Trip Details */}
//                                 <div className="mb-6">
//                                     <h3 className="text-lg font-medium text-gray-800 mb-4">
//                                         Trip Details
//                                     </h3>

//                                     {/* Traveller 1 */}
//                                     <div className="border-b border-gray-200 pb-4 mb-4">
//                                         <div className="flex items-start gap-3">
//                                             <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
//                                                 <span className="text-blue-600 font-bold text-xs">NB</span>
//                                             </div>
//                                             <div className="flex-1">
//                                                 <div className="text-sm text-gray-600 mb-1">Traveller 1 (23 yrs)</div>
//                                                 <div className="font-medium text-gray-800 mb-1">Travel Assure Lite</div>
//                                                 <div className="text-sm text-gray-600 mb-1">Sum Insured: $100,000</div>
//                                                 <div className="text-lg font-bold text-blue-600">₹1,280/-</div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Traveller 2 */}
//                                     <div className="border-b border-gray-200 pb-4 mb-4">
//                                         <div className="flex items-start gap-3">
//                                             <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
//                                                 <span className="text-blue-600 font-bold text-xs">NB</span>
//                                             </div>
//                                             <div className="flex-1">
//                                                 <div className="text-sm text-gray-600 mb-1">Traveller 2 (22 yrs)</div>
//                                                 <div className="font-medium text-gray-800 mb-1">Travel Assure Lite</div>
//                                                 <div className="text-sm text-gray-600 mb-1">Sum Insured: $100,000</div>
//                                                 <div className="text-lg font-bold text-blue-600">₹1,280/-</div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Total Premium */}
//                                     <div className="pt-4">
//                                         <div className="flex justify-between items-center">
//                                             <span className="text-lg font-semibold text-gray-800">TOTAL PREMIUM</span>
//                                             <span className="text-xl font-bold text-blue-600">₹2,560/-</span>
//                                         </div>
//                                         <div className="text-sm text-gray-500 text-center mt-1">
//                                             (GST included)
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default TravelPersonalDetails; 



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../headers/Header";
import Footer from "../Footer";

export default function TravelPersonalDetails() {
    const [step, setStep] = useState(1);
    const [gender, setGender] = useState("");
    const [noLastName, setNoLastName] = useState(false);
    const navigate = useNavigate();

    const handleContinue = () => {
        // Save personal details data
        const personalData = {
            gender,
            noLastName,
            step: 1
        };
        localStorage.setItem("travelPersonalDetails", JSON.stringify(personalData));
        
        // Navigate to medical history component
        navigate("/travel-medical-history");
    };

    return (
        <>
            <Header />
            <div className="flex max-h-screen items-start justify-center bg-gray-50 py-36">
                {/* Main Card */}
                <div className="flex gap-8">
                    {/* Left - Form */}
                    <div className="bg-white rounded-xl shadow-xl p-8 w-[550px]">
                        <div className="mb-4 text-sm text-gray-600">Step 1:</div>
                        <div className="flex items-center mb-10">
                            <h2 className="text-2xl font-semibold mr-4">Personal details</h2>
                            <div className="flex space-x-2 ml-auto">
                                {[1, 2, 3].map((n) => (
                                    <span
                                        key={n}
                                        className={`rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold ${step === n ? "bg-green-500" : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {n}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-5 text-gray-700 font-medium">
                            Traveller 1 (23 yrs)
                        </div>
                        <div className="flex gap-3 mb-6">
                            <input
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="Enter full name"
                                disabled={noLastName}
                            />
                            <button
                                className={`px-8 py-2 rounded-lg border border-gray-300 font-medium ${gender === "Male"
                                    ? "bg-blue-100 border-blue-500 text-blue-700"
                                    : ""
                                    }`}
                                onClick={() => setGender("Male")}
                            >
                                Male
                            </button>
                            <button
                                className={`px-8 py-2 rounded-lg border border-gray-300 font-medium ${gender === "Female"
                                    ? "bg-blue-100 border-blue-500 text-blue-700"
                                    : ""
                                    }`}
                                onClick={() => setGender("Female")}
                            >
                                Female
                            </button>
                        </div>
                        <label className="flex items-center mb-6 text-gray-600">
                            <input text-gray-800 font-medium mb-5
                                type="checkbox"
                                checked={noLastName}
                                onChange={() => setNoLastName((v) => !v)}
                                className="mr-2"
                            />
                            Don't have a last name as per the passport
                        </label>
                        <div className="flex gap-3 mb-12">
                            <input
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="Enter date of birth (DD-MM-YYYY)"
                            />
                            <input
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="text"
                                placeholder="Indian"
                                value="Indian"
                                readOnly
                            />
                        </div>
                        <button 
                            onClick={handleContinue}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg transition"
                        >
                            Continue
                        </button>
                    </div>

                    {/* Right - Premium Summary */}
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
                            <div className="flex justify-between items-center mt-5">
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
                            <div className="flex justify-between items-center mt-5">
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
