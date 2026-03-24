import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app';
import { toast } from 'react-hot-toast';

const CallUsSection = () => {
    const [callStats, setCallStats] = useState({
        totalCalls: 0,
        answeredCalls: 0,
        missedCalls: 0,
        averageCallDuration: 0
    });
    const [recentCalls, setRecentCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchCallData();
    }, []);

    const fetchCallData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            
            // Fetch call statistics
            const statsResponse = await axios.get('${API_BASE_URL}/api/admin/call-stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (statsResponse.data?.success) {
                setCallStats(statsResponse.data.data);
            }

            // Fetch recent calls
            const callsResponse = await axios.get('${API_BASE_URL}/api/admin/recent-calls', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (callsResponse.data?.success) {
                setRecentCalls(callsResponse.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch call data:', error);
            toast.error('Failed to load call data');
        } finally {
            setLoading(false);
        }
    };

    const handleCallBack = async (callId) => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(`${API_BASE_URL}/api/admin/call-back/${callId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Call back initiated successfully');
            fetchCallData(); // Refresh data
        } catch (error) {
            console.error('Failed to initiate call back:', error);
            toast.error('Failed to initiate call back');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'answered': return 'text-green-400 border-green-400';
            case 'missed': return 'text-red-400 border-red-400';
            case 'incoming': return 'text-blue-400 border-blue-400';
            case 'callback_initiated': return 'text-yellow-400 border-yellow-400';
            default: return 'text-gray-400 border-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'answered': return '✓';
            case 'missed': return '✕';
            case 'incoming': return '📞';
            case 'callback_initiated': return '🔄';
            default: return '•';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-pulse">
                            <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-300 font-medium text-lg">Connecting to call center...</p>
                    <div className="mt-4 flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Dark Header with Neon Effects */}
            <div className="relative bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 border-b border-red-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10"></div>
                <div className="relative z-10 p-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                    Call Center Hub
                                </h1>
                                <p className="text-gray-300 text-lg">Real-time call monitoring & management</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
                                <div className="text-5xl font-bold text-red-400 mb-1">{callStats.totalCalls}</div>
                                <div className="text-gray-300 text-sm">Total Calls Today</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Unique Tab Navigation - Horizontal Pills */}
            <div className="p-6">
                <div className="flex justify-center space-x-4 mb-8">
                    {[
                        { id: 'overview', name: '📊 Dashboard', icon: '📊' },
                        { id: 'calls', name: '📞 Live Feed', icon: '📞' },
                        { id: 'actions', name: '⚡ Quick Actions', icon: '⚡' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/50 transform scale-105'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600'
                            }`}
                        >
                            <span className="text-lg mr-2">{tab.icon}</span>
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'overview' && (
                <div className="px-6 space-y-8">
                    {/* Stats Row - Horizontal Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 shadow-lg border border-green-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-200 text-sm font-medium mb-1">Answered</p>
                                    <p className="text-4xl font-bold text-white">{callStats.answeredCalls}</p>
                                    <p className="text-green-200 text-xs mt-1">Successfully handled</p>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-red-600 to-pink-700 rounded-2xl p-6 shadow-lg border border-red-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-200 text-sm font-medium mb-1">Missed</p>
                                    <p className="text-4xl font-bold text-white">{callStats.missedCalls}</p>
                                    <p className="text-red-200 text-xs mt-1">Need follow-up</p>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-6 shadow-lg border border-blue-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-200 text-sm font-medium mb-1">Duration</p>
                                    <p className="text-4xl font-bold text-white">{callStats.averageCallDuration}m</p>
                                    <p className="text-blue-200 text-xs mt-1">Average per call</p>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl p-6 shadow-lg border border-purple-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-200 text-sm font-medium mb-1">Success Rate</p>
                                    <p className="text-4xl font-bold text-white">
                                        {callStats.totalCalls > 0 ? Math.round((callStats.answeredCalls / callStats.totalCalls) * 100) : 0}%
                                    </p>
                                    <p className="text-purple-200 text-xs mt-1">Call handling</p>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call Activity Timeline */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">Call Activity Timeline</h3>
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="h-80 bg-gray-900/50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600">
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/50">
                                    <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-2">Call Analytics Timeline</h4>
                                <p className="text-gray-400">Interactive call activity visualization</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'calls' && (
                <div className="px-6">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6 border-b border-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Live Call Feed</h3>
                                    <p className="text-gray-400">Real-time customer interactions</p>
                                </div>
                                <button
                                    onClick={fetchCallData}
                                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 flex items-center space-x-2 font-semibold"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-8">
                            {recentCalls.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 border border-gray-600">
                                        <svg className="h-16 w-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">No Active Calls</h3>
                                    <p className="text-gray-400">All calls have been handled successfully</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentCalls.map((call, index) => (
                                        <div key={call.id} className="bg-gray-900/50 rounded-2xl p-6 hover:bg-gray-900 transition-all duration-300 border border-gray-700">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6">
                                                    <div className={`w-4 h-4 rounded-full ${call.status === 'answered' ? 'bg-green-500' : call.status === 'missed' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                                                    <div className="flex items-center space-x-4">
                                                        <div className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(call.status)}`}>
                                                            <span className="mr-2">{getStatusIcon(call.status)}</span>
                                                            {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white text-lg">{call.customerName || 'Unknown'}</p>
                                                            <p className="text-gray-400">{call.phoneNumber}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center space-x-6">
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-white">
                                                            {new Date(call.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {call.duration > 0 ? `${Math.floor(call.duration / 60)}m ${call.duration % 60}s` : '0s'}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex space-x-3">
                                                        {call.status === 'missed' && (
                                                            <button
                                                                onClick={() => handleCallBack(call.id)}
                                                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 font-semibold flex items-center space-x-2"
                                                            >
                                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                                </svg>
                                                                <span>Call Back</span>
                                                            </button>
                                                        )}
                                                        <button className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold">
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'actions' && (
                <div className="px-6 space-y-8">
                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 border border-green-500/30">
                            <div className="text-center">
                                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Make Outbound Call</h3>
                                <p className="text-green-200">Initiate a new call to a customer</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 border border-blue-500/30">
                            <div className="text-center">
                                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Generate Report</h3>
                                <p className="text-blue-200">Create detailed call analytics report</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-600 to-violet-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 border border-purple-500/30">
                            <div className="text-center">
                                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
                                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Settings</h3>
                                <p className="text-purple-200">Configure call center preferences</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Tools */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Additional Tools</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 border border-orange-500/30 group">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white/20 rounded-xl p-3 group-hover:scale-110 transition-transform">
                                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">Schedule Call</p>
                                        <p className="text-orange-200">Set up future call appointments</p>
                                    </div>
                                </div>
                                <svg className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            <button className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 border border-teal-500/30 group">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white/20 rounded-xl p-3 group-hover:scale-110 transition-transform">
                                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg">Call Analytics</p>
                                        <p className="text-teal-200">View detailed performance metrics</p>
                                    </div>
                                </div>
                                <svg className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CallUsSection;
