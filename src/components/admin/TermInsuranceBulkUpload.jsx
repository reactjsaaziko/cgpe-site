import React, { useState } from 'react';

const TermInsuranceBulkUpload = ({ onClose, onSuccess, defaultPolicyType }) => {
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
			'rating',
			'reviews',
			'isActive',
			'isPopular',
			'discountPercentage',
			'waitingPeriod',
			'gracePeriod',
			'claimSettlementRatio',
			'smokerAllowed',
			'alcoholAllowed',
			'educationLevel',
			'features',
			'benefits',
			'exclusions',
			'documents',
			'tags'
		];
		const sample = `${headers.join(',')}\nExample Policy,${defaultPolicyType || 'term-life'},1000000,1 Crore,12000,yearly,20,18,60,Sample description,Sample Company,https://logo.png,4.5,10,true,false,0,0,30,95,false,false,any,"Feature A|Feature B","Benefit A|Benefit B","Exclusion A|Exclusion B","Doc A|Doc B","tag1|tag2"`;
		const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'term_policies_template.csv');
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
			const response = await fetch('/api/term-insurance/policies/bulk-upload', {
				method: 'POST',
				body: formData
			}); 
			const result = await response.json();
			if (result.success) {
				setMessage(`Uploaded ${result.data.insertedCount} policies. ${result.data.errors?.length || 0} errors.`);
				onSuccess?.();
			} else {
				setError(result.message || 'Bulk upload failed');
			}
		} catch (err) {
			setError('An error occurred during upload');
		} finally {
			setLoading(false);
		} 
	};

	return (
		<div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
			<div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
				<div className="p-6 text-black">
					<div className="flex items-center justify-between">
						<h3 className="text-2xl font-bold">Bulk Upload Term Insurance Policies</h3>
						<button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2">
							<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
				<div className="p-6 space-y-4">
					<p className="text-sm text-gray-700">Upload a CSV (preferred) or JSON file. Arrays like features, benefits, exclusions, documents, tags can be pipe-separated (e.g., Feature A|Feature B).</p>
					<div className="flex items-center gap-3">
						<input type="file" accept=".csv,.json" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
						<button onClick={downloadTemplate} type="button" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-sm">Download CSV Template</button>
					</div>
					{message && (<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">{message}</div>)}
					{error && (<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>)}
					<div className="flex justify-end gap-3 pt-2">
						<button onClick={onClose} type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-black hover:bg-gray-50">Cancel</button>
						<button onClick={handleUpload} disabled={loading || !file} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? 'Uploading...' : 'Upload'}</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TermInsuranceBulkUpload;