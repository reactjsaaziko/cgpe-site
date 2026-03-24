import React, { useState, useEffect } from 'react';

const TravelInsuranceList = ({ onEdit, onDelete, onViewPolicy, refreshTrigger }) => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        fetchPolicies();
    }, [filterActive, sortBy, sortOrder, refreshTrigger]);

    const fetchPolicies = async () => {
        try {
            setLoading(true);
            let url = `/api/travel-insurance/admin?sortBy=${sortBy}&sortOrder=${sortOrder}`;
            
            if (filterActive !== 'all') {
                url += `&isActive=${filterActive}`;
            }
            
            if (searchTerm) {
                url += `&companyName=${encodeURIComponent(searchTerm)}`;
            }

            const response = await fetch(url);
            const result = await response.json();

            if (result.success) {
                setPolicies(result.data);
            } else {
                setError(result.message || 'Failed to fetch policies');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (policyId) => {
        try {
            const response = await fetch(`/api/travel-insurance/admin/${policyId}/toggle-active`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (result.success) {
                // Update the policy in the list
                setPolicies(prev => prev.map(policy => 
                    policy._id === policyId 
                        ? { ...policy, isActive: !policy.isActive }
                        : policy
                ));
            } else {
                alert(result.message || 'Failed to toggle status');
            }
        } catch (error) {
            alert('Network error. Please try again.');
        }
    };

    const handleTogglePopular = async (policyId) => {
        try {
            const response = await fetch(`/api/travel-insurance/admin/${policyId}/toggle-popular`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (result.success) {
                // Update the policy in the list
                setPolicies(prev => prev.map(policy => 
                    policy._id === policyId 
                        ? { ...policy, isPopular: !policy.isPopular }
                        : policy
                ));
            } else {
                alert(result.message || 'Failed to toggle popular status');
            }
        } catch (error) {
            alert('Network error. Please try again.');
        }
    };

    const handleDelete = async (policyId) => {
        if (!window.confirm('Are you sure you want to delete this policy? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`/api/travel-insurance/admin/${policyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (result.success) {
                setPolicies(prev => prev.filter(policy => policy._id !== policyId));
                alert('Policy deleted successfully');
            } else {
                alert(result.message || 'Failed to delete policy');
            }
        } catch (error) {
            alert('Network error. Please try again.');
        }
    };

    const filteredPolicies = policies.filter(policy => {
        const matchesSearch = policy.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             policy.planName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Travel Insurance Policies</h2>
                    <p className="text-gray-600">Manage travel insurance policies and their settings</p>
                </div>
                <button
                    onClick={() => onEdit(null)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                    Add New Policy
                </button>
            </div> */}

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by company or plan name..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            value={filterActive}
                            onChange={(e) => setFilterActive(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All Policies</option>
                            <option value="true">Active Only</option>
                            <option value="false">Inactive Only</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="createdAt">Date Created</option>
                            <option value="companyName">Company Name</option>
                            <option value="premiumAmount">Premium Amount</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Policies List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Policy Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Coverage
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Premium
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
                            {filteredPolicies.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No policies found. {searchTerm && 'Try adjusting your search criteria.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredPolicies.map((policy) => (
                                    <tr key={policy._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={policy.companyLogo}
                                                    alt={policy.companyName}
                                                    className="w-10 h-10 object-contain rounded mr-3"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {policy.companyName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {policy.planName}
                                                    </div>
                                                    {policy.subtitle && (
                                                        <div className="text-xs text-gray-400">
                                                            {policy.subtitle}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 space-y-1">
                                                <div>Medical: {policy.medicalCoverage}</div>
                                                <div>Passport: {policy.passportCoverage}</div>
                                                <div>Baggage: {policy.baggageCoverage}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">
                                                <div className="font-medium">₹{policy.premium}</div>
                                                <div className="text-gray-500">
                                                    Rating: {policy.rating} ⭐ ({policy.reviews} reviews)
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        policy.isActive 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {policy.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                    {/* <button
                                                        onClick={() => handleToggleActive(policy._id)}
                                                        className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                                                    >
                                                        Toggle
                                                    </button> */}
                                                </div>
                                                <div className="flex items-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        policy.isPopular 
                                                            ? 'bg-yellow-100 text-yellow-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {policy.isPopular ? 'Popular' : 'Regular'}
                                                    </span>
                                                    {/* <button
                                                        onClick={() => handleTogglePopular(policy._id)}
                                                        className="ml-2 text-xs text-blue-600 hover:text-blue-800"
                                                    >
                                                        Toggle
                                                    </button> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex space-x-2 text-base">
                                                <button
                                                    onClick={() => onEdit(policy)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Edit Policy"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleToggleActive(policy._id)}
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
                                                    onClick={() => handleDelete(policy._id)}
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary */}
            {/* <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{policies.length}</div>
                        <div className="text-sm text-gray-600">Total Policies</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">
                            {policies.filter(p => p.isActive).length}
                        </div>
                        <div className="text-sm text-gray-600">Active Policies</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {policies.filter(p => p.isPopular).length}
                        </div>
                        <div className="text-sm text-gray-600">Popular Policies</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600">
                            {policies.filter(p => p.banner).length}
                        </div>
                        <div className="text-sm text-gray-600">With Banner</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

TravelInsuranceList.displayName = 'TravelInsuranceList';

export default TravelInsuranceList; 