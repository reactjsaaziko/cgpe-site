import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app';

const ResumeList = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({
        status: '',
        search: ''
    });
    const [selectedResumes, setSelectedResumes] = useState([]);
    const [viewingResume, setViewingResume] = useState(null);

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        reviewed: 'bg-blue-100 text-blue-800',
        shortlisted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    };

    const statusLabels = {
        pending: 'Pending',
        reviewed: 'Reviewed',
        shortlisted: 'Shortlisted',
        rejected: 'Rejected'
    };

    useEffect(() => {
        fetchResumes();
    }, [filters]);

    const fetchResumes = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);
            
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

            const response = await axios.get(`${API_BASE_URL}/api/careers/admin/resumes?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data?.success) {
                setResumes(response.data.data.docs || []);
                setPagination({
                    page: response.data.data.page,
                    totalPages: response.data.data.totalPages,
                    totalDocs: response.data.data.totalDocs,
                    hasNextPage: response.data.data.hasNextPage,
                    hasPrevPage: response.data.data.hasPrevPage
                });
            } else {
                setError(response.data?.message || 'Failed to fetch resumes');
            }
        } catch (err) {
            console.error('Error fetching resumes:', err);
            setError(err.response?.data?.message || 'Failed to fetch resumes');
            setResumes([]);
            setPagination({});
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleStatusChange = async (resumeId, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.patch(`${API_BASE_URL}/api/careers/admin/resumes/${resumeId}/status`, {
                status: newStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data?.success) {
                // Update the resume in the list
                setResumes(prev => prev.map(resume => 
                    resume._id === resumeId 
                        ? { ...resume, status: newStatus }
                        : resume
                ));
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        }
    };

    const handleDeleteResume = async (resumeId) => {
        if (!confirm('Are you sure you want to delete this resume?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.delete(`${API_BASE_URL}/api/careers/admin/resumes/${resumeId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data?.success) {
                setResumes(prev => prev.filter(resume => resume._id !== resumeId));
                alert('Resume deleted successfully');
            }
        } catch (err) {
            console.error('Error deleting resume:', err);
            alert('Failed to delete resume');
        }
    };

    const handleBulkAction = async (action) => {
        if (selectedResumes.length === 0) return;

        try {
            const token = localStorage.getItem('adminToken');
            
            if (action === 'delete') {
                if (!confirm(`Are you sure you want to delete ${selectedResumes.length} resumes?`)) {
                    return;
                }

                const deletePromises = selectedResumes.map(resumeId =>
                    axios.delete(`${API_BASE_URL}/api/careers/admin/resumes/${resumeId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                );

                await Promise.all(deletePromises);
                setResumes(prev => prev.filter(resume => !selectedResumes.includes(resume._id)));
                setSelectedResumes([]);
                alert('Resumes deleted successfully');
            } else if (action.startsWith('status-')) {
                const newStatus = action.replace('status-', '');
                const updatePromises = selectedResumes.map(resumeId =>
                    axios.patch(`${API_BASE_URL}/api/careers/admin/resumes/${resumeId}/status`, {
                        status: newStatus
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                );

                await Promise.all(updatePromises);
                setResumes(prev => prev.map(resume => 
                    selectedResumes.includes(resume._id)
                        ? { ...resume, status: newStatus }
                        : resume
                ));
                setSelectedResumes([]);
                alert(`Status updated to ${newStatus} for selected resumes`);
            }
        } catch (err) {
            console.error('Error performing bulk action:', err);
            alert('Failed to perform bulk action');
        }
    };

    const handleSingleDownload = async (resumeId, originalFileName) => {
        try {
            const token = localStorage.getItem('adminToken');
            
            // Make the request to download single resume
            const response = await axios.get(`${API_BASE_URL}/api/careers/admin/resumes/${resumeId}/download`, {
                headers: { 
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob' // Important for file download
            });

            // Create a download link for the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', originalFileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            console.log('Single download completed successfully');
        } catch (err) {
            console.error('Error downloading resume:', err);
            alert('Failed to download resume');
        }
    };

    const handleBulkDownload = async () => {
        if (selectedResumes.length === 0) return;

        try {
            const token = localStorage.getItem('adminToken');
            
            // Make the request to bulk download
            const response = await axios.post('${API_BASE_URL}/api/careers/admin/resumes/bulk-download', {
                resumeIds: selectedResumes
            }, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'blob' // Important for file download
            });

            // Create a download link for the zip file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resumes_${new Date().toISOString().slice(0, 10)}.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            setSelectedResumes([]);
            alert('Bulk download completed successfully');
        } catch (err) {
            console.error('Error downloading resumes:', err);
            alert('Failed to download resumes');
        }
    };

    const handleResumeSelect = (resumeId) => {
        setSelectedResumes(prev => 
            prev.includes(resumeId) 
                ? prev.filter(id => id !== resumeId)
                : [...prev, resumeId]
        );
    };

    const handleSelectAll = () => {
        if (selectedResumes.length === resumes.length) {
            setSelectedResumes([]);
        } else {
            setSelectedResumes(resumes.map(resume => resume._id));
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

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => fetchResumes()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Resume Submissions</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage resume submissions from job applicants</p>
                </div>
                <div className="flex space-x-2">
                    {selectedResumes.length > 0 && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleBulkAction('status-pending')}
                                className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                            >
                                Mark Pending
                            </button>
                            <button
                                onClick={() => handleBulkAction('status-reviewed')}
                                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                            >
                                Mark Reviewed
                            </button>
                            <button
                                onClick={() => handleBulkAction('status-shortlisted')}
                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                            >
                                Mark Shortlisted
                            </button>
                            <button
                                onClick={() => handleBulkAction('status-rejected')}
                                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                            >
                                Mark Rejected
                            </button>
                            <button
                                onClick={handleBulkDownload}
                                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                            >
                                Download All ({selectedResumes.length})
                            </button>
                            <button
                                onClick={() => handleBulkAction('delete')}
                                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                            >
                                Delete Selected
                            </button>
                        </div>
                    )}
                </div>

                {/* Original Format Download Notice */}
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                        <strong>Note:</strong> Resume files are downloaded in their original format (PDF, DOC, DOCX, TXT, HTML, RTF, or images) as uploaded by users. No format conversion is performed.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex flex-wrap gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={() => setSelectedResumes([])}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Clear Selection
                        </button>
                    </div>
                </div>
            </div>

            {/* Resumes Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        checked={selectedResumes.length === resumes.length && resumes.length > 0}
                                        onChange={handleSelectAll}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Applicant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Resume File
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submitted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {resumes.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No resumes found
                                    </td>
                                </tr>
                            ) : (
                                resumes.map((resume) => (
                                    <tr key={resume._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedResumes.includes(resume._id)}
                                                onChange={() => handleResumeSelect(resume._id)}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{resume.name}</div>
                                                <div className="text-sm text-gray-500">{resume.email}</div>
                                                <div className="text-sm text-gray-500">{resume.mobile}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <div className="font-medium">{resume.resumeFile.originalName}</div>
                                                <div className="text-gray-500">{formatFileSize(resume.resumeFile.size)}</div>
                                                <div className="text-gray-500">{resume.resumeFile.mimeType}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={resume.status}
                                                onChange={(e) => handleStatusChange(resume._id, e.target.value)}
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[resume.status]}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="shortlisted">Shortlisted</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(resume.submittedAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleSingleDownload(resume._id, resume.resumeFile.originalName)}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    Download
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteResume(resume._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
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
                {pagination.totalPages > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => fetchResumes(pagination.page - 1)}
                                disabled={!pagination.hasPrevPage}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => fetchResumes(pagination.page + 1)}
                                disabled={!pagination.hasNextPage}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{' '}
                                    <span className="font-medium">{(pagination.page - 1) * 10 + 1}</span>
                                    {' '}to{' '}
                                    <span className="font-medium">
                                        {Math.min(pagination.page * 10, pagination.totalDocs)}
                                    </span>
                                    {' '}of{' '}
                                    <span className="font-medium">{pagination.totalDocs}</span>
                                    {' '}results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => fetchResumes(pagination.page - 1)}
                                        disabled={!pagination.hasPrevPage}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    
                                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                        const pageNum = Math.max(1, pagination.page - 2) + i;
                                        if (pageNum > pagination.totalPages) return null;
                                        
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => fetchResumes(pageNum)}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                    pageNum === pagination.page
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } border`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    
                                    <button
                                        onClick={() => fetchResumes(pagination.page + 1)}
                                        disabled={!pagination.hasNextPage}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
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

export default ResumeList;
