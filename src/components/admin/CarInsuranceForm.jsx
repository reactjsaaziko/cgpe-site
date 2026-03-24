import React, { useState, useEffect } from 'react';

const CarInsuranceForm = ({ policy, onClose, onSaved }) => {
    const [formData, setFormData] = useState({
        policyName: 'Test Car Insurance Policy',
        policyType: 'comprehensive',
        coverageAmount: 100000,
        coverageAmountText: 'Up to ₹10,00,000',
        premiumAmount: 5000,
        premiumFrequency: 'yearly',
        policyTerm: 1,
        minAge: 18,
        maxAge: 65,
        description: 'Comprehensive car insurance policy with excellent coverage and benefits.',
        features: ['Comprehensive Coverage', '24x7 Roadside Assistance'],
        benefits: ['Zero Depreciation', 'Engine Protection'],
        exclusions: ['Wear and Tear', 'Mechanical Breakdown'],
        documents: ['Vehicle Registration', 'Driving License'],
        isActive: true,
        isPopular: false,
        discountPercentage: 0,
        waitingPeriod: 0,
        gracePeriod: 30,
        claimSettlementRatio: 95,
        companyName: 'Test Insurance Company',
        companyLogo: '',
        rating: 4.0,
        reviews: 0,
        tags: ['comprehensive', 'car'],
        // Car insurance specific fields
        idvCover: '₹8,41,120',
        claimsSettled: '93%',
        cashlessGarages: 5000,
        claimType: 'Self-Video Claims',
        addons: ['Zero Depreciation', 'Engine Protection'],
        payAsYouConsume: false,
        zeroDepreciation: false,
        roadsideAssistance: false,
        engineProtection: false,
        consumables: false,
        keyLockReplacement: false,
        invoicePriceCover: false,
        tyreProtector: false,
        personalBelongings: false,
        dailyAllowance: false,
        repairWarranty: '6-Month Repair Warranty',
        freePickupDrop: false,
        zeroPaperClaims: false,
        badges: ['Best Value'],
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
                addons: policy.addons?.length > 0 ? policy.addons : [''],
                badges: policy.badges?.length > 0 ? policy.badges : ['']
            });
        }
    }, [policy]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.policyName.trim()) {
            newErrors.policyName = 'Policy name is required';
        }

        if (!formData.coverageAmount || formData.coverageAmount < 100000) {
            newErrors.coverageAmount = 'Coverage amount must be at least 100,000';
        }

        if (!formData.coverageAmountText.trim()) {
            newErrors.coverageAmountText = 'Coverage amount text is required';
        }

        if (!formData.premiumAmount || formData.premiumAmount < 1000) {
            newErrors.premiumAmount = 'Premium amount must be at least 1000';
        }

        if (!formData.idvCover.trim()) {
            newErrors.idvCover = 'IDV Cover is required';
        }

        if (!formData.claimsSettled.trim()) {
            newErrors.claimsSettled = 'Claims Settled percentage is required';
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        console.log('Validation errors:', newErrors);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Form submission started');
        console.log('Form data before validation:', formData);
        
        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

                    console.log('Form validation passed');
            console.log('Final form data to submit:', formData);
            setLoading(true);

        try {
            const url = policy 
                ? `/api/car-insurance/policies/${policy._id}`
                : '/api/car-insurance/policies';
            
            const method = policy ? 'PUT' : 'POST';

            const requestBody = {
                ...formData,
                features: formData.features.filter(f => f.trim()),
                benefits: formData.benefits.filter(b => b.trim()),
                exclusions: formData.exclusions.filter(e => e.trim()),
                documents: formData.documents.filter(d => d.trim()),
                tags: formData.tags.filter(t => t.trim()),
                addons: formData.addons.filter(a => a.trim()),
                badges: formData.badges.filter(b => b.trim())
            };

            console.log('Request body before filtering:', formData);
            console.log('Request body after filtering:', requestBody);

            console.log('Submitting form data:', requestBody);
            console.log('Required fields check:');
            console.log('- policyName:', requestBody.policyName);
            console.log('- coverageAmount:', requestBody.coverageAmount);
            console.log('- coverageAmountText:', requestBody.coverageAmountText);
            console.log('- premiumAmount:', requestBody.premiumAmount);
            console.log('- idvCover:', requestBody.idvCover);
            console.log('- claimsSettled:', requestBody.claimsSettled);
            console.log('- companyName:', requestBody.companyName);
            console.log('- description:', requestBody.description);
            console.log('Request URL:', url);
            console.log('Request method:', method);
            console.log('Request body stringified:', JSON.stringify(requestBody, null, 2));
            console.log('Request body size:', JSON.stringify(requestBody).length, 'characters');

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));
            
            const result = await response.json();
            console.log('Response data:', result);

            if (result.success) {
                console.log('Policy saved successfully, calling onSaved');
                // Add a small delay to ensure the backend has processed the request
                setTimeout(() => {
                    onSaved();
                }, 100);
            } else {
                console.log('Policy save failed:', result.message);
                setErrors({ submit: result.message || 'Failed to save policy' });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setErrors({ submit: 'An error occurred while saving the policy. Please check your connection and try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Convert string numbers to actual numbers for numeric fields
        let processedValue = type === 'checkbox' ? checked : value;
        if (type === 'number' && value !== '') {
            processedValue = parseFloat(value);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: processedValue
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
                                    <option value="comprehensive">Comprehensive</option>
                                    <option value="third-party">Third Party</option>
                                    <option value="third-party-fire-theft">Third Party Fire & Theft</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Coverage Amount (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="coverageAmount"
                                    value={formData.coverageAmount}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter coverage amount"
                                    min="100000"
                                />
                                {errors.coverageAmount && (
                                    <p className="text-red-500 text-sm mt-1">{errors.coverageAmount}</p>
                                )}
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
                                    placeholder="e.g., Up to ₹10,00,000"
                                />
                                {errors.coverageAmountText && (
                                    <p className="text-red-500 text-sm mt-1">{errors.coverageAmountText}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    IDV Cover *
                                </label>
                                <input
                                    type="text"
                                    name="idvCover"
                                    value={formData.idvCover}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., ₹8,41,120"
                                />
                                {errors.idvCover && (
                                    <p className="text-red-500 text-sm mt-1">{errors.idvCover}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Claims Settled *
                                </label>
                                <input
                                    type="text"
                                    name="claimsSettled"
                                    value={formData.claimsSettled}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 93%"
                                />
                                {errors.claimsSettled && (
                                    <p className="text-red-500 text-sm mt-1">{errors.claimsSettled}</p>
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
                                    min="1000"
                                />
                                {errors.premiumAmount && (
                                    <p className="text-red-500 text-sm mt-1">{errors.premiumAmount}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Cashless Garages
                                </label>
                                <input
                                    type="number"
                                    name="cashlessGarages"
                                    value={formData.cashlessGarages}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Number of cashless garages"
                                    min="0"
                                />
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
                                placeholder="Enter detailed description of the car insurance policy"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Car Insurance Specific Fields */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Car Insurance Features</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="payAsYouConsume"
                                    checked={formData.payAsYouConsume}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Pay As You Consume</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="zeroDepreciation"
                                    checked={formData.zeroDepreciation}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Zero Depreciation</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="roadsideAssistance"
                                    checked={formData.roadsideAssistance}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">24x7 Roadside Assistance</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="engineProtection"
                                    checked={formData.engineProtection}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Engine Protection</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="consumables"
                                    checked={formData.consumables}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Consumables</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="freePickupDrop"
                                    checked={formData.freePickupDrop}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Free Pick-up & Drop</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="zeroPaperClaims"
                                    checked={formData.zeroPaperClaims}
                                    onChange={handleInputChange}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-black">Zero Paper Claims</span>
                            </label>
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
                        </div>
                    </div>

                    {/* Addons */}
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Addons</h4>
                        {formData.addons.map((addon, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="text"
                                    value={addon}
                                    onChange={(e) => handleArrayChange(index, 'addons', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter addon"
                                />
                                {formData.addons.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('addons', index)}
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
                            onClick={() => addArrayItem('addons')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                            + Add Addon
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

CarInsuranceForm.displayName = 'CarInsuranceForm';

export default CarInsuranceForm; 