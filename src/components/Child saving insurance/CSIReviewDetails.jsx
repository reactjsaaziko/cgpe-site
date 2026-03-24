// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import HeaderInvest from "../HeaderInvest";
// import Footer from "../Footer";

// export default function CSIReviewDetails() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { initialFormData, yourDetailsFormData, planData } = location.state || {};

//     const [termsAccepted, setTermsAccepted] = useState(true);

//     const handleProceed = () => {
//         if (termsAccepted) {
//             // Navigate to payment or next step
//             navigate('/payment', {
//                 state: {
//                     initialFormData,
//                     yourDetailsFormData,
//                     planData
//                 }
//             });
//         }
//     };

//     const handleBack = () => {
//         navigate('/child-saving-plan-config', {
//             state: {
//                 initialFormData,
//                 yourDetailsFormData,
//                 planData
//             }
//         });
//     };

//     return (
//         <>
//             <HeaderInvest />
//             <div className="min-h-screen flex flex-col">
//                 {/* Header Section */}
//                 <div className="bg-white shadow-sm border-b">
//                     <div className="max-w-6xl mx-auto px-4 py-6">
//                         <div className="flex items-center justify-between">
//                             {/* Logo */}
//                             <div className="flex items-center gap-3">
//                                 <div className="flex items-center">
//                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                                         B
//                                     </div>
//                                     <div className="ml-2">
//                                         <div className="text-lg font-semibold text-blue-600">Allianz</div>
//                                         <div className="text-sm font-bold text-gray-800">BAJAJ</div>
//                                         <div className="text-xs text-gray-600">LIFE GOALS. DONE.</div>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             {/* Title */}
//                             <div className="text-center">
//                                 <h1 className="text-2xl font-bold text-gray-800">
//                                     Please Review Below Details Before Proceeding Ahead
//                                 </h1>
//                             </div>
                            
//                             <div className="w-32"></div> {/* Spacer for centering */}
//                         </div>
                        
//                         {/* Alert Message */}
//                         <div className="mt-4 flex items-center justify-center">
//                             <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
//                                 <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                 </svg>
//                                 <span className="text-yellow-800 font-medium">
//                                     These Cannot Be Changed At A Later Stage
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-1 flex justify-center py-8">
//                     <div className="max-w-4xl w-full mx-auto px-4">
//                         <div className="bg-white rounded-xl shadow-lg p-8">
//                             {/* Personal Info Section */}
//                             <div className="mb-8">
//                                 <div className="flex items-center gap-3 mb-4">
//                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                                         </svg>
//                                     </div>
//                                     <h2 className="text-xl font-bold text-gray-800">Personal Info</h2>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
//                                         <div className="text-gray-800 font-medium">{yourDetailsFormData?.firstName || "Sasasa Asas"}</div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
//                                         <div className="text-gray-800 font-medium">{yourDetailsFormData?.email || "Aaziko@Gmail.Com"}</div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Nationality</label>
//                                         <div className="text-gray-800 font-medium">India</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Divider */}
//                             <div className="border-t border-gray-200 mb-8"></div>

//                             {/* Profile Details Section */}
//                             <div className="mb-8">
//                                 <div className="flex items-center gap-3 mb-4">
//                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
//                                         </svg>
//                                     </div>
//                                     <h2 className="text-xl font-bold text-gray-800">Profile Details</h2>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
//                                         <div className="text-gray-800 font-medium">{yourDetailsFormData?.gender || "FeMale"}</div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Date Of Birth</label>
//                                         <div className="text-gray-800 font-medium">{yourDetailsFormData?.dateOfBirth || "01/01/1995"}</div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Armed Force</label>
//                                         <div className="text-gray-800 font-medium">No</div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
//                                         <div className="text-gray-800 font-medium">76*********53</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Divider */}
//                             <div className="border-t border-gray-200 mb-8"></div>

//                             {/* Plan Info Section */}
//                             <div className="mb-8">
//                                 <div className="flex items-center gap-3 mb-4">
//                                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                             <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <h2 className="text-xl font-bold text-gray-800">Plan Info</h2>
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Plan Name</label>
//                                         <div className="text-gray-800 font-medium">{planData?.selectedPlan || "Child Capital Goal Suraksha"}</div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Investment Amount</label>
//                                         <div className="text-gray-800 font-medium">{planData?.investmentAmount || "2,200 Monthly"}</div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Pay For</label>
//                                         <div className="text-gray-800 font-medium">{planData?.payFor || "08 Years"}</div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-600 mb-1">Withdraw After</label>
//                                         <div className="text-gray-800 font-medium">{planData?.withdrawAfter || "15 Years"}</div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Terms and Conditions */}
//                             <div className="mb-6">
//                                 <label className="flex items-center gap-3 cursor-pointer">
//                                     <input
//                                         type="checkbox"
//                                         checked={termsAccepted}
//                                         onChange={(e) => setTermsAccepted(e.target.checked)}
//                                         className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
//                                     />
//                                     <span className="text-gray-700">
//                                         I Agree To The{" "}
//                                         <span className="text-blue-600 underline cursor-pointer">Terms And Conditions</span>
//                                     </span>
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer Bar */}
//                 <div className="border">
//                     <div className="max-w-6xl mx-auto px-4 py-4">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                                 <span className="text-gray-700 font-medium">Total Premium</span>
//                                 <span className="text-2xl font-bold text-gray-900">₹ 49,079</span>
//                                 <span className="text-gray-600">Yearly</span>
//                                 <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <circle cx="12" cy="12" r="10" />
//                                     <path d="M12 16v-4" />
//                                     <circle cx="12" cy="8" r="1" />
//                                 </svg>
//                             </div>
//                             <div className="flex gap-4">
//                                 <button
//                                     onClick={handleBack}
//                                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//                                 >
//                                     Back
//                                 </button>
//                                 <button
//                                     onClick={handleProceed}
//                                     disabled={!termsAccepted}
//                                     className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                                 >
//                                     PROCEED
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }



