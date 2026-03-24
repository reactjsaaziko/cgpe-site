import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app';
import { toast } from 'react-hot-toast';
import { handleAxiosError } from '../../utils/apiUtils';

const FreeOfCostInsuranceList = ({ onEditPolicy, onViewPolicy, refreshTrigger }) => {
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
            setCurrentPage(1); // Reset to first page when searching
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchPolicies = async () => {
        setLoading(true);
        try {
            console.log('Fetching policies...');
            const token = localStorage.getItem('adminToken');
            console.log('Admin token:', token ? 'Present' : 'Missing');
            
            const params = new URLSearchParams({
                page: currentPage,
                limit: itemsPerPage,
                search: debouncedSearchTerm,
                policyType: policyTypeFilter,
                isActive: statusFilter,
                companyName: companyFilter
            });

            console.log('Request params:', params.toString());
            const response = await axios.get(
                `/api/free-of-cost-insurance?${params}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Fetch policies response:', response.data);
            if (response.data.success) {
                setPolicies(response.data.data);
                setTotalPages(response.data.pagination?.totalPages || 1);
                setTotalItems(response.data.pagination?.totalItems || response.data.data.length);
                console.log('Policies loaded successfully:', response.data.data.length);
            } else {
                console.error('Fetch failed:', response.data.message);
                setError(response.data.message || 'Failed to fetch policies');
            }
        } catch (error) {
            try {
                handleAxiosError(error, 'Failed to fetch policies');
            } catch (handledError) {
                setError(handledError.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolicies();
    }, [currentPage, debouncedSearchTerm, policyTypeFilter, statusFilter, companyFilter, refreshTrigger]);

    const handleToggleStatus = async (policyId) => {
        try {
            console.log('Toggling status for policy:', policyId);
            const token = localStorage.getItem('adminToken');
            console.log('Admin token:', token ? 'Present' : 'Missing');
            
            const response = await axios.patch(
                `${API_BASE_URL}/api/free-of-cost-insurance/${policyId}/toggle-status`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Toggle status response:', response.data);
            if (response.data.success) {
                console.log('Status toggled successfully');
                fetchPolicies();
            } else {
                console.error('Toggle failed:', response.data.message);
                setError(response.data.message || 'Failed to toggle policy status');
            }
        } catch (error) {
            console.error('Error toggling policy status:', error);
            console.error('Error response:', error.response?.data);
            setError(`Failed to toggle policy status: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleTogglePopular = async (policyId) => {
        try {
            console.log('Toggling popular status for policy:', policyId);
            const token = localStorage.getItem('adminToken');
            console.log('Admin token:', token ? 'Present' : 'Missing');
            
            const response = await axios.patch(
                `${API_BASE_URL}/api/free-of-cost-insurance/${policyId}/toggle-popular`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Toggle popular response:', response.data);
            if (response.data.success) {
                console.log('Popular status toggled successfully');
                fetchPolicies();
            } else {
                console.error('Toggle popular failed:', response.data.message);
                setError(response.data.message || 'Failed to toggle popular status');
            }
        } catch (error) {
            console.error('Error toggling popular status:', error);
            console.error('Error response:', error.response?.data);
            setError(`Failed to toggle popular status: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDeletePolicy = async (policyId) => {
        if (!window.confirm('Are you sure you want to delete this policy?')) {
            return;
        }

        try {
            console.log('Deleting policy:', policyId);
            const token = localStorage.getItem('adminToken');
            console.log('Admin token:', token ? 'Present' : 'Missing');
            
            const response = await axios.delete(
                `${API_BASE_URL}/api/free-of-cost-insurance/${policyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log('Delete response:', response.data);
            if (response.data.success) {
                console.log('Policy deleted successfully');
                fetchPolicies();
            } else {
                console.error('Delete failed:', response.data.message);
                setError(response.data.message || 'Failed to delete policy');
            }
        } catch (error) {
            console.error('Error deleting policy:', error);
            console.error('Error response:', error.response?.data);
            setError(`Failed to delete policy: ${error.response?.data?.message || error.message}`);
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-black">Free of Cost Insurance Policies ({totalItems})</h3>
                    {loading && (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                    )}
                </div>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search policies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {searchTerm && searchTerm !== debouncedSearchTerm && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                </div>
                            )}
                            {searchTerm && searchTerm === debouncedSearchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <select
                            value={policyTypeFilter}
                            onChange={(e) => setPolicyTypeFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="Term Insurance">Term Insurance</option>
                            <option value="Health Insurance">Health Insurance</option>
                            <option value="Life Insurance">Life Insurance</option>
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
                    Showing {policies.length} of {totalItems} free of cost insurance policies
                </div>
                
                {/* Clear All Filters Button */}
                {(searchTerm || policyTypeFilter || statusFilter || companyFilter) && (
                    <div className="mb-4">
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setPolicyTypeFilter('');
                                setStatusFilter('');
                                setCompanyFilter('');
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>Clear All Filters</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Policies table */}
            <div className="overflow-x-auto">
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
                                Eligibility Criteria
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company & Created
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
                        {loading && policies.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                                        <span className="text-gray-500">Loading policies...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : policies.length === 0 && !loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    <div className="text-6xl mb-4">🎁</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Free of Cost Policies Found</h3>
                                    <p className="text-gray-600">
                                        {searchTerm || policyTypeFilter || statusFilter || companyFilter 
                                            ? 'Try adjusting your search or filters'
                                            : 'Get started by creating your first free of cost insurance policy'
                                        }
                                    </p>
                                </td>
                            </tr>
                        ) : (
                            policies.map((policy) => (
                                <tr key={policy._id} className={`hover:bg-gray-50 ${loading ? 'opacity-50' : ''}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {policy.policyName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Type: {policy.policyType}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Age: {policy.ageRange?.min || 18}-{policy.ageRange?.max || 65} years
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Term: {policy.policyTerm} years
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {formatCurrency(policy.sumAssured)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Premium: {policy.premiumAmount === 0 ? '₹0 (Free of Cost)' : formatCurrency(policy.premiumAmount)}
                                        </div>
                                        <div className="text-sm text-green-600 font-medium">
                                            {policy.premiumAmount === 0 ? '🎁 Free Policy' : '💰 Paid Policy'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm text-gray-900">
                                            Income: {formatCurrency(policy.annualIncome?.min || 0)} - {formatCurrency(policy.annualIncome?.max || 1000000)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Occupations: {policy.occupation?.length || 0} types
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Qualifications: {policy.qualification?.length || 0} types
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {policy.smokingStatus?.includes('Yes') && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                                    Smokers
                                                </span>
                                            )}
                                            {policy.smokingStatus?.includes('No') && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    Non-smokers
                                                </span>
                                            )}
                                            {policy.medicalHistory?.length > 0 && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                    Medical History
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {policy.companyName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Created: {formatDate(policy.createdAt)}
                                        </div>
                                        {policy.updatedAt && (
                                            <div className="text-sm text-gray-500">
                                                Updated: {formatDate(policy.updatedAt)}
                                            </div>
                                        )}
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
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Pending Approval
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEditPolicy(policy)}
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
                            ))
                        )}
                    </tbody>
                </table>
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
        </div>
    );
};

FreeOfCostInsuranceList.displayName = 'FreeOfCostInsuranceList';

export default FreeOfCostInsuranceList;
