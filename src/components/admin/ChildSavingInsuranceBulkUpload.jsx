import React, { useState } from 'react';

const ChildSavingInsuranceBulkUpload = ({ onClose, onSuccess, defaultPlanType }) => {
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
            'planName',
            'planType',
            'companyName',
            'companyLogo',
            'minimumPremium',
            'maximumPremium',
            'policyTerm',
            'premiumPaymentTerm',
            'maturityAge',
            'sumAssured',
            'bonusRate',
            'educationBenefit',
            'maturityBenefit',
            'deathBenefit',
            'waiverOfPremium',
            'features',
            'benefits',
            'exclusions',
            'documentsRequired',
            'claimProcess',
            'taxBenefits',
            'isActive',
            'isPopular'
        ];
        const sample = `${headers.join(',')}\nTest Child Plan,${defaultPlanType || 'Child Education Plan'},Test Insurance Co,https://example.com/logo.png,5000,50000,15,15,18,100000,1,Education support for child,Guaranteed maturity amount,Sum assured on death,true,"Education Benefits|Tax Savings","Guaranteed Maturity|Waiver of Premium","Partial Withdrawal Limits|Age Restrictions","Birth Certificate|Parent ID",Standard claim process,Tax benefits under section 80C,true,false`;
        const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'child_saving_template.csv';
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
            if (defaultPlanType) {
                formData.append('defaultPlanType', defaultPlanType);
            }
            
            // Get the admin token from localStorage
            const token = localStorage.getItem('adminToken');
            if (!token) {
                setError('Authentication required. Please login again.');
                return;
            }

            console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
            console.log('FormData contents:', Array.from(formData.entries()));

            const response = await fetch('/api/child-saving-insurance/bulk-upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Don't set Content-Type for FormData - browser will set it automatically with boundary
                },
                body: formData
            });
            
            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                if (response.status === 401) {
                    setError('Authentication failed. Please login again.');
                    return;
                }
                if (response.status === 429) {
                    setError('Too many requests. Please wait a moment and try again.');
                    return;
                }
                const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
                console.error('Upload error response:', errorData);
                setError(errorData.message || `Upload failed with status ${response.status}`);
                return;
            }
            
            const result = await response.json();
            console.log('Upload success response:', result);
            if (result.success) {
                setMessage(`Uploaded ${result.data.insertedCount} policies. ${result.data.errors?.length || 0} errors.`);
                onSuccess?.();
            } else {
                setError(result.message || 'Bulk upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('An error occurred during upload. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Bulk Upload Child Saving Insurance</h2>
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
                                <li>Required fields: planName, companyName, companyLogo, planType, minimumPremium, maturityAge, sumAssured</li>
                                <li>Use pipe (|) to separate multiple values in array fields</li>
                                <li>Boolean fields: true/false, 1/0, yes/no</li>
                                <li>Plan types: Child Education Plan, Child Savings Plan, Child ULIP, Child Endowment</li>
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

export default ChildSavingInsuranceBulkUpload;
