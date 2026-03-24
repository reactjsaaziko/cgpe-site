import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/apiUtils';

const ClaimAssistanceList = () => {
    const [claimAssistances, setClaimAssistances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        search: ''
    });
    const [selectedItems, setSelectedItems] = useState([]);
    const [showBulkActions, setShowBulkActions] = useState(false);

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        resolved: 'bg-green-100 text-green-800',
        closed: 'bg-gray-100 text-gray-800'
    };

    const priorityColors = {
        low: 'bg-gray-100 text-gray-800',
        medium: 'bg-blue-100 text-blue-800',
        high: 'bg-orange-100 text-orange-800',
        urgent: 'bg-red-100 text-red-800'
    };

    useEffect(() => {
        fetchClaimAssistances();
    }, [filters]);

    const fetchClaimAssistances = async (page = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...filters,
                productName: 'Claim Assistance' // Filter for claim assistance requests
            });

            const data = await apiRequest(`/inquiries/admin/all?${params}`);

            setClaimAssistances(data.inquiries);
            setPagination(data.pagination);
        } catch (err) {
            setError(err.message || 'Failed to fetch claim assistance requests');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleStatusUpdate = async (inquiryId, newStatus) => {
        try {
            await apiRequest(`/inquiries/admin/${inquiryId}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            fetchClaimAssistances(pagination.currentPage);
        } catch (err) {
            setError(err.message || 'Failed to update status');
        }
    };

    const handlePriorityUpdate = async (inquiryId, newPriority) => {
        try {
            await apiRequest(`/inquiries/admin/${inquiryId}`, {
                method: 'PUT',
                body: JSON.stringify({ priority: newPriority })
            });
            fetchClaimAssistances(pagination.currentPage);
        } catch (err) {
            setError(err.message || 'Failed to update priority');
        }
    };

    const handleDelete = async (inquiryId) => {
        if (!window.confirm('Are you sure you want to delete this claim assistance request?')) return;

        try {
            await apiRequest(`/inquiries/admin/${inquiryId}`, {
                method: 'DELETE'
            });
            fetchClaimAssistances(pagination.currentPage);
        } catch (err) {
            setError(err.message || 'Failed to delete request');
        }
    };

    const handleBulkAction = async (action) => {
        if (selectedItems.length === 0) return;

        try {
            const updates = {};

            switch (action) {
                case 'mark-resolved':
                    updates.status = 'resolved';
                    break;
                case 'mark-closed':
                    updates.status = 'closed';
                    break;
                case 'high-priority':
                    updates.priority = 'high';
                    break;
                default:
                    return;
            }

            await apiRequest('/inquiries/admin/bulk-update', {
                method: 'PUT',
                body: JSON.stringify({
                    inquiryIds: selectedItems,
                    updates
                })
            });

            setSelectedItems([]);
            setShowBulkActions(false);
            fetchClaimAssistances(pagination.currentPage);
        } catch (err) {
            setError(err.message || 'Failed to perform bulk action');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
         });
    };

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800">{error}</div>
                <button
                    onClick={() => setError(null)}
                    className="mt-2 text-red-600 hover:text-red-800 underline"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 p-6">Claim Assistance Requests</h2>
                <div className="flex space-x-2">
                    {selectedItems.length > 0 && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleBulkAction('mark-resolved')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Mark Resolved ({selectedItems.length})
                            </button>
                            <button
                                onClick={() => handleBulkAction('mark-closed')}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Mark Closed ({selectedItems.length})
                            </button>
                            <button
                                onClick={() => setSelectedItems([])}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Clear Selection
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <select
                            value={filters.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search by name, phone, or message..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={() => setFilters({ status: '', priority: '', search: '' })}
                            className="w-full p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Claim Assistance List */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <>
                        {/* Top toolbar */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedItems(claimAssistances.map(i => i._id));
                                        } else {
                                            setSelectedItems([]);
                                        }
                                    }}
                                    checked={selectedItems.length === claimAssistances.length && claimAssistances.length > 0}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>Select all ({claimAssistances.length})</span>
                            </div>
                            {selectedItems.length > 0 && (
                                <div className="text-xs text-gray-500">
                                    {selectedItems.length} selected
                                </div>
                            )}
                        </div>

                        {claimAssistances.length === 0 && (
                            <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
                                <div className="text-4xl mb-2">📋</div>
                                <div className="text-lg font-semibold text-gray-800">No claim assistance requests found</div>
                                <div className="text-sm text-gray-500">Try adjusting filters or search terms.</div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                            {claimAssistances.map((request) => {
                                const isSelected = selectedItems.includes(request._id);
                                return (
                                    <div
                                        key={request._id}
                                        className={`${isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''} relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
                                    >
                                        <div className="absolute top-3 left-3">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedItems([...selectedItems, request._id]);
                                                    } else {
                                                        setSelectedItems(selectedItems.filter(id => id !== request._id));
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="p-5">
                                            {/* Header */}
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mr-3 shadow">
                                                        <span className="text-sm font-semibold">📋</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">{request.name || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-500">{request.phone || '-'}</div>
                                                        <div className="text-xs text-gray-500">{request.email || '-'}</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 whitespace-nowrap">{formatDate(request.createdAt)}</div>
                                            </div>

                                            {/* Body */}
                                            <div className="mt-4 space-y-1">
                                                <div className="text-sm font-medium text-gray-900 line-clamp-1">{request.subject}</div>
                                                <div className="text-sm text-gray-600 line-clamp-2">{request.message}</div>
                                                <div className="text-xs text-purple-600 font-medium">
                                                    Claim Assistance Request
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${statusColors[request.status]}`}>
                                                        {request.status}
                                                    </span>
                                                </div>
                                                <div className="flex justify-end">
                                                    <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${priorityColors[request.priority]}`}>
                                                        {request.priority}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-4 flex gap-2">
                                                <select
                                                    value={request.status}
                                                    onChange={(e) => handleStatusUpdate(request._id, e.target.value)}
                                                    className="flex-1 p-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="resolved">Resolved</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                                <select
                                                    value={request.priority}
                                                    onChange={(e) => handlePriorityUpdate(request._id, e.target.value)}
                                                    className="flex-1 p-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                    <option value="urgent">Urgent</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDelete(request._id)}
                                                    className="p-1 text-red-600 hover:text-red-800 text-xs"
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center p-4 border-t border-gray-100">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => fetchClaimAssistances(pagination.currentPage - 1)}
                                        disabled={!pagination.hasPrevPage}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="px-3 py-1 text-sm text-gray-600">
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </span>
                                    <button
                                        onClick={() => fetchClaimAssistances(pagination.currentPage + 1)}
                                        disabled={!pagination.hasNextPage}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ClaimAssistanceList;
