import React, { useState } from 'react';

const PolicyFilters = ({ onFiltersChange, initialFilters = {} }) => {
    const [filters, setFilters] = useState({
        smoker: initialFilters.smoker || '',
        alcohol: initialFilters.alcohol || '',
        age: initialFilters.age || '',
        education: initialFilters.education || '',
        ...initialFilters
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterChange = (filterName, value) => {
        const newFilters = { ...filters, [filterName]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const clearAllFilters = () => {
        const clearedFilters = {
            smoker: '',
            alcohol: '',
            age: '',
            education: ''
        };
        setFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    Filter Policies
                </h3>
                <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                            Clear All
                        </button>
                    )}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {isExpanded ? 'Hide Filters' : 'Show Filters'}
                        <svg 
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Age Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Age
                        </label>
                        <select
                            value={filters.age}
                            onChange={(e) => handleFilterChange('age', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="">Select Age</option>
                            {Array.from({ length: 58 }, (_, i) => {
                                const age = i + 18;
                                return (
                                    <option key={age} value={age}>
                                        {age} years
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Education Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Education Level
                        </label>
                        <select
                            value={filters.education}
                            onChange={(e) => handleFilterChange('education', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="">Any Education</option>
                            <option value="below-10th">Below 10th Pass</option>
                            <option value="10th-pass">10th Pass</option>
                            <option value="12th-pass">12th Pass</option>
                            <option value="graduate">Graduate</option>
                            <option value="post-graduate">Post Graduate</option>
                        </select>
                    </div>

                    {/* Smoker Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Smoking Status
                        </label>
                        <select
                            value={filters.smoker}
                            onChange={(e) => handleFilterChange('smoker', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="">Any</option>
                            <option value="no">Non-Smoker</option>
                            <option value="yes">Smoker</option>
                        </select>
                    </div>

                    {/* Alcohol Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alcohol Consumption
                        </label>
                        <select
                            value={filters.alcohol}
                            onChange={(e) => handleFilterChange('alcohol', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="">Any</option>
                            <option value="no">Non-Drinker</option>
                            <option value="yes">Drinks Alcohol</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-600 mr-2">Active filters:</span>
                        {filters.age && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Age: {filters.age}
                                <button
                                    onClick={() => handleFilterChange('age', '')}
                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.education && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Education: {filters.education.replace('-', ' ')}
                                <button
                                    onClick={() => handleFilterChange('education', '')}
                                    className="ml-1 text-green-600 hover:text-green-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.smoker && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Smoker: {filters.smoker === 'yes' ? 'Yes' : 'No'}
                                <button
                                    onClick={() => handleFilterChange('smoker', '')}
                                    className="ml-1 text-orange-600 hover:text-orange-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.alcohol && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Alcohol: {filters.alcohol === 'yes' ? 'Yes' : 'No'}
                                <button
                                    onClick={() => handleFilterChange('alcohol', '')}
                                    className="ml-1 text-purple-600 hover:text-purple-800"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PolicyFilters;