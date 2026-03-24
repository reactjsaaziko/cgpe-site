    import React from 'react';

    const FOCTAnnual = ({ formData, updateFormData, errors, onNext, onPrev }) => {
    const incomeOptions = [
        '15 Lac +',
        '10 Lac to 14.9 Lac',
        '8 Lac to 9.9 Lac',
        '5 Lac to 7.9 Lac',
        '3 Lac to 4.9 Lac',
        '2 Lac to 2.9 Lac',
        'Less than 2 Lac'
    ];

    const handleIncomeChange = (income) => {
        updateFormData('annualIncome', income);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 py-5 w-[500px] mx-auto text-center">
        <div className="text-gray-500 text-sm mb-10">
            Just answer 4 simple questions to get more accurate quotes
        </div>
        <hr className="mb-2" />
        <div className="text-xl font-medium text-gray-700 mb-2">
            Select Your Annual Income
        </div>
        
        {/* Income Options */}
        <div className="space-y-4">
            {incomeOptions.map((income) => (
            <label key={income} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors text-base">
                <input
                type="radio"
                name="annualIncome"
                value={income}
                checked={formData.annualIncome === income}
                onChange={() => handleIncomeChange(income)}
                className="hidden"
                />
                <div
                className={`w-4 h-4 border-2 border-gray-300 rounded-full relative cursor-pointer transition-colors flex items-center justify-center ${
                    formData.annualIncome === income ? 'border-blue-600' : ''
                }`}
                >
                {formData.annualIncome === income && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
                </div>
                <span className="text-lg text-gray-700 text-base">{income}</span>
            </label>
            ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
            <button
            onClick={onPrev}
            className="flex items-center gap-2 px-5 py-3 text-blue-600 hover:text-blue-700 transition-colors border rounded-lg"
            >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
            </button>
            
            <button
            onClick={onNext}
            className="px-6 py-3 bg-blue-600 text-white border-none rounded-lg font-bold cursor-pointer hover:bg-blue-700 transition-colors"
            >
            Next
            </button>
        </div>
        </div>
    );
    };

    FOCTAnnual.displayName = "FOCTAnnual";

    export default FOCTAnnual;
