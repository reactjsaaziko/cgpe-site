import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import Headerlogin from "../headers/Headerlogin";
import RI from "../assets/h.png";
import cityIllustration from "../assets/a.png";
import adultIllustration from "../assets/c.png";
import childIllustration from "../assets/b.png";
import moneyIllustration from "../assets/d.png";

export default function RIFirst({
}) {
    const navigate = useNavigate();
    const { updateUserData } = useUserData();
    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    const [ageForm, setAgeForm] = useState({ userAge: "" });
    const [incomeForm, setIncomeForm] = useState({ annualIncome: "" });
    const [loading, setLoading] = useState(false);
    const [showAgeForm, setShowAgeForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const onAgeChange = (e) => setAgeForm({ ...ageForm, [e.target.name]: e.target.value });
    const onIncomeChange = (e) => setIncomeForm({ ...incomeForm, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        if (!form.name || !/^\d{10}$/.test(form.phone)) {
            return;
        }
        setLoading(true);
        try {
            await fetch('/api/inquiries/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    phone: form.phone,
                    inquiryType: 'investment',
                    subject: 'Retirement Plan',
                    message: 'Lead from Retirement flow',
                    source: 'website'
                })
            });
        } catch (e) {
            console.error('Failed to create inquiry', e);
        }
        setTimeout(() => {
            setLoading(false);
            setShowAgeForm(true);
        }, 600);
    };

    const submitAge = (e) => {
        e.preventDefault();
        if (!ageForm.userAge) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowIncomeForm(true);
        }, 600);
    };

    const submitIncome = (e) => {
        e.preventDefault();
        if (!incomeForm.annualIncome) {
            return;
        }
        setLoading(true);
        
        // Save all user data to context
        const userData = {
            ...form,
            ...ageForm,
            ...incomeForm,
            insuranceType: 'retirement'
        };
        
        updateUserData(userData);
        
        setTimeout(() => {
            setLoading(false);
            // Navigate to retirement policy suggestions page
            navigate('/retirement-policy-suggestions');
        }, 600);
    };

    const incomeOptions = [
        "15 Lac +",
        "10 Lac to 14.9 Lac",
        "8 Lac to 9.9 Lac",
        "5 Lac to 7.9 Lac",
        "3 Lac to 4.9 Lac",
        "2 Lac to 2.9 Lac",
        "Less than 2 Lac"
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900">
            <Headerlogin />

            {/* Hero */}
            <section className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
                <div className="text-center">
                    <h1 className="mx-auto w-auto text-3xl font-extrabold leading-snug sm:text-4xl">
                        Secure your golden years with right <span className="text-[#0b63ce]">Retirement plan</span>
                    </h1>
                    <p className="mt-2 text-base text-slate-500">
                        Start Saving now for a worry-free future
                    </p>
                </div>

                <div className="mt-28 grid items-center gap-10 lg:grid-cols-[1fr_420px]">
                    {/* Left circle image + badges */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <img
                                src={RI}
                                alt="Happy family"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Right form card */}
                    <div>
                        {!showAgeForm ? (
                            <form
                                onSubmit={submit}
                                className="rounded-xl w-full border border-slate-100 bg-white p-6 shadow-[0_16px_50px_rgba(2,6,23,.08)]"
                            >
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={onChange}
                                    placeholder="Your Name"
                                    className="mb-5 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                                />

                                <div className="mb-5 flex">
                                    <div className="grid min-w-16 place-items-center rounded-l-lg border border-slate-200 px-3 text-sm font-bold">
                                        +91
                                    </div>
                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={onChange}
                                        placeholder="Enter mobile number"
                                        className="w-full rounded-r-lg border border-l-0 border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                                        maxLength={10}
                                        inputMode="numeric"
                                    />
                                </div>

                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={onChange}
                                    placeholder="Your Email (Optional)"
                                    type="email"
                                    className="mb-5 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-lg bg-[#0b63ce] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-70"
                                >
                                    {loading ? "Please wait..." : "View Plans"}
                                </button>
                            </form>
                        ) : !showIncomeForm ? (
                            <div className="rounded-xl border border-slate-100 bg-white p-10 shadow-[0_16px_50px_rgba(2,6,23,.08)]">


                                {/* Age Input Form */}
                                <form onSubmit={submitAge}>
                                    <input
                                        name="userAge"
                                        value={ageForm.userAge}
                                        onChange={onAgeChange}
                                        placeholder="Enter your age"
                                        type="number"
                                        min="18"
                                        max="65"
                                        className="mb-6 w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none focus:border-blue-400 bg-white"
                                    />

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-lg bg-[#0b63ce] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-70"
                                    >
                                        {loading ? "Please wait..." : "Continue"}
                                    </button>
                                </form>

                                {/* Progress Indicators */}
                                <div className="flex justify-center mt-6 space-x-2">
                                    <div className="w-2 h-2 bg-[#0b63ce] rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-slate-100 bg-white p-10 shadow-[0_16px_50px_rgba(2,6,23,.08)]">
                                {/* Money Illustration */}
                                <div className="mb-6 flex justify-center">
                                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                                        <img
                                            src={moneyIllustration}
                                            alt="Money Illustration"
                                            className="w-12 h-12 object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Heading */}
                                <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
                                    Select Your annual income
                                </h2>

                                {/* Sub-text */}
                                <p className="text-sm text-gray-500 text-center mb-6">
                                    To Suggest the right investment amount
                                </p>

                                {/* Income Options */}
                                <form onSubmit={submitIncome}>
                                    <div className="bg-white rounded-lg border border-gray-200 mb-6">
                                        {incomeOptions.map((option, index) => (
                                            <div key={index}>
                                                <label className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        name="annualIncome"
                                                        value={option}
                                                        checked={incomeForm.annualIncome === option}
                                                        onChange={onIncomeChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                                    />
                                                    <span className="ml-3 text-sm font-medium text-gray-900">
                                                        {option}
                                                    </span>
                                                </label>
                                                {index < incomeOptions.length - 1 && (
                                                    <div className="border-t border-gray-200"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-lg bg-[#0b63ce] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-70"
                                    >
                                        {loading ? "Please wait..." : "Continue"}
                                    </button>
                                </form>

                                {/* Progress Indicators */}
                                <div className="flex justify-center mt-6 space-x-2">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <div className="w-2 h-2 bg-[#0b63ce] rounded-full"></div>
                                </div>
                            </div>
                        )}

                        <p className="mt-4 text-center text-xs text-slate-500">
                            Only certified cgpatel expert will assist you
                        </p>
                        <p className="mt-2 text-center text-xs text-slate-500">
                            By clicking, you agree to our{" "}
                            <a href="#" className="font-semibold text-[#0b63ce]">Privacy policy</a>,{" "}
                            <a href="#" className="font-semibold text-[#0b63ce]">Terms of Use</a> &amp;{" "}
                            <a href="#" className="font-semibold text-[#0b63ce]">Disclaimers</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* Small badge component (Tailwind) */
function Badge({ children, className = "" }) {
    return (
        <div
            className={`absolute rounded-2xl bg-white px-4 py-3 text-xs leading-tight text-slate-900 shadow-[0_10px_26px_rgba(0,0,0,.08)] ${className}`}
        >
            {children}
        </div>
    );
}
