import React, { useState, useEffect } from 'react';

const TermInsurancePolicyForm = ({ policy, onClose, onSaved, defaultPolicyType }) => {
    const [formData, setFormData] = useState({
        policyName: '',
        policyType: defaultPolicyType || 'term-life',
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
        // New filter fields
        smokerAllowed: false,
        alcoholAllowed: false,
        educationLevel: 'any'
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (policy) {
            setFormData({
                ...policy,
                features: policy.features?.length > 0 ? policy.features : [''],
                benefits: policy.benefits?.length > 0 ? policy.benefits : [''],
                exclusions: policy.exclusions?.length > 0 ? policy.exclusions : [''],
                documents: policy.documents?.length > 0 ? policy.documents : [''],
                tags: policy.tags?.length > 0 ? policy.tags : [''],
                // Handle new fields with defaults
                smokerAllowed: policy.smokerAllowed || false,
                alcoholAllowed: policy.alcoholAllowed || false,
                educationLevel: policy.educationLevel || 'any',
                coverageAmountText: policy.coverageAmountText || ''
            });
        } else {
            // Reset form when creating new policy
            setFormData({
                policyName: '',
                policyType: defaultPolicyType || 'term-life',
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
                smokerAllowed: false,
                alcoholAllowed: false,
                educationLevel: 'any'
            });
        }
        setErrors({});
        setSuccessMessage('');
    }, [policy]);

    const validateForm = () => {
        const newErrors = {};

        console.log('Validating form data:', formData);

        if (!formData.policyName.trim()) {
            newErrors.policyName = 'Policy name is required';
        }

        if (!formData.coverageAmountText.trim()) {
            newErrors.coverageAmountText = 'Coverage amount text is required';
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

        console.log('Validation errors:', newErrors);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Form submission started');
        console.log('Form data:', formData);
        
        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        setLoading(true);

        try {
            const url = policy 
                ? `/api/term-insurance/policies/${policy._id}`
                : '/api/term-insurance/policies';
            
            const method = policy ? 'PUT' : 'POST';

            const requestBody = {
                ...formData,
                features: formData.features.filter(f => f.trim()),
                benefits: formData.benefits.filter(b => b.trim()),
                exclusions: formData.exclusions.filter(e => e.trim()),
                documents: formData.documents.filter(d => d.trim()),
                tags: formData.tags.filter(t => t.trim()),
                // Ensure all required fields are present
                policyName: formData.policyName.trim(),
                coverageAmountText: formData.coverageAmountText.trim(),
                premiumAmount: parseInt(formData.premiumAmount),
                policyTerm: parseInt(formData.policyTerm),
                minAge: parseInt(formData.minAge),
                maxAge: parseInt(formData.maxAge),
                description: formData.description.trim(),
                companyName: formData.companyName.trim()
            };

            console.log('Request URL:', url);
            console.log('Request method:', method);
            console.log('Request body:', requestBody);
        
        // Additional validation before sending
        const requiredFields = ['policyName', 'coverageAmountText', 'premiumAmount', 'policyTerm', 'minAge', 'maxAge', 'description', 'companyName'];
        const missingFields = requiredFields.filter(field => !requestBody[field] || (typeof requestBody[field] === 'string' && !requestBody[field].trim()));
        
        if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            setErrors({ submit: `Missing required fields: ${missingFields.join(', ')}` });
            setLoading(false);
            return;
        }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const result = await response.json();
            console.log('Response result:', result);

            if (result.success) {
                console.log('Policy saved successfully');
                setSuccessMessage('Policy saved successfully!');
                setErrors({});
                setTimeout(() => {
                    onSaved();
                }, 1000);
            } else {
                console.log('Policy save failed:', result.message);
                if (result.errors) {
                    // Handle validation errors from backend
                    const backendErrors = {};
                    result.errors.forEach(error => {
                        const field = error.field || 'submit';
                        backendErrors[field] = error.message;
                    });
                    setErrors(backendErrors);
                } else {
                    setErrors({ submit: result.message });
                }
            }
        } catch (error) {
            console.error('Error during form submission:', error);
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
        <div className="bg-white rounded-lg p-4">
            {/* <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-black">
                    {policy ? 'Edit Term Insurance Policy' : 'Add New Term Insurance Policy'}
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

            <form onSubmit={handleSubmit} className="space-y-6 max-h-96 overflow-y-auto">
                {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                        {errors.submit}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                        {successMessage}
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
                                <option value="term-life">Term Life</option>
                                <option value="term-women">Term Women</option>
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
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 1 Crore, 50 Lakhs, etc."
                                />
                                {errors.coverageAmountText && (
                                    <p className="text-red-500 text-sm mt-1">{errors.coverageAmountText}</p>
                                )}
                            </div>
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
                                placeholder="Enter policy term"
                                min="1"
                                max="50"
                            />
                            {errors.policyTerm && (
                                <p className="text-red-500 text-sm mt-1">{errors.policyTerm}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Age Criteria */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Age Criteria</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                {/* Eligibility Criteria */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Eligibility Criteria</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Education Level
                            </label>
                            <select
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="any">Any Education Level</option>
                                <option value="below-10th">Below 10th Pass</option>
                                <option value="10th-pass">10th Pass</option>
                                <option value="12th-pass">12th Pass</option>
                                <option value="graduate">Graduate</option>
                                <option value="post-graduate">Post Graduate</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-2">
                                Smoker Policy
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="smokerAllowed"
                                    checked={formData.smokerAllowed}
                                    onChange={(e) => setFormData(prev => ({ ...prev, smokerAllowed: e.target.checked }))}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-700">Allow smokers</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-black mb-2">
                                Alcohol Policy
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="alcoholAllowed"
                                    checked={formData.alcoholAllowed}
                                    onChange={(e) => setFormData(prev => ({ ...prev, alcoholAllowed: e.target.checked }))}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-700">Allow alcohol consumers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Description</h4>
                    <div>
                        <label className="block text-sm font-medium text-black mb-2">
                            Policy Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter policy description"
                            maxLength="1000"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
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
                                placeholder="Enter company logo URL"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Settings */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Additional Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                placeholder="Enter waiting period"
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
                                placeholder="Enter grace period"
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Rating and Reviews */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Rating and Reviews</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* Status and Options */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Status and Options</h4>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-black">
                                Active Policy
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isPopular"
                                checked={formData.isPopular}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-black">
                                Popular Policy
                            </label>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Features</h4>
                    <div className="space-y-3">
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleArrayChange(index, 'features', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter feature"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('features', index)}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('features')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                            Add Feature
                        </button>
                    </div>
                </div>

                {/* Benefits */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Benefits</h4>
                    <div className="space-y-3">
                        {formData.benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => handleArrayChange(index, 'benefits', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter benefit"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('benefits', index)}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('benefits')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                            Add Benefit
                        </button>
                    </div>
                </div>

                {/* Exclusions */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Exclusions</h4>
                    <div className="space-y-3">
                        {formData.exclusions.map((exclusion, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={exclusion}
                                    onChange={(e) => handleArrayChange(index, 'exclusions', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter exclusion"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('exclusions', index)}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('exclusions')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                            Add Exclusion
                        </button>
                    </div>
                </div>

                {/* Tags */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Tags</h4>
                    <div className="space-y-3">
                        {formData.tags.map((tag, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={tag}
                                    onChange={(e) => handleArrayChange(index, 'tags', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter tag"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('tags', index)}
                                    className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('tags')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                            Add Tag
                        </button>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : (policy ? 'Update Policy' : 'Create Policy')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TermInsurancePolicyForm; 