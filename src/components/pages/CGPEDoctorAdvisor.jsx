import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCommentDots, FaUserMd, FaShieldAlt, FaClock, FaHandshake, FaChartLine, FaFileContract, FaEye, FaAward, FaChevronDown, FaWhatsapp } from 'react-icons/fa';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const CGPEDoctorAdvisor = () => {
    const navigate = useNavigate();
    const [openFAQ, setOpenFAQ] = useState(null);

    const handleApplyClick = () => {
        const message = encodeURIComponent(
            "I am interested in joining CGPE as a Doctor Advisor."
        );
        const whatsappUrl = `https://wa.me/919662011021?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleTalkToMentorClick = () => {
        const message = encodeURIComponent(
            "Could you please share more details about the earning opportunities available for Doctor Advisors at CGPE?"
        );
        const whatsappUrl = `https://wa.me/919662011021?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqData = [
        {
            question: "Time needed?",
            answer: "2–4 hours/week to begin."
        },
        {
            question: "Backend?",
            answer: "CGPE concierge does it."
        },
        {
            question: "Compliance?",
            answer: "Full IRDAI process supported."
        },
        {
            question: "Conflict?",
            answer: "No patient selling guidance, ethics first."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <CGPEHeader />

            {/* Hero Section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 flex justify-center items-center min-h-[70vh] sm:min-h-[80vh]">
                    <div className="text-center max-w-5xl w-full">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg">
                            <FaUserMd className="w-4 h-4" />
                            White Coat Wealth Circle — Advisor Fellowship
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                            Become a CGPE Doctor Advisor
                        </h1>
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-6 sm:mb-8">
                            Earn with Trust & Purpose
                        </h2>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
                            Join an exclusive fellowship designed for doctors who want to build wealth while maintaining their medical ethics.
                            <span className="font-semibold text-gray-700"> Low time commitment. High impact. 100% compliant.</span>
                        </p>
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4 sm:px-0">
                            <button
                                onClick={handleApplyClick}
                                className="group w-full sm:w-auto px-6 py-3 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                <FaUserMd className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Apply to Join (Doctor-Only)
                            </button>
                            <button
                                onClick={handleTalkToMentorClick}
                                className="group w-full sm:w-auto px-6 py-3 sm:py-4 bg-white border-2 border-gray-300 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform text-green-500" />
                                Talk to a Mentor (WhatsApp)
                            </button>
                        </div>
                        {/* Key Benefits Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
                            {[
                                { icon: FaShieldAlt, title: "Ethical Track", desc: "Doctor-only guidance", color: "bg-blue-500" },
                                { icon: FaHandshake, title: "Full Support", desc: "Concierge operations", color: "bg-blue-600" },
                                { icon: FaClock, title: "Time-Light", desc: "2-4 hours/week", color: "bg-blue-600" },
                                { icon: FaUserMd, title: "IRDAI Compliant", desc: "Safe & regulated", color: "bg-blue-600" }
                            ].map((benefit, idx) => (
                                <div key={idx} className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className={`inline-flex p-3 rounded-xl ${benefit.color} text-white mb-3`}>
                                        <benefit.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">{benefit.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Detailed Benefits */}
                        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200 mb-8 sm:mb-12 mx-2 sm:mx-0">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Why Join Our Fellowship?</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-left max-w-4xl mx-auto">
                                {[
                                    "Ethical, doctor-only track (no patient selling guidance)",
                                    "Concierge backend: paperwork, quotes, claims — done by us",
                                    "Time-light model: 2–4 hours/week to start",
                                    "Leading insurers & investments: suitability first",
                                    "Mentorship + IRDAI guidance to stay safe and compliant",
                                    "Pride & Purpose: Secure families. Build legacy.",
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="p-1 bg-blue-500 rounded-full flex-shrink-0 mt-0.5">
                                            <FaCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 font-medium text-sm sm:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                    </div>
                </div>
            </section>

            {/* Video Testimonials Section */}
            <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    {/* <div className="text-center mb-8 sm:mb-12">
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                            Hear from successful doctors who have joined our White Coat Wealth Circle and are building their legacy while maintaining their medical ethics.
                        </p>
                    </div> */}

                    {/* Video Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Video 1 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="aspect-video bg-gray-200 relative flex items-center justify-center">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/dGPPnBYiMRM?si=oTlg_cr_W0dJTI_8"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Video 2 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="aspect-video bg-gray-200 relative flex items-center justify-center">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/vTFRe0Z60wM?si=EvvI-WDpPVYVbWGG"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Video 3 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="aspect-video bg-gray-200 relative flex items-center justify-center">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/DBOmPKWre1o?si=397DnclZ6vXoZwsE"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-8 sm:mt-12">
                        <p className="text-gray-600 mb-6 text-sm sm:text-base">
                            Ready to join these successful doctors?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleApplyClick}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Apply to Join Now
                            </button>
                            <button
                                onClick={handleTalkToMentorClick}
                                className="px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 font-bold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-lg"
                            >
                                Talk to a Mentor
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                            <p className="text-xs sm:text-sm text-blue-600 font-semibold mb-2">Step 1</p>
                            <h4 className="text-base sm:text-lg font-bold mb-2">
                                Discovery Call (15 mins)
                            </h4>
                            <p className="text-sm sm:text-base text-gray-600">
                                Quick consultation to align goals, ethics, and expectations.
                            </p>
                        </div>
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                            <p className="text-xs sm:text-sm text-blue-600 font-semibold mb-2">Step 2</p>
                            <h4 className="text-base sm:text-lg font-bold mb-2">Onboarding + Suitability</h4>
                            <p className="text-sm sm:text-base text-gray-600">
                                IRDAI-aware training on product suitability & safe practices.
                            </p>
                        </div>
                        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg transition">
                            <p className="text-xs sm:text-sm text-blue-600 font-semibold mb-2">Step 3</p>
                            <h4 className="text-base sm:text-lg font-bold mb-2">Start with 2 Families</h4>
                            <p className="text-sm sm:text-base text-gray-600">
                                Present with our support. Learn, earn, and build confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Income & Impact Section */}
            <section className="bg-white py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    {/* Header */}
                    <div className="mb-8 sm:mb-12">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <FaChartLine className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            <span className="text-blue-600 font-semibold text-xs sm:text-sm">Income & Impact — set expectations right</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Transparent, realistic, reputation-safe
                        </h2>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 max-w-md mx-auto">
                        {[
                            {
                                icon: FaFileContract,
                                text: "Transparent commission structure"
                            },
                            {
                                icon: FaEye,
                                text: "Realistic projections (shared on call)"
                            },
                            {
                                icon: FaAward,
                                text: "35+ years of claim-time trust"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 sm:gap-4 text-left">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                </div>
                                <span className="text-gray-700 font-medium text-sm sm:text-base">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                        <button
                            onClick={handleApplyClick}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm sm:text-base rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Apply to Join
                        </button>
                        <button
                            onClick={handleTalkToMentorClick}
                            className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-blue-500 text-blue-500 rounded-2xl font-bold text-sm sm:text-base hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-lg"
                        >
                            Talk to a Mentor
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-gray-50 py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            FAQ
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
                            Short, straight answers to the most common questions.
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-3 sm:space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-blue-50 rounded-2xl transition-colors duration-200"
                                >
                                    <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </span>
                                    <FaChevronDown
                                        className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openFAQ === index ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </button>

                                {openFAQ === index && (
                                    <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                                        <div className="pt-2 border-t border-gray-100">
                                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CGPEDoctorAdvisor;
