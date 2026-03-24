import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/environment';
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset, FaUser, FaComments, FaCheck } from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';
import SimpleWhatsAppQR from '../common/SimpleWhatsAppQR';
import { openWhatsApp } from '../../utils/whatsappQRUtils';

// Get API base URL from environment variable, which already includes /api
// const API_BASE_URL = ;

const base = process.env.REACT_APP_API_BASE;


const ContactUsPage = () => {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Reveal-on-scroll animations
    useEffect(() => {
        const elements = document.querySelectorAll('[data-animate]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Submit to real inquiry API
            const inquiryData = {
                name: formData.name,
                email: formData.email,
                phone: formData.mobile,
                subject: formData.subject || 'Contact Us Inquiry',
                message: formData.message,
                inquiryType: formData.inquiryType === 'insurance' ? 'insurance' : 
                           formData.inquiryType === 'claims' ? 'technical' :
                           formData.inquiryType === 'complaint' ? 'billing' :
                           formData.inquiryType === 'feedback' ? 'general' : 'general',
                source: 'website',
                productName: 'Contact Us Form',
                productCategory: 'Customer Support'
            };
            
            // API_BASE_URL already includes /api, so just append the rest of the route
            await axios.post(`${API_BASE_URL}/api/inquiries/create`, inquiryData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                mobile: '',
                subject: '',
                message: '',
                inquiryType: 'general'
            });
            setError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    // Success Popup Component
    const SuccessPopup = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <FaCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-6">
                        Thank you for contacting us. We've received your message and will get back to you as soon as possible.
                    </p>
                    <button
                        onClick={() => setSuccess(false)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full"
                    >
                        Send Another Message
                    </button>
                </div> 
            </div>
        </div>
    );

    const officeLocations = [
        {
            city: 'Surat',
            addresses: [
                '9, Parisar Apartment, Sumul Dairy Road, Katargam, Surat, 395003',
                'Basement-1, Alokik Tower, Sumul Dairy Road, Katargam, Surat, 395003'
            ],
            phone: '+91-261-XXXXXXX',
            email: 'surat@cgpatel.com'
        },
        {
            city: 'Mumbai',
            addresses: [
                '2066, Rustom Eazone, Sundar Nagar, Malad West, Mumbai, Maharashtra, 400064'
            ],
            phone: '+91-22-XXXXXXX',
            email: 'mumbai@cgpatel.com'
        },
        {
            city: 'Ahmedabad',
            addresses: [
                'A-406, Ratnakar Nine Square, Opp. ITC Narmada, Mansi Road, Vastrapur, Ahmedabad, 380025'
            ],
            phone: '+91-79-XXXXXXX',
            email: 'ahmedabad@cgpatel.com'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <CGPEHeader />
            
            {/* Hero Section */}
            <div
                className="relative text-white overflow-hidden py-32"
                style={{
                    backgroundImage: "url('/assets/images/bkcareer.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0"></div>
                <div className="relative z-10 container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 reveal" data-animate style={{ '--d': '0ms' }}>Contact Us</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto reveal" data-animate style={{ '--d': '120ms' }}>
                        We're here to help with all your insurance needs. Get in touch with us today.
                    </p>
                </div>
            </div>

            {/* Contact Information Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 reveal" data-animate style={{ '--d': '0ms' }}>Get In Touch</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto reveal" data-animate style={{ '--d': '120ms' }}>
                            Have questions about our insurance products? Need assistance with claims? 
                            Our team is here to help you 24/7.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div
                            className="reveal bg-blue-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            data-animate
                            style={{ '--d': '0ms' }}
                            onClick={() => window.location.href = 'tel:+919662011021'}
                            aria-label="Call Us"
                            tabIndex={0}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    window.location.href = 'tel:+919662011021';
                                }
                            }}
                        >
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaPhone className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Call Us</h3>
                            <p className="text-gray-600 mb-2">24/7 Customer Support</p>
                            <p className="text-blue-600 font-semibold text-lg underline hover:text-blue-800 transition-colors duration-200">
                                +91-96620 11021
                            </p>
                        </div>

                        <div
                            className="reveal bg-blue-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            data-animate
                            style={{ '--d': '120ms' }}
                            aria-label="Email Us"
                            tabIndex={0}
                            onClick={() => {
                                window.location.href = "mailto:contact@cgpe.com?subject=Insurance%20Enquiry&body=Hi%20CGPE%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20insurance%20products.%20Please%20contact%20me.%0A%0AThank%20you.";
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    window.location.href = "mailto:contact@cgpe.com?subject=Insurance%20Enquiry&body=Hi%20CGPE%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20insurance%20products.%20Please%20contact%20me.%0A%0AThank%20you.";
                                }
                            }}
                        >
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaEnvelope className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Email Us</h3>
                            <p className="text-gray-600 mb-2">We'll respond within 24 hours</p>
                            <span
                                className="text-blue-600 font-semibold text-lg underline hover:text-blue-800 transition-colors duration-200"
                                tabIndex={0}
                                aria-label="Send email to contact@cgpe.com"
                            >
                                contact@cgpe.in
                            </span>
                        </div>

                        <div className="reveal bg-blue-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300" data-animate style={{ '--d': '240ms' }}>
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaClock className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Business Hours</h3> 
                            <p className="text-gray-600 mb-2">Monday - Saturday</p>
                            <p className="text-blue-600 font-semibold text-lg">9:00 AM - 7:00 PM</p>
                        </div>

                        <div 
                            className="reveal bg-green-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                            data-animate 
                            style={{ '--d': '360ms' }}
                            onClick={() => openWhatsApp('+919662011021', 'Hello! I\'m interested in your insurance services. Please provide me with more information.')}
                            aria-label="Open WhatsApp Chat"
                            tabIndex={0}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    openWhatsApp('+919662011021', 'Hello! I\'m interested in your insurance services. Please provide me with more information.');
                                }
                            }}
                        >
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaComments className="text-white text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp Chat</h3>
                            <p className="text-gray-600 mb-2">Click to chat instantly</p>
                            <p className="text-green-600 font-semibold text-lg underline hover:text-green-800 transition-colors duration-200">
                                +91-96620 11021
                            </p>
                            {/* <SimpleWhatsAppQR 
                                phoneNumber="+919662011021"
                                message="Hello! I'm interested in your insurance services. Please provide me with more information."
                                size={120}
                                showMessage={false}
                            /> */}
                        </div>
                    </div>

                                         {/* Office Locations */}
                     <div className="mb-12 sm:mb-16">
                         <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center reveal" data-animate style={{ '--d': '0ms' }}>Our Office Locations</h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                             {officeLocations.map((office, index) => (
                                 <div key={index} className="reveal bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300" data-animate style={{ '--d': `${index * 120}ms` }}>
                                     <div className="flex items-center mb-3 sm:mb-4">
                                         <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                                             <FaMapMarkerAlt className="text-white text-lg sm:text-xl" />
                                         </div>
                                         <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800">{office.city}</h4>
                                     </div>
                                     <div className="space-y-2 sm:space-y-3">
                                         {office.addresses.map((address, addrIndex) => (
                                             <p key={addrIndex} className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                                                 {address}
                                             </p>
                                         ))}
                                         {/* <div className="pt-3 border-t border-gray-200">
                                             <p className="text-blue-600 font-medium">
                                                 <FaPhone className="inline mr-2" />
                                                 {office.phone}
                                             </p>
                                             <p className="text-blue-600 font-medium">
                                                 <FaEnvelope className="inline mr-2" />
                                                 {office.email}
                                             </p>
                                         </div> */}
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 reveal" data-animate style={{ '--d': '0ms' }}>Send Us a Message</h2>
                            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                            <p className="text-gray-600 text-lg mt-4 reveal" data-animate style={{ '--d': '120ms' }}>
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                        </div>

                        <div className="reveal bg-white rounded-lg shadow-lg p-8" data-animate style={{ '--d': '180ms' }}>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                                            Mobile Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            placeholder="Enter your mobile number"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                                            Inquiry Type
                                        </label>
                                        <select
                                            id="inquiryType"
                                            name="inquiryType"
                                            value={formData.inquiryType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="insurance">Insurance Related</option>
                                            <option value="claims">Claims Support</option>
                                            <option value="complaint">Complaint</option>
                                            <option value="feedback">Feedback</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Enter subject of your inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                        placeholder="Please describe your inquiry in detail..."
                                    ></textarea>
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center mx-auto shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FaComments className="mr-3" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency Support Section */}
            <div className="py-8 sm:py-12 lg:py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 reveal" data-animate style={{ '--d': '0ms' }}>24/7 Emergency Support</h2>
                    <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90 px-2 reveal" data-animate style={{ '--d': '120ms' }}>
                        For urgent insurance claims and emergencies, our support team is available round the clock.
                    </p>
                    <a
                        href="tel:+919662011021"
                        className="reveal inline-flex items-center justify-center bg-white text-blue-600 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        style={{ textDecoration: 'none', '--d': '220ms' }}
                        data-animate
                    >
                        <FaHeadset className="mr-2 sm:mr-3 text-lg sm:text-xl lg:text-2xl" />
                        +91 96620 11021
                    </a>
                </div>
            </div>
            <style>
                {`
                  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                  .reveal { opacity: 0; transform: translateY(16px); }
                  .reveal.in-view { animation: fadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both; animation-delay: var(--d, 0ms); }
                `}
            </style>
            
            {/* Footer */}
            <Footer />

            {success && <SuccessPopup />}
        </div>
    );
};

export default ContactUsPage;
