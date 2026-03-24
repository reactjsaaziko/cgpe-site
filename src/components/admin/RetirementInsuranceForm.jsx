import React, { useState, useEffect } from 'react';

const RetirementInsuranceForm = ({ policy, onClose, onSaved }) => {
    const [formData, setFormData] = useState({
        planName: '',
        companyName: '',
        companyLogo: '',
        planType: 'Pension Plan',
        minimumAge: '',
        maximumAge: '',
        retirementAge: '',
        minimumPremium: '',
        maximumPremium: '',
        policyTerm: '',
        premiumPaymentTerm: '',
        vestingAge: '',
        annuityRate: '',
        pensionAmount: '',
        deathBenefit: '',
        surrenderValue: '',
        loanFacility: true,
        features: [''],
        benefits: [''],
        exclusions: [''],
        documentsRequired: [''],
        claimProcess: '',
        taxBenefits: '',
        isActive: true,
        isPopular: false,
        rating: 4.0,
        reviews: 0,
        tags: [''],
        badges: [''],
        monthlyPension: '',
        totalPayout: '',
        investmentAmount: '',
        pensionStartAge: '',
        pensionDuration: 'lifetime',
        guaranteedPeriod: 0,
        returnRate: 0,
        maturityBenefit: '',
        partialWithdrawal: false,
        topUpOption: false,
        familyPension: false,
        criticalIllnessRider: false,
        accidentalDeathRider: false,
        disabilityRider: false
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (policy) {
            setFormData({
                ...policy,
                features: policy.features?.length > 0 ? policy.features : [''],
                benefits: policy.benefits?.length > 0 ? policy.benefits : [''],
                exclusions: policy.exclusions?.length > 0 ? policy.exclusions : [''],
                documentsRequired: policy.documentsRequired?.length > 0 ? policy.documentsRequired : [''],
                tags: policy.tags?.length > 0 ? policy.tags : [''],
                badges: policy.badges?.length > 0 ? policy.badges : ['']
            });
        }
    }, [policy]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.planName.trim()) newErrors.planName = 'Plan name is required';
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.minimumPremium || formData.minimumPremium < 1000) newErrors.minimumPremium = 'Minimum premium must be at least 1000';
        if (!formData.policyTerm || formData.policyTerm < 10) newErrors.policyTerm = 'Policy term must be at least 10 years';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const url = policy ? `/api/retirement-insurance/policies/${policy._id}` : '/api/retirement-insurance/policies';
            const method = policy ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    features: formData.features.filter(f => f.trim()),
                    benefits: formData.benefits.filter(b => b.trim()),
                    exclusions: formData.exclusions.filter(e => e.trim()),
                    documentsRequired: formData.documentsRequired.filter(d => d.trim()),
                    tags: formData.tags.filter(t => t.trim()),
                    badges: formData.badges.filter(b => b.trim())
                })
            });
            const result = await response.json();
            if (result.success) {
                onSaved();
            } else {
                setErrors({ submit: result.message });
            }
        } catch (error) {
            setErrors({ submit: 'An error occurred while saving the policy' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleArrayChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="bg-white rounded-lg max-h-full overflow-y-auto">
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                            {errors.submit}
                        </div>
                    )}

                    {/* Basic Information */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Basic Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Plan Name *</label>
                                <input
                                    type="text"
                                    name="planName"
                                    value={formData.planName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter plan name"
                                />
                                {errors.planName && <p className="text-red-500 text-sm mt-1">{errors.planName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Plan Type *</label>
                                <select
                                    name="planType"
                                    value={formData.planType}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Pension Plan">Pension Plan</option>
                                    <option value="Retirement Plan">Retirement Plan</option>
                                    <option value="Annuity Plan">Annuity Plan</option>
                                    <option value="NPS">NPS</option>
                                    <option value="PPF">PPF</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Company Name *</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter company name"
                                />
                                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Company Logo URL</label>
                                <input
                                    type="url"
                                    name="companyLogo"
                                    value={formData.companyLogo}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter logo URL"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Age and Term Details */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Age and Term Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Minimum Age *</label>
                                <input
                                    type="number"
                                    name="minimumAge"
                                    value={formData.minimumAge}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter minimum age"
                                    min="18"
                                    max="65"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Maximum Age *</label>
                                <input
                                    type="number"
                                    name="maximumAge"
                                    value={formData.maximumAge}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter maximum age"
                                    min="18"
                                    max="70"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Retirement Age *</label>
                                <input
                                    type="number"
                                    name="retirementAge"
                                    value={formData.retirementAge}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter retirement age"
                                    min="50"
                                    max="70"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Vesting Age *</label>
                                <input
                                    type="number"
                                    name="vestingAge"
                                    value={formData.vestingAge}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter vesting age"
                                    min="50"
                                    max="70"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Premium Payment Term (Years) *</label>
                                <input
                                    type="number"
                                    name="premiumPaymentTerm"
                                    value={formData.premiumPaymentTerm}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter premium payment term"
                                    min="1"
                                    max="30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Pension Amount (₹) *</label>
                                <input
                                    type="number"
                                    name="pensionAmount"
                                    value={formData.pensionAmount}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter pension amount"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Premium and Policy Details */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Premium and Policy Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Minimum Premium (₹) *</label>
                                <input
                                    type="number"
                                    name="minimumPremium"
                                    value={formData.minimumPremium}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter minimum premium"
                                    min="1000"
                                />
                                {errors.minimumPremium && <p className="text-red-500 text-sm mt-1">{errors.minimumPremium}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Maximum Premium (₹) *</label>
                                <input
                                    type="number"
                                    name="maximumPremium"
                                    value={formData.maximumPremium}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter maximum premium"
                                    min="1000"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Policy Term (Years) *</label>
                                <input
                                    type="number"
                                    name="policyTerm"
                                    value={formData.policyTerm}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter policy term in years"
                                    min="10"
                                    max="40"
                                />
                                {errors.policyTerm && <p className="text-red-500 text-sm mt-1">{errors.policyTerm}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Annuity Rate (%) *</label>
                                <input
                                    type="number"
                                    name="annuityRate"
                                    value={formData.annuityRate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter annuity rate"
                                    min="0"
                                    max="15"
                                    step="0.1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Benefits and Process */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Benefits and Process</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Death Benefit *</label>
                                <textarea
                                    name="deathBenefit"
                                    value={formData.deathBenefit}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter death benefit details"
                                    rows="3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Surrender Value *</label>
                                <textarea
                                    name="surrenderValue"
                                    value={formData.surrenderValue}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter surrender value details"
                                    rows="3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Claim Process *</label>
                                <textarea
                                    name="claimProcess"
                                    value={formData.claimProcess}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter claim process details"
                                    rows="3"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Tax Benefits *</label>
                                <textarea
                                    name="taxBenefits"
                                    value={formData.taxBenefits}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter tax benefits details"
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Features</h4>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleArrayChange(index, 'features', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter feature"
                                />
                                {formData.features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('features', index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('features')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            + Add Feature
                        </button>
                    </div>

                    {/* Benefits */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Benefits</h4>
                        {formData.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => handleArrayChange(index, 'benefits', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter benefit"
                                />
                                {formData.benefits.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('benefits', index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('benefits')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            + Add Benefit
                        </button>
                    </div>

                    {/* Exclusions */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Exclusions</h4>
                        {formData.exclusions.map((exclusion, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={exclusion}
                                    onChange={(e) => handleArrayChange(index, 'exclusions', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter exclusion"
                                />
                                {formData.exclusions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('exclusions', index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('exclusions')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            + Add Exclusion
                        </button>
                    </div>

                    {/* Documents Required */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Documents Required</h4>
                        {formData.documentsRequired.map((document, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={document}
                                    onChange={(e) => handleArrayChange(index, 'documentsRequired', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter required document"
                                />
                                {formData.documentsRequired.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('documentsRequired', index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('documentsRequired')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            + Add Document
                        </button>
                    </div>

                    {/* Additional Retirement Details */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Additional Retirement Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Monthly Pension (₹)</label>
                                <input
                                    type="number"
                                    name="monthlyPension"
                                    value={formData.monthlyPension}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter monthly pension amount"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Total Payout (₹)</label>
                                <input
                                    type="number"
                                    name="totalPayout"
                                    value={formData.totalPayout}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter total payout amount"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Investment Amount (₹)</label>
                                <input
                                    type="number"
                                    name="investmentAmount"
                                    value={formData.investmentAmount}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter investment amount"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Pension Start Age</label>
                                <input
                                    type="number"
                                    name="pensionStartAge"
                                    value={formData.pensionStartAge}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter pension start age"
                                    min="50"
                                    max="70"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Pension Duration</label>
                                <select
                                    name="pensionDuration"
                                    value={formData.pensionDuration}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="lifetime">Lifetime</option>
                                    <option value="10-years">10 Years</option>
                                    <option value="15-years">15 Years</option>
                                    <option value="20-years">20 Years</option>
                                    <option value="25-years">25 Years</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Guaranteed Period (Years)</label>
                                <input
                                    type="number"
                                    name="guaranteedPeriod"
                                    value={formData.guaranteedPeriod}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter guaranteed period"
                                    min="0"
                                    max="30"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Return Rate (%)</label>
                                <input
                                    type="number"
                                    name="returnRate"
                                    value={formData.returnRate}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter return rate"
                                    min="0"
                                    max="20"
                                    step="0.1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Maturity Benefit (₹)</label>
                                <input
                                    type="number"
                                    name="maturityBenefit"
                                    value={formData.maturityBenefit}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter maturity benefit"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Additional Features */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Additional Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="loanFacility"
                                    checked={formData.loanFacility}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Loan Facility</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="partialWithdrawal"
                                    checked={formData.partialWithdrawal}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Partial Withdrawal</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="topUpOption"
                                    checked={formData.topUpOption}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Top-up Option</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="familyPension"
                                    checked={formData.familyPension}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Family Pension</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="criticalIllnessRider"
                                    checked={formData.criticalIllnessRider}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Critical Illness Rider</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="accidentalDeathRider"
                                    checked={formData.accidentalDeathRider}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Accidental Death Rider</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="disabilityRider"
                                    checked={formData.disabilityRider}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Disability Rider</label>
                            </div>
                        </div>
                    </div>

                    {/* Tags and Badges */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Tags and Badges</h4>
                        
                        <div className="mb-6">
                            <h5 className="text-sm font-medium text-black mb-2">Tags</h5>
                            {formData.tags.map((tag, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => handleArrayChange(index, 'tags', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter tag"
                                    />
                                    {formData.tags.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('tags', index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('tags')}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                + Add Tag
                            </button>
                        </div>

                        <div>
                            <h5 className="text-sm font-medium text-black mb-2">Badges</h5>
                            {formData.badges.map((badge, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                    <input
                                        type="text"
                                        value={badge}
                                        onChange={(e) => handleArrayChange(index, 'badges', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter badge"
                                    />
                                    {formData.badges.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem('badges', index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayItem('badges')}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                + Add Badge
                            </button>
                        </div>
                    </div>

                    {/* Status and Rating */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Status and Rating</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Active</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isPopular"
                                    checked={formData.isPopular}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-black">Popular</label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Rating</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter rating"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">Reviews Count</label>
                                <input
                                    type="number"
                                    name="reviews"
                                    value={formData.reviews}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter reviews count"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 bg-gray-50 -mx-6 px-6 py-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {loading ? 'Saving...' : (policy ? 'Update Policy' : 'Create Policy')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

RetirementInsuranceForm.displayName = 'RetirementInsuranceForm';

export default RetirementInsuranceForm;
