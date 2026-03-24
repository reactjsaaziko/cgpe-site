import React, { useState } from 'react';

const BikeInsuranceBulkUpload = ({ onClose, onSuccess, defaultPolicyType }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files?.[0] || null);
        setMessage('');
        setError('');
    };

    const downloadTemplate = () => {
        const headers = [
            'policyName',
            'policyType',
            'coverageAmount',
            'coverageAmountText',
            'premiumAmount',
            'premiumFrequency',
            'policyTerm',
            'minAge',
            'maxAge',
            'description',
            'companyName',
            'companyLogo',
            'features',
            'benefits',
            'exclusions',
            'documents',
            'isActive',
            'isPopular',
            'discountPercentage',
            'waitingPeriod',
            'gracePeriod',
            'engineCapacity',
            'bikeType',
            'rating',
            'reviews'
        ];
        
        // Create properly quoted CSV content
        const sampleData = [
            'Bike Protection Plan',
            defaultPolicyType || 'comprehensive',
            '200000',
            '2 Lakh',
            '8000',
            'yearly',
            '1',
            '18',
            '70',
            'Comprehensive bike insurance coverage',
            'Sample Bike Insurer',
            'https://logo.png',
            '"Zero Depreciation|Roadside Assistance"',
            '"Quick Claims|24x7 Support"',
            '"Wear and Tear|Racing"',
            '"Registration|Insurance"',
            'true',
            'false',
            '15',
            '0',
            '30',
            '150cc',
            'motorcycle',
            '4.3',
            '80'
        ];
        
        const csvContent = [
            headers.join(','),
            sampleData.join(',')
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'bike_insurance_template.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a CSV or JSON file.');
            return;
        }
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (defaultPolicyType) {
                formData.append('defaultPolicyType', defaultPolicyType);
            }
            
            console.log('Uploading file:', file.name);
            
            const response = await fetch('/api/bike-insurance/policies/bulk-upload', {
                method: 'POST',
                body: formData
            });
            
            console.log('Response status:', response.status);
            
            const result = await response.json();
            console.log('Response result:', result);
            
            if (result.success) {
                const successMsg = `Successfully uploaded ${result.data.insertedCount} policies.`;
                const errorMsg = result.data.errors?.length > 0 ? ` ${result.data.errors.length} errors occurred.` : '';
                setMessage(successMsg + errorMsg);
                
                if (result.data.errors?.length > 0) {
                    console.log('Upload errors:', result.data.errors);
                }
                
                onSuccess?.();
            } else {
                setError(result.message || 'Bulk upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError(`An error occurred during upload: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Bulk Upload Bike Insurance</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Download the template CSV file and fill in your data</li>
                                <li>Supported formats: CSV, JSON</li>
                                <li>Required fields: policyName, coverageAmountText, premiumAmount, policyTerm, minAge, maxAge, description, companyName</li>
                                <li>Use pipe (|) to separate multiple values in array fields</li>
                                <li>Boolean fields: true/false, 1/0, yes/no</li>
                                <li>Policy types: comprehensive, third-party, third-party-fire-theft</li>
                            </ul>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={downloadTemplate}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                            >
                                <span>📄</span>
                                Download Template
                            </button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload File
                            </label>
                            <input
                                type="file"
                                accept=".csv,.json"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        {message && (
                            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={loading || !file}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BikeInsuranceBulkUpload;