import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Footer";
import HeaderInvest from "../headers/HeaderInvest";

/** Review Details – React (JS) + Tailwind */
export default function CSIReviewDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { initialFormData, yourDetailsFormData, planData } = location.state || {};
  
  const [agree, setAgree] = useState(true);

  const data = {
    brand: { name: "Bajaj Allianz", logoText: "BAJAJ" },
    personal: {
      firstName: yourDetailsFormData?.firstName || "Sasasa Asas",
      email: yourDetailsFormData?.email || "Aaziko@Gmail.Com",
      nationality: "India",
    },
    profile: {
      gender: yourDetailsFormData?.gender || "Female",
      dob: yourDetailsFormData?.dateOfBirth || "01/ 01 / 1995",
      armedForce: "No",
      phoneMasked: "76********53",
    },
    plan: {
      planName: planData?.selectedPlan || "Child Capital Goal Suraksha",
      investAmount: planData?.investmentAmount || "2,200 Monthly",
      payFor: planData?.payFor || "08 Years",
      withdrawAfter: planData?.withdrawAfter || "15 Years",
    },
    premiumYearly: "49,079",
  };

  const onProceed = () => {
    if (agree) {
      navigate('/csi-payment-screen', {
        state: {
          csiData: {
            initialFormData,
            yourDetailsFormData,
            planData
          }
        }
      });
    }
  };

  return (
    <>
    <HeaderInvest/>
    <div className="max-h-screen bg-white text-slate-900 mt-5">
      {/* Header Row */}
      <div className="mx-auto max-w-5xl px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-sky-100 font-extrabold text-sky-700">
              B
            </div>
            <div className="leading-tight">
              <div className="text-xs font-bold text-slate-500">
                {data.brand.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-yellow-100 text-yellow-700">
              i
            </span>
            <span>Please Review Below Details Before Proceeding Ahead.</span>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm my-5">
        <Section title="Personal Info">
          <GridTwo>
            <Field label="First Name" value={data.personal.firstName} />
            <Field label="Email" value={data.personal.email} />
            <Field label="Nationality" value={data.personal.nationality} />
          </GridTwo>
        </Section>

        <Divider />

        <Section title="Profile Details">
          <GridTwo>
            <Field label="Gender" value={data.profile.gender} />
            <Field label="Date Of Birth" value={data.profile.dob} />
            <Field label="Armed Force" value={data.profile.armedForce} />
            <Field label="Phone Number" value={data.profile.phoneMasked} />
          </GridTwo>
        </Section>

        <Divider />

        <Section title="Plan Info">
          <GridTwo>
            <Field
              label="Plan Name"
              value={data.plan.planName}
              wide
            />
            <Field label="Investment Amount" value={data.plan.investAmount} />
            <Field label="Pay For" value={data.plan.payFor} />
            <Field label="Withdraw After" value={data.plan.withdrawAfter} />
          </GridTwo>
        </Section>

        {/* Agree terms */}
        <div className="mt-6 flex items-start gap-3">
          <input
            id="agree"
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="agree" className="text-sm">
            I Agree To The{" "}
            <a href="#" className="font-semibold text-blue-600">
              Terms And Conditions
            </a>
          </label>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="text-sm">
            <span className="text-slate-500">Total Premium</span>{" "}
            <span className="text-lg font-extrabold">
              ₹ {data.premiumYearly}
            </span>{" "}
            <span className="text-slate-500">yearly</span>
          </div>

          <button
            onClick={() => agree && onProceed()}
            disabled={!agree}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            PROCEED
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

/* -------- tiny building blocks -------- */

function Section({ title, children }) {
  return (
    <div className="mt-2">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-blue-600" />
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-4 h-px bg-slate-200" />;
}

function GridTwo({ children }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
  );
}

function Field({ label, value, wide }) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="mt-1 text-[15px] font-bold text-slate-800">{value}</div>
    </div>
  );
}
