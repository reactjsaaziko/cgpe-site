import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";

export default function EnterMobileNumberHI() {
    const [mobile, setMobile] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Get data from previous screens
    const selectedMembers = location.state?.selectedMembers || ["self"];
    const selectedAge = location.state?.selectedAge || "";
    const selectedCity = location.state?.selectedCity || "";
    const currentMember = location.state?.currentMember || "self";
    const fullName = location.state?.name || "";
    const gender = location.state?.gender || "Male";

         // Optional: Simple validation (only 10 digits)
     const isValid = mobile.length === 10 && /^[0-9]\d{9}$/.test(mobile);
     
     // Debug logging
     console.log('Mobile number:', mobile);
     console.log('Is valid:', isValid);
     console.log('Location state:', location.state);

    return (
        <div className="relative min-h-screen bg-white flex flex-col">
            <Headerlogin />
                                                   {/* Main content */}
              <div className="flex flex-col flex-1 items-center justify-start relative mt-40">
                  {/* Title */}
                <div className="mt-2 mb-7">
                    <h1 className="text-3xl font-semibold text-center tracking-tight">Enter mobile number</h1>
                </div>
                {/* Mobile input */}
                <div className="mb-8 w-full flex justify-center">
                    <div className="w-[440px] h-14 flex items-center rounded-lg border border-gray-300 bg-white overflow-hidden">
                        <span className="pl-5 pr-3 text-gray-500 text-lg border-r border-gray-200 bg-white select-none">
                            +91
                        </span>
                        <input
                            type="tel"
                            className="flex-1 h-full pl-4 text-lg placeholder:text-gray-400 focus:outline-none bg-white"
                            placeholder="Enter mobile number"
                            maxLength={10}
                            pattern="[0-9]{10}"
                            value={mobile}
                            onChange={e => {
                                // Only allow numbers
                                const val = e.target.value.replace(/\D/g, "");
                                setMobile(val);
                            }}
                            autoComplete="off"
                        />
                    </div>
                </div>
                                 {/* Continue button */}
                 <button
                     className="bg-[#0072ce] hover:bg-blue-700 text-white rounded-lg px-20 py-3 text-lg font-medium shadow transition-all duration-150"
                     disabled={!isValid}
                     type="button"
                     onClick={async () => {
                         console.log('Continue button clicked!');
                         console.log('Is valid:', isValid);
                         if (isValid) {
                             console.log('Navigating to medical history...');
                             // Log inquiry for Health Insurance
                             try {
                                  await fetch('/api/inquiries/create', {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({
                                          name: fullName || 'Unknown',
                                         phone: mobile,
                                         inquiryType: 'insurance',
                                         subject: 'Health Insurance',
                                          message: `Lead from Health Insurance: ${fullName || 'Unknown'} (${gender})`,
                                         source: 'website'
                                     })
                                 });
                             } catch (e) {
                                 console.error('Failed to create inquiry', e);
                             }
                             // Navigate to medical history with all collected data
                             navigate("/medical-history", {
                                 state: {
                                     selectedMembers,
                                     selectedAge,
                                     selectedCity,
                                          currentMember,
                                          mobileNumber: mobile,
                                          name: fullName,
                                          gender
                                 }
                             });
                         } else {
                             console.log('Mobile number is not valid');
                         }
                     }}
                 >
                     Continue
                 </button>
            </div>

            {/* Bottom background SVG decor (optional) */}
            <div className="fixed inset-x-0 bottom-0 pointer-events-none opacity-10 z-0">
                {/* Place the SVG/PNG decorative background here if you have it */}
            </div>
        </div>
    );
}
