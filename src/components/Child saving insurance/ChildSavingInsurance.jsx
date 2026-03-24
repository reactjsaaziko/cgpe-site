import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";
import { useUserData } from "../../context/UserDataContext";
import { searchCities } from "../../utils/cityNames";
import heroImage from "../assets/ci.png";
import cityIllustration from "../assets/a.png";
import adultIllustration from "../assets/c.png";
import childIllustration from "../assets/b.png";
import moneyIllustration from "../assets/d.png";

export default function ChildSavingsinsurance({
}) {
  const navigate = useNavigate();
  const { updateUserData } = useUserData();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [cityForm, setCityForm] = useState({ city: "" });
  const [ageForm, setAgeForm] = useState({ userAge: "", childAge: "" });
  const [incomeForm, setIncomeForm] = useState({ annualIncome: "" });
  const [loading, setLoading] = useState(false);
  const [showCityForm, setShowCityForm] = useState(false);
  const [showAgeForm, setShowAgeForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cityInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const onCityChange = (e) => {
    const value = e.target.value;
    setCityForm({ ...cityForm, [e.target.name]: value });
    
    // Show suggestions if user types something
    if (value.length > 0) {
      const suggestions = searchCities(value).slice(0, 8); // Limit to 8 suggestions
      setCitySuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  const onAgeChange = (e) => setAgeForm({ ...ageForm, [e.target.name]: e.target.value });
  const onIncomeChange = (e) => setIncomeForm({ ...incomeForm, [e.target.name]: e.target.value });
  
  // Handle city suggestion selection
  const selectCity = (city) => {
    setCityForm({ ...cityForm, city: city });
    setCitySuggestions([]);
    setShowSuggestions(false);
  };
  
  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          cityInputRef.current && !cityInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !/^\d{10}$/.test(form.phone)) {
      alert("Enter name and a valid 10‑digit mobile number.");
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
          subject: 'Child Saving Plan',
          message: `Lead from Child Saving flow. City: ${cityForm.city || ''}`,
          source: 'website'
        })
      });
    } catch (e) {
      console.error('Failed to create inquiry', e);
    }
    setTimeout(() => {
      setLoading(false);
      setShowCityForm(true);
    }, 600);
  };

  const submitCity = (e) => {
    e.preventDefault();
    if (!cityForm.city.trim()) {
      alert("Please enter your city.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowAgeForm(true);
    }, 600);
  };

  const submitAge = (e) => {
    e.preventDefault();
    if (!ageForm.userAge || !ageForm.childAge) {
      alert("Please enter both your age and your child's age.");
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
      alert("Please select your annual income.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Save all user data to context before navigating
      const userData = {
        ...form,
        ...cityForm,
        ...ageForm,
        ...incomeForm,
        timestamp: new Date().toISOString()
      };
      updateUserData(userData);
      // Navigate to CSIPolicy route
      navigate('/child-saving-policy');
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
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-snug sm:text-4xl">
            Invest <span className="text-[#0b63ce]">₹10K</span>/month &amp; Get{" "}
            <span className="text-[#0b63ce]">₹1</span> Crore* for your Child
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Nothing is more important than securing your child's future
          </p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          {/* Left circle image + badges */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={heroImage}
                alt="Happy family"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right form card */}
          <div>
            {!showCityForm ? (
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
            ) : !showAgeForm ? (
              <div className="rounded-xl border border-slate-100 bg-white p-10 shadow-[0_16px_50px_rgba(2,6,23,.08)]">
                {/* City Illustration */}
                <div className="mb-6 flex justify-center">
                  <img
                    src={cityIllustration}
                    alt="City Illustration"
                    className="w-24 h-24 object-contain"
                  />
                </div>

                {/* Heading */}
                <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
                  Please enter your current city
                </h2>

                {/* Sub-text */}
                <p className="text-sm text-gray-500 text-center mb-6">
                  Will help us to provide the best assistance
                </p>

                {/* City Input Form */}
                <form onSubmit={submitCity}>
                  <div className="relative mb-6">
                    <input
                      ref={cityInputRef}
                      name="city"
                      value={cityForm.city}
                      onChange={onCityChange}
                      placeholder="Search your current city"
                      className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none focus:border-blue-400 bg-white"
                      autoComplete="off"
                    />
                    
                    {/* City Suggestions Dropdown */}
                    {showSuggestions && citySuggestions.length > 0 && (
                      <div 
                        ref={suggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                      >
                        {citySuggestions.map((city, index) => (
                          <div
                            key={index}
                            onClick={() => selectCity(city)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* No results message */}
                    {showSuggestions && citySuggestions.length === 0 && cityForm.city.length > 0 && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="px-4 py-2 text-sm text-gray-500">
                          No cities found. Try a different search term.
                        </div>
                      </div>
                    )}
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
                  <div className="w-2 h-2 bg-[#0b63ce] rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            ) : !showIncomeForm ? (
              <div className="rounded-xl border border-slate-100 bg-white p-10 shadow-[0_16px_50px_rgba(2,6,23,.08)]">
                {/* Age Selection Form */}
                <form onSubmit={submitAge}>
                  {/* User Age Section */}
                  <div className="mb-6">
                    <div className="flex items-start space-x-4">
                      {/* Adult Illustration */}
                      <div className="flex-shrink-0">
                        <img
                          src={adultIllustration}
                          alt="Adult Illustration"
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          What is your age?
                        </h3>
                        <input
                          name="userAge"
                          value={ageForm.userAge}
                          onChange={onAgeChange}
                          placeholder="Enter your age"
                          type="number"
                          min="18"
                          max="70"
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-10"></div>

                  {/* Child Age Section */}
                  <div className="mb-6">
                    <div className="flex items-start space-x-4">
                      {/* Child Illustration */}
                      <div className="flex-shrink-0">
                      <img
                          src={childIllustration}
                          alt="Adult Illustration"
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          Your child's age?
                        </h3>
                        <input
                          name="childAge"
                          value={ageForm.childAge}
                          onChange={onAgeChange}
                          placeholder="Enter child's age"
                          type="number"
                          min="0"
                          max="25"
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-[#0b63ce] px-4 my-5 py-3 text-sm font-extrabold text-white disabled:opacity-70"
                  >
                    {loading ? "Please wait..." : "Continue"}
                  </button>
                </form>

                {/* Progress Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-[#0b63ce] rounded-full"></div>
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
