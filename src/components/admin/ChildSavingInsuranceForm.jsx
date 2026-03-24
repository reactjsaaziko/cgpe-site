import React, { useState, useEffect } from 'react';

const ChildSavingInsuranceForm = ({ policy, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        planName: '',
        companyName: '',
        companyLogo: '',
        planType: 'Child Education Plan',
        childMinimumAge: 0,
        childMaximumAge: 17,
        parentMinimumAge: 18,
        parentMaximumAge: 65,
        minimumPremium: 0,
        maximumPremium: 0,
        policyTerm: 10,
        premiumPaymentTerm: 10,
        maturityAge: 18,
        sumAssured: 0,
        bonusRate: 0,
        educationBenefit: '',
        maturityBenefit: '',
        deathBenefit: '',
        waiverOfPremium: true,
        features: [''],
        benefits: [''],
        exclusions: [''],
        documentsRequired: [''],
        claimProcess: '',
        taxBenefits: '',
        isActive: true,
        isPopular: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (policy) {
            setFormData({
                planName: policy.planName || '',
                companyName: policy.companyName || '',
                companyLogo: policy.companyLogo || '',
                planType: policy.planType || 'Child Education Plan',
                childMinimumAge: policy.childMinimumAge || 0,
                childMaximumAge: policy.childMaximumAge || 17,
                parentMinimumAge: policy.parentMinimumAge || 18,
                parentMaximumAge: policy.parentMaximumAge || 65,
                minimumPremium: policy.minimumPremium || 0,
                maximumPremium: policy.maximumPremium || 0,
                policyTerm: policy.policyTerm || 10,
                premiumPaymentTerm: policy.premiumPaymentTerm || 10,
                maturityAge: policy.maturityAge || 18,
                sumAssured: policy.sumAssured || 0,
                bonusRate: policy.bonusRate || 0,
                educationBenefit: policy.educationBenefit || '',
                maturityBenefit: policy.maturityBenefit || '',
                deathBenefit: policy.deathBenefit || '',
                waiverOfPremium: policy.waiverOfPremium !== undefined ? policy.waiverOfPremium : true,
                features: policy.features && policy.features.length > 0 ? policy.features : [''],
                benefits: policy.benefits && policy.benefits.length > 0 ? policy.benefits : [''],
                exclusions: policy.exclusions && policy.exclusions.length > 0 ? policy.exclusions : [''],
                documentsRequired: policy.documentsRequired && policy.documentsRequired.length > 0 ? policy.documentsRequired : [''],
                claimProcess: policy.claimProcess || '',
                taxBenefits: policy.taxBenefits || '',
                isActive: policy.isActive !== undefined ? policy.isActive : true,
                isPopular: policy.isPopular !== undefined ? policy.isPopular : false
            });
        }
    }, [policy]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Filter out empty strings from arrays
            const cleanedData = {
                ...formData,
                features: formData.features.filter(f => f.trim() !== ''),
                benefits: formData.benefits.filter(b => b.trim() !== ''),
                exclusions: formData.exclusions.filter(e => e.trim() !== ''),
                documentsRequired: formData.documentsRequired.filter(d => d.trim() !== '')
            };

            const url = policy 
                ? `/api/child-saving-insurance/${policy._id}`
                : '/api/child-saving-insurance';
            
            const method = policy ? 'PUT' : 'POST';

            const token = localStorage.getItem('adminToken');
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanedData)
            });

            const result = await response.json();

            if (result.success) {
                onSave(result.childSavingInsurance);
            } else {
                setError(result.message || 'Failed to save policy');
            }
        } catch (error) {
            setError('Failed to save policy');
        } finally {
            setLoading(false);
        }
    };

    const planTypes = [
        'Child Education Plan',
        'Child Savings Plan',
        'Child ULIP',
        'Child Endowment'
    ];

    return (
        <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h3 className="text-lg font-medium text-black">
                    {policy ? 'Edit Child Saving Insurance Policy' : 'Add New Child Saving Insurance Policy'}
                </h3>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Plan Name *
                        </label>
                        <input
                            type="text"
                            name="planName"
                            value={formData.planName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Logo URL *
                        </label>
                        <input
                            type="url"
                            name="companyLogo"
                            value={formData.companyLogo}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Plan Type *
                        </label>
                        <select
                            name="planType"
                            value={formData.planType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            {planTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Age Ranges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Child Minimum Age *
                        </label>
                        <input
                            type="number"
                            name="childMinimumAge"
                            value={formData.childMinimumAge}
                            onChange={handleInputChange}
                            min="0"
                            max="17"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Child Maximum Age *
                        </label>
                        <input
                            type="number"
                            name="childMaximumAge"
                            value={formData.childMaximumAge}
                            onChange={handleInputChange}
                            min="0"
                            max="17"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Parent Minimum Age *
                        </label>
                        <input
                            type="number"
                            name="parentMinimumAge"
                            value={formData.parentMinimumAge}
                            onChange={handleInputChange}
                            min="18"
                            max="65"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Parent Maximum Age *
                        </label>
                        <input
                            type="number"
                            name="parentMaximumAge"
                            value={formData.parentMaximumAge}
                            onChange={handleInputChange}
                            min="18"
                            max="70"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Premium and Terms */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Policy Term (years) *
                        </label>
                        <input
                            type="number"
                            name="policyTerm"
                            value={formData.policyTerm}
                            onChange={handleInputChange}
                            min="5"
                            max="25"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Premium Payment Term (years) *
                        </label>
                        <input
                            type="number"
                            name="premiumPaymentTerm"
                            value={formData.premiumPaymentTerm}
                            onChange={handleInputChange}
                            min="1"
                            max="20"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maturity Age (years) *
                        </label>
                        <input
                            type="number"
                            name="maturityAge"
                            value={formData.maturityAge}
                            onChange={handleInputChange}
                            min="18"
                            max="25"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sum Assured (₹) *
                        </label>
                        <input
                            type="number"
                            name="sumAssured"
                            value={formData.sumAssured}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bonus Rate (%) *
                        </label>
                        <input
                            type="number"
                            name="bonusRate"
                            value={formData.bonusRate}
                            onChange={handleInputChange}
                            min="0"
                            max="10"
                            step="0.1"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Education Benefit *
                        </label>
                        <textarea
                            name="educationBenefit"
                            value={formData.educationBenefit}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maturity Benefit *
                        </label>
                        <textarea
                            name="maturityBenefit"
                            value={formData.maturityBenefit}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Death Benefit *
                        </label>
                        <textarea
                            name="deathBenefit"
                            value={formData.deathBenefit}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tax Benefits *
                        </label>
                        <textarea
                            name="taxBenefits"
                            value={formData.taxBenefits}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Features Array */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features
                    </label>
                    {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mb-2">
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
                                className="px-3 py-2 text-red-600 hover:text-red-900"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('features')}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                        + Add Feature
                    </button>
                </div>

                {/* Benefits Array */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Benefits
                    </label>
                    {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-2 mb-2">
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
                                className="px-3 py-2 text-red-600 hover:text-red-900"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('benefits')}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                        + Add Benefit
                    </button>
                </div>

                {/* Exclusions Array */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exclusions
                    </label>
                    {formData.exclusions.map((exclusion, index) => (
                        <div key={index} className="flex gap-2 mb-2">
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
                                className="px-3 py-2 text-red-600 hover:text-red-900"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('exclusions')}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                        + Add Exclusion
                    </button>
                </div>

                {/* Documents Required Array */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Documents Required
                    </label>
                    {formData.documentsRequired.map((document, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={document}
                                onChange={(e) => handleArrayChange(index, 'documentsRequired', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter document requirement"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('documentsRequired', index)}
                                className="px-3 py-2 text-red-600 hover:text-red-900"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem('documentsRequired')}
                        className="text-blue-600 hover:text-blue-900 text-sm"
                    >
                        + Add Document Requirement
                    </button>
                </div>

                {/* Claim Process */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Claim Process *
                    </label>
                    <textarea
                        name="claimProcess"
                        value={formData.claimProcess}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="waiverOfPremium"
                            checked={formData.waiverOfPremium}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Waiver of Premium</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Active</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="isPopular"
                            checked={formData.isPopular}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Popular</span>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : (policy ? 'Update Policy' : 'Create Policy')}
                    </button>
                </div>
            </form>
        </div>
    );
};

ChildSavingInsuranceForm.displayName = 'ChildSavingInsuranceForm';

export default ChildSavingInsuranceForm;
