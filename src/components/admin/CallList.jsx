import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app';

const CallList = () => {
    const [calls, setCalls] = useState([]);
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
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    const priorityColors = {
        low: 'bg-gray-100 text-gray-800',
        medium: 'bg-blue-100 text-blue-800',
        high: 'bg-orange-100 text-orange-800',
        urgent: 'bg-red-100 text-red-800'
    };

    useEffect(() => {
        fetchCalls();
    }, [filters]);

    const fetchCalls = async (page = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...filters
            });

            const response = await axios.get(`${API_BASE_URL}/api/call-assistance/admin/all?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCalls(response.data.data.calls || []);
            setPagination(response.data.data.pagination || {});
        } catch (err) {
            console.error('Error fetching calls:', err);
            setError(err.response?.data?.message || 'Failed to fetch call requests');
            setCalls([]);
            setPagination({});
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleStatusUpdate = async (callId, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE_URL}/api/call-assistance/admin/${callId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCalls(pagination.currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update status');
        }
    };

    const handlePriorityUpdate = async (callId, newPriority) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE_URL}/api/call-assistance/admin/${callId}`,
                { priority: newPriority },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchCalls(pagination.currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update priority');
        }
    };

    const handleDelete = async (callId) => {
        if (!window.confirm('Are you sure you want to delete this call request?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE_URL}/api/call-assistance/admin/${callId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCalls(pagination.currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete request');
        }
    };

    const handleBulkAction = async (action) => {
        if (selectedItems.length === 0) return;

        try {
            const token = localStorage.getItem('adminToken');
            const updates = {};

            switch (action) {
                case 'mark-completed':
                    updates.status = 'completed';
                    break;
                case 'mark-in-progress':
                    updates.status = 'in_progress';
                    break;
                case 'high-priority':
                    updates.priority = 'high';
                    break;
                default:
                    return;
            }

            await axios.put('${API_BASE_URL}/api/call-assistance/admin/bulk-update', {
                callIds: selectedItems,
                updates
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSelectedItems([]);
            setShowBulkActions(false);
            fetchCalls(pagination.currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to perform bulk action');
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
                <h2 className="text-2xl font-bold text-gray-900 p-6">Call Assistance Requests</h2>
                <div className="flex space-x-2">
                    {selectedItems.length > 0 && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleBulkAction('mark-completed')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Mark Completed ({selectedItems.length})
                            </button>
                            <button
                                onClick={() => handleBulkAction('mark-in-progress')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Mark In Progress ({selectedItems.length})
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
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
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
                            placeholder="Search by phone number or notes..."
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

            {/* Call List */}
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
                                            setSelectedItems(calls.map(c => c._id));
                                        } else {
                                            setSelectedItems([]);
                                        }
                                    }}
                                    checked={selectedItems.length === calls.length && calls.length > 0}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>Select all ({calls.length})</span>
                            </div>
                            {selectedItems.length > 0 && (
                                <div className="text-xs text-gray-500">
                                    {selectedItems.length} selected
                                </div>
                            )}
                        </div>

                        {calls.length === 0 && (
                            <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
                                <div className="text-4xl mb-2">📞</div>
                                <div className="text-lg font-semibold text-gray-800">No call requests found</div>
                                <div className="text-sm text-gray-500">Try adjusting filters or search terms.</div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                            {calls.map((call) => {
                                const isSelected = selectedItems.includes(call._id);
                                return (
                                    <div
                                        key={call._id}
                                        className={`${isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''} relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
                                    >
                                        <div className="absolute top-3 left-3">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedItems([...selectedItems, call._id]);
                                                    } else {
                                                        setSelectedItems(selectedItems.filter(id => id !== call._id));
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="p-5">
                                            {/* Header */}
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center mr-3 shadow">
                                                        <span className="text-sm font-semibold">📞</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">{call.name || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-500">{call.contactNumber || '-'}</div>
                                                        <div className="text-xs text-gray-500">{call.assignedTo?.name || 'Unassigned'}</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 whitespace-nowrap">{formatDate(call.createdAt)}</div>
                                            </div>

                                            {/* Body */}
                                            <div className="mt-4 space-y-1">
                                                <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                    Call Assistance Request
                                                </div>
                                                <div className="text-sm text-gray-600 line-clamp-2">{call.description || 'No description available'}</div>
                                                <div className="text-xs text-blue-600 font-medium">
                                                    Source: {call.source || 'website'}
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${statusColors[call.status]}`}>
                                                        {call.status}
                                                    </span>
                                                </div>
                                                <div className="flex justify-end">
                                                    <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${priorityColors[call.priority]}`}>
                                                        {call.priority}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-4 flex gap-2">
                                                <select
                                                    value={call.status}
                                                    onChange={(e) => handleStatusUpdate(call._id, e.target.value)}
                                                    className="flex-1 p-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                <select
                                                    value={call.priority}
                                                    onChange={(e) => handlePriorityUpdate(call._id, e.target.value)}
                                                    className="flex-1 p-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                    <option value="urgent">Urgent</option>
                                                </select>
                                                <button
                                                    onClick={() => handleDelete(call._id)}
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
                                        onClick={() => fetchCalls(pagination.currentPage - 1)}
                                        disabled={!pagination.hasPrevPage}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="px-3 py-1 text-sm text-gray-600">
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </span>
                                    <button
                                        onClick={() => fetchCalls(pagination.currentPage + 1)}
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

export default CallList;
