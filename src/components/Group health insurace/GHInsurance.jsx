import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headerlogin from '../headers/Headerlogin';
import { useUserData } from '../../context/UserDataContext';
import a from "../assets/i.png"
import b from "../assets/k.png"
import c from "../assets/j.png"

const GHInsurance = () => {
    const navigate = useNavigate();
    const { updateUserData } = useUserData();
    const [mobile, setMobile] = useState('');
    const [showCoverageSelection, setShowCoverageSelection] = useState(false);
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [showCityForm, setShowCityForm] = useState(false);
    const [selectedCoverage, setSelectedCoverage] = useState('family');
    const [employeeCount, setEmployeeCount] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [selectedCity, setSelectedCity] = useState('Delhi');
    const [customCity, setCustomCity] = useState('');

    const popularCities = [
        'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 
        'Mumbai', 'Thane', 'Gurgaon', 'Ahmedabad'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!/^\d{10}$/.test(mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }
        setShowCoverageSelection(true);
    };

    const handleCoverageSubmit = (e) => {
        e.preventDefault();
        if (!employeeCount || employeeCount < 1) {
            alert('Please enter a valid number of employees');
            return;
        }
        setShowCompanyForm(true);
    };

    const handleCompanySubmit = (e) => {
        e.preventDefault();
        if (!companyName.trim()) {
            alert('Please enter a company name');
            return;
        }
        setShowCityForm(true);
    };

	const handleCitySubmit = async (e) => {
        e.preventDefault();
        const finalCity = selectedCity === 'custom' ? customCity : selectedCity;
        if (!finalCity.trim()) {
            alert('Please select or enter a city');
            return;
        }
		
		// Create an inquiry using company name as the user's name
		try {
			await fetch('/api/inquiries/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: companyName,
					email: undefined,
					phone: mobile,
					subject: 'Group Health Insurance Inquiry',
					message: `Coverage: ${selectedCoverage}\nEmployees: ${employeeCount}\nCity: ${finalCity}`,
					inquiryType: 'insurance',
					source: 'website'
				})
			});
		} catch (_) {
			// Non-blocking: proceed even if inquiry logging fails
		}
		
        // Save user data for filtering
        const userFormData = {
            mobile,
            coverageType: selectedCoverage,
            employeeCount: parseInt(employeeCount),
            companyName,
            city: finalCity,
            insuranceType: 'group-health'
        };
        
        updateUserData(userFormData);
        
        // Navigate to policy suggestions page
        navigate('/policy-suggestions');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Top nav */}
            <Headerlogin />

            {/* Hero section */}
            <div className="flex flex-col items-center justify-center text-center my-10">
                <div className="text-gray-900 text-3xl md:text-4xl font-semibold leading-snug">
                    <span className="text-gray-800">Rs 1 Lakh</span> Cover starting at <span className="text-blue-700 font-bold">just ₹110/Month</span>/Employee+
                </div>
                <p className="mt-4 text-gray-600">For corporate plans, share your mobile number</p>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Illustration + partner logos */}
                    <div className="order-2 md:order-1">
                        <div className="relative">
                            <img src={a} alt="Group Health" className="w-full max-w-xl" />
                        </div>
                    </div>

                    {/* Form card */}
                    <div className="order-1 md:order-2">
                        {!showCoverageSelection ? (
                            <form onSubmit={handleSubmit} className="mt-6 bg-white p-4 rounded-xl border shadow-sm max-w-lg">
                                <div className="flex items-stretch gap-3">
                                    <div className="flex items-center px-3 border rounded-lg text-gray-700 bg-gray-50">+91</div>
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={10}
                                        placeholder="Enter mobile number"
                                        className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                                        aria-label="Mobile number"
                                    />
                                </div>
                                <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg">View Plans</button>
                            </form>
                        ) : !showCompanyForm ? (
                            <form onSubmit={handleCoverageSubmit} className="mt-6 bg-white p-6 rounded-xl border shadow-sm max-w-lg">
                                {/* Coverage Selection Cards */}
                                <div className="flex gap-4 mb-6">
                                    {/* Family Coverage Card */}
                                    <div 
                                        className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                            selectedCoverage === 'family' 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 bg-white'
                                        }`}
                                        onClick={() => setSelectedCoverage('family')}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-sm font-medium text-gray-900">Employee, Spouse & Kids</span>
                                            {selectedCoverage === 'family' ? (
                                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                            )}
                                        </div>
                                        {/* Family Illustration */}
                                        <img
                                            src={b}
                                            alt="Family Illustration"
                                            className="mx-auto h-16"
                                        />
                                    </div>

                                    {/* Employee Only Card */}
                                    <div 
                                        className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                            selectedCoverage === 'employee' 
                                                ? 'border-blue-500 bg-blue-50' 
                                                : 'border-gray-200 bg-white'
                                        }`}
                                        onClick={() => setSelectedCoverage('employee')}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-sm font-medium text-gray-900">Employee only</span>
                                            {selectedCoverage === 'employee' ? (
                                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                            )}
                                        </div>
                                        {/* Single Employee Illustration */}
                                        <img
                                            src={c}
                                            alt="Employee Illustration"
                                            className="mx-auto h-16"
                                        />
                                    </div>
                                </div>

                                {/* Employee Count Input */}
                                <div className="mb-6">
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Total number of employees"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={employeeCount}
                                        onChange={(e) => setEmployeeCount(e.target.value)}
                                        aria-label="Total number of employees"
                                    />
                                </div>

                                {/* Continue Button */}
                                <button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    Continue
                                </button>
                            </form>
                        ) : !showCityForm ? (
                            // Company Name Form - matches the image design
                            <form onSubmit={handleCompanySubmit} className="mt-6 bg-white p-6 rounded-xl border shadow-sm max-w-lg">
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        placeholder="Company name"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        aria-label="Company name"
                                    />
                                </div>

                                {/* Continue Button */}
                                <button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    Continue
                                </button>
                            </form>
                        ) : (
                            // City Selection Form - matches the image design
                            <form onSubmit={handleCitySubmit} className="mt-6 bg-white p-6 rounded-xl border shadow-sm max-w-lg">
                                {/* City Input Field */}
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        placeholder="Enter City"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={selectedCity === 'custom' ? customCity : ''}
                                        onChange={(e) => {
                                            setSelectedCity('custom');
                                            setCustomCity(e.target.value);
                                        }}
                                        aria-label="Enter City"
                                    />
                                </div>

                                {/* Popular Cities Section */}
                                <div className="mb-6">
                                    <h3 className="text-center text-gray-700 font-medium mb-4">Popular Cities</h3>
                                    
                                    {/* Cities Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {popularCities.map((city) => (
                                            <button
                                                key={city}
                                                type="button"
                                                className={`px-4 py-3 rounded-lg border transition-all ${
                                                    selectedCity === city && selectedCity !== 'custom'
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                                                }`}
                                                onClick={() => {
                                                    setSelectedCity(city);
                                                    setCustomCity('');
                                                }}
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* View Quotes Button */}
                                <button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                                >
                                    View quotes
                                </button>
                            </form>
                        )}

                        <div className="mt-4 text-xs text-gray-500 flex flex-col items-center text-center">
                            <p>Only certified cgpatel expert will assist you</p>
                            <p className="mt-2">
                                By clicking, you agree to our <a className="text-blue-700 hover:underline" href="#">Privacy policy</a>, <a className="text-blue-700 hover:underline" href="#">Terms of Use</a> & <a className="text-blue-700 hover:underline" href="#">Disclaimers</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

GHInsurance.displayName = "GHInsurance";

export default GHInsurance;


