import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/environment';
import { toast } from 'react-hot-toast';
import Header from '../headers/Header';
import Footer from '../Footer';

const GRPLanding = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        country: 'India',
        whatsappUpdates: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.mobile) {
            toast.error('Please enter your name and mobile number');
            return;
        }
        try {
            const payload = {
                name: formData.name,
                email: formData.email || undefined,
                phone: formData.mobile,
                subject: 'Guaranteed Returns Inquiry',
                message: `Country: ${formData.country}\nWhatsApp Updates: ${formData.whatsappUpdates ? 'Yes' : 'No'}`,
                inquiryType: 'investment',
                source: 'website'
            };
            await axios.post(`${API_BASE_URL}/api/inquiries/create`, payload);
            toast.success('Thanks! Our expert will reach out soon.');
            navigate('/guaranteed-returns-plans');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit inquiry');
        }
    };

    return (
        <>
            <Header />
            <div className="w-full bg-white">
                <div className="max-w-5xl mx-auto my-20 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* LEFT */}
                        <div className="relative p-6 md:p-8 bg-white rounded-lg">
                            {/* Celebrity endorser - Kapil Sharma */}
                            <div className="flex flex-col items-center justify-center gap-6 mb-8 relative">
                                <img
                                    src="/assets/images/IMAGE.png"
                                    alt="Kapil Sharma - Brand Ambassador"
                                    className="relative z-10 h-auto w-full object-cover"
                                />
                                {/* Returns as high as box */}
                                <div className="absolute top-[50px] right-[35px] z-10 bg-white rounded-xl px-6 py-4 shadow-sm mt-4 flex flex-col items-center">
                                    <div className="text-gray-600 text-sm">Returns as high as</div>
                                    <div className="text-4xl font-extrabold text-blue-600 leading-none mt-1">
                                        7.5%<sup className="align-super text-sm">*</sup>
                                    </div>
                                    <div className="text-gray-700 text-sm font-semibold mt-1">
                                        Guaranteed
                                    </div>
                                </div>
                            </div>

                            {/* Benefit boxes in grid layout */}
                            <div className="flex flex-col gap-4">
                                {/* Risk-Free Growth (first, left) */}
                                <div className="w-fit rounded-xl border border-green-200 bg-green-50 px-4 py-3 shadow-sm self-start text-left">
                                    <div className="text-green-700 font-semibold text-sm">
                                        Risk‑Free Growth
                                    </div>
                                    <div className="text-green-700 text-xs mt-1">
                                        Zero Worry with 100% guaranteed returns
                                    </div>
                                </div>

                                {/* Tax free maturity payout (middle, right) */}
                                <div className="w-fit rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm self-end text-right">
                                    <div className="text-blue-700 font-semibold text-sm">
                                        Tax free maturity payout<sup className="text-xs">**</sup>
                                    </div>
                                    <div className="text-blue-700 text-xs mt-1">
                                        Under section 10(10D)
                                    </div>
                                </div>

                                {/* Life Cover (last, left) */}
                                <div className="w-fit rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 shadow-sm self-start text-left">
                                    <div className="text-purple-700 font-semibold text-sm">
                                        Life Cover
                                    </div>
                                    <div className="text-purple-700 text-xs mt-1">
                                        Included in the plan
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="border-l border-slate-200 bg-white p-6 md:p-8 flex flex-col items-center justify-center">
                            <div className="w-full max-w-md text-center">
                                <div className="text-slate-500 text-xs font-semibold tracking-wide">
                                    100* Guaranteed Returns
                                </div>
                                <div className="text-lg md:text-xl font-bold text-slate-800">
                                    Returns as high as 7.5 %*
                                </div>
                            </div>

                            {/* form */}
                            <form className="mt-6 space-y-4 w-full max-w-md flex flex-col items-center" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                {/* Name */}
                                <div className="w-full">
                                    <label className="text-xs text-slate-500">Your Name</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-indigo-500"
                                        placeholder='Enter your name'
                                    />
                                </div>

                                {/* Mobile */}
                                <div className="w-full">
                                    <label className="text-xs text-slate-500">Mobile Number</label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <select className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 outline-none">
                                            <option>India  +91</option>
                                        </select>
                                        <input
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleInputChange}
                                            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-indigo-500"
                                            placeholder='Enter your mobile number'
                                        />
                                        <span className="text-[10px] text-white bg-violet-500 rounded-full px-2 py-1">
                                            We don’t spam
                                        </span>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="w-full">
                                    <label className="text-xs text-slate-500">
                                        Your Email (Optional)
                                    </label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-indigo-500"
                                        placeholder='Enter your email'
                                    />
                                </div>

                                {/* CTA */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full md:w-auto rounded-lg bg-[#2f6adf] px-6 py-2.5 text-white font-semibold shadow hover:bg-[#2559c0] focus:ring-2 focus:ring-offset-2 focus:ring-[#2f6adf]"
                                >
                                    View Plans
                                </button>

                                {/* small locks + whatsapp */}
                                <div className="mt-2 text-[12px] text-slate-500 flex items-center gap-2 justify-center">
                                    <svg width="16" height="16" viewBox="0 0 24 24">
                                        <path
                                            d="M17 9V7a5 5 0 10-10 0v2M5 9h14v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9z"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                        />
                                    </svg>
                                    Your personal information is secure with us
                                </div>

                                <div className="mt-3 flex items-center gap-2 justify-center">
                                    <span className="h-6 w-6 grid place-items-center rounded-md bg-sky-100 text-sky-600 text-sm">
                                        ⭐
                                    </span>
                                    <span className="text-[13px]">
                                        <b className="text-slate-700">Only certified Policy bazaar expert</b>{" "}
                                        will assist you
                                    </span>
                                </div>

                                <label className="mt-2 flex items-center gap-2 text-[12px] text-slate-600 justify-center">
                                    <input
                                        type="checkbox"
                                        name="whatsappUpdates"
                                        checked={formData.whatsappUpdates}
                                        onChange={handleInputChange}
                                        className="accent-[#2f6adf]"
                                    />
                                    Get updates on WhatsApp
                                </label>

                                {/* terms */}
                                <p className="pt-2 text-[11px] leading-relaxed text-slate-500 text-center">
                                    By clicking on view plans, you agreed to our{" "}
                                    <a href="#" className="text-blue-600 underline">
                                        Privacy policy
                                    </a>
                                    ,{" "}
                                    <a href="#" className="text-blue-600 underline">
                                        Terms of Use
                                    </a>{" "}
                                    &amp; Disclaimer
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GRPLanding;
