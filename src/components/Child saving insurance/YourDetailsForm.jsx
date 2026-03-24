import React, { useState, useEffect } from 'react';

export default function YourDetailsForm({ onNext, onBack, initialData = null }) {
    const [formData, setFormData] = useState({
        educationalQualification: initialData?.educationalQualification || '',
        occupation: initialData?.occupation || '',
        annualIncome: initialData?.annualIncome || '',
        whatsappUpdates: initialData?.whatsappUpdates ?? true,
        bypassSuitability: initialData?.bypassSuitability ?? false,
        notArmedForces: initialData?.notArmedForces ?? false
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Update form data when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                educationalQualification: initialData.educationalQualification || '',
                occupation: initialData.occupation || '',
                annualIncome: initialData.annualIncome || '',
                whatsappUpdates: initialData.whatsappUpdates ?? true,
                bypassSuitability: initialData.bypassSuitability ?? false,
                notArmedForces: initialData.notArmedForces ?? false
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.bypassSuitability && formData.notArmedForces) {
            onNext(formData);
        } else {
            alert('Please accept both declarations to proceed.');
        }
    };

    const annualIncomeOptions = [
        { label: '2 Lacs', value: '2 Lacs' },
        { label: '3 Lacs', value: '3 Lacs' },
        { label: '5 Lacs', value: '5 Lacs' },
        { label: '7 Lacs', value: '7 Lacs' },
        { label: '10 Lacs', value: '10 Lacs' },
        { label: '15 Lacs', value: '15 Lacs' },
        { label: '20 Lacs', value: '20 Lacs' },
        { label: '25 Lacs', value: '25 Lacs' },
        { label: '30 Lacs', value: '30 Lacs' },
        { label: '50 Lacs', value: '50 Lacs' },
        { label: '1 Crore', value: '1 Crore' },
        { label: '2 Crore', value: '2 Crore' },
        { label: '5 Crore', value: '5 Crore' }
    ];

    return (
        <div className="bg-white rounded-xl shadow p-8 flex-1 flex flex-col gap-2 min-w-[360px]">
            <div className="text-xl font-semibold mb-6 flex items-center">
                Your Details
            </div>
            <hr className="mb-6" />
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Educational Qualification */}
                <div>
                    <label className="block text-gray-600 text-sm mb-1">
                        Educational Qualification
                    </label>
                    <input
                        type="text"
                        value={formData.educationalQualification}
                        onChange={(e) => handleInputChange('educationalQualification', e.target.value)}
                        placeholder="Enter your educational qualification"
                        className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent"
                    />
                </div>

                {/* Occupation */}
                <div>
                    <label className="block text-gray-600 text-sm mb-1">
                        Occupation
                    </label>
                    <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        placeholder="Enter your occupation"
                        className="w-full border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent"
                    />
                </div>

                {/* Annual Income */}
                <div>
                    <label className="block text-gray-600 text-sm mb-1">
                        Annual Income*
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={formData.annualIncome}
                            onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                            placeholder="Enter annual income"
                            className="flex-1 border-b border-gray-300 outline-none py-2 text-gray-700 bg-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => handleInputChange('annualIncome', '2 Lacs')}
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                            2 Lacs
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {annualIncomeOptions.slice(1, 6).map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleInputChange('annualIncome', option.value)}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hover:bg-gray-200 transition-colors"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* WhatsApp Updates */}
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        <span className="text-gray-700 font-medium">Get Updates on WhatsApp</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.whatsappUpdates}
                            onChange={(e) => handleInputChange('whatsappUpdates', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {/* Declarations */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="bypassSuitability"
                            checked={formData.bypassSuitability}
                            onChange={(e) => handleInputChange('bypassSuitability', e.target.checked)}
                            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="bypassSuitability" className="text-sm text-gray-700 leading-relaxed">
                            1. I hereby voluntarily choose to bypass the suitability module as I have understood the benefits, terms, and conditions of the product/plan chosen by me and I further declare that the product/plan selected by me suits my requirements.
                        </label>
                    </div>
                    
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="notArmedForces"
                            checked={formData.notArmedForces}
                            onChange={(e) => handleInputChange('notArmedForces', e.target.checked)}
                            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="notArmedForces" className="text-sm text-gray-700 leading-relaxed">
                            2. I hereby declare that I am not now, nor have I ever been, a member of any armed forces.
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex gap-4 mt-8">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Proceed
                    </button>
                </div> */}
            </form>
        </div>
    );
}
