import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AdminGHPlanList = ({ onEditPlan, onViewPlan, refreshTrigger }) => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [statusFilter, setStatusFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [planTypeFilter, setPlanTypeFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentPage(1); // Reset to first page when searching
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        fetchPlans();
    }, [refreshTrigger, currentPage, debouncedSearchTerm, sortBy, sortOrder, statusFilter, companyFilter, planTypeFilter, itemsPerPage]);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page: currentPage,
                limit: itemsPerPage,
                sortBy: sortBy,
                sortOrder: sortOrder,
                search: debouncedSearchTerm,
                isActive: statusFilter,
                companyName: companyFilter,
                planType: planTypeFilter
            });
            
            const response = await fetch(`/api/group-health-insurance?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPlans(data.groupHealthInsurance || []);
                setTotalPages(data.pagination?.totalPages || 1);
                setTotalItems(data.pagination?.totalItems || data.groupHealthInsurance?.length || 0);
            } else {
                toast.error('Failed to fetch plans');
            }
        } catch (error) {
            console.error('Error fetching plans:', error);
            toast.error('Failed to fetch plans');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (planId) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/group-health-insurance/${planId}/toggle`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('Plan status updated successfully!');
                // Force immediate refresh to update the UI
                await fetchPlans();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to update plan status');
            }
        } catch (error) {
            console.error('Error toggling plan status:', error);
            toast.error('Failed to update plan status');
        }
    };

    const handleTogglePopular = async (planId) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/group-health-insurance/${planId}/toggle-popular`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message || 'Popular status updated successfully!');
                // Force immediate refresh to update the UI
                await fetchPlans();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to update popular status');
            }
        } catch (error) {
            console.error('Error toggling popular status:', error);
            toast.error('Failed to update popular status');
        }
    };

    const handleDeletePlan = async (planId) => {
        if (!window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/group-health-insurance/${planId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('Plan deleted successfully!');
                fetchPlans();
            } else {
                toast.error('Failed to delete plan');
            }
        } catch (error) {
            console.error('Error deleting plan:', error);
            toast.error('Failed to delete plan');
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

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-black">Group Health Insurance Plans ({totalItems})</h3>
                    {loading && (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-500">Loading...</span>
                        </div>
                    )}
                </div>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search plans..."
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
                            value={planTypeFilter}
                            onChange={(e) => setPlanTypeFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="comprehensive">Comprehensive</option>
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                            <option value="custom">Custom</option>
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

                    <div>
                        <select
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                const [field, order] = e.target.value.split('-');
                                setSortBy(field);
                                setSortOrder(order);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="createdAt-desc">Newest First</option>
                            <option value="createdAt-asc">Oldest First</option>
                            <option value="planName-asc">Name A-Z</option>
                            <option value="planName-desc">Name Z-A</option>
                            <option value="premiumPerEmployee-asc">Premium Low-High</option>
                            <option value="premiumPerEmployee-desc">Premium High-Low</option>
                        </select>
                    </div>

                    <div>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(parseInt(e.target.value));
                                setCurrentPage(1); // Reset to first page when changing items per page
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="10">10 per page</option>
                            <option value="25">25 per page</option>
                            <option value="50">50 per page</option>
                        </select>
                    </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">
                    Showing {plans.length} of {totalItems} group health insurance plans
                </div>
                
                {/* Clear All Filters Button */}
                {(searchTerm || planTypeFilter || statusFilter || companyFilter) && (
                    <div className="mb-4">
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setPlanTypeFilter('');
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

            {/* Plans Table */}
            <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Plan Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Coverage & Premium
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Employee Details
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company & Features
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
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                                        <p className="text-lg font-medium">Loading plans...</p>
                                        <p className="text-sm">Please wait while we fetch the data.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : plans.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-lg font-medium">No plans found</p>
                                        <p className="text-sm">Create your first group health insurance plan to get started.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            plans.map((plan) => (
                                <tr key={plan._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-lg object-cover"
                                                    src={plan.companyLogo}
                                                    alt={plan.companyName}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="hidden h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                                    <span className="text-xs font-semibold text-gray-600">
                                                        {plan.companyName.charAt(0)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {plan.planName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {plan.companyName}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {plan.planType}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatCurrency(plan.sumInsured)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Premium: {formatCurrency(plan.premiumPerEmployee)}/employee
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Term: {plan.policyTerm} year{plan.policyTerm > 1 ? 's' : ''}
                                            </div>
                                            {plan.discountPercentage > 0 && (
                                                <div className="text-sm text-green-600">
                                                    {plan.discountPercentage}% discount
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm text-gray-900">
                                                {plan.minimumEmployees}-{plan.maximumEmployees} employees
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Age: {plan.minimumAge}-{plan.maximumAge} years
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Waiting: {plan.waitingPeriod || 30} days
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {plan.preExistingDiseaseCover && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                        Pre-existing
                                                    </span>
                                                )}
                                                {plan.maternityBenefit && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800">
                                                        Maternity
                                                    </span>
                                                )}
                                                {plan.dentalCover && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                        Dental
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {plan.companyName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Rating: {plan.rating || 4}/5
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Claim Ratio: {plan.claimSettlementRatio || 95}%
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Hospitals: {plan.cashlessHospitals || '5000+'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col space-y-2">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                plan.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {plan.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            {plan.isPopular && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Popular
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => onEditPlan && onEditPlan(plan)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Edit Plan"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleToggleStatus(plan._id)}
                                                className={`${
                                                    plan.isActive
                                                        ? 'text-red-600 hover:text-red-900'
                                                        : 'text-green-600 hover:text-green-900'
                                                }`}
                                                title={plan.isActive ? 'Deactivate' : 'Activate'}
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {plan.isActive ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                                                    ) : (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    )}
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleTogglePopular(plan._id)}
                                                className={`${
                                                    plan.isPopular
                                                        ? 'text-yellow-600 hover:text-yellow-900'
                                                        : 'text-gray-400 hover:text-yellow-600'
                                                }`}
                                                title={plan.isPopular ? 'Remove from Popular' : 'Mark as Popular'}
                                            >
                                                <svg 
                                                    className="h-4 w-4" 
                                                    fill={plan.isPopular ? 'currentColor' : 'none'} 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => onViewPlan && onViewPlan(plan)}
                                                className="text-gray-600 hover:text-gray-900"
                                                title="View Details"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeletePlan(plan._id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete Plan"
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

            {/* Summary */}
            {/* <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Total Plans: {totalItems}</span>
                    <span>Active Plans: {plans.filter(plan => plan.isActive).length}</span>
                </div>
            </div> */}
        </div>
    );
};

AdminGHPlanList.displayName = 'AdminGHPlanList';

export default AdminGHPlanList;