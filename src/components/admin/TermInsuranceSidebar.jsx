import React, { useState, useEffect } from 'react';

const TermInsuranceSidebar = ({ onPolicySelect, selectedPolicyId }) => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('name');

    const fetchPolicies = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                limit: 50, // Get more policies for sidebar
                search: searchTerm,
                policyType: filterType === 'all' ? '' : filterType,
                isActive: 'true' // Only show active policies in sidebar
            });

            const response = await fetch(`/api/term-insurance/policies?${params}`);
            const result = await response.json();

            if (result.success) {
                setPolicies(result.data);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Failed to fetch policies');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolicies();
    }, [searchTerm, filterType]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getPolicyTypeIcon = (type) => {
        const icons = {
            'term-life': '🛡️',
            'term-health': '🏥',
            'term-accident': '🚨',
            'term-disability': '♿'
        };
        return icons[type] || '📋';
    };

    const getPolicyTypeColor = (type) => {
        const colors = {
            'term-life': 'border-blue-200 bg-blue-50',
            'term-health': 'border-green-200 bg-green-50',
            'term-accident': 'border-red-200 bg-red-50',
            'term-disability': 'border-purple-200 bg-purple-50'
        };
        return colors[type] || 'border-gray-200 bg-gray-50';
    };

    const sortPolicies = (policiesToSort) => {
        return [...policiesToSort].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.policyName.localeCompare(b.policyName);
                case 'coverage':
                    return b.coverageAmount - a.coverageAmount;
                case 'premium':
                    return a.premiumAmount - b.premiumAmount;
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                    return b.isPopular - a.isPopular;
                default:
                    return 0;
            }
        });
    };

    const filteredAndSortedPolicies = sortPolicies(policies);

    return (
        <div className="w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200 h-full overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                        <span className="mr-2">🛡️</span>
                        Term Insurance Policies
                    </h2>
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                        {policies.length}
                    </span>
                </div>

                {/* Search */}
                <div className="mb-3">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search policies..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Types</option>
                        <option value="term-life">Term Life</option>
                        <option value="term-health">Term Health</option>
                        <option value="term-accident">Term Accident</option>
                        <option value="term-disability">Term Disability</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="coverage">Sort by Coverage</option>
                        <option value="premium">Sort by Premium</option>
                        <option value="rating">Sort by Rating</option>
                        <option value="popular">Sort by Popular</option>
                    </select>
                </div>
            </div>

            {/* Policies List */}
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="p-4 text-red-600 text-sm">
                        {error}
                    </div>
                ) : filteredAndSortedPolicies.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        <div className="text-4xl mb-2">📋</div>
                        <p className="text-sm">No policies found</p>
                    </div>
                ) : (
                    <div className="p-2">
                        {filteredAndSortedPolicies.map((policy) => (
                            <div
                                key={policy._id}
                                onClick={() => onPolicySelect && onPolicySelect(policy)}
                                className={`mb-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                                    selectedPolicyId === policy._id
                                        ? 'border-blue-500 bg-blue-50 shadow-md'
                                        : getPolicyTypeColor(policy.policyType)
                                }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center flex-1 min-w-0">
                                        <span className="text-lg mr-2">
                                            {getPolicyTypeIcon(policy.policyType)}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {policy.policyName}
                                            </h3>
                                            <p className="text-xs text-gray-500 truncate">
                                                {policy.companyName}
                                            </p>
                                        </div>
                                    </div>
                                    {policy.isPopular && (
                                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2">
                                            Popular
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-500">Coverage:</span>
                                        <div className="font-medium text-gray-900">
                                            {formatCurrency(policy.coverageAmount)}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Premium:</span>
                                        <div className="font-medium text-gray-900">
                                            {formatCurrency(policy.premiumAmount)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2 text-xs">
                                    <div className="flex items-center">
                                        <span className="text-yellow-500 mr-1">★</span>
                                        <span className="text-gray-600">
                                            {policy.rating} ({policy.reviews} reviews)
                                        </span>
                                    </div>
                                    <div className="text-gray-500">
                                        {policy.policyTerm} years
                                    </div>
                                </div>

                                {policy.discountPercentage > 0 && (
                                    <div className="mt-2">
                                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                            {policy.discountPercentage}% OFF
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-500 text-center">
                    <p>Click on any policy to view details</p>
                    <p className="mt-1">
                        Showing {filteredAndSortedPolicies.length} of {policies.length} policies
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermInsuranceSidebar; 