import React, { useState, useEffect } from 'react';

const TravelInsuranceForm = ({ policy, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyLogo: '',
        planName: '',
        subtitle: '',
        medicalCoverage: '',
        passportCoverage: '',
        baggageCoverage: '',
        premium: '',
        premiumAmount: '',
        details: 'View product details',
        isActive: true,
        isPopular: false,
        banner: '',
        rating: 4.0,
        reviews: 0,
        tags: [],
        description: '',
        features: [''],
        benefits: [''],
        exclusions: [''],
        documents: [''],
        claimSettlementRatio: 95,
        waitingPeriod: 0,
        gracePeriod: 30,
        discountPercentage: 0
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (policy) {
            setFormData({
                companyName: policy.companyName || '',
                companyLogo: policy.companyLogo || '',
                planName: policy.planName || '',
                subtitle: policy.subtitle || '',
                medicalCoverage: policy.medicalCoverage || '',
                passportCoverage: policy.passportCoverage || '',
                baggageCoverage: policy.baggageCoverage || '',
                premium: policy.premium || '',
                premiumAmount: policy.premiumAmount || '',
                details: policy.details || 'View product details',
                isActive: policy.isActive !== undefined ? policy.isActive : true,
                isPopular: policy.isPopular !== undefined ? policy.isPopular : false,
                banner: policy.banner || '',
                rating: policy.rating || 4.0,
                reviews: policy.reviews || 0,
                tags: policy.tags || [],
                description: policy.description || '',
                features: policy.features && policy.features.length > 0 ? policy.features : [''],
                benefits: policy.benefits && policy.benefits.length > 0 ? policy.benefits : [''],
                exclusions: policy.exclusions && policy.exclusions.length > 0 ? policy.exclusions : [''],
                documents: policy.documents && policy.documents.length > 0 ? policy.documents : [''],
                claimSettlementRatio: policy.claimSettlementRatio || 95,
                waitingPeriod: policy.waitingPeriod || 0,
                gracePeriod: policy.gracePeriod || 30,
                discountPercentage: policy.discountPercentage || 0
            });
        }
    }, [policy]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleArrayInputChange = (index, field, value) => {
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

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        setFormData(prev => ({
            ...prev,
            tags
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        if (!formData.companyLogo.trim()) {
            newErrors.companyLogo = 'Company logo is required';
        }
        if (!formData.planName.trim()) {
            newErrors.planName = 'Plan name is required';
        }
        if (!formData.medicalCoverage.trim()) {
            newErrors.medicalCoverage = 'Medical coverage is required';
        }
        if (!formData.passportCoverage.trim()) {
            newErrors.passportCoverage = 'Passport coverage is required';
        }
        if (!formData.baggageCoverage.trim()) {
            newErrors.baggageCoverage = 'Baggage coverage is required';
        }
        if (!formData.premium.trim()) {
            newErrors.premium = 'Premium is required';
        }
        if (!formData.premiumAmount || formData.premiumAmount <= 0) {
            newErrors.premiumAmount = 'Premium amount must be greater than 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const url = policy 
                ? `/api/travel-insurance/admin/${policy._id}`
                : '/api/travel-insurance/admin';
            
            const method = policy ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                onSave(result.data);
            } else {
                setErrors({ submit: result.message || 'Failed to save policy' });
            }
        } catch (error) {
            setErrors({ submit: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {policy ? 'Edit Travel Insurance Policy' : 'Add New Travel Insurance Policy'}
                        </h2>
                        <p className="text-gray-600 mt-1">
                            {policy ? 'Update the travel insurance policy details' : 'Create a new travel insurance policy'}
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {errors.submit && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {errors.submit}
                        </div>
                    )}

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., Niva Bupa"
                            />
                            {errors.companyName && (
                                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Logo URL *
                            </label>
                            <input
                                type="text"
                                name="companyLogo"
                                value={formData.companyLogo}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.companyLogo ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., /niva.png"
                            />
                            {errors.companyLogo && (
                                <p className="text-red-500 text-sm mt-1">{errors.companyLogo}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Plan Name *
                            </label>
                            <input
                                type="text"
                                name="planName"
                                value={formData.planName}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.planName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., Travel Assure Lite"
                            />
                            {errors.planName && (
                                <p className="text-red-500 text-sm mt-1">{errors.planName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., formerly known as Max Bupa"
                            />
                        </div>
                    </div>

                    {/* Coverage Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Medical Coverage *
                            </label>
                            <input
                                type="text"
                                name="medicalCoverage"
                                value={formData.medicalCoverage}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.medicalCoverage ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., $100,000"
                            />
                            {errors.medicalCoverage && (
                                <p className="text-red-500 text-sm mt-1">{errors.medicalCoverage}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Passport Coverage *
                            </label>
                            <input
                                type="text"
                                name="passportCoverage"
                                value={formData.passportCoverage}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.passportCoverage ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., $300"
                            />
                            {errors.passportCoverage && (
                                <p className="text-red-500 text-sm mt-1">{errors.passportCoverage}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Baggage Coverage *
                            </label>
                            <input
                                type="text"
                                name="baggageCoverage"
                                value={formData.baggageCoverage}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.baggageCoverage ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., $1,000"
                            />
                            {errors.baggageCoverage && (
                                <p className="text-red-500 text-sm mt-1">{errors.baggageCoverage}</p>
                            )}
                        </div>
                    </div>

                    {/* Premium Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Premium Display *
                            </label>
                            <input
                                type="text"
                                name="premium"
                                value={formData.premium}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.premium ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., 2,561"
                            />
                            {errors.premium && (
                                <p className="text-red-500 text-sm mt-1">{errors.premium}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Premium Amount (₹) *
                            </label>
                            <input
                                type="number"
                                name="premiumAmount"
                                value={formData.premiumAmount}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.premiumAmount ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="e.g., 2561"
                                min="0"
                            />
                            {errors.premiumAmount && (
                                <p className="text-red-500 text-sm mt-1">{errors.premiumAmount}</p>
                            )}
                        </div>
                    </div>

                    {/* Status and Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
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
                                <label className="ml-2 block text-sm text-gray-900">
                                    Popular Policy
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Banner Text
                            </label>
                            <input
                                type="text"
                                name="banner"
                                value={formData.banner}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., 1,105 people bought this plan in last one week"
                            />
                        </div>
                    </div>

                    {/* Rating and Reviews */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating (1-5)
                            </label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="1"
                                max="5"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Reviews
                            </label>
                            <input
                                type="number"
                                name="reviews"
                                value={formData.reviews}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags (comma-separated)
                            </label>
                            <input
                                type="text"
                                value={formData.tags.join(', ')}
                                onChange={handleTagsChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., international, student, business"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter policy description..."
                        />
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Features
                        </label>
                        {formData.features.map((feature, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleArrayInputChange(index, 'features', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter feature..."
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('features', index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('features')}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Add Feature
                        </button>
                    </div>

                    {/* Benefits */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Benefits
                        </label>
                        {formData.benefits.map((benefit, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => handleArrayInputChange(index, 'benefits', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter benefit..."
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('benefits', index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('benefits')}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Add Benefit
                        </button>
                    </div>

                    {/* Exclusions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Exclusions
                        </label>
                        {formData.exclusions.map((exclusion, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={exclusion}
                                    onChange={(e) => handleArrayInputChange(index, 'exclusions', e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter exclusion..."
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('exclusions', index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('exclusions')}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Add Exclusion
                        </button>
                    </div>

                    {/* Additional Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Claim Settlement Ratio (%)
                            </label>
                            <input
                                type="number"
                                name="claimSettlementRatio"
                                value={formData.claimSettlementRatio}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                                max="100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Waiting Period (days)
                            </label>
                            <input
                                type="number"
                                name="waitingPeriod"
                                value={formData.waitingPeriod}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Grace Period (days)
                            </label>
                            <input
                                type="number"
                                name="gracePeriod"
                                value={formData.gracePeriod}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount Percentage (%)
                            </label>
                            <input
                                type="number"
                                name="discountPercentage"
                                value={formData.discountPercentage}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="0"
                                max="50"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : (policy ? 'Update Policy' : 'Create Policy')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TravelInsuranceForm; 