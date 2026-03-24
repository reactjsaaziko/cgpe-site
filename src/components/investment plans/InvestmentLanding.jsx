import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/environment';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer.jsx';
import HeaderInvest from '../headers/HeaderInvest';

const InvestmentLanding = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        whatsappUpdates: true
    });

    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name || !formData.name.trim()) {
            newErrors.name = 'Please enter your name';
        }
        const digitsOnly = (formData.mobile || '').replace(/\D/g, '');
        if (!digitsOnly || digitsOnly.length < 10) {
            newErrors.mobile = 'Enter a valid 10-digit mobile number';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Validate required fields; do not proceed if invalid
        const isValid = validate();
        if (!isValid) {
            setSubmitting(false);
            return;
        }

        const payload = {
            name: formData.name?.trim(),
            email: formData.email?.trim() || '',
            phone: formData.mobile?.trim(),
            subject: 'Investment Plan Lead',
            message: `User is interested in investment plans.\nName: ${formData.name || '-'}\nMobile: ${formData.mobile || '-'}\nEmail: ${formData.email || '-'}\nWhatsApp Updates: ${formData.whatsappUpdates ? 'Yes' : 'No'}`,
            inquiryType: 'investment',
            source: 'website'
        };

        try {
            await axios.post(`${API_BASE_URL}/api/inquiries/create`, payload);
            try { localStorage.setItem('investmentLead', JSON.stringify(formData)); } catch (_) {}
            navigate('/investment-plans-details');
        } catch (error) {
            console.warn('Failed to create inquiry for investment lead:', error?.response?.data || error?.message);
            try { localStorage.setItem('investmentLead', JSON.stringify(formData)); } catch (_) {}
            // Even if API fails, allow navigation since user provided required details
            navigate('/investment-plans-details');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <HeaderInvest />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Investment Offer */}
                    <div className="bg-blue-600 rounded-2xl p-16 text-white">
                        <div className="mb-24 flex flex-col items-center justify-center text-center">
                            <h1 className="text-4xl lg:text-3xl font-bold mb-4">
                                Invest ₹10K/month & Get ₹1 Crore returns*
                            </h1>
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                                Plans starting from ₹1,000/month
                            </button>
                        </div>

                        {/* Company Ratings */}
                        <div className="bg-white rounded-xl p-6 text-gray-900">
                            <div className="text-center mb-4">
                                <div className="text-lg font-semibold mb-2">We are rated</div>
                                <div className="flex justify-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="border-b border-gray-200 pb-2">
                                    <div className="text-lg font-semibold">6.7 Crore Registered Consumers</div>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <div className="text-lg font-semibold">51 Insurance Partners</div>
                                </div>
                                <div className="pb-2">
                                    <div className="text-lg font-semibold">3.4 Crore Policies Sold</div>
                                </div>
                            </div>      
                            <div className="text-center mt-4 text-sm text-gray-600">
                                Policy Bazaar is one of India's leading digital insurance marketplace.
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Lead Generation Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Top performing plans with High Returns*
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6 ">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    placeholder='Enter your name'
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.name && (
                                    <div className="text-red-600 text-sm mt-1">{errors.name}</div>
                                )}
                            </div>

                            {/* Mobile Number Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number
                                </label>
                                <div className="flex space-x-2">
                                    <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>India +91</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="mobile"
                                        value={formData.mobile}
                                        placeholder='Enter your mobile number'
                                        onChange={handleInputChange}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {errors.mobile && (
                                        <div className="text-red-600 text-sm mt-1 w-full">{errors.mobile}</div>
                                    )}
                                    <button type="button" className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                        We don't spam
                                    </button>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder='Enter your email'
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="mx-auto block w-40 bg-blue-600 text-white py-2 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                            >
                                {submitting ? 'Please wait…' : 'View Plans'}
                            </button>

                            {/* Security Assurance */}
                            <div className="flex flex-col items-center justify-center space-y-3 mt-4 mb-2">
                                {/* Security Assurance */}
                                <div className="flex items-center space-x-2 text-xs text-gray-600 justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Your personal information is secure with us.</span>
                                </div>

                                {/* Expert Assistance */}
                                <div className="flex items-center space-x-2 text-sm text-gray-600 justify-center">
                                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                        CG
                                    </div>
                                    <span>Only certified Policy bazaar expert will assist you.</span>
                                </div>

                                {/* WhatsApp Updates */}
                                <div className="flex items-center justify-center w-full">
                                    <div className="flex items-center space-x-2 text-xs">
                                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                        </svg>
                                        <span>Get updates on WhatsApp</span>
                                    </div>
                                    <label className="relative inline-flex items-center ml-3">
                                        <input
                                            type="checkbox"
                                            name="whatsappUpdates"
                                            checked={formData.whatsappUpdates}
                                            onChange={handleInputChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {/* Disclaimer */}
                                <div className="text-xs text-gray-500 text-center mt-2">
                                    By clicking on view plans, you agreed to our{' '}
                                    <a href="#" className="text-blue-600 hover:underline">Privacy policy</a>,{' '}
                                    <a href="#" className="text-blue-600 hover:underline">Terms of Use</a> &{' '}
                                    <span className="font-semibold">*Disclaimer</span>.
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

InvestmentLanding.displayName = "InvestmentLanding";

export default InvestmentLanding; 