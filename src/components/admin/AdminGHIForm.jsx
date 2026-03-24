import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AdminGHIForm = ({ onClose, onSuccess, editingPlan = null }) => {
    const [formData, setFormData] = useState({
        planName: '',
        companyName: '',
        companyLogo: '',
        planType: 'Group Health Insurance',
        minimumEmployees: 1,
        maximumEmployees: 100,
        minimumAge: 18,
        maximumAge: 65,
        sumInsured: 500000,
        premiumPerEmployee: 5000,
        policyTerm: 1,
        waitingPeriod: 30,
        preExistingDiseases: true,
        maternityCover: false,
        dentalCover: false,
        opticalCover: false,
        features: [''],
        benefits: [''],
        exclusions: [''],
        documentsRequired: [''],
        claimProcess: '',
        taxBenefits: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingPlan) {
            setFormData({
                planName: editingPlan.planName || '',
                companyName: editingPlan.companyName || '',
                companyLogo: editingPlan.companyLogo || '',
                planType: editingPlan.planType || 'Group Health Insurance',
                minimumEmployees: editingPlan.minimumEmployees || 1,
                maximumEmployees: editingPlan.maximumEmployees || 100,
                minimumAge: editingPlan.minimumAge || 18,
                maximumAge: editingPlan.maximumAge || 65,
                sumInsured: editingPlan.sumInsured || 500000,
                premiumPerEmployee: editingPlan.premiumPerEmployee || 5000,
                policyTerm: editingPlan.policyTerm || 1,
                waitingPeriod: editingPlan.waitingPeriod || 30,
                preExistingDiseases: editingPlan.preExistingDiseases || true,
                maternityCover: editingPlan.maternityCover || false,
                dentalCover: editingPlan.dentalCover || false,
                opticalCover: editingPlan.opticalCover || false,
                features: editingPlan.features || [''],
                benefits: editingPlan.benefits || [''],
                exclusions: editingPlan.exclusions || [''],
                documentsRequired: editingPlan.documentsRequired || [''],
                claimProcess: editingPlan.claimProcess || '',
                taxBenefits: editingPlan.taxBenefits || ''
            });
        }
    }, [editingPlan]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (field, index, value) => {
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

        try {
            const token = localStorage.getItem('adminToken');
            const url = editingPlan 
                ? `/api/group-health-insurance/${editingPlan._id}`
                : '/api/group-health-insurance';
            
            const method = editingPlan ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(editingPlan ? 'Plan updated successfully!' : 'Plan created successfully!');
                onSuccess();
                onClose();
            } else {
                toast.error(data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {editingPlan ? 'Edit Group Health Insurance Plan' : 'Add New Group Health Insurance Plan'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="Group Health Insurance">Group Health Insurance</option>
                                <option value="Corporate Health Insurance">Corporate Health Insurance</option>
                                <option value="Employee Health Insurance">Employee Health Insurance</option>
                                <option value="Family Floater Group">Family Floater Group</option>
                            </select>
                        </div>
                    </div>

                    {/* Employee and Age Limits */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Min Employees *
                            </label>
                            <input
                                type="number"
                                name="minimumEmployees"
                                value={formData.minimumEmployees}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Max Employees *
                            </label>
                            <input
                                type="number"
                                name="maximumEmployees"
                                value={formData.maximumEmployees}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Min Age *
                            </label>
                            <input
                                type="number"
                                name="minimumAge"
                                value={formData.minimumAge}
                                onChange={handleInputChange}
                                min="18"
                                max="65"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Max Age *
                            </label>
                            <input
                                type="number"
                                name="maximumAge"
                                value={formData.maximumAge}
                                onChange={handleInputChange}
                                min="18"
                                max="75"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Coverage and Premium */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sum Insured (₹) *
                            </label>
                            <input
                                type="number"
                                name="sumInsured"
                                value={formData.sumInsured}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Premium per Employee (₹) *
                            </label>
                            <input
                                type="number"
                                name="premiumPerEmployee"
                                value={formData.premiumPerEmployee}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Policy Term (Years) *
                            </label>
                            <select
                                name="policyTerm"
                                value={formData.policyTerm}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value={1}>1 Year</option>
                                <option value={2}>2 Years</option>
                                <option value={3}>3 Years</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Waiting Period (Days) *
                            </label>
                            <input
                                type="number"
                                name="waitingPeriod"
                                value={formData.waitingPeriod}
                                onChange={handleInputChange}
                                min="0"
                                max="48"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Coverage Options */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="preExistingDiseases"
                                checked={formData.preExistingDiseases}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Pre-existing Diseases</span>
                        </label>

                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="maternityCover"
                                checked={formData.maternityCover}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Maternity Cover</span>
                        </label>

                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="dentalCover"
                                checked={formData.dentalCover}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Dental Cover</span>
                        </label>

                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="opticalCover"
                                checked={formData.opticalCover}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm font-medium text-gray-700">Optical Cover</span>
                        </label>
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
                                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter feature"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('features', index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('features')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
                                    onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter benefit"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('benefits', index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('benefits')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
                                    onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter exclusion"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('exclusions', index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('exclusions')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Add Exclusion
                        </button>
                    </div>

                    {/* Documents Required */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Documents Required
                        </label>
                        {formData.documentsRequired.map((doc, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={doc}
                                    onChange={(e) => handleArrayChange('documentsRequired', index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter document requirement"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('documentsRequired', index)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addArrayItem('documentsRequired')}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Add Document Requirement
                        </button>
                    </div>

                    {/* Claim Process and Tax Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Claim Process *
                            </label>
                            <textarea
                                name="claimProcess"
                                value={formData.claimProcess}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                placeholder="Describe the claim process..."
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
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                                placeholder="Describe tax benefits..."
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : (editingPlan ? 'Update Plan' : 'Create Plan')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminGHIForm;
