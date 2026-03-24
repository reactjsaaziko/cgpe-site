import React, { useState, useEffect } from 'react';

const HealthInsuranceForm = ({ policy, onClose, onSaved }) => {
    const [formData, setFormData] = useState({
        policyName: '',
        policyType: 'individual',
        coverageAmount: '',
        coverageAmountText: '',
        premiumAmount: '',
        premiumFrequency: 'yearly',
        policyTerm: '',
        minAge: '',
        maxAge: '',
        description: '',
        features: [''],
        benefits: [''],
        exclusions: [''],
        documents: [''],
        isActive: true,
        isPopular: false,
        discountPercentage: 0,
        waitingPeriod: 0,
        gracePeriod: 30,
        claimSettlementRatio: 95,
        companyName: '',
        companyLogo: '',
        rating: 4.0,
        reviews: 0,
        tags: [''],
        // Health insurance specific fields
        cashlessHospitals: 0,
        roomRentLimit: 'no-limit',
        restorationBenefit: 'once-a-year',
        preExistingDiseaseCover: false,
        maternityBenefit: false,
        dentalCover: false,
        eyeCare: false,
        ambulanceCover: true,
        badges: [''],
        claimPaidText: '95% of claims paid within 3 months*',
        morePlansText: '1 more plan'
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
                documents: policy.documents?.length > 0 ? policy.documents : [''],
                tags: policy.tags?.length > 0 ? policy.tags : [''],
                badges: policy.badges?.length > 0 ? policy.badges : [''],
                // Handle health insurance specific fields with defaults
                cashlessHospitals: policy.cashlessHospitals || 0,
                roomRentLimit: policy.roomRentLimit || 'no-limit',
                restorationBenefit: policy.restorationBenefit || 'once-a-year',
                preExistingDiseaseCover: policy.preExistingDiseaseCover || false,
                maternityBenefit: policy.maternityBenefit || false,
                dentalCover: policy.dentalCover || false,
                eyeCare: policy.eyeCare || false,
                ambulanceCover: policy.ambulanceCover !== undefined ? policy.ambulanceCover : true,
                claimPaidText: policy.claimPaidText || '95% of claims paid within 3 months*',
                morePlansText: policy.morePlansText || '1 more plan'
            });
        }
    }, [policy]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.policyName.trim()) {
            newErrors.policyName = 'Policy name is required';
        }

        if (!formData.coverageAmount && !formData.coverageAmountText.trim()) {
            newErrors.coverageAmount = 'Coverage amount or coverage amount text is required';
        }

        if (!formData.premiumAmount || formData.premiumAmount < 100) {
            newErrors.premiumAmount = 'Premium amount must be at least 100';
        }

        if (!formData.policyTerm || formData.policyTerm < 1) {
            newErrors.policyTerm = 'Policy term must be at least 1 year';
        }

        if (!formData.minAge || formData.minAge < 18) {
            newErrors.minAge = 'Minimum age must be at least 18';
        }

        if (!formData.maxAge || formData.maxAge > 75) {
            newErrors.maxAge = 'Maximum age cannot exceed 75';
        }

        if (formData.minAge && formData.maxAge && parseInt(formData.minAge) >= parseInt(formData.maxAge)) {
            newErrors.maxAge = 'Maximum age must be greater than minimum age';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (formData.cashlessHospitals < 0) {
            newErrors.cashlessHospitals = 'Cashless hospitals cannot be negative';
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
            const url = policy 
                ? `/api/health-insurance/policies/${policy._id}`
                : '/api/health-insurance/policies';
            
            const method = policy ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    features: formData.features.filter(f => f.trim()),
                    benefits: formData.benefits.filter(b => b.trim()),
                    exclusions: formData.exclusions.filter(e => e.trim()),
                    documents: formData.documents.filter(d => d.trim()),
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
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
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

    return (
        <div className="bg-white rounded-lg max-h-full overflow-y-auto">
            <div className="p-6">
                {/* <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-black">
                        {policy ? 'Edit Health Insurance Policy' : 'Add New Health Insurance Policy'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-black hover:text-black"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div> */}

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
                                Policy Name *
                            </label>
                            <input
                                type="text"
                                name="policyName"
                                value={formData.policyName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter policy name"
                            />
                            {errors.policyName && (
                                <p className="text-red-500 text-sm mt-1">{errors.policyName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Policy Type *
                            </label>
                            <select
                                name="policyType"
                                value={formData.policyType}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="individual">Individual</option>
                                <option value="family">Family</option>
                                <option value="senior-citizen">Senior Citizen</option>
                                <option value="critical-illness">Critical Illness</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Coverage Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    name="coverageAmount"
                                    value={formData.coverageAmount}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter numeric amount"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Coverage Amount Text *
                                </label>
                                <input
                                    type="text"
                                    name="coverageAmountText"
                                    value={formData.coverageAmountText}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., ₹5 Lakh, ₹1 Cr, etc."
                                />
                            </div>
                            {errors.coverageAmount && (
                                <p className="text-red-500 text-sm mt-1 col-span-2">{errors.coverageAmount}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Premium Amount (₹) *
                            </label>
                            <input
                                type="number"
                                name="premiumAmount"
                                value={formData.premiumAmount}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter premium amount"
                                min="100"
                            />
                            {errors.premiumAmount && (
                                <p className="text-red-500 text-sm mt-1">{errors.premiumAmount}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Premium Frequency *
                            </label>
                            <select
                                name="premiumFrequency"
                                value={formData.premiumFrequency}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="half-yearly">Half Yearly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Policy Term (Years) *
                            </label>
                            <input
                                type="number"
                                name="policyTerm"
                                value={formData.policyTerm}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter policy term in years"
                                min="1"
                                max="50"
                            />
                            {errors.policyTerm && (
                                <p className="text-red-500 text-sm mt-1">{errors.policyTerm}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Minimum Age *
                            </label>
                            <input
                                type="number"
                                name="minAge"
                                value={formData.minAge}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter minimum age"
                                min="18"
                                max="65"
                            />
                            {errors.minAge && (
                                <p className="text-red-500 text-sm mt-1">{errors.minAge}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Maximum Age *
                            </label>
                            <input
                                type="number"
                                name="maxAge"
                                value={formData.maxAge}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter maximum age"
                                min="18"
                                max="75"
                            />
                            {errors.maxAge && (
                                <p className="text-red-500 text-sm mt-1">{errors.maxAge}</p>
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
                            placeholder="Enter detailed description of the policy"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>
                </div>

                {/* Health Insurance Specific Fields */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Health Insurance Specific</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Cashless Hospitals
                            </label>
                            <input
                                type="number"
                                name="cashlessHospitals"
                                value={formData.cashlessHospitals}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Number of cashless hospitals"
                                min="0"
                            />
                            {errors.cashlessHospitals && (
                                <p className="text-red-500 text-sm mt-1">{errors.cashlessHospitals}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Room Rent Limit
                            </label>
                            <select
                                name="roomRentLimit"
                                value={formData.roomRentLimit}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="no-limit">No Limit</option>
                                <option value="single-room">Single Room</option>
                                <option value="shared-room">Shared Room</option>
                                <option value="icu-only">ICU Only</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Restoration Benefit
                            </label>
                            <select
                                name="restorationBenefit"
                                value={formData.restorationBenefit}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="none">None</option>
                                <option value="once-a-year">Once a Year</option>
                                <option value="unlimited">Unlimited</option>
                                <option value="family-floater">Family Floater</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Claim Paid Text
                            </label>
                            <input
                                type="text"
                                name="claimPaidText"
                                value={formData.claimPaidText}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., 95% of claims paid within 3 months*"
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
                                placeholder="e.g., 2 more plans"
                            />
                        </div>
                    </div>

                    {/* Health Coverage Options */}
                    <div className="mt-6">
                        <h5 className="text-sm font-medium text-black mb-3">Coverage Options</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="preExistingDiseaseCover"
                                    checked={formData.preExistingDiseaseCover}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Pre-existing Disease Cover</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="maternityBenefit"
                                    checked={formData.maternityBenefit}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Maternity Benefit</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="dentalCover"
                                    checked={formData.dentalCover}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Dental Cover</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="eyeCare"
                                    checked={formData.eyeCare}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Eye Care</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="ambulanceCover"
                                    checked={formData.ambulanceCover}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Ambulance Cover</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Company Information */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Company Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>
                </div>

                {/* Additional Settings */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Additional Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Waiting Period (Days)
                            </label>
                            <input
                                type="number"
                                name="waitingPeriod"
                                value={formData.waitingPeriod}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter waiting period in days"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Grace Period (Days)
                            </label>
                            <input
                                type="number"
                                name="gracePeriod"
                                value={formData.gracePeriod}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter grace period in days"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Claim Settlement Ratio (%)
                            </label>
                            <input
                                type="number"
                                name="claimSettlementRatio"
                                value={formData.claimSettlementRatio}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter claim settlement ratio"
                                min="0"
                                max="100"
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
                            <span className="text-sm text-black">Active Policy</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isPopular"
                                checked={formData.isPopular}
                                onChange={handleInputChange}
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="text-sm text-black">Popular Policy</span>
                        </label>
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

                {/* Badges */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Badges</h4>
                    {formData.badges.map((badge, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={badge}
                                onChange={(e) => handleArrayChange(index, 'badges', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter badge text"
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

                {/* Tags */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Tags</h4>
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

                {/* Documents */}
                <div className="pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Required Documents</h4>
                    {formData.documents.map((document, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={document}
                                onChange={(e) => handleArrayChange(index, 'documents', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter required document"
                            />
                            {formData.documents.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('documents', index)}
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
                        onClick={() => addArrayItem('documents')}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        + Add Document
                    </button>
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
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
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

HealthInsuranceForm.displayName = 'HealthInsuranceForm';

export default HealthInsuranceForm;