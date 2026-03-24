import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/apiUtils';

const InquiryList = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({
        status: '',
        inquiryType: '',
        priority: '',
        search: ''
    });
    const [selectedInquiries, setSelectedInquiries] = useState([]);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');

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

    const typeColors = {
        general: 'bg-purple-100 text-purple-800',
        investment: 'bg-green-100 text-green-800',
        insurance: 'bg-blue-100 text-blue-800',
        technical: 'bg-orange-100 text-orange-800',
        billing: 'bg-red-100 text-red-800',
        other: 'bg-gray-100 text-gray-800'
    };

    const categoryIcons = {
        all: '📋',

        'tata-aia': '🏢',
        term: '🛡️',
        health: '🏥',
        'family-health': '👨‍👩‍👧‍👦',
        'group-health': '🏢',
        travel: '✈️',
        car: '🚗',
        bike: '🏍️',
        'guaranteed-returns': '💰',
        'child-saving': '👶',
        retirement: '🏖️',
        'free-term': '🎁',
        'term-women': '👩'
    };

    useEffect(() => {
        fetchInquiries();
    }, [filters]);

    const fetchInquiries = async (page = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page,
                limit: 10,
                ...filters
            });

            const data = await apiRequest(`/inquiries/admin/all?${params}`);

            setInquiries(data.inquiries);
            setPagination(data.pagination);
        } catch (err) {
            setError(err.message || 'Failed to fetch inquiries');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const categories = [
        { id: 'all', label: 'All Inquiries', search: '', type: '', group: 'General' },

        { id: 'tata-aia', label: 'TataAIA Inquiries', search: 'TataAIA', type: 'insurance', group: 'TataAIA' },
        { id: 'term', label: 'Term Insurance', search: 'Term Insurance', type: 'insurance', group: 'Insurance' },
        { id: 'health', label: 'Health Insurance', search: 'Health Insurance', type: 'insurance', group: 'Insurance' },
        { id: 'family-health', label: 'Family Health Insurance', search: 'Family Health Insurance', type: 'insurance', group: 'Insurance' },
        { id: 'group-health', label: 'Group Health Insurance', search: 'Group Health Insurance', type: 'insurance', group: 'Insurance' },
        { id: 'travel', label: 'Travel Insurance', search: 'Travel insurance', type: 'insurance', group: 'Insurance' },
        { id: 'car', label: 'Car Insurance', search: 'Car Insurance', type: 'insurance', group: 'Insurance' },
        { id: 'bike', label: 'Bike Insurance', search: 'Bike Insurance', type: 'insurance', group: 'Insurance' },
        { id: 'free-term', label: 'Free Term Plan', search: 'Free Term', type: 'insurance', group: 'Insurance' },
        { id: 'term-women', label: 'Term Women Insurance', search: 'Term Women Insurance', type: 'insurance', group: 'Insurance' },
        { id: 'guaranteed-returns', label: 'Guaranteed Returns', search: 'Guaranteed Returns', type: 'investment', group: 'Investment' },
        { id: 'child-saving', label: 'Child Saving Plan', search: 'Child Saving', type: 'investment', group: 'Investment' },
        { id: 'retirement', label: 'Retirement Plan', search: 'Retirement', type: 'investment', group: 'Investment' }
    ];

    const handleCategorySelect = (categoryId) => {
        const category = categories.find(c => c.id === categoryId) || categories[0];
        setSelectedCategory(category.id);
        setFilters(prev => ({
            ...prev,
            inquiryType: category.type || '',
            search: category.search || ''
        }));
    };

    const handleClearAllFilters = () => {
        setSelectedCategory('all');
        setFilters({ status: '', inquiryType: '', priority: '', search: '' });
    };

    const handleStatusUpdate = async (inquiryId, newStatus) => {
        try {
            await apiRequest(`/inquiries/admin/${inquiryId}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            fetchInquiries(pagination.currentPage);
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
            fetchInquiries(pagination.currentPage);
        } catch (err) {
            setError(err.message || 'Failed to update priority');
        }
    };

    const handleDelete = async (inquiryId) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

        try {
            console.log('Attempting to delete inquiry:', inquiryId);
            const token = localStorage.getItem('adminToken');
            console.log('Token available:', !!token);
            
            const response = await apiRequest(`/inquiries/admin/${inquiryId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            
            console.log('Delete response:', response);
            setError(null); // Clear any previous errors
            fetchInquiries(pagination.currentPage);
        } catch (err) {
            console.error('Delete error:', err);
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
            fetchInquiries(pagination.currentPage);
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



    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 p-6">Customer Inquiries</h2>
                <div className="flex space-x-2">
                    {/* Test Delete Button */}
                    {/* <button
                        onClick={() => {
                            console.log('Testing delete with sample ID');
                            handleDelete('test-inquiry-id');
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Test Delete
                    </button> */}
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

            {/* Sidebar + Filters + List */}
            <div className="flex gap-6">
                {/* Sidebar */}
                <aside className="w-64 shrink-0 sticky top-4 self-start">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">Categories</h3>
                            <button onClick={handleClearAllFilters} className="text-[11px] text-blue-700 hover:text-blue-800">Clear all</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-[11px] font-semibold text-gray-400 uppercase mb-2">General</div>
                                <nav className="space-y-1">
                                    {categories.filter(c => c.group === 'General').map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategorySelect(cat.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all border ${selectedCategory === cat.id ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 border-transparent'}`}
                                        >
                                            <span className="text-base">{categoryIcons[cat.id] || '📁'}</span>
                                            <span className="text-sm font-medium">{cat.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                            <div>
                                <div className="text-[11px] font-semibold text-gray-400 uppercase mb-2">Insurance</div>
                                <nav className="space-y-1">
                                    {categories.filter(c => c.group === 'Insurance').map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategorySelect(cat.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all border ${selectedCategory === cat.id ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 border-transparent'}`}
                                        >
                                            <span className="text-base">{categoryIcons[cat.id] || '📁'}</span>
                                            <span className="text-sm font-medium">{cat.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                            <div>
                                <div className="text-[11px] font-semibold text-gray-400 uppercase mb-2">Investment</div>
                                <nav className="space-y-1">
                                    {categories.filter(c => c.group === 'Investment').map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategorySelect(cat.id)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all border ${selectedCategory === cat.id ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 border-transparent'}`}
                                        >
                                            <span className="text-base">{categoryIcons[cat.id] || '📁'}</span>
                                            <span className="text-sm font-medium">{cat.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Filters and List */}
                <div className="flex-1 space-y-6">
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
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Type</label>
                                <select
                                    value={filters.inquiryType}
                                    onChange={(e) => handleFilterChange('inquiryType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="">All Types</option>
                                    <option value="general">General</option>
                                    <option value="investment">Investment</option>
                                    <option value="insurance">Insurance</option>
                                    <option value="technical">Technical</option>
                                    <option value="billing">Billing</option>
                                    <option value="other">Other</option>
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
                                <label className="block text-sm font-semibold text-gray-800 mb-1">Search</label>
                                <input
                                    type="text"
                                    placeholder="Search inquiries..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-xs text-gray-500">Tip: Combine category + search to drill down faster.</div>
                            <div className="flex gap-2">
                                <button onClick={handleClearAllFilters} className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Clear Filters</button>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {/* Inquiries Cards */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <>
                                {/* Top toolbar */}
                                <div className="flex items-center justify-between">
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

                                {inquiries.length === 0 && (
                                    <div className="bg-white border border-gray-100 rounded-xl p-8 text-center shadow-sm">
                                        <div className="text-4xl mb-2">🔍</div>
                                        <div className="text-lg font-semibold text-gray-800">No inquiries found</div>
                                        <div className="text-sm text-gray-500">Try adjusting filters or search terms.</div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
                                                    {/* <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center mr-3 shadow">
                                                        <span className="text-sm font-semibold">{(inquiry.name || '?').charAt(0).toUpperCase()}</span>
                                                    </div> */}
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900 pl-6">{inquiry.name || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-500 pl-6">{inquiry.email || '-'}</div>
                                                        <div className="text-xs text-gray-500 pl-6">{inquiry.phone || '-'}</div>
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
                                                    <span className={`inline-flex px-2 py-1 text-[11px] font-semibold rounded-full ${typeColors[inquiry.inquiryType]}`}>
                                                        {inquiry.inquiryType}
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
                                                    <label className="block text-[11px] font-medium text-gray-500 mb-1">Status</label>
                                                    <select
                                                        value={inquiry.status}
                                                        onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)}
                                                        className={`w-full text-xs font-semibold rounded-md px-2 py-2 border ${statusColors[inquiry.status]}`}
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
                                                        value={inquiry.priority}
                                                        onChange={(e) => handlePriorityUpdate(inquiry._id, e.target.value)}
                                                        className={`w-full text-xs font-semibold rounded-md px-2 py-2 border ${priorityColors[inquiry.priority]}`}
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
                            </>
                        )}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="bg-white px-4 py-3 flex items-center justify-between border border-gray-100 rounded-xl shadow-sm">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <button
                                        onClick={() => fetchInquiries(pagination.currentPage - 1)}
                                        disabled={!pagination.hasPrevPage}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => fetchInquiries(pagination.currentPage + 1)}
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
                                                onClick={() => fetchInquiries(pagination.currentPage - 1)}
                                                disabled={!pagination.hasPrevPage}
                                                className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                ‹ Prev
                                            </button>
                                            <button
                                                onClick={() => fetchInquiries(pagination.currentPage + 1)}
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
                    {/* Close flex-1 space-y-6 */}
                </div>
                {/* Close flex gap-6 */}
            </div>
        </div>
    );
};

export default InquiryList;
