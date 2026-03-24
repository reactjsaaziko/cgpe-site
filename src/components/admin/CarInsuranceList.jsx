import React, { useState, useEffect, useCallback } from 'react';

const CarInsuranceList = ({ onEditPolicy, onViewPolicy, refreshTrigger }) => {
    console.log('🎬 CarInsuranceList component rendered');
    console.log('🎬 Props received:', { onEditPolicy: !!onEditPolicy, onViewPolicy: !!onViewPolicy, refreshTrigger });
    
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [policyTypeFilter, setPolicyTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage] = useState(10);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchPolicies = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage,
                limit: itemsPerPage,
                search: debouncedSearchTerm,
                policyType: policyTypeFilter,
                isActive: statusFilter,
                companyName: companyFilter
            });

            const response = await fetch(`/api/car-insurance/policies?${params}`);
            const result = await response.json();

            if (result.success) {
                setPolicies(result.data);
                setTotalPages(result.pagination.totalPages);
                setTotalItems(result.pagination.totalItems);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Failed to fetch car insurance policies');
        } finally {
            setLoading(false);
        }
    }, [currentPage, debouncedSearchTerm, policyTypeFilter, statusFilter, companyFilter, itemsPerPage]);

    useEffect(() => {
        fetchPolicies();
    }, [fetchPolicies, refreshTrigger]);

    // Debug effect to log state changes
    useEffect(() => {
        console.log('📊 Policies state updated:', policies);
        console.log('📊 Policies length:', policies.length);
        console.log('📊 Loading state:', loading);
        console.log('📊 Error state:', error);
    }, [policies, loading, error]);

    const handleToggleStatus = async (policyId) => {
        try {
            const response = await fetch(`/api/car-insurance/policies/${policyId}/toggle-status`, {
                method: 'PATCH',
                headers: {
                     'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (result.success) {
                fetchPolicies();
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Failed to toggle policy status');
        }
    }; 

    const handleTogglePopular = async (policyId) => {
        try {
            const response = await fetch(`/api/car-insurance/policies/${policyId}/toggle-popular`, {
                method:'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (result.success) {
                fetchPolicies();
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Failed to toggle popular status');
        }
    };

    const handleDeletePolicy = async (policyId) => {
        if (!window.confirm('Are you sure you want to delete this policy?')) {
            return;
        }

        try {
            const response = await fetch(`/api/car-insurance/policies/${policyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (result.success) {
                fetchPolicies();
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Failed to delete policy');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatPolicyType = (type) => {
        const formatMap = {
            'comprehensive': 'Comprehensive',
            'third-party': 'Third Party',
            'third-party-fire-theft': 'Third Party Fire & Theft'
        };
        return formatMap[type] || type;
    };

    if (error) {
        return (
            <div className="bg-white rounded-lg p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-6">

            <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-4">Car Insurance Policies</h3>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search policies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {searchTerm !== debouncedSearchTerm && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <select
                            value={policyTypeFilter}
                            onChange={(e) => setPolicyTypeFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="comprehensive">Comprehensive</option>
                            <option value="third-party">Third Party</option>
                            <option value="third-party-fire-theft">Third Party Fire & Theft</option>
                        </select>
                    </div>
                    
                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    
                    <div>
                        <input
                            type="text"
                            placeholder="Company name..."
                            value={companyFilter}
                            onChange={(e) => setCompanyFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                    Showing {policies.length} of {totalItems} car insurance policies
                </div>
            </div>

            {/* Policies table */}
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Policy Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Coverage & Premium
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company & Rating
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {policies.map((policy) => (
                            <tr key={policy._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {policy.policyName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Type: {formatPolicyType(policy.policyType)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Age: {policy.minAge}-{policy.maxAge} years
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {policy.idvCover}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Premium: {formatCurrency(policy.premiumAmount)}/{policy.premiumFrequency}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Claims: {policy.claimsSettled}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {policy.companyName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Rating: {policy.rating}/5 ({policy.reviews} reviews)
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col space-y-2">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                            policy.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {policy.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        {policy.isPopular && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEditPolicy && onEditPolicy(policy)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="Edit Policy"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(policy._id)}
                                            className={`${
                                                policy.isActive
                                                    ? 'text-red-600 hover:text-red-900'
                                                    : 'text-green-600 hover:text-green-900'
                                            }`}
                                            title={policy.isActive ? 'Deactivate' : 'Activate'}
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {policy.isActive ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                )}
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleTogglePopular(policy._id)}
                                            className={`${
                                                policy.isPopular
                                                    ? 'text-yellow-600 hover:text-yellow-900'
                                                    : 'text-gray-400 hover:text-yellow-600'
                                            }`}
                                            title={policy.isPopular ? 'Remove from Popular' : 'Mark as Popular'}
                                        >
                                            <svg className="h-4 w-4" fill={policy.isPopular ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => onViewPolicy && onViewPolicy(policy)}
                                            className="text-gray-600 hover:text-gray-900"
                                            title="View Details"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeletePolicy(policy._id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete Policy"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {policies.length === 0 && !loading && (
                <div className="text-center py-8">
                    <div className="text-gray-500">No car insurance policies found</div>
                </div>
            )}
        </div>
    );
};

CarInsuranceList.displayName = 'CarInsuranceList';

export default CarInsuranceList; 