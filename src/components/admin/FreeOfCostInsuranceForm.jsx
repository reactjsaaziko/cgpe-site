import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app';

const FreeOfCostInsuranceForm = ({ policy, onClose, onSaved }) => {
    const [formData, setFormData] = useState({
        policyName: '',
        companyName: '',
        policyType: 'Term Insurance',
        sumAssured: '',
        policyTerm: '',
        premiumAmount: 0, // Default to 0 for free of cost insurance
        ageRange: {
            min: 18,
            max: 65
        },
        occupation: ['Salaried'],
        qualification: ['Graduate'],
        annualIncome: {
            min: 0,
            max: 1000000
        },
        smokingStatus: ['Both'],
        medicalHistory: [],
        exclusions: [],
        benefits: [],
        documentsRequired: [],
        claimProcess: '',
        termsAndConditions: '',
        isActive: true,
        isPopular: false
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Predefined options
    const occupationOptions = [
        'Salaried', 'Self-Employed', 'Business Owner', 'Professional', 
        'Student', 'Homemaker', 'Retired', 'Government Employee', 'Private Employee'
    ];

    const qualificationOptions = [
        '10th Pass', '12th Pass', 'Graduate', 'Post Graduate', 
        'Professional Degree', 'Diploma', 'ITI', 'Other'
    ];

    const medicalHistoryOptions = [
        'Diabetes', 'Hypertension', 'Heart Disease', 'Cancer', 
        'Kidney Disease', 'Liver Disease', 'None'
    ];

    const documentOptions = [
        'Aadhar Card', 'PAN Card', 'Passport', 'Driving License',
        'Voter ID', 'Bank Statement', 'Income Proof', 'Medical Certificate'
    ];

    useEffect(() => {
        if (policy) {
            setFormData({
                ...policy,
                ageRange: policy.ageRange || { min: 18, max: 65 },
                annualIncome: policy.annualIncome || { min: 0, max: 1000000 }
            });
        } else {
            console.log('Initializing new form with default data');
        }
    }, [policy]);

    const handleInputChange = (field, value) => {
        console.log(`Updating field ${field} with value:`, value);
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleNestedInputChange = (parentField, childField, value) => {
        setFormData(prev => ({
            ...prev,
            [parentField]: {
                ...prev[parentField],
                [childField]: value
            }
        }));
    };

    const handleArrayChange = (field, value, action) => {
        setFormData(prev => ({
            ...prev,
            [field]: action === 'add' 
                ? [...prev[field], value]
                : prev[field].filter(item => item !== value)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.policyName.trim()) {
            newErrors.policyName = 'Policy name is required';
        }
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        if (!formData.sumAssured || formData.sumAssured <= 0) {
            newErrors.sumAssured = 'Sum assured must be greater than 0';
        }
        if (!formData.policyTerm || formData.policyTerm <= 0) {
            newErrors.policyTerm = 'Policy term must be greater than 0';
        }
        if (formData.premiumAmount < 0) {
            newErrors.premiumAmount = 'Premium amount cannot be negative';
        }
        if (formData.ageRange.min >= formData.ageRange.max) {
            newErrors.ageRange = 'Minimum age must be less than maximum age';
        }
        if (formData.annualIncome.min >= formData.annualIncome.max) {
            newErrors.annualIncome = 'Minimum income must be less than maximum income';
        }
        if (formData.occupation.length === 0) {
            newErrors.occupation = 'At least one occupation must be selected';
        }
        if (formData.qualification.length === 0) {
            newErrors.qualification = 'At least one qualification must be selected';
        }

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

        // Ensure form data is properly formatted
        const submitData = {
            ...formData,
            sumAssured: parseFloat(formData.sumAssured) || 0,
            policyTerm: parseInt(formData.policyTerm) || 0,
            premiumAmount: parseFloat(formData.premiumAmount) || 0, // Use the actual premium amount from form
            ageRange: {
                min: parseInt(formData.ageRange.min) || 18,
                max: parseInt(formData.ageRange.max) || 65
            },
            annualIncome: {
                min: parseFloat(formData.annualIncome.min) || 0,
                max: parseFloat(formData.annualIncome.max) || 1000000
            },
            smokingStatus: formData.smokingStatus.length > 0 ? formData.smokingStatus : ['Both'],
            occupation: formData.occupation.length > 0 ? formData.occupation : ['Salaried'],
            qualification: formData.qualification.length > 0 ? formData.qualification : ['Graduate']
        };
        
        console.log('Formatted submit data:', submitData);

        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            console.log('Admin token:', token ? 'Present' : 'Missing');
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            console.log('Making API request...');
            let response;
            if (policy) {
                response = await axios.put(
                    `${API_BASE_URL}/api/free-of-cost-insurance/${policy._id}`,
                    submitData,
                    config
                );
            } else {
                response = await axios.post(
                    `${API_BASE_URL}/api/free-of-cost-insurance`,
                    submitData,
                    config
                );
            }

            console.log('API response:', response.data);
            if (response.data.success) {
                console.log('Policy saved successfully');
                onSaved();
            }
        } catch (error) {
            console.error('Error saving policy:', error);
            console.error('Error response:', error.response?.data);
            setErrors({
                submit: error.response?.data?.message || 'An error occurred while saving the policy'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <form 
                onSubmit={(e) => {
                    console.log('Form onSubmit triggered');
                    handleSubmit(e);
                }} 
                className="space-y-6"
            >
                {/* Basic Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Policy Name *
                            </label>
                            <input
                                type="text"
                                value={formData.policyName}
                                onChange={(e) => handleInputChange('policyName', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.policyName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter policy name"
                            />
                            {errors.policyName && (
                                <p className="text-red-500 text-sm mt-1">{errors.policyName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter company name"
                            />
                            {errors.companyName && (
                                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Policy Type
                            </label>
                            <select
                                value={formData.policyType}
                                onChange={(e) => handleInputChange('policyType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="Term Insurance">Term Insurance</option>
                                <option value="Health Insurance">Health Insurance</option>
                                <option value="Life Insurance">Life Insurance</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Premium Amount (₹)
                            </label>
                            <input
                                type="number"
                                value={formData.premiumAmount}
                                onChange={(e) => handleInputChange('premiumAmount', parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter premium amount (0 for free)"
                                min="0"
                                step="0.01"
                            />
                            <p className="text-xs text-gray-500 mt-1">Enter 0 for free of cost insurance</p>
                            {errors.premiumAmount && (
                                <p className="text-red-500 text-sm mt-1">{errors.premiumAmount}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Policy Details */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Policy Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sum Assured (₹) *
                            </label>
                            <input
                                type="number"
                                value={formData.sumAssured}
                                onChange={(e) => handleInputChange('sumAssured', parseFloat(e.target.value) || 0)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.sumAssured ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter sum assured amount"
                            />
                            {errors.sumAssured && (
                                <p className="text-red-500 text-sm mt-1">{errors.sumAssured}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Policy Term (Years) *
                            </label>
                            <input
                                type="number"
                                value={formData.policyTerm}
                                onChange={(e) => handleInputChange('policyTerm', parseInt(e.target.value) || 0)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                    errors.policyTerm ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter policy term in years"
                            />
                            {errors.policyTerm && (
                                <p className="text-red-500 text-sm mt-1">{errors.policyTerm}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Age Range */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Age Range</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Age
                            </label>
                            <input
                                type="number"
                                value={formData.ageRange.min}
                                onChange={(e) => handleNestedInputChange('ageRange', 'min', parseInt(e.target.value) || 18)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="18"
                                max="100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Age
                            </label>
                            <input
                                type="number"
                                value={formData.ageRange.max}
                                onChange={(e) => handleNestedInputChange('ageRange', 'max', parseInt(e.target.value) || 65)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                min="18"
                                max="100"
                            />
                        </div>
                    </div>
                    {errors.ageRange && (
                        <p className="text-red-500 text-sm mt-2">{errors.ageRange}</p>
                    )}
                </div>

                {/* Annual Income Range */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Annual Income Range (₹)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minimum Income
                            </label>
                            <input
                                type="number"
                                value={formData.annualIncome.min}
                                onChange={(e) => handleNestedInputChange('annualIncome', 'min', parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Income
                            </label>
                            <input
                                type="number"
                                value={formData.annualIncome.max}
                                onChange={(e) => handleNestedInputChange('annualIncome', 'max', parseFloat(e.target.value) || 1000000)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="1000000"
                            />
                        </div>
                    </div>
                    {errors.annualIncome && (
                        <p className="text-red-500 text-sm mt-2">{errors.annualIncome}</p>
                    )}
                </div>

                {/* Eligibility Criteria */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Eligibility Criteria</h3>
                    
                    {/* Occupation */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Eligible Occupations *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {occupationOptions.map((occupation) => (
                                <label key={occupation} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.occupation.includes(occupation)}
                                        onChange={(e) => handleArrayChange('occupation', occupation, e.target.checked ? 'add' : 'remove')}
                                        className="mr-2 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{occupation}</span>
                                </label>
                            ))}
                        </div>
                        {errors.occupation && (
                            <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
                        )}
                    </div>

                    {/* Qualification */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Eligible Qualifications *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {qualificationOptions.map((qualification) => (
                                <label key={qualification} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.qualification.includes(qualification)}
                                        onChange={(e) => handleArrayChange('qualification', qualification, e.target.checked ? 'add' : 'remove')}
                                        className="mr-2 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{qualification}</span>
                                </label>
                            ))}
                        </div>
                        {errors.qualification && (
                            <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>
                        )}
                    </div>

                    {/* Smoking Status */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Smoking Status Eligibility
                        </label>
                        <div className="flex gap-4">
                            {['Yes', 'No', 'Both'].map((status) => (
                                <label key={status} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.smokingStatus.includes(status)}
                                        onChange={(e) => handleArrayChange('smokingStatus', status, e.target.checked ? 'add' : 'remove')}
                                        className="mr-2 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{status}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Medical History */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical History</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {medicalHistoryOptions.map((condition) => (
                            <label key={condition} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.medicalHistory.includes(condition)}
                                    onChange={(e) => handleArrayChange('medicalHistory', condition, e.target.checked ? 'add' : 'remove')}
                                    className="mr-2 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{condition}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Documents Required */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Documents Required</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {documentOptions.map((document) => (
                            <label key={document} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.documentsRequired.includes(document)}
                                    onChange={(e) => handleArrayChange('documentsRequired', document, e.target.checked ? 'add' : 'remove')}
                                    className="mr-2 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{document}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Benefits and Exclusions */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Benefits & Exclusions</h3>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Benefits
                        </label>
                        <textarea
                            value={formData.benefits.join('\n')}
                            onChange={(e) => handleInputChange('benefits', e.target.value.split('\n').filter(item => item.trim()))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            placeholder="Enter benefits (one per line)"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Exclusions
                        </label>
                        <textarea
                            value={formData.exclusions.join('\n')}
                            onChange={(e) => handleInputChange('exclusions', e.target.value.split('\n').filter(item => item.trim()))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            placeholder="Enter exclusions (one per line)"
                        />
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Claim Process
                        </label>
                        <textarea
                            value={formData.claimProcess}
                            onChange={(e) => handleInputChange('claimProcess', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                            placeholder="Describe the claim process"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Terms & Conditions
                        </label>
                        <textarea
                            value={formData.termsAndConditions}
                            onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                            placeholder="Enter terms and conditions"
                        />
                    </div>

                    <div className="flex flex-col space-y-3">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.isActive}
                                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                className="mr-2 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">Active Policy</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isPopular"
                                checked={formData.isPopular}
                                onChange={(e) => handleInputChange('isPopular', e.target.checked)}
                                className="mr-2 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-black">Popular Policy</span>
                        </label>
                    </div>
                </div>

                {/* Error Message */}
                {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm">{errors.submit}</p>
                    </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    {/* <button
                        type="button"
                        onClick={async () => {
                            console.log('Test button clicked');
                            console.log('Current form data:', formData);
                            console.log('Validation result:', validateForm());
                            
                            // Test backend connectivity
                            try {
                                const response = await axios.get('/api/health');
                                console.log('Backend health check:', response.data);
                            } catch (error) {
                                console.error('Backend health check failed:', error);
                            }
                        }}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Test Form
                    </button> */}
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={(e) => {
                            console.log('Submit button clicked');
                            if (loading) {
                                e.preventDefault();
                                return;
                            }
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : (policy ? 'Update Policy' : 'Create Policy')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FreeOfCostInsuranceForm;

