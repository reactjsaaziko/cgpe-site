import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/apiUtils';

const InvestmentPlanForm = ({ plan, onClose, onSaved }) => {
    const [formData, setFormData] = useState({
        company: '',
        logo: '',
        solution: '',
        returns: '',
        returnsPeriod: '5 YR Returns',
        fundType: '',
        payout: '',
        payoutNote: 'If you had invested 20 yrs ago',
        tags: [],
        morePlans: '',
        launch: false,
        highlight: false,
        blueBanner: {
            main: '',
            bold: '',
            rest: '',
            sub: '',
            note: ''
        },
        minAmount: '',
        maxAmount: '',
        minYears: '',
        maxYears: '',
        riskLevel: 'moderate',
        category: 'equity',
        isActive: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newTag, setNewTag] = useState('');

    // Predefined options for dropdowns
    const returnsPeriodOptions = [
        '1 YR Returns',
        '3 YR Returns', 
        '5 YR Returns',
        '10 YR Returns',
        'Since Inception'
    ];

    const tagOptions = [
        'instant tax limit',
        'tax saving',
        'high returns',
        'low risk',
        'monthly payout',
        'quarterly payout',
        'annual payout',
        'growth fund',
        'income fund',
        'balanced fund',
        'equity fund',
        'debt fund',
        'hybrid fund',
        'sector fund',
        'index fund',
        'liquid fund',
        'ultra short term',
        'short term',
        'medium term',
        'long term'
    ];

    const riskLevelOptions = [
        { value: 'low', label: 'Low Risk' },
        { value: 'moderate', label: 'Moderate Risk' },
        { value: 'high', label: 'High Risk' }
    ];

    const categoryOptions = [
        { value: 'equity', label: 'Equity' },
        { value: 'balanced', label: 'Balanced' },
        { value: 'debt', label: 'Debt' },
        { value: 'hybrid', label: 'Hybrid' }
    ];

    const blueBannerOptions = [
        { value: 'important_deal', label: 'Important Deal' },
        { value: 'limited_time', label: 'Limited Time Offer' },
        { value: 'exclusive', label: 'Exclusive Offer' },
        { value: 'best_seller', label: 'Best Seller' },
        { value: 'new_launch', label: 'New Launch' }
    ];

    useEffect(() => {
        if (plan) {
            setFormData({
                ...plan,
                tags: plan.tags || [],
                blueBanner: plan.blueBanner || {
                    main: '',
                    bold: '',
                    rest: '',
                    sub: '',
                    note: ''
                }
            });
        }
    }, [plan]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const handleBlueBannerChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            blueBanner: {
                ...prev.blueBanner,
                [field]: value
            }
        }));
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTagSelect = (selectedTag) => {
        if (!formData.tags.includes(selectedTag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, selectedTag]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const url = plan 
                ? `/investment-plans/admin/${plan._id}`
                : '/investment-plans';
            
            const method = plan ? 'PUT' : 'POST';

            const data = await apiRequest(url, {
                method,
                body: JSON.stringify(formData)
            });

            if (data.success) {
                onSaved();
            } else {
                setError(data.message || 'Failed to save plan');
            }
        } catch (error) {
            console.error('Save plan error:', error);
            setError(error.message || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-black">
                    {plan ? 'Edit Investment Plan' : 'Add New Investment Plan'}
                </h3>
                <button
                    onClick={onClose}
                    className="text-black hover:text-black"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-h-96 overflow-y-auto">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                        {error}
                    </div>
                )}

                {/* Basic Information */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Logo URL *
                            </label>
                            <input
                                type="url"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Solution Name *
                            </label>
                            <input
                                type="text"
                                name="solution"
                                value={formData.solution}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Returns *
                            </label>
                            <input
                                type="text"
                                name="returns"
                                value={formData.returns}
                                onChange={handleChange}
                                placeholder="e.g., 16.7%"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Returns Period *
                            </label>
                            <select
                                name="returnsPeriod"
                                value={formData.returnsPeriod}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                {returnsPeriodOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Fund Type *
                            </label>
                            <input
                                type="text"
                                name="fundType"
                                value={formData.fundType}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Payout *
                            </label>
                            <input
                                type="text"
                                name="payout"
                                value={formData.payout}
                                onChange={handleChange}
                                placeholder="e.g., ₹72.4 L"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Payout Note *
                            </label>
                            <input
                                type="text"
                                name="payoutNote"
                                value={formData.payoutNote}
                                onChange={handleChange}
                                placeholder="e.g., If you had invested 20 yrs ago"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Investment Criteria */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Investment Criteria</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Minimum Amount (₹) *
                            </label>
                            <input
                                type="number"
                                name="minAmount"
                                value={formData.minAmount}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Maximum Amount (₹) *
                            </label>
                            <input
                                type="number"
                                name="maxAmount"
                                value={formData.maxAmount}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Minimum Years *
                            </label>
                            <input
                                type="number"
                                name="minYears"
                                value={formData.minYears}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Maximum Years *
                            </label>
                            <input
                                type="number"
                                name="maxYears"
                                value={formData.maxYears}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Risk Level *
                            </label>
                            <select
                                name="riskLevel"
                                value={formData.riskLevel}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                {riskLevelOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                {categoryOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tags Section */}
                <div className="border-b pb-6">
                    <h4 className="text-md font-medium text-black mb-4">Tags</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Select Tags
                            </label>
                            <select
                                value=""
                                onChange={(e) => handleTagSelect(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select a tag to add</option>
                                {tagOptions.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Custom Tags
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a custom tag"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Selected Tags
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-1 text-blue-600 hover:text-blue-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
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
                                name="launch"
                                checked={formData.launch}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-black">
                                Launch (New Plan)
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="highlight"
                                checked={formData.highlight}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-black">
                                Highlight this plan
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                More Plans Text
                            </label>
                            <input
                                type="text"
                                name="morePlans"
                                value={formData.morePlans}
                                onChange={handleChange}
                                placeholder="e.g., 2 More Plans"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Blue Banner (for highlighted plans) */}
                {formData.highlight && (
                    <div className="border-b pb-6">
                        <h4 className="text-md font-medium text-black mb-4">Blue Banner Details</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Banner Type
                                </label>
                                <select
                                    value={formData.blueBanner.main || ''}
                                    onChange={(e) => handleBlueBannerChange('main', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select banner type</option>
                                    {blueBannerOptions.map(option => (
                                        <option key={option.value} value={option.label}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Bold Text
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.blueBanner.bold}
                                        onChange={(e) => handleBlueBannerChange('bold', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Rest Text
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.blueBanner.rest}
                                        onChange={(e) => handleBlueBannerChange('rest', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Sub Text
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.blueBanner.sub}
                                        onChange={(e) => handleBlueBannerChange('sub', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Note
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.blueBanner.note}
                                        onChange={(e) => handleBlueBannerChange('note', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                        {loading ? 'Saving...' : (plan ? 'Update Plan' : 'Create Plan')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvestmentPlanForm; 