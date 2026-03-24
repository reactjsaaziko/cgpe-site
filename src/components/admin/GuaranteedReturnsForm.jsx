import React, { useState, useEffect } from 'react';

// API Base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app';

const GuaranteedReturnsForm = ({ plan, onClose, onSaved }) => {
    const [formData, setFormData] = useState({
        planName: '',
        companyName: '',
        companyLogo: '',
        planType: 'Guaranteed Returns',
        minimumAge: 18,
        maximumAge: 65,
        minimumPremium: 0,
        maximumPremium: 0,
        policyTerm: 10,
        premiumPaymentTerm: 10,
        guaranteedReturnRate: 0,
        maturityBenefit: '',
        deathBenefit: '',
        features: [''],
        benefits: [''],
        exclusions: [''],
        documentsRequired: [''],
        claimProcess: '',
        taxBenefits: '',
        isActive: true,
        // Additional fields for GRPLPlans display
        youGive: '',
        youGivePeriod: '',
        youGet: '',
        youGetPeriod: '',
        taxSaving: '',
        badgeLeft: '',
        badgeRight: '',
        morePlansText: '',
        isPopular: false,
        discountPercentage: 0,
        rating: 4.0,
        reviews: 0,
        tags: [''],
        badges: [''],
        description: '',
        coverageAmount: '',
        coverageAmountText: '',
        premiumAmount: '',
        premiumFrequency: 'yearly',
        gracePeriod: 30,
        waitingPeriod: 0
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (plan) {
            setFormData({
                planName: plan.planName || '',
                companyName: plan.companyName || '',
                companyLogo: plan.companyLogo || '',
                planType: plan.planType || 'Guaranteed Returns',
                minimumAge: plan.minimumAge || 18,
                maximumAge: plan.maximumAge || 65,
                minimumPremium: plan.minimumPremium || 0,
                maximumPremium: plan.maximumPremium || 0,
                policyTerm: plan.policyTerm || 10,
                premiumPaymentTerm: plan.premiumPaymentTerm || 10,
                guaranteedReturnRate: plan.guaranteedReturnRate || 0,
                maturityBenefit: plan.maturityBenefit || '',
                deathBenefit: plan.deathBenefit || '',
                features: plan.features && plan.features.length > 0 ? plan.features : [''],
                benefits: plan.benefits && plan.benefits.length > 0 ? plan.benefits : [''],
                exclusions: plan.exclusions && plan.exclusions.length > 0 ? plan.exclusions : [''],
                documentsRequired: plan.documentsRequired && plan.documentsRequired.length > 0 ? plan.documentsRequired : [''],
                claimProcess: plan.claimProcess || '',
                taxBenefits: plan.taxBenefits || '',
                isActive: plan.isActive !== undefined ? plan.isActive : true,
                // Additional fields for GRPLPlans display
                youGive: plan.youGive || '',
                youGivePeriod: plan.youGivePeriod || '',
                youGet: plan.youGet || '',
                youGetPeriod: plan.youGetPeriod || '',
                taxSaving: plan.taxSaving || '',
                badgeLeft: plan.badgeLeft || '',
                badgeRight: plan.badgeRight || '',
                morePlansText: plan.morePlansText || '',
                isPopular: plan.isPopular || false,
                discountPercentage: plan.discountPercentage || 0,
                rating: plan.rating || 4.0,
                reviews: plan.reviews || 0,
                tags: plan.tags && plan.tags.length > 0 ? plan.tags : [''],
                badges: plan.badges && plan.badges.length > 0 ? plan.badges : [''],
                description: plan.description || '',
                coverageAmount: plan.coverageAmount || '',
                coverageAmountText: plan.coverageAmountText || '',
                premiumAmount: plan.premiumAmount || '',
                premiumFrequency: plan.premiumFrequency || 'yearly',
                gracePeriod: plan.gracePeriod || 30,
                waitingPeriod: plan.waitingPeriod || 0
            });
        }
    }, [plan]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.planName.trim()) {
            newErrors.planName = 'Plan name is required';
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!formData.youGive.trim()) {
            newErrors.youGive = 'You Give amount is required';
        }

        if (!formData.youGet.trim()) {
            newErrors.youGet = 'You Get amount is required';
        }

        if (!formData.guaranteedReturnRate || formData.guaranteedReturnRate <= 0) {
            newErrors.guaranteedReturnRate = 'Guaranteed return rate must be greater than 0';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('adminToken');
            const url = plan
                ? `${API_BASE_URL}/api/guaranteed-returns/${plan._id}`
                : `${API_BASE_URL}/api/guaranteed-returns`;

            const method = plan ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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
            setErrors({ submit: 'An error occurred while saving the plan' });
        } finally {
            setLoading(false);
        }
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
                                <label className="block text-sm font-medium text-black mb-2">
                                    Plan Name *
                                </label>
                                <input
                                    type="text"
                                    name="planName"
                                    value={formData.planName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter plan name"
                                />
                                {errors.planName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.planName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter company name"
                                />
                                {errors.companyName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Company Logo URL
                                </label>
                                <input
                                    type="url"
                                    name="companyLogo"
                                    value={formData.companyLogo}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter logo URL"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Plan Type *
                                </label>
                                <select
                                    name="planType"
                                    value={formData.planType}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Guaranteed Returns">Guaranteed Returns</option>
                                    <option value="Fixed Returns">Fixed Returns</option>
                                    <option value="Assured Returns">Assured Returns</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        You Give *
                                    </label>
                                    <input
                                        type="text"
                                        name="youGive"
                                        value={formData.youGive}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., ₹12 L"
                                    />
                                    {errors.youGive && (
                                        <p className="text-red-500 text-sm mt-1">{errors.youGive}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        You Give Period
                                    </label>
                                    <input
                                        type="text"
                                        name="youGivePeriod"
                                        value={formData.youGivePeriod}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., in 5 Years"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        You Get *
                                    </label>
                                    <input
                                        type="text"
                                        name="youGet"
                                        value={formData.youGet}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., ₹20.5 L"
                                    />
                                    {errors.youGet && (
                                        <p className="text-red-500 text-sm mt-1">{errors.youGet}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        You Get Period
                                    </label>
                                    <input
                                        type="text"
                                        name="youGetPeriod"
                                        value={formData.youGetPeriod}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., in 10 Years"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Tax Saving
                                </label>
                                <input
                                    type="text"
                                    name="taxSaving"
                                    value={formData.taxSaving}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., ₹5.01 L"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Guaranteed Return Rate (%) *
                                </label>
                                <input
                                    type="number"
                                    name="guaranteedReturnRate"
                                    value={formData.guaranteedReturnRate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter return rate"
                                    min="0"
                                    max="15"
                                    step="0.01"
                                />
                                {errors.guaranteedReturnRate && (
                                    <p className="text-red-500 text-sm mt-1">{errors.guaranteedReturnRate}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-black mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter detailed description of the plan"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Badges and Display Settings */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Badges and Display Settings</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Badge Left Text
                                </label>
                                <input
                                    type="text"
                                    name="badgeLeft"
                                    value={formData.badgeLeft}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Special plan for"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Badge Right Text
                                </label>
                                <input
                                    type="text"
                                    name="badgeRight"
                                    value={formData.badgeRight}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., customers*"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    More Plans Text
                                </label>
                                <input
                                    type="text"
                                    name="morePlansText"
                                    value={formData.morePlansText}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 1 More Plan"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Rating (1-5)
                                </label>
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
                                <label className="block text-sm font-medium text-black mb-2">
                                    Number of Reviews
                                </label>
                                <input
                                    type="number"
                                    name="reviews"
                                    value={formData.reviews}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter number of reviews"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Discount Percentage (%)
                                </label>
                                <input
                                    type="number"
                                    name="discountPercentage"
                                    value={formData.discountPercentage}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter discount percentage"
                                    min="0"
                                    max="50"
                                />
                            </div>
                        </div>

                        {/* Status toggles */}
                        <div className="mt-6 flex space-x-6">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Active Plan</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="isPopular"
                                    checked={formData.isPopular}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Popular Plan</span>
                            </label>
                        </div>
                    </div>

                    {/* Age and Premium Range */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Age and Premium Range</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Minimum Age *
                                </label>
                                <input
                                    type="number"
                                    name="minimumAge"
                                    value={formData.minimumAge}
                                    onChange={handleInputChange}
                                    min="18"
                                    max="65"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Maximum Age *
                                </label>
                                <input
                                    type="number"
                                    name="maximumAge"
                                    value={formData.maximumAge}
                                    onChange={handleInputChange}
                                    min="18"
                                    max="75"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Minimum Premium (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="minimumPremium"
                                    value={formData.minimumPremium}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Maximum Premium (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="maximumPremium"
                                    value={formData.maximumPremium}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Policy Terms */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Policy Term (Years) *
                            </label>
                            <input
                                type="number"
                                name="policyTerm"
                                value={formData.policyTerm}
                                onChange={handleInputChange}
                                min="1"
                                max="30"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Premium Payment Term (Years) *
                            </label>
                            <input
                                type="number"
                                name="premiumPaymentTerm"
                                value={formData.premiumPaymentTerm}
                                onChange={handleInputChange}
                                min="1"
                                max="20"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Guaranteed Return Rate (%) *
                            </label>
                            <input
                                type="number"
                                name="guaranteedReturnRate"
                                value={formData.guaranteedReturnRate}
                                onChange={handleInputChange}
                                min="0"
                                max="15"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Benefits</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Maturity Benefit *
                                </label>
                                <textarea
                                    name="maturityBenefit"
                                    value={formData.maturityBenefit}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Death Benefit *
                                </label>
                                <textarea
                                    name="deathBenefit"
                                    value={formData.deathBenefit}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
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
                        <h4 className="text-md font-medium text-black mb-4">Required Documents</h4>
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

                    {/* Process and Benefits */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Process and Benefits</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Claim Process *
                                </label>
                                <textarea
                                    name="claimProcess"
                                    value={formData.claimProcess}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Tax Benefits *
                                </label>
                                <textarea
                                    name="taxBenefits"
                                    value={formData.taxBenefits}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
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
                            className={`px-6 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {loading ? 'Saving...' : (plan ? 'Update Plan' : 'Create Plan')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

GuaranteedReturnsForm.displayName = 'GuaranteedReturnsForm';

export default GuaranteedReturnsForm;
