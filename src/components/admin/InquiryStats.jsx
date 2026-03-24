import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/apiUtils';
import * as XLSX from 'xlsx';

const InquiryStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const data = await apiRequest('/inquiries/admin/stats');
            setStats(data.stats);
        } catch (err) {
            setError(err.message || 'Failed to fetch statistics');
        } finally {
            setLoading(false);
        }
    };

    const exportReport = async () => {
        try {
            setExporting(true);

            // Fetch all inquiries across pages
            const limit = 500;
            let page = 1;
            let totalPages = 1;
            const allInquiries = [];

            do {
                const params = new URLSearchParams({ page: String(page), limit: String(limit) });
                const data = await apiRequest(`/inquiries/admin/all?${params.toString()}`);

                const inquiries = data?.inquiries || [];
                const pagination = data?.pagination || {};
                allInquiries.push(...inquiries);
                totalPages = pagination.totalPages || 1;
                page += 1;
            } while (page <= totalPages);

            if (allInquiries.length === 0) {
                setError('No inquiries to export');
                return;
            }

            // Prepare data for Excel
            const rows = allInquiries.map((i) => ({
                Name: i.name || '',
                Email: i.email || '',
                Phone: i.phone || '',
                Subject: i.subject || '',
                Message: i.message || '',
                Type: i.inquiryType || '',
                Status: i.status || '',
                Priority: i.priority || '',
                CreatedAt: i.createdAt ? new Date(i.createdAt).toLocaleString() : ''
            }));

            const worksheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Inquiries');

            const fileName = `inquiries_report_${new Date().toISOString().slice(0, 10)}.xlsx`;
            XLSX.writeFile(workbook, fileName);
        } catch (err) {
            setError(err.message || 'Failed to export report');
        } finally {
            setExporting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    if (!stats) {
        return <div>No statistics available</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Inquiry Statistics</h2>
            
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-500 bg-opacity-10 rounded-xl">
                            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-500 bg-opacity-10 rounded-xl">
                            <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-500 bg-opacity-10 rounded-xl">
                            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">In Progress</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-500 bg-opacity-10 rounded-xl">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Resolved</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-500 bg-opacity-10 rounded-xl">
                            <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Recent (7 days)</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.recent}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* By Type */}   
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Inquiries by Type</h3>
                    <div className="space-y-3">
                        {stats.byType.map((type) => (
                            <div key={type._id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 ${
                                        type._id === 'general' ? 'bg-purple-500' :
                                        type._id === 'investment' ? 'bg-green-500' :
                                        type._id === 'insurance' ? 'bg-blue-500' :
                                        type._id === 'technical' ? 'bg-orange-500' :
                                        type._id === 'billing' ? 'bg-red-500' : 'bg-gray-500'
                                    }`}></div>
                                    <span className="text-sm font-medium text-gray-700 capitalize">
                                        {type._id}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{type.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* By Priority */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Inquiries by Priority</h3>
                    <div className="space-y-3">
                        {stats.byPriority.map((priority) => (
                            <div key={priority._id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 ${
                                        priority._id === 'low' ? 'bg-gray-500' :
                                        priority._id === 'medium' ? 'bg-blue-500' :
                                        priority._id === 'high' ? 'bg-orange-500' : 'bg-red-500'
                                    }`}></div>
                                    <span className="text-sm font-medium text-gray-700 capitalize">
                                        {priority._id}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">{priority.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tata AIA Statistics */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tata AIA Inquiries</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-3 bg-blue-600"></div>
                                <span className="text-sm font-medium text-gray-700">Total</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{stats.tataAIA?.total || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-3 bg-yellow-500"></div>
                                <span className="text-sm font-medium text-gray-700">Pending</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{stats.tataAIA?.pending || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full mr-3 bg-green-500"></div>
                                <span className="text-sm font-medium text-gray-700">Resolved</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{stats.tataAIA?.resolved || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Response Rate */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Rate</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                            {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                        </div>
                        <div className="text-sm text-gray-600">Resolution Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                            {stats.total > 0 ? Math.round(((stats.resolved + stats.closed) / stats.total) * 100) : 0}%
                        </div>
                        <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">
                            {stats.pending + stats.inProgress}
                        </div>
                        <div className="text-sm text-gray-600">Active Inquiries</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="gap-4">
                    {/* <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                        <div className="text-center">
                            <svg className="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">Create Response Template</div>
                            <div className="text-xs text-gray-500">Save common responses</div>
                        </div>
                    </button> */}
                    <div className="w-full col-span-1 md:col-start-2 flex justify-center">
                        <button onClick={exportReport} disabled={exporting} className={`w-full p-4 border-2 border-dashed rounded-lg transition-colors ${exporting ? 'border-gray-200 bg-gray-50 cursor-not-allowed' : 'border-gray-300 hover:border-green-500 hover:bg-green-50'}`}>
                            <div className="text-center">
                                <svg className="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <div className="text-sm font-medium text-gray-900">{exporting ? 'Exporting...' : 'Export Report'}</div>
                                <div className="text-xs text-gray-500">Download inquiry data</div>
                            </div>
                        </button>
                    </div>
                    {/* <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                        <div className="text-center">
                            <svg className="h-8 w-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="text-sm font-medium text-gray-900">Settings</div>
                            <div className="text-xs text-gray-500">Configure inquiry settings</div>
                        </div>
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default InquiryStats;