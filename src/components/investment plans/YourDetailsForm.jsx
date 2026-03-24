import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../../config/environment';

export default function YourDetailsForm({ onBack, onNext }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    educationalQualification: "",
    occupation: "",
    annualIncome: "",
    whatsappUpdates: true,
    disclaimer: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.educationalQualification.trim()) {
      newErrors.educationalQualification = "This field is required";
    }
    
    if (!formData.occupation.trim()) {
      newErrors.occupation = "This field is required";
    }
    
    if (!formData.annualIncome.trim()) {
      newErrors.annualIncome = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    let savedLead = null;
    try {
      const raw = localStorage.getItem('investmentLead');
      if (raw) savedLead = JSON.parse(raw);
    } catch (_) {}
    const payload = {
      name: savedLead?.name?.trim() || 'Guest',
      email: savedLead?.email?.trim() || '',
      phone: savedLead?.mobile?.trim() || '',
      subject: "Investment Plan Details",
      message: `Additional details submitted for investment plan.\nEducational Qualification: ${formData.educationalQualification}\nOccupation: ${formData.occupation}\nAnnual Income: ${formData.annualIncome}\nWhatsApp Updates: ${formData.whatsappUpdates ? 'Yes' : 'No'}\nDisclaimer Accepted: ${formData.disclaimer ? 'Yes' : 'No'}`,
      inquiryType: "investment",
      source: "website"
    };

    try {
      await axios.post(`${API_BASE_URL}/api/inquiries/create`, payload);
    } catch (error) {
      console.warn('Failed to post investment details inquiry:', error?.response?.data || error?.message);
    } finally {
      setSubmitting(false);
      // Navigate to review details page
      navigate("/review-details");
      if (onNext) onNext(formData);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-8 flex-1 flex flex-col gap-2 min-w-[360px]">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-3 p-1 hover:bg-gray-100 rounded-full"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-xl font-semibold">Your Details</div>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4">
        {/* Educational Qualification */}
        <div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <input
              type="text"
              placeholder="Educational Qualification"
              value={formData.educationalQualification}
              onChange={(e) => handleInputChange("educationalQualification", e.target.value)}
              className="flex-1 outline-none text-gray-700 bg-transparent"
            />
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {errors.educationalQualification && (
            <div className="text-red-500 text-sm mt-1">{errors.educationalQualification}</div>
          )}
        </div>

        {/* Occupation */}
        <div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <input
              type="text"
              placeholder="Occupation"
              value={formData.occupation}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
              className="flex-1 outline-none text-gray-700 bg-transparent"
            />
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {errors.occupation && (
            <div className="text-red-500 text-sm mt-1">{errors.occupation}</div>
          )}
        </div>

        {/* Annual Income */}
        <div>
          <div className="flex items-center border-b border-gray-300 py-2">
            <input
              type="text"
              placeholder="Annual Income*"
              value={formData.annualIncome}
              onChange={(e) => handleInputChange("annualIncome", e.target.value)}
              className="flex-1 outline-none text-gray-700 bg-transparent"
            />
          </div>
          {errors.annualIncome && (
            <div className="text-red-500 text-sm mt-1">{errors.annualIncome}</div>
          )}
        </div>

        {/* WhatsApp Updates Toggle */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span className="text-gray-700">Get Updates on Whatsapp</span>
          </div>
          <label className="relative inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.whatsappUpdates}
              onChange={(e) => handleInputChange("whatsappUpdates", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Disclaimer Checkbox */}
        <div className="flex items-start gap-3 py-2">
          <input
            type="checkbox"
            checked={formData.disclaimer}
            onChange={(e) => handleInputChange("disclaimer", e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <div className="text-sm text-gray-700 leading-relaxed">
            1. I hereby voluntarily choose to bypass the suitability module as I have understood the benefits, terms, and conditions of the product/plan chosen by me and I further declare that the product/plan selected by me suits my requirements.
            <br />
            2. I hereby declare that I am not now, nor have I ever been, a member of any armed forces.
          </div>
        </div>
      </form>

      {/* Footer Section */}
      <div className="flex items-center justify-between gap-4 mt-8 bg-[#f5f8fd] rounded-lg px-6 py-4 border-t">
        <div>
          <div className="text-xs text-gray-500">Total Maturity Amount</div>
          <div className="font-bold text-lg text-[#244491]">₹1.45 Cr</div>
          <div className="text-xs text-gray-500">If you had invested 20 yrs ago</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Returns</div>
          <div className="font-bold text-lg text-[#244491]">16.7% <span className="text-xs">*</span></div>
          <div className="text-xs text-gray-500 mb-1">*Based upon point to point returns of 10 years</div>
          <div className="text-xs text-yellow-600 font-medium">Midcap Index Fund</div>
          <button className="text-xs underline text-blue-600">More Info</button>
        </div>
        <button 
          onClick={handleNext}
          disabled={submitting}
          className="bg-[#3978cb] hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-7 py-2 rounded-lg shadow text-lg transition"
        >
          {submitting ? 'Please wait…' : 'NEXT'}
        </button>
      </div>
    </div>
  );
} 