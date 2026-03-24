import React, { useState, useEffect } from "react";

const Confirtfirst = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    annualIncome: '',
    occupation: '',
    education: ''
  });

  // Update parent component when form data changes
  useEffect(() => {
    onFormDataChange(formData);
  }, [formData, onFormDataChange]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return (
    <div className="p-6 space-y-5">
      <div>
        <label className="text-xs text-gray-500">Full Name as per your ID Proof</label>
        <input 
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500">Email Address</label>
        <input 
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 flex items-center gap-1">
          Annual Income
          <svg width={14} height={14} fill="none" stroke="#0056B3" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <circle cx="12" cy="8" r="1" />
          </svg>
        </label>
        <input 
          className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
          value={formData.annualIncome}
          onChange={(e) => handleInputChange('annualIncome', e.target.value)}
          placeholder="Enter your annual income"
        />
        <div className="text-xs text-gray-400 mt-1">
          <span className="text-blue-600">*</span> Please do not include Rental property income/Income received from interest from bank deposits/dividends/any other investments.
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500">Occupation</label>
        <div className="relative">
          <select 
            className="w-full mt-1 px-3 py-2 border border-red-300 rounded-lg text-sm bg-gray-50 pr-8"
            value={formData.occupation}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
          >
            <option value="">Select Occupation</option>
            <option value="Salaried">Salaried</option>
            <option value="Self Employed">Self Employed</option>
            <option value="Business Owner">Business Owner</option>
            <option value="Professional">Professional</option>
            <option value="Student">Student</option>
            <option value="Retired">Retired</option>
            <option value="Other">Other</option>
          </select>
          <span className="absolute top-3 right-3 pointer-events-none text-gray-400">&#9662;</span>
        </div>
        <div className="text-xs text-red-500 mt-1">The Occupation field is required.</div>
      </div>
      <div>
        <label className="text-xs text-gray-500">Education</label>
        <div className="relative">
          <select 
            className="w-full mt-1 px-3 py-2 border border-red-300 rounded-lg text-sm bg-gray-50 pr-8"
            value={formData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
          >
            <option value="">Select Education</option>
            <option value="College graduate & above">College graduate & above</option>
            <option value="12th Pass">12th Pass</option>
            <option value="10th Pass & below">10th Pass & below</option>
            <option value="Post Graduate">Post Graduate</option>
            <option value="PhD">PhD</option>
          </select>
          <span className="absolute top-3 right-3 pointer-events-none text-gray-400">&#9662;</span>
        </div>
        <div className="text-xs text-red-500 mt-1">The Education field is required.</div>
      </div>
    </div>
  );
};

export default Confirtfirst;