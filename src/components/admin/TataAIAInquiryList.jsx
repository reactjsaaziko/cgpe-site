import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app';
import { apiRequest } from '../../utils/apiUtils';

const TataAIAInquiryList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        search: ''
    });
    const [selectedInquiries, setSelectedInquiries] = useState([]);
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
        fetchTataAIAInquiries();
    }, [filters]);

    const fetchTataAIAInquiries = async (page = 1) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...filters
            });

            const response = await axios.get(`${API_BASE_URL}/api/inquiries/admin/tata-aia?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setInquiries(response.data.inquiries);
            setPagination(response.data.pagination);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch TataAIA inquiries');
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
            fetchTataAIAInquiries(pagination.currentPage);
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
            fetchTataAIAInquiries(pagination.currentPage);
        } catch (err) {
            setError(err.message || 'Failed to update priority');
        }
    };

    const handleDelete = async (inquiryId) => {
        if (!window.confirm('Are you sure you want to delete this TataAIA inquiry?')) return;

        try {
            await apiRequest(`/inquiries/admin/${inquiryId}`, {
                method: 'DELETE'
            });
            fetchTataAIAInquiries(pagination.currentPage);
        } catch (err) {
            setError(err.message || 'Failed to delete inquiry');
        }
    };

    const handleBulkAction = async (action) => {
        if (selectedInquiries.length === 0) return;

        try {
            const token = localStorage.getItem('adminToken');
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
                    inquiryIds: selectedInquiries,
                    updates
                })
            });

            setSelectedInquiries([]);
            setShowBulkActions(false);
            fetchTataAIAInquiries(pagination.currentPage);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading TataAIA inquiries...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <div className="mt-2 text-sm text-red-700">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">TataAIA Inquiries</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage inquiries from TataAIA Fortune Guarantee Plus</p>
                </div>
                <div className="flex space-x-2">
                    {selectedInquiries.length > 0 && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleBulkAction('mark-resolved')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Mark Resolved ({selectedInquiries.length})
                            </button>
                            <button
                                onClick={() => handleBulkAction('mark-closed')}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Mark Closed ({selectedInquiries.length})
                            </button>
                            <button
                                onClick={() => setSelectedInquiries([])}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Clear Selection
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">Priority</label>
                        <select
                            value={filters.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="">All Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search by name, email, or product..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={() => setFilters({ status: '', priority: '', search: '' })}
                            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Inquiries List */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100">
                {inquiries.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="text-4xl mb-4">🏢</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No TataAIA Inquiries Found</h3>
                        <p className="text-gray-600">No inquiries from TataAIA Fortune Guarantee Plus at the moment.</p>
                    </div>
                ) : (
                    <div className="overflow-hidden">
                        {/* Top toolbar */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedInquiries(inquiries.map(i => i._id));
                                        } else {
                                            setSelectedInquiries([]);
                                        }
                                    }}
                                    checked={selectedInquiries.length === inquiries.length && inquiries.length > 0}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>Select all ({inquiries.length})</span>
                            </div>
                            {selectedInquiries.length > 0 && (
                                <div className="text-xs text-gray-500">
                                    {selectedInquiries.length} selected
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                            {inquiries.map((inquiry) => {
                                const isSelected = selectedInquiries.includes(inquiry._id);
                                return (
                                    <div
                                        key={inquiry._id}
                                        className={`${isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''} relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
                                    >
                                        <div className="absolute top-3 left-3">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedInquiries([...selectedInquiries, inquiry._id]);
                                                    } else {
                                                        setSelectedInquiries(selectedInquiries.filter(id => id !== inquiry._id));
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
                                                        <span className="text-sm font-semibold">{(inquiry.name || '?').charAt(0).toUpperCase()}</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900">{inquiry.name || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-500">{inquiry.email || '-'}</div>
                                                        <div className="text-xs text-gray-500">{inquiry.phone || '-'}</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 whitespace-nowrap">{formatDate(inquiry.createdAt)}</div>
                                            </div>

                                            {/* Body */}
                                            <div className="mt-4 space-y-1">
                                                <div className="text-sm font-medium text-gray-900 line-clamp-1">{inquiry.subject}</div>
                                                <div className="text-sm text-gray-600 line-clamp-2">{inquiry.message}</div>
                                                {inquiry.productName && (
                                                    <div className="text-xs text-blue-600 font-medium">
                                                        Product: {inquiry.productName}
                                                        {inquiry.productCategory && ` (${inquiry.productCategory})`}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${statusColors[inquiry.status]}`}>
                                                        {inquiry.status}
                                                    </span>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleDelete(inquiry._id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 text-xs"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                                <div>
                                                    <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${priorityColors[inquiry.priority]}`}>
                                                        {inquiry.priority}
                                                    </span>
                                                </div>
                                                <div className="flex justify-end space-x-1">
                                                    <select
                                                        value={inquiry.status}
                                                        onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)}
                                                        className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="in-progress">In Progress</option>
                                                        <option value="resolved">Resolved</option>
                                                        <option value="closed">Closed</option>
                                                    </select>
                                                    <select
                                                        value={inquiry.priority}
                                                        onChange={(e) => handlePriorityUpdate(inquiry._id, e.target.value)}
                                                        className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                                                    >
                                                        <option value="low">Low</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="high">High</option>
                                                        <option value="urgent">Urgent</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing page {pagination.currentPage} of {pagination.totalPages}
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        <button
                                            onClick={() => fetchTataAIAInquiries(pagination.currentPage - 1)}
                                            disabled={!pagination.hasPrevPage}
                                            className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            ‹ Prev
                                        </button>
                                        <button
                                            onClick={() => fetchTataAIAInquiries(pagination.currentPage + 1)}
                                            disabled={!pagination.hasNextPage}
                                            className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Next ›
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TataAIAInquiryList;
