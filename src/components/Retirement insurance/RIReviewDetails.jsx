import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Headerlogin from "../headers/Headerlogin";

export default function RIReviewDetails() {
  const navigate = useNavigate();

  return (
    <>
    <Headerlogin/>
    <div className="min-h-screen bg-white">
      {/* Top header */}
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src="./assets/images/HDFC_Life_logo.png.png"
              alt="HDFC Life"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-indigo-700">💠</div>
            <div className="font-medium">Capital Goal Suraksha</div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-sm font-medium text-slate-700">
            Please review below details before proceeding.
          </div>
          <div className="text-[11px] text-slate-400">
            These cannot be changed at a later stage
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto mt-6 max-w-5xl px-4">
        {/* Personal Details */}
        <Section title="Personal Details">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Field label="Full Name" value="Sagar Patel" />
            <Field label="Email Address" value="aaz***@gmail.com" />
            <Field label="Nationality" value="Indian" />
          </div>
        </Section>

        {/* Profile Details */}
        <Section title="Profile Details" className="mt-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Field label="Gender" value="Male" />
            <Field label="Date of Birth" value="25 / 05 / 1999" />
            <Field label="Phone Number" value="76******53" />
          </div>
        </Section>

        {/* Plan Details */}
        <Section title="Plan Details" className="mt-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Field label="Plan Name" value="Capital Goal Suraksha" />
            <Field label="Investment Amount" value="20,000 Monthly" />
            <Field label="Pay For" value="10 Years" />
            <Field label="Systematic Retirement Plan" value="15 Years" />
            <Field label="Pension Amount" value="35,323 Monthly" />
          </div>
        </Section>

        {/* Agreement */}
        <div className="mt-4">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
            <span>I confirm that the above details are correct</span>
          </label>
        </div>

        {/* Total Premium Bar */}
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-sm font-semibold text-slate-700">
                Total Premium ₹ 20,900 <span className="font-normal text-slate-500">Monthly</span>
              </div>
              <div className="text-[11px] text-slate-500">
                (Base Premium ₹ 20,000 + GST ₹ 900)
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/retirement-plan-config")}
                className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                EDIT DETAILS
              </button>
              <button
                onClick={() => navigate("/payment")}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>

        {/* Legal notes mock (as per the screenshot style) */}
        <div className="mx-auto mt-10 text-center text-[11px] leading-5 text-slate-400">
          Policybazaar Insurance Brokers Private Limited CIN: U74999HR2001PTC034354 | Registered Office - Plot No.119, Sector - 44, Gurgaon, Haryana – 122001
          <br />
          Policybazaar is registered as a Direct Broker | Registration Code No. IRDA/ DB 797/ 18, valid till 09/08/2024, License category- Direct Broker (Life & General)
          <br />
          Visitors are hereby informed that their information submitted on the website may be shared with insurers.
          <br />
          Product information is authentic and solely based on the information received from the insurers.
          <br />
          © Copyright 2008-2023 policybazaar.com. All Rights Reserved.
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

function Section({ title, children, className = "" }) {
  return (
    <div className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
      <div className="rounded-t-lg bg-indigo-100 px-4 py-2 text-sm font-semibold text-slate-700">
        {title}
      </div>
      <div className="px-4 py-4">
        {children}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[11px] text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-700">{value}</div>
    </div>
  );
}


