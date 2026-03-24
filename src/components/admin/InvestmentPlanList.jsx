import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../utils/apiUtils';
import OptimizedImage from '../common/OptimizedImage';

const InvestmentPlanList = ({ onEditPlan, refreshTrigger }) => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterRiskLevel, setFilterRiskLevel] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchPlans();
    }, [refreshTrigger]);

    const fetchPlans = async () => {
        try {
            const data = await apiRequest('/investment-plans/admin');
            
            if (data.success) {
                setPlans(data.data.plans || []);
            } else {
                setError(data.message || 'Unable to load investment plans');
            }
        } catch (error) {
            console.error('Fetch plans error:', error);
            setError(error.message || 'Unable to load plans. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePlan = async (planId) => {
        if (!window.confirm('Are you sure you want to delete this plan?')) {
            return;
        }

        try {
            const data = await apiRequest(`/investment-plans/admin/${planId}`, {
                method: 'DELETE'
            });

            if (data.success) {
                setPlans(plans.filter(plan => plan._id !== planId));
            } else {
                alert(data.message || 'Failed to delete plan');
            }
        } catch (error) {
            console.error('Delete plan error:', error);
            alert(error.message || 'Network error. Please try again.');
        }
    };

    const handleToggleStatus = async (planId) => {
        try {
            const data = await apiRequest(`/investment-plans/admin/${planId}/toggle-status`, {
                method: 'PATCH'
            });

            if (data.success) {
                setPlans(plans.map(plan => 
                    plan._id === planId 
                        ? { ...plan, isActive: data.data.isActive }
                        : plan
                ));
            } else {
                alert(data.message || 'Failed to toggle plan status');
            }
        } catch (error) {
            console.error('Toggle status error:', error);
            alert(error.message || 'Network error. Please try again.');
        }
    };

    // Filter plans based on search and filters
    const filteredPlans = plans.filter(plan => {
        const matchesSearch = plan.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             plan.solution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             plan.fundType.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !filterCategory || plan.category === filterCategory;
        const matchesRiskLevel = !filterRiskLevel || plan.riskLevel === filterRiskLevel;
        const matchesStatus = filterStatus === '' || plan.isActive === (filterStatus === 'active');

        return matchesSearch && matchesCategory && matchesRiskLevel && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow border">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Search</label>
                        <input
                            type="text"
                            placeholder="Search plans..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Category</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Categories</option>
                            <option value="equity">Equity</option>
                            <option value="balanced">Balanced</option>
                            <option value="debt">Debt</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Risk Level</label>
                        <select
                            value={filterRiskLevel}
                            onChange={(e) => setFilterRiskLevel(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Risk Levels</option>
                            <option value="low">Low</option>
                            <option value="moderate">Moderate</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black mb-1">Status</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Plans List */}
            <div className="bg-white rounded-lg shadow border">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-black">
                        Investment Plans ({filteredPlans.length})
                    </h3>
                </div>
                
                {filteredPlans.length === 0 ? (
                    <div className="p-8 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No investment plans available</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {plans.length === 0 ? 'Get started by creating a new investment plan.' : 'Try adjusting your search or filter criteria.'}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        Plan Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        Returns & Payout
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        Criteria
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredPlans.map((plan) => (
                                    <tr key={plan._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <OptimizedImage 
                                                    src={plan.logo} 
                                                    alt={plan.company} 
                                                    className="h-10 w-10 rounded object-contain"
                                                    placeholder="https://via.placeholder.com/40x40?text=Logo"
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-black">
                                                        {plan.company}
                                                    </div>
                                                    <div className="text-sm text-black">
                                                        {plan.solution}
                                                    </div>
                                                    <div className="text-sm text-black">
                                                        {plan.fundType}
                                                    </div>
                                                    {plan.highlight && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            Highlighted
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-black">
                                                <div className="font-medium">{plan.returns}</div>
                                                <div className="text-black">{plan.returnsPeriod}</div>
                                            </div>
                                            <div className="text-sm text-black mt-1">
                                                <div className="font-medium text-green-600">{plan.payout}</div>
                                                <div className="text-black">{plan.payoutNote}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-black">
                                                <div>₹{plan.minAmount.toLocaleString()} - ₹{plan.maxAmount.toLocaleString()}</div>
                                                <div className="text-black">{plan.minYears}-{plan.maxYears} years</div>
                                            </div>
                                            <div className="mt-1">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    plan.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                                                    plan.riskLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {plan.riskLevel.charAt(0).toUpperCase() + plan.riskLevel.slice(1)}
                                                </span>
                                                <span className="ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {plan.category.charAt(0).toUpperCase() + plan.category.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                plan.isActive 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {plan.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => onEditPlan(plan)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(plan._id)}
                                                    className={`${
                                                        plan.isActive 
                                                            ? 'text-red-600 hover:text-red-900' 
                                                            : 'text-green-600 hover:text-green-900'
                                                    }`}
                                                >
                                                    {plan.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePlan(plan._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvestmentPlanList; 