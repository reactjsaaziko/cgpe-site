import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../headers/Header";
export default function BikeInsuranceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the data passed from PolicySuggestion component
  const { selectedPlan, vehicleDetails } = location.state || {};
  
  // Default values if no data is passed
  const vehicle = {
    name: vehicleDetails?.vehicle || "Honda Activa",
    regNo: vehicleDetails?.registrationNumber || "GJ050505",
    year: vehicleDetails?.year || 2023,
    variant: vehicleDetails?.variant || "",
    rto: vehicleDetails?.rto || ""
  };
  
  const policy = {
    company: selectedPlan?.company || "Oriental",
    logo: selectedPlan?.logo || "/assets/images/i4.png",
    type: "1 Year Own-damage",
    startDate: "5 November, 2023",
    idv: selectedPlan?.idv ? parseInt(selectedPlan.idv.replace(/[₹,]/g, '')) : 52250,
    ncb: "0%",
  };
  
  const paCover = [
    { name: "Digit", price: 366 },
    { name: "Liberty GI", price: 443 },
    { name: "Kotak", price: 389 },
  ];
  
  // Calculate premium based on selected plan price
  const planPrice = selectedPlan?.price ? parseInt(selectedPlan.price.replace(/[₹,]/g, '')) : 131;
  const gst = Math.round(planPrice * 0.18); // 18% GST
  const premium = { 
    net: planPrice, 
    gst: gst 
  };

  // Form state with validation
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    regDay: "1",
    regMonth: "November",
    regYear: `${vehicle.year}`,
    rememberPolicy: "no",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Clear previous errors
    setErrors({});
    
    const newErrors = {};
    
    // Validate required fields
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(form.mobile)) {
        newErrors.mobile = "Please enter a valid 10-digit mobile number";
      }
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    // Fire inquiry with minimal details
    try {
      await fetch('/api/inquiries/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.mobile,
          inquiryType: 'insurance',
          subject: 'Bike Insurance',
          message: `Lead from Bike Insurance. Vehicle ${vehicle.regNo}`,
          source: 'website'
        })
      });
    } catch (e) {
      console.error('Failed to create inquiry', e);
    }
    
    // Here you can handle the form submission with all the data
    const submissionData = {
      formData: form,
      selectedPlan: selectedPlan,
      vehicleDetails: vehicleDetails,
      premium: premium
    };
    console.log("Form submitted with data:", submissionData);
    
    // Navigate to payment page or show success message
    alert("Form submitted successfully! Redirecting to payment...");
    
    // You can navigate to a payment page here
    // navigate('/payment', { state: submissionData });
    
    setIsSubmitting(false);
  }

  function handleBack() {
    navigate(-1);
  }

  // Registration month/year options for select
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
  ];
  const years = Array.from({ length: 20 }, (_, i) => `${vehicle.year - i}`);

  return (
    <>
    <Header />         
    <div className="min-h-screen py-16 px-4">        
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">   
        {/* Left: Form */}
        <div className="flex-1 bg-white rounded-xl shadow border border-gray-200 px-8 py-10">
          <button 
            onClick={handleBack}
            className="text-blue-600 text-[15px] mb-4 inline-block"
          >
            Back
           </button>                
          <div className="mb-8">
            <div className="text-2xl font-semibold text-[#23294a] mb-1">
              Your bike is almost insured!
            </div>
            <div className="text-gray-400 text-[15px]">
              We just need a few more details before payment
            </div>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
            <div>
              <input
                type="text"                  
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className={`border rounded-md px-5 py-3 text-[16px] outline-none w-full ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile number"
                className={`border rounded-md px-5 py-3 text-[16px] outline-none w-full ${
                  errors.mobile ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.mobile && (
                <div className="text-red-500 text-sm mt-1">{errors.mobile}</div>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                className={`border rounded-md px-5 py-3 text-[16px] outline-none w-full ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>
            <div>
              <div className="mb-2 text-[15px] text-[#23294a]">Vehicle's registration date</div>
              <div className="flex gap-3">
                <select
                  name="regDay"
                  value={form.regDay}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 text-[15px]"
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i+1}>{i+1}</option>
                  ))}
                </select>
                <select
                  name="regMonth"
                  value={form.regMonth}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 text-[15px]"
                >
                  {months.map(m => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <select
                  name="regYear"
                  value={form.regYear}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 text-[15px]"
                >
                  {years.map(y => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="mb-2 text-[15px] text-[#23294a]">Do you remember your previous policy details?</div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-[15px]">
                  <input
                    type="radio"
                    name="rememberPolicy"
                    value="no"
                    checked={form.rememberPolicy === "no"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  No
                </label>
                <label className="flex items-center gap-2 text-[15px]">
                  <input
                    type="radio"
                    name="rememberPolicy"
                    value="yes"
                    checked={form.rememberPolicy === "yes"}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Yes
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="hidden"
              tabIndex={-1}
              aria-hidden="true"
            >submit</button>
          </form>
        </div>
        {/* Right: Policy/summary */}
        <div className="w-full md:w-[430px] flex flex-col gap-5">
          {/* Vehicle summary */}
          <div className="bg-white rounded-xl shadow border border-gray-200 px-7 py-4 text-[15px] mb-1">
            <div className="flex gap-2 items-center mb-1">
              <span className="font-semibold text-[#23294a]">{vehicle.name}</span>
            </div>
            {vehicle.variant && (
              <div className="text-gray-600 text-sm mb-1">
                {vehicle.variant}
              </div>
            )}
            <div className="flex gap-2 text-gray-500 text-sm">
              <span>{vehicle.regNo}</span>
              <span>|</span>
              <span>Registered in {vehicle.year}</span>
            </div>
            {vehicle.rto && (
              <div className="text-gray-500 text-sm mt-1">
                {vehicle.rto}
              </div>
            )}
          </div>
          {/* Policy summary */}
          <div className="bg-white rounded-xl shadow border border-gray-200 px-7 py-4 mb-1">
            <div className="flex items-center gap-2 mb-1">
              <img src={policy.logo} alt={policy.company} className="w-12 h-8 object-contain" />
              <span className="font-semibold text-[#23294a]">{policy.company}</span>
              <span className="text-gray-500 text-sm ml-2">{policy.type}</span>
            </div>
            <div className="text-gray-600 text-sm mb-1">
              New policy start date: <span className="text-[#23294a] font-medium">{policy.startDate}</span>
            </div>
            <div className="flex justify-between items-center text-[15px]">
              <div>IDV: <span className="font-medium">₹{policy.idv.toLocaleString()}</span></div>
              <div className="text-gray-500 text-sm">NCB Discount: <span className="font-medium">{policy.ncb}</span></div>
            </div>
            {selectedPlan?.claimsSettled && (
              <div className="text-gray-600 text-sm mt-1">
                Claims settled: <span className="text-[#23294a] font-medium">{selectedPlan.claimsSettled}</span>
              </div>
            )}
          </div>
          {/* Owner-Driver PA Cover */}
          <div className="bg-white rounded-xl shadow border border-gray-200 px-7 py-4 mb-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-[#23294a]">Add Owner-Driver PA Cover</span>
              <span className="text-gray-500 text-xs cursor-pointer">i</span>
            </div>
            <div className="flex justify-between items-center text-[15px] text-gray-700">
              {paCover.map(c => (
                <span key={c.name}>{c.name}</span>
              ))}
            </div>
            <div className="flex justify-between items-center font-semibold text-[15px] mt-1">
              {paCover.map(c => (
                <span key={c.name}>₹{c.price}</span>
              ))}
            </div>
          </div>
          {/* Total section */}
          <div className="bg-white rounded-xl shadow border border-gray-200 px-7 py-4">
            <div className="flex justify-between items-center mb-2 text-[15px]">
              <span className="text-gray-700">Net premium</span>
              <span>₹{premium.net}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-[15px]">
              <span className="text-gray-700">GST</span>
              <span>₹{premium.gst}</span>
            </div>
            <div className="flex justify-between items-center mt-2 mb-4 text-[18px] font-semibold">
              <span>Total amount</span>
              <span className="text-[#2968d6]">₹{premium.net + premium.gst}</span>
            </div>
            <div className="text-xs text-gray-500 mb-3">
              By clicking on 'Pay now', I agree to the <a href="#" className="underline text-blue-600">terms &amp; conditions</a>
            </div>
            <button
              className={`w-full rounded-lg py-3 text-white font-semibold text-lg shadow transition ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#2968d6] hover:bg-[#2447b5]'
              }`}
              onClick={handleFormSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Pay now'}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
