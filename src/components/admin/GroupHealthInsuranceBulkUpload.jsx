import React, { useState } from 'react';

const GroupHealthInsuranceBulkUpload = ({ onClose, onSuccess, defaultPlanType }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [uploadDetails, setUploadDetails] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files?.[0] || null);
        setMessage('');
        setError('');
        setUploadDetails(null);
    };

    const downloadTemplate = () => {
        const headers = [
            'planName',
            'planType',
            'companyName',
            'companyLogo',
            'sumInsured',
            'premiumPerEmployee',
            'minimumEmployees',
            'maximumEmployees',
            'minimumAge',
            'maximumAge',
            'policyTerm',
            'waitingPeriod',
            'preExistingDiseases',
            'maternityCover',
            'dentalCover',
            'opticalCover',
            'features',
            'benefits',
            'exclusions',
            'documentsRequired',
            'claimProcess',
            'taxBenefits',
            'isActive',
            'isPopular'
        ];
        const sample = `${headers.join(',')}\nCorporate Health Plan,Group Health Insurance,Corporate Insurer,https://logo.png,500000,5000,10,1000,25,65,1,12,true,false,false,false,"Family Coverage|Cashless Claims","Preventive Checkups|Maternity Benefits","Pre-existing waiting period|Cosmetic surgery","Employee List|Company Registration","Cashless claims at network hospitals","Tax benefits under Section 80D",true,false`;
        const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'group_health_template.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const validateFile = (file) => {
        if (!file) {
            return 'Please select a file to upload.';
        }

        const allowedTypes = ['.csv', '.json'];
        const fileName = file.name.toLowerCase();
        const hasValidExtension = allowedTypes.some(ext => fileName.endsWith(ext));
        
        if (!hasValidExtension) {
            return 'Please select a valid CSV or JSON file.';
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            return 'File size must be less than 5MB.';
        }

        return null;
    };

    const handleUpload = async () => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');
        setUploadDetails(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            if (defaultPlanType) {
                formData.append('defaultPlanType', defaultPlanType);
            }

            // Debug: Log request details
            console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
            console.log('Admin token present:', !!localStorage.getItem('adminToken'));

            const response = await fetch('/api/group-health-insurance/bulk-upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: formData
            });

            // Debug: Log response details
            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            const result = await response.json();
            console.log('Response body:', result);
            
            if (result.success) {
                const successMessage = `Successfully uploaded ${result.data.insertedCount} policies.`;
                const errorCount = result.data.errors?.length || 0;
                
                if (errorCount > 0) {
                    setMessage(`${successMessage} ${errorCount} rows had errors.`);
                    setUploadDetails({
                        inserted: result.data.insertedCount,
                        errors: result.data.errors,
                        totalProcessed: result.data.insertedCount + errorCount
                    });
                } else {
                    setMessage(successMessage);
                }
                
                onSuccess?.();
            } else {
                setError(result.message || 'Bulk upload failed. Please check your file format and data.');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError(`An error occurred during upload: ${err.message}. Please check the browser console for details.`);
        } finally {
            setLoading(false);
        }
    };

    const renderErrorDetails = () => {
        if (!uploadDetails?.errors?.length) return null;

        return (
            <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Error Details:</h4>
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                    {uploadDetails.errors.map((error, index) => (
                        <div key={index} className="text-sm text-red-600 mb-1">
                            <strong>Row {error.index + 1}:</strong> {error.message}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Bulk Upload Group Health Insurance</h2>
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
                            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                                <li>Download the template CSV file and fill in your data</li>
                                <li>Supported formats: CSV, JSON (max 5MB)</li>
                                <li><strong>Required fields:</strong> planName, companyName, companyLogo, planType, sumInsured, premiumPerEmployee, minimumEmployees, maximumEmployees, minimumAge, maximumAge, policyTerm, waitingPeriod, claimProcess, taxBenefits</li>
                                <li>Use pipe (|) to separate multiple values in array fields like features, benefits, exclusions, documentsRequired</li>
                                <li>Boolean fields: true/false, 1/0, yes/no</li>
                                <li><strong>planType must be one of:</strong> Group Health Insurance, Corporate Health Insurance, Employee Health Insurance, Family Floater Group</li>
                                <li><strong>Age ranges:</strong> minimumAge (18-65), maximumAge (18-75, must be >= minimumAge)</li>
                                <li><strong>Policy term:</strong> 1-3 years</li>
                                <li><strong>Waiting period:</strong> 0-48 months</li>
                                <li>All numeric fields must be valid numbers</li>
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
                            {file && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                                </p>
                            )}
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

                        {renderErrorDetails()}

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

export default GroupHealthInsuranceBulkUpload;
