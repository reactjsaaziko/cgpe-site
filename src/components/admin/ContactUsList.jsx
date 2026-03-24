import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/environment';
import { handleContactUsError } from '../../utils/apiUtils';

const ContactUsList = () => {
    const [contactMessages, setContactMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        search: '',
        inquiryType: ''
    });
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [retryCount, setRetryCount] = useState(0);
    const [isRetrying, setIsRetrying] = useState(false);

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
        fetchContactUsMessages();
    }, [filters]);

    const fetchContactUsMessages = async (page = 1) => {
        try {
            setLoading(true);
            setError(null); // Clear previous errors
            
            const token = localStorage.getItem('adminToken');
            
            if (!token) {
                setError('Authentication required. Please login again.');
                return;
            }

            const params = new URLSearchParams({
                page,
                limit: 10,
                ...filters
            });

            // Use the inquiry API and filter for contact us related inquiries
            const response = await axios.get(`${API_BASE_URL}/api/inquiries/admin/all?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Check if response has the expected structure
            if (!response.data || !response.data.success) {
                throw new Error('Invalid response from server');
            }

            // Handle both possible response structures
            const inquiries = response.data.inquiries || response.data.data?.inquiries || [];
            const paginationData = response.data.pagination || response.data.data?.pagination || {};

            // Filter for contact us related inquiries (general, billing, technical, other)
            const contactUsInquiries = inquiries.filter(inquiry => 
                ['general', 'billing', 'technical', 'other'].includes(inquiry.inquiryType) ||
                inquiry.productName === 'Contact Us Form'
            );

            setContactMessages(contactUsInquiries);
            setPagination(paginationData);
            setIsRetrying(false); // Reset retry state on success
        } catch (err) {
            console.error('Error fetching contact us messages:', err);
            handleContactUsError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleStatusUpdate = async (messageId, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE_URL}/api/inquiries/admin/${messageId}`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchContactUsMessages(pagination.currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update status');
        }
    };

    const handlePriorityUpdate = async (messageId, newPriority) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.put(`${API_BASE_URL}/api/inquiries/admin/${messageId}`,
                { priority: newPriority },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchContactUsMessages(pagination.currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update priority');
        }
    };

    const handleDelete = async (messageId) => {
        if (!window.confirm('Are you sure you want to delete this contact message?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`${API_BASE_URL}/api/inquiries/admin/${messageId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchContactUsMessages(pagination.currentPage);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete message');
        }
    };

    const handleBulkAction = async (action) => {
        if (selectedMessages.length === 0) return;

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

            await axios.put('${API_BASE_URL}/api/inquiries/admin/bulk-update', {
                inquiryIds: selectedMessages,
                updates
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setSelectedMessages([]);
            fetchContactUsMessages(pagination.currentPage);
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

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
        setIsRetrying(true);
        setError(null);
        fetchContactUsMessages(pagination.currentPage || 1);
    };

    const handleClearFilters = () => {
        setFilters({ status: '', priority: '', search: '', inquiryType: '' });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center p-6">
                <h2 className="text-2xl font-bold text-gray-900">Contact Us Messages</h2>
                <div className="flex space-x-2">
                    {selectedMessages.length > 0 && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleBulkAction('mark-resolved')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Mark Resolved ({selectedMessages.length})
                            </button>
                            <button
                                onClick={() => handleBulkAction('mark-closed')}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Mark Closed ({selectedMessages.length})
                            </button>
                            <button
                                onClick={() => setSelectedMessages([])}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Clear Selection
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gradient-to-br from-white to-blue-50/40 rounded-xl shadow-md p-6 border border-gray-100">
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
                            <option value="">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">Inquiry Type</label>
                        <select
                            value={filters.inquiryType}
                            onChange={(e) => handleFilterChange('inquiryType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="">All Types</option>
                            <option value="general">General</option>
                            <option value="billing">Billing</option>
                            <option value="technical">Technical</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search by name, email, or message..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-gray-500">Filter contact us messages by status, priority, inquiry type, or search terms</div>
                    <div className="flex gap-2">
                        <button onClick={handleClearFilters} className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Clear Filters</button>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <div className="flex items-center justify-between">
                        <span>{error}</span>
                        <button
                            onClick={handleRetry}
                            disabled={isRetrying}
                            className="ml-4 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                            {isRetrying ? 'Retrying...' : 'Retry'}
                        </button>
                    </div>
                    {isRetrying && (
                        <div className="mt-2 text-xs text-gray-500">
                            Retrying... (Attempt {retryCount + 1})
                        </div>
                    )}
                    <div className="mt-2 text-xs text-gray-500">
                        If the issue persists, please try refreshing the page or contact support.
                    </div>
                </div>
            )}

            {/* Messages List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <>
                        {/* Top toolbar */}
                        <div className="flex items-center justify-between pl-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedMessages(contactMessages.map(m => m._id));
                                        } else {
                                            setSelectedMessages([]);
                                        }
                                    }}
                                    checked={selectedMessages.length === contactMessages.length && contactMessages.length > 0}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>Select all ({contactMessages.length})</span>
                            </div>
                            {selectedMessages.length > 0 && (
                                <div className="text-xs text-gray-500">
                                    {selectedMessages.length} selected
                                </div>
                            )}
                        </div>

                        {contactMessages.length === 0 && (
                            <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
                                <div className="text-4xl mb-2">📧</div>
                                <div className="text-lg font-semibold text-gray-800">No contact us messages found</div>
                                <div className="text-sm text-gray-500">Try adjusting filters or search terms.</div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {contactMessages.map((message) => {
                                const isSelected = selectedMessages.includes(message._id);
                                return (
                                    <div
                                        key={message._id}
                                        className={`${isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''} relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow`}
                                    >
                                        <div className="absolute top-3 left-3">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedMessages([...selectedMessages, message._id]);
                                                    } else {
                                                        setSelectedMessages(selectedMessages.filter(id => id !== message._id));
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="p-5">
                                            {/* Header */}
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center">
                                                    {/* <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center mr-3 shadow">
                                                        <span className="text-sm font-semibold">{(message.name || '?').charAt(0).toUpperCase()}</span>
                                                    </div> */}
                                                    <div className='pl-8'>
                                                        <div className="text-sm font-semibold text-gray-900">{message.name || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-500">{message.email || '-'}</div>
                                                        <div className="text-xs text-gray-500">{message.phone || '-'}</div>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 whitespace-nowrap">{formatDate(message.createdAt)}</div>
                                            </div>

                                            {/* Body */}
                                            <div className="mt-4 space-y-1">
                                                <div className="text-sm font-medium text-gray-900 line-clamp-1">{message.subject || 'No Subject'}</div>
                                                <div className="text-sm text-gray-600 line-clamp-2">{message.message || 'No message content'}</div>
                                                <div className="text-xs text-blue-600 font-medium">
                                                    Type: {message.inquiryType}
                                                </div>
                                                {message.productName && (
                                                    <div className="text-xs text-gray-500">
                                                        Source: {message.productName}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-medium text-gray-500 mb-1">Status</label>
                                                    <select
                                                        value={message.status}
                                                        onChange={(e) => handleStatusUpdate(message._id, e.target.value)}
                                                        className={`w-full text-xs font-semibold rounded-md px-2 py-2 border ${statusColors[message.status]}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="in-progress">In Progress</option>
                                                        <option value="resolved">Resolved</option>
                                                        <option value="closed">Closed</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-medium text-gray-500 mb-1">Priority</label>
                                                    <select
                                                        value={message.priority}
                                                        onChange={(e) => handlePriorityUpdate(message._id, e.target.value)}
                                                        className={`w-full text-xs font-semibold rounded-md px-2 py-2 border ${priorityColors[message.priority]}`}
                                                    >
                                                        <option value="low">Low</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="high">High</option>
                                                        <option value="urgent">Urgent</option>
                                                    </select>
                                                </div>
                                                <div className="col-span-2 flex justify-end">
                                                    <button
                                                        onClick={() => handleDelete(message._id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 text-xs"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border border-gray-100 rounded-xl shadow-sm">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => fetchContactUsMessages(pagination.currentPage - 1)}
                                disabled={!pagination.hasPrevPage}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => fetchContactUsMessages(pagination.currentPage + 1)}
                                disabled={!pagination.hasNextPage}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{((pagination.currentPage - 1) * 10) + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(pagination.currentPage * 10, pagination.totalDocs)}</span>{' '}
                                    of <span className="font-medium">{pagination.totalDocs}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => fetchContactUsMessages(pagination.currentPage - 1)}
                                        disabled={!pagination.hasPrevPage}
                                        className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        ‹ Prev
                                    </button>
                                    <button
                                        onClick={() => fetchContactUsMessages(pagination.currentPage + 1)}
                                        disabled={!pagination.hasNextPage}
                                        className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Next ›
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactUsList;
