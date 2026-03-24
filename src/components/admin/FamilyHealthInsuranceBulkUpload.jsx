import React, { useState } from 'react';

const FamilyHealthInsuranceBulkUpload = ({ onClose, onSuccess }) => {
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
			'cashlessHospitals',
			'roomRentLimit',
			'restorationBenefit',
			'preExistingDiseaseCover',
			'maternityBenefit',
			'dentalCover',
			'eyeCare',
			'ambulanceCover',
			'claimPaidText',
			'morePlansText',
			'maxFamilyMembers',
			'childCoverAge',
			'parentCoverAge',
			'familyFloaterBenefit',
			'individualDeductible',
			'features',
			'benefits',
			'exclusions',
			'documents',
			'tags',
			'badges'
		];
		const sample = `${headers.join(',')}\nExample Family Health Policy,family,1000000,10 Lakhs,12000,yearly,1,18,65,Sample family health description,Sample Company,https://logo.png,4.5,10,true,false,0,0,30,95,8000,no-limit,once-a-year,false,false,false,false,true,95% of claims paid within 3 months*,1 more plan,6,25,65,true,false,"Feature A|Feature B","Benefit A|Benefit B","Exclusion A|Exclusion B","Doc A|Doc B","tag1|tag2","badge1|badge2"`;
		const blob = new Blob([sample], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'family_health_policies_template.csv');
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
			formData.append('defaultPolicyType', 'family');
			const response = await fetch('/api/family-health-insurance/policies/bulk-upload', {
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
				<div className="bg-white p-8">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-black">Bulk Upload Family Health Insurance</h2>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 transition-colors"
						>
							<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div className="space-y-6">
						<div className="bg-gray-50 p-4 rounded-lg">
							<h3 className="text-lg font-semibold text-black mb-2">Instructions</h3>
							<ul className="text-sm text-black space-y-1">
								<li>• Download the template CSV file below</li>
								<li>• Fill in the policy details following the template format</li>
								<li>• For multiple values (features, benefits, etc.), use | as separator</li>
								<li>• Upload the completed CSV file</li>
								<li>• Supported formats: CSV, JSON</li>
							</ul>
						</div>

						<div className="flex justify-center">
							<button
								onClick={downloadTemplate}
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
							>
								<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								Download Template
							</button>
						</div>

						<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
							<input
								type="file"
								accept=".csv,.json"
								onChange={handleFileChange}
								className="hidden"
								id="file-upload"
							/>
							<label
								htmlFor="file-upload"
								className="cursor-pointer flex flex-col items-center"
							>
								<svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
								</svg>
								<span className="text-lg font-medium text-black">
									{file ? file.name : 'Click to select file or drag and drop'}
								</span>
								<span className="text-sm text-gray-500 mt-1">
									CSV or JSON files only
								</span>
							</label>
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

						<div className="flex justify-end space-x-4">
							<button
								onClick={onClose}
								className="px-6 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								Cancel
							</button>
							<button
								onClick={handleUpload}
								disabled={loading || !file}
								className={`px-6 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									loading || !file
										? 'bg-gray-400 cursor-not-allowed'
										: 'bg-blue-600 hover:bg-blue-700'
								}`}
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

FamilyHealthInsuranceBulkUpload.displayName = 'FamilyHealthInsuranceBulkUpload';

export default FamilyHealthInsuranceBulkUpload;
