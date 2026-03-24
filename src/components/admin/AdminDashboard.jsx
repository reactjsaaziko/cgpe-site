import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API Base URL with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import InvestmentPlanForm from './InvestmentPlanForm';
import InvestmentPlanList from './InvestmentPlanList';
import TermInsurancePolicyForm from './TermInsurancePolicyForm';
import TermInsuranceBulkUpload from './TermInsuranceBulkUpload';
import TermInsurancePolicyList from './TermInsurancePolicyList';
import HealthInsuranceForm from './HealthInsuranceForm';
import HealthInsuranceBulkUpload from './HealthInsuranceBulkUpload';
import HealthInsuranceList from './HealthInsuranceList';
import FamilyHealthInsuranceForm from './FamilyHealthInsuranceForm';
import FamilyHealthInsuranceList from './FamilyHealthInsuranceList';
import FamilyHealthInsuranceBulkUpload from './FamilyHealthInsuranceBulkUpload';
import TravelInsuranceForm from './TravelInsuranceForm';
import TravelInsuranceList from './TravelInsuranceList';
import TravelInsuranceBulkUpload from './TravelInsuranceBulkUpload';
import CarInsuranceForm from './CarInsuranceForm';
import CarInsuranceList from './CarInsuranceList';
import CarInsuranceBulkUpload from './CarInsuranceBulkUpload';
import BikeInsuranceForm from './BikeInsuranceForm';
import BikeInsuranceList from './BikeInsuranceList';
import BikeInsuranceBulkUpload from './BikeInsuranceBulkUpload';
import TermInsuranceSidebar from './TermInsuranceSidebar';
import FreeOfCostInsuranceForm from './FreeOfCostInsuranceForm';
import FreeOfCostInsuranceList from './FreeOfCostInsuranceList';
import FreeOfCostInsuranceBulkUpload from './FreeOfCostInsuranceBulkUpload';
import GuaranteedReturnsForm from './GuaranteedReturnsForm';
import GuaranteedReturnsList from './GuaranteedReturnsList';
import ChildSavingInsuranceForm from './ChildSavingInsuranceForm';
import ChildSavingInsuranceList from './ChildSavingInsuranceList';
import ChildSavingInsuranceBulkUpload from './ChildSavingInsuranceBulkUpload';
import RetirementInsuranceForm from './RetirementInsuranceForm';
import RetirementInsuranceList from './RetirementInsuranceList';
import RetirementInsuranceBulkUpload from './RetirementInsuranceBulkUpload';
import AdminGHIForm from './AdminGHIForm';
import AdminGHPlanList from './AdminGHPlanList';
import GroupHealthInsuranceBulkUpload from './GroupHealthInsuranceBulkUpload';
import InquiryList from './InquiryList';
import InquiryStats from './InquiryStats';
import TataAIAInquiryList from './TataAIAInquiryList';
import ContactUsList from './ContactUsList';


import ClaimAssistanceList from './ClaimAssistanceList';
import CallList from './CallList';
import GuaranteedReturnsBulkUpload from './GuaranteedReturnsBulkUpload';
import TataAIAProducts from './TataAIAProducts';
import ResumeList from './ResumeList';
import AdminUserManager from './AdminUserManager';


const AdminDashboard = () => {
    const [adminData, setAdminData] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [activeInsuranceType, setActiveInsuranceType] = useState('term-insurance');
    const [showPlanForm, setShowPlanForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [showPolicyForm, setShowPolicyForm] = useState(false);
    const [editingPolicy, setEditingPolicy] = useState(null);
    const [showTermBulkUpload, setShowTermBulkUpload] = useState(false);
    const [showHealthBulkUpload, setShowHealthBulkUpload] = useState(false);
    const [showFamilyHealthBulkUpload, setShowFamilyHealthBulkUpload] = useState(false);
    const [showTravelBulkUpload, setShowTravelBulkUpload] = useState(false);
    const [showCarBulkUpload, setShowCarBulkUpload] = useState(false);
    const [showBikeBulkUpload, setShowBikeBulkUpload] = useState(false);
    const [showFreeOfCostBulkUpload, setShowFreeOfCostBulkUpload] = useState(false);
    const [showGroupHealthBulkUpload, setShowGroupHealthBulkUpload] = useState(false);
    const [showChildSavingBulkUpload, setShowChildSavingBulkUpload] = useState(false);
    const [showRetirementBulkUpload, setShowRetirementBulkUpload] = useState(false);
    const [showGuaranteedReturnsBulkUpload, setShowGuaranteedReturnsBulkUpload] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showHealthInsuranceForm, setShowHealthInsuranceForm] = useState(false);
    const [editingHealthPolicy, setEditingHealthPolicy] = useState(null);
    const [showFamilyHealthInsuranceForm, setShowFamilyHealthInsuranceForm] = useState(false);
    const [editingFamilyHealthPolicy, setEditingFamilyHealthPolicy] = useState(null);
    const [showTravelInsuranceForm, setShowTravelInsuranceForm] = useState(false);
    const [editingTravelPolicy, setEditingTravelPolicy] = useState(null);
    const [showCarInsuranceForm, setShowCarInsuranceForm] = useState(false);
    const [editingCarPolicy, setEditingCarPolicy] = useState(null);
    const [carInsuranceRefreshTrigger, setCarInsuranceRefreshTrigger] = useState(0);
    const [showBikeInsuranceForm, setShowBikeInsuranceForm] = useState(false);
    const [editingBikePolicy, setEditingBikePolicy] = useState(null);
    const [showFreeOfCostInsuranceForm, setShowFreeOfCostInsuranceForm] = useState(false);
    const [editingFreeOfCostPolicy, setEditingFreeOfCostPolicy] = useState(null);
    const [showGuaranteedReturnsForm, setShowGuaranteedReturnsForm] = useState(false);
    const [editingGuaranteedReturnsPolicy, setEditingGuaranteedReturnsPolicy] = useState(null);
    const [showChildSavingInsuranceForm, setShowChildSavingInsuranceForm] = useState(false);
    const [editingChildSavingInsurancePolicy, setEditingChildSavingInsurancePolicy] = useState(null);
    const [showRetirementInsuranceForm, setShowRetirementInsuranceForm] = useState(false);
    const [editingRetirementInsurancePolicy, setEditingRetirementInsurancePolicy] = useState(null);
    const [showGHIForm, setShowGHIForm] = useState(false);
    const [editingGHIPlan, setEditingGHIPlan] = useState(null);
    const [bikeInsuranceRefreshTrigger, setBikeInsuranceRefreshTrigger] = useState(0);
    const [termInsuranceRefreshTrigger, setTermInsuranceRefreshTrigger] = useState(0);
    const [freeOfCostInsuranceRefreshTrigger, setFreeOfCostInsuranceRefreshTrigger] = useState(0);
    const [guaranteedReturnsRefreshTrigger, setGuaranteedReturnsRefreshTrigger] = useState(0);
    const [healthInsuranceRefreshTrigger, setHealthInsuranceRefreshTrigger] = useState(0);
    const [familyHealthInsuranceRefreshTrigger, setFamilyHealthInsuranceRefreshTrigger] = useState(0);
    const [travelInsuranceRefreshTrigger, setTravelInsuranceRefreshTrigger] = useState(0);
    const [childSavingInsuranceRefreshTrigger, setChildSavingInsuranceRefreshTrigger] = useState(0);
    const [retirementInsuranceRefreshTrigger, setRetirementInsuranceRefreshTrigger] = useState(0);
    const [ghiRefreshTrigger, setGhiRefreshTrigger] = useState(0);
    const [investmentPlanRefreshTrigger, setInvestmentPlanRefreshTrigger] = useState(0);
    const [activeInquiryTab, setActiveInquiryTab] = useState('list');
    const [activeTataAIAInquiryTab, setActiveTataAIAInquiryTab] = useState('list');
    const [dashboardStats, setDashboardStats] = useState({ 
        totalPlans: 0, 
        activePlans: 0, 
        totalInvestmentPlans: 0,
        activeInvestmentPlans: 0,
        totalInsurancePlans: 0,
        activeInsurancePlans: 0,
        totalInquiries: 0, 

        totalTataAIAProducts: 0, 
        activeTataAIAProducts: 0,
        insuranceTypeStats: {}
    });
    const [showTataAIAProducts, setShowTataAIAProducts] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    const insuranceTypes = [
        { id: 'term-insurance', name: 'Term Insurance', icon: '🛡️' },
        { id: 'health-insurance', name: 'Health Insurance', icon: '🏥' },
        { id: 'family-health-insurance', name: 'Family Health Insurance', icon: '👨‍👩‍👧‍👦' },
        { id: 'travel-insurance', name: 'Travel Insurance', icon: '✈️' },
        { id: 'motor-insurance', name: 'Car Insurance', icon: '🚗' },
        { id: 'bike-insurance', name: 'Bike Insurance', icon: '🏍️' },
        { id: 'term-women-insurance', name: 'Term Women Insurance', icon: '👩' },
        { id: 'free-of-cost-insurance', name: 'Free of Cost Insurance', icon: '🎁' },
        { id: 'guaranteed-returns', name: 'Guaranteed Returns', icon: '💰' },
        { id: 'child-saving-insurance', name: 'Child Saving Insurance', icon: '👶' },
        { id: 'retirement-insurance', name: 'Retirement Insurance', icon: '🏖️' },
        { id: 'group-health-insurance', name: 'Group Health Insurance', icon: '🏢' }
    ];

    const navigationItems = [
        { id: 'dashboard', name: 'Dashboard', icon: '📊', path: 'dashboard' },
        { id: 'plans', name: 'Investment Plans', icon: '📈', path: 'plans' },
        { id: 'insurance', name: 'Insurance', icon: '🛡️', path: 'insurance' },
        { id: 'inquiries', name: 'Inquiries', icon: '💬', path: 'inquiries' },
        { id: 'claim-assistance', name: 'Claim Assistance', icon: '📋', path: 'claim-assistance' },
        { id: 'call-us', name: 'Call Us', icon: '📞', path: 'call-us' },
        { id: 'resumes', name: 'Resumes', icon: '📄', path: 'resumes' },

        { id: 'tata-aia', name: 'Tata AIA Products', icon: '��', path: 'tata-aia' },
        { id: 'contact-us', name: 'Contact Us', icon: '📧', path: 'contact-us' }
    ];

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const admin = JSON.parse(localStorage.getItem('adminData') || '{}');

        if (!token || !admin.id) {
            navigate('/admin/login');
            return;
        }

        setAdminData(admin);
    }, [navigate]);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) return;
                const response = await axios.get(`${API_BASE_URL}/api/admin/dashboard/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data?.success) {
                    setDashboardStats(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            }
        };

        fetchDashboardStats();
    }, []);

    useEffect(() => {
        console.log('showCarInsuranceForm changed to:', showCarInsuranceForm);
    }, [showCarInsuranceForm]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin/login');
    };

    const handleCreatePlan = () => {
        setEditingPlan(null);
        setShowPlanForm(true);
    };

    const handleEditPlan = (plan) => {
        setEditingPlan(plan);
        setShowPlanForm(true);
    };

    const handleCloseForm = () => {
        setShowPlanForm(false);
        setEditingPlan(null);
    };

    const handlePlanSaved = () => {
        setShowPlanForm(false);
        setEditingPlan(null);
        // Refresh the plan list by triggering a re-render
        setInvestmentPlanRefreshTrigger(prev => prev + 1);
    };

    const handleCreatePolicy = () => {
        setEditingPolicy(null);
        setShowPolicyForm(true);
    };

    const handleEditPolicy = (policy) => {
        setEditingPolicy(policy);
        setShowPolicyForm(true);
    };

    const handleClosePolicyForm = () => {
        setShowPolicyForm(false);
        setEditingPolicy(null);
    };

    const handlePolicySaved = () => {
        setShowPolicyForm(false);
        setEditingPolicy(null);
        // Refresh the policy list by triggering a re-render
        setTermInsuranceRefreshTrigger(prev => prev + 1);
    };

    const handlePolicySelect = (policy) => {
        setSelectedPolicy(policy);
        setShowSidebar(false);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleCreateHealthPolicy = () => {
        setEditingHealthPolicy(null);
        setShowHealthInsuranceForm(true);
    };

    const handleEditHealthPolicy = (policy) => {
        setEditingHealthPolicy(policy);
        setShowHealthInsuranceForm(true);
    };

    const handleCloseHealthInsuranceForm = () => {
        setShowHealthInsuranceForm(false);
        setEditingHealthPolicy(null);
    };

    const handleHealthPolicySaved = () => {
        setShowHealthInsuranceForm(false);
        setEditingHealthPolicy(null);
        // Refresh the policy list by triggering a re-render
        setHealthInsuranceRefreshTrigger(prev => prev + 1);
    };

    const handleCreateFamilyHealthPolicy = () => {
        setEditingFamilyHealthPolicy(null);
        setShowFamilyHealthInsuranceForm(true);
    };

    const handleEditFamilyHealthPolicy = (policy) => {
        setEditingFamilyHealthPolicy(policy);
        setShowFamilyHealthInsuranceForm(true);
    };

    const handleCloseFamilyHealthInsuranceForm = () => {
        setShowFamilyHealthInsuranceForm(false);
        setEditingFamilyHealthPolicy(null);
    };

    const handleFamilyHealthPolicySaved = () => {
        setShowFamilyHealthInsuranceForm(false);
        setEditingFamilyHealthPolicy(null);
        // Refresh the policy list by triggering a re-render
        setFamilyHealthInsuranceRefreshTrigger(prev => prev + 1);
    };

    const handleCreateTravelPolicy = () => {
        setEditingTravelPolicy(null);
        setShowTravelInsuranceForm(true);
    };

    const handleEditTravelPolicy = (policy) => {
        setEditingTravelPolicy(policy);
        setShowTravelInsuranceForm(true);
    };

    const handleCloseTravelInsuranceForm = () => {
        setShowTravelInsuranceForm(false);
        setEditingTravelPolicy(null);
    };

    const handleTravelPolicySaved = () => {
        setShowTravelInsuranceForm(false);
        setEditingTravelPolicy(null);
        // Refresh the policy list by triggering a re-render
        setTravelInsuranceRefreshTrigger(prev => prev + 1);
    };

    const handleCreateCarPolicy = () => {
        setEditingCarPolicy(null);
        setShowCarInsuranceForm(true);
    };

    const handleEditCarPolicy = (policy) => {
        setEditingCarPolicy(policy);
        setShowCarInsuranceForm(true);
    };

    const handleCloseCarInsuranceForm = () => {
        console.log('handleCloseCarInsuranceForm called');
        setShowCarInsuranceForm(false);
        setEditingCarPolicy(null);
    };

    const handleCarPolicySaved = () => {
        console.log('handleCarPolicySaved called');
        setShowCarInsuranceForm(false);
        setEditingCarPolicy(null);
        // Refresh the policy list by triggering a re-render
        setCarInsuranceRefreshTrigger(prev => {
            console.log('Updating carInsuranceRefreshTrigger from', prev, 'to', prev + 1);
            return prev + 1;
        });
    };

    const handleCreateBikePolicy = () => {
        setEditingBikePolicy(null);
        setShowBikeInsuranceForm(true);
    };

    const handleEditBikePolicy = (policy) => {
        setEditingBikePolicy(policy);
        setShowBikeInsuranceForm(true);
    };

    const handleCloseBikeInsuranceForm = () => {
        setShowBikeInsuranceForm(false);
        setEditingBikePolicy(null);
    };

    const handleBikePolicySaved = () => {
        setShowBikeInsuranceForm(false);
        setEditingBikePolicy(null);
        // Refresh the policy list by triggering a re-render
        setBikeInsuranceRefreshTrigger(prev => prev + 1);
    };

    const handleCreateFreeOfCostPolicy = () => {
        setEditingFreeOfCostPolicy(null);
        setShowFreeOfCostInsuranceForm(true);
    };

    const handleEditFreeOfCostPolicy = (policy) => {
        setEditingFreeOfCostPolicy(policy);
        setShowFreeOfCostInsuranceForm(true);
    };

    const handleCloseFreeOfCostInsuranceForm = () => {
        setShowFreeOfCostInsuranceForm(false);
        setEditingFreeOfCostPolicy(null);
    };

    const handleFreeOfCostPolicySaved = () => {
        setShowFreeOfCostInsuranceForm(false);
        setEditingFreeOfCostPolicy(null);
        // Refresh the policy list by triggering a re-render
        setFreeOfCostInsuranceRefreshTrigger(prev => prev + 1);
    };

    const handleCreateGuaranteedReturnsPolicy = () => {
        setEditingGuaranteedReturnsPolicy(null);
        setShowGuaranteedReturnsForm(true);
    };

    const handleEditGuaranteedReturnsPolicy = (policy) => {
        setEditingGuaranteedReturnsPolicy(policy);
        setShowGuaranteedReturnsForm(true);
    };

    const handleCloseGuaranteedReturnsForm = () => {
        setShowGuaranteedReturnsForm(false);
        setEditingGuaranteedReturnsPolicy(null);
    };

    const handleGuaranteedReturnsPolicySaved = () => {
        setShowGuaranteedReturnsForm(false);
        setEditingGuaranteedReturnsPolicy(null);
        // Refresh the policy list by triggering a re-render
        setGuaranteedReturnsRefreshTrigger(prev => prev + 1);
    };

    const handleCreateChildSavingInsurancePolicy = () => {
        setEditingChildSavingInsurancePolicy(null);
        setShowChildSavingInsuranceForm(true);
    };

    const handleEditChildSavingInsurancePolicy = (policy) => {
        setEditingChildSavingInsurancePolicy(policy);
        setShowChildSavingInsuranceForm(true);
    };

    const handleCloseChildSavingInsuranceForm = () => {
        setShowChildSavingInsuranceForm(false);
        setEditingChildSavingInsurancePolicy(null);
    };

    const handleChildSavingInsurancePolicySaved = () => {
        setShowChildSavingInsuranceForm(false);
        setEditingChildSavingInsurancePolicy(null);
        // Refresh the policy list by triggering a re-render
        setChildSavingInsuranceRefreshTrigger(prev => prev + 1);
    };

    const handleCreateRetirementInsurancePolicy = () => {
        setEditingRetirementInsurancePolicy(null);
        setShowRetirementInsuranceForm(true);
    };

    const handleEditRetirementInsurancePolicy = (policy) => {
        setEditingRetirementInsurancePolicy(policy);
        setShowRetirementInsuranceForm(true);
    };

    const handleCloseRetirementInsuranceForm = () => {
        setShowRetirementInsuranceForm(false);
        setEditingRetirementInsurancePolicy(null);
    };

    const handleRetirementInsurancePolicySaved = () => {
        setShowRetirementInsuranceForm(false);
        setEditingRetirementInsurancePolicy(null);
        // Refresh the policy list by triggering a re-render
        setRetirementInsuranceRefreshTrigger(prev => prev + 1);
    };

    const handleCreateGHIPlan = () => {
        setEditingGHIPlan(null);
        setShowGHIForm(true);
    };

    const handleEditGHIPlan = (plan) => {
        setEditingGHIPlan(plan);
        setShowGHIForm(true);
    };

    const handleCloseGHIForm = () => {
        setShowGHIForm(false);
        setEditingGHIPlan(null);
        // Refresh the plan list by triggering a re-render
        setGhiRefreshTrigger(prev => prev + 1);
    };

    if (!adminData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-[1900px] mx-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
            {/* Sidebar */}
            <div className={`bg-white/90 backdrop-blur-md shadow-xl border-r border-white/20 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        {!sidebarCollapsed && (
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-lg flex items-center justify-center mr-3 shadow-md">
                                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        CGPE Admin
                                    </h1>
                                    <p className="text-xs text-gray-500">Management Panel</p>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="p-4 space-y-2">
                    {navigationItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.path)}
                            className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.path
                                ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700 shadow-md'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span className="text-xl mr-3">{item.icon}</span>
                            {!sidebarCollapsed && (
                                <span className="font-medium">{item.name}</span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Profile Section */}
                {!sidebarCollapsed && (
                    <div className="fixed bottom-0 left-0 right-0 z-10 p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center text-black bg-gray-200 font-bold text-sm mr-3">
                                {adminData.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{adminData.name}</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {navigationItems.find(item => item.path === activeTab)?.name || 'Dashboard'}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                                <p className="text-xs text-gray-500">{adminData.name}</p>
                            </div>
                            <div className="h-10 w-10 rounded-full flex items-center justify-center text-black bg-gray-200 font-bold text-sm">
                                {adminData.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-3 flex items-center gap-2 shadow-md text-black hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Logout"

                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-auto p-6">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6">
                            {/* Welcome Banner */}
                            <div className="text-black shadow-2xl rounded-2xl p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">Welcome back, {adminData.name}!</h2>
                                        <p className="text-lg">Ready to manage your investment and insurance platform today?</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> */}
                                {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-blue-500 bg-opacity-10 rounded-xl">
                                            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Total Plans</p>
                                            <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalPlans}</p>
                                        </div>
                                    </div>
                                </div> */}
{/* 
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-green-500 bg-opacity-10 rounded-xl">
                                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Total Insurance Plans</p>
                                            <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalInsurancePlans}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-purple-500 bg-opacity-10 rounded-xl">
                                            <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Active Insurance Plans</p>
                                            <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeInsurancePlans}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-orange-500 bg-opacity-10 rounded-xl">
                                            <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Insurance Types</p>
                                            <p className="text-2xl font-bold text-gray-900">{insuranceTypes.length}</p>
                                        </div>
                                    </div>
                                </div>



                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-yellow-500 bg-opacity-10 rounded-xl">
                                            <svg className="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Customer Inquiries</p>
                                            <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalInquiries}</p>
                                        </div>
                                    </div>
                                </div> */}
                            {/* </div> */}

                            {/* Insurance Plans Overview */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                                <div className="flex items-center mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Insurance Plans Overview</h3>
                                        <p className="text-gray-600">Individual insurance type statistics and breakdown</p>
                                    </div>
                                </div>
                                
                                {/* Overall Insurance Statistics */}
                                <div className="p-6 rounded-xl border border-blue-200 mb-6">
                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-blue-500 rounded-lg">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h4 className="text-lg font-semibold text-gray-900">Overall Insurance Statistics</h4>
                                            <p className="text-sm text-gray-600">Total insurance plans across all types</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-gray-900">{dashboardStats.totalInsurancePlans}</div>
                                            <div className="text-sm text-gray-600">Total Insurance Plans</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">{dashboardStats.activeInsurancePlans}</div>
                                            <div className="text-sm text-gray-600">Active Insurance Plans</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">{dashboardStats.inactiveInsurancePlans}</div>
                                            <div className="text-sm text-gray-600">Inactive Insurance Plans</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Individual Insurance Type Statistics */}
                                <div className="p-6 rounded-xl border border-green-200">
                                    <div className="flex items-center mb-6">
                                        <div className="p-3 bg-green-500 rounded-lg">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h4 className="text-lg font-semibold text-gray-900">Insurance Type Breakdown</h4>
                                            <p className="text-sm text-gray-600">Detailed statistics for each insurance type</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {Object.entries(dashboardStats.insuranceTypeStats || {}).map(([type, stats]) => {
                                            const typeNames = {
                                                termInsurance: 'Term Insurance',
                                                healthInsurance: 'Health Insurance',
                                                familyHealthInsurance: 'Family Health Insurance',
                                                travelInsurance: 'Travel Insurance',
                                                carInsurance: 'Car Insurance',
                                                bikeInsurance: 'Bike Insurance',
                                                freeOfCostInsurance: 'Free of Cost Insurance',
                                                guaranteedReturns: 'Guaranteed Returns',
                                                childSavingInsurance: 'Child Saving Insurance',
                                                retirementInsurance: 'Retirement Insurance',
                                                groupHealthInsurance: 'Group Health Insurance'
                                            };
                                            const typeIcons = {
                                                termInsurance: '🛡️',
                                                healthInsurance: '🏥',
                                                familyHealthInsurance: '👨‍👩‍👧‍👦',
                                                travelInsurance: '✈️',
                                                carInsurance: '🚗',
                                                bikeInsurance: '🏍️',
                                                freeOfCostInsurance: '🎁',
                                                guaranteedReturns: '💰',
                                                childSavingInsurance: '👶',
                                                retirementInsurance: '🏖️',
                                                groupHealthInsurance: '🏢'
                                            };
                                            
                                            return (
                                                <div key={type} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                                    <div className="flex items-center mb-3">
                                                        <span className="text-2xl mr-2">{typeIcons[type]}</span>
                                                        <h5 className="font-semibold text-gray-900 text-sm">{typeNames[type]}</h5>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs text-gray-600">Total:</span>
                                                            <span className="font-semibold text-gray-900">{stats.total}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs text-gray-600">Active:</span>
                                                            <span className="font-semibold text-green-600">{stats.active}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs text-gray-600">Inactive:</span>
                                                            <span className="font-semibold text-red-600">{stats.inactive}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Investment Plans Overview */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                                <div className="flex items-center mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Investment Plans Overview</h3>
                                        <p className="text-gray-600">Manage and monitor all investment plans</p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-green-500 rounded-lg">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h4 className="text-lg font-semibold text-gray-900">Investment Plans Statistics</h4>
                                            <p className="text-sm text-gray-600">Investment and wealth management plans</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">{dashboardStats.totalInvestmentPlans}</div>
                                            <div className="text-sm text-gray-600">Total Investment Plans</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">{dashboardStats.activeInvestmentPlans}</div>
                                            <div className="text-sm text-gray-600">Active Investment Plans</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">{dashboardStats.inactiveInvestmentPlans}</div>
                                            <div className="text-sm text-gray-600">Inactive Investment Plans</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tata AIA Products Overview */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                                <div className="flex items-center mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Tata AIA Products Overview</h3>
                                        <p className="text-gray-600">Manage and monitor Tata AIA insurance products</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-xl border border-purple-200">
                                    <div className="flex items-center mb-4">
                                        <div className="p-3 bg-purple-500 rounded-lg">
                                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h4 className="text-lg font-semibold text-gray-900">Tata AIA Products Statistics</h4>
                                            <p className="text-sm text-gray-600">Tata AIA insurance product portfolio</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600">{dashboardStats.totalTataAIAProducts}</div>
                                            <div className="text-sm text-gray-600">Total Tata AIA Products</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-green-600">{dashboardStats.activeTataAIAProducts}</div>
                                            <div className="text-sm text-gray-600">Active Tata AIA Products</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-lg">
                                            <div className="text-2xl font-bold text-red-600">{dashboardStats.inactiveTataAIAProducts}</div>
                                            <div className="text-sm text-gray-600">Inactive Tata AIA Products</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <button
                                        onClick={() => setActiveTab('plans')}
                                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
                                    >
                                        <svg className="h-8 w-8 mb-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <h4 className="font-semibold mb-1 text-gray-900">View All Plans</h4>
                                        <p className="text-sm text-gray-600">Manage existing investment plans</p>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('insurance')}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <svg className="h-8 w-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <h4 className="font-semibold mb-1">Manage Insurance</h4>
                                        <p className="text-sm text-green-100">Manage insurance products</p>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('inquiries')}
                                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
                                    >
                                        <svg className="h-8 w-8 mb-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        <h4 className="font-semibold mb-1 text-gray-900">Manage Inquiries</h4>
                                        <p className="text-sm text-gray-600">View and respond to customer inquiries</p>
                                    </button>

                                    <button
                                        onClick={() => setActiveTab('tata-aia')}
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <svg className="h-8 w-8 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <h4 className="font-semibold mb-1">Tata AIA Products</h4>
                                        <p className="text-sm">Manage Tata AIA insurance products</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'plans' && (
                        <div className="space-y-6">
                            {/* Plans Header */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            Investment Plans
                                        </h2>
                                        <p className="text-gray-600 mt-1">Manage and monitor all investment plans</p>
                                    </div>
                                    <button
                                        onClick={handleCreatePlan}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add New Plan
                                    </button>
                                </div>
                            </div>

                            {/* Plans List */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                                <InvestmentPlanList onEditPlan={handleEditPlan} refreshTrigger={investmentPlanRefreshTrigger} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'insurance' && (
                        <div className="space-y-6">
                            {/* Insurance Header */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            Insurance Management
                                        </h2>
                                        <p className="text-gray-600 mt-1">Manage and monitor all insurance products</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        {(activeInsuranceType === 'term-insurance' || activeInsuranceType === 'term-women-insurance') && (
                                            <>
                                                <button
                                                    onClick={handleCreatePolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    {activeInsuranceType === 'term-women-insurance' ? 'Add Term Women Insurance Form' : 'Add Term Insurance Form'}
                                                </button>
                                                <button
                                                    onClick={() => setShowTermBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border border-gray-300"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l4-4m0 0l4 4m-4-4v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </>
                                        )}
                                        {activeInsuranceType === 'health-insurance' && (
                                            <>
                                                <button
                                                    onClick={handleCreateHealthPolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Health Insurance Form
                                                </button>
                                                <button
                                                    onClick={() => setShowHealthBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border border-gray-300"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Uploadf
                                                </button>
                                            </>
                                        )}
                                        {activeInsuranceType === 'family-health-insurance' && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCreateFamilyHealthPolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Family Health Insurance Form
                                                </button>
                                                <button
                                                    onClick={() => setShowFamilyHealthBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </div>
                                        )}
                                        {activeInsuranceType === 'travel-insurance' && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCreateTravelPolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Travel Insurance Form
                                                </button>
                                                <button
                                                    onClick={() => setShowTravelBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </div>
                                        )}
                                        {activeInsuranceType === 'motor-insurance' && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCreateCarPolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Car Insurance Form
                                                </button>
                                                <button
                                                    onClick={() => setShowCarBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </div>
                                        )}
                                        {activeInsuranceType === 'bike-insurance' && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCreateBikePolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Bike Insurance Form
                                                </button>
                                                <button
                                                    onClick={() => setShowBikeBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </div>
                                        )}
                                        {activeInsuranceType === 'free-of-cost-insurance' && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCreateFreeOfCostPolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Free of Cost Insurance Form
                                                </button>
                                                <button
                                                    onClick={() => setShowFreeOfCostBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 border border-gray-300"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </div>
                                        )}
                                        {activeInsuranceType === 'guaranteed-returns' && (
                                            <>
                                                <button
                                                    onClick={handleCreateGuaranteedReturnsPolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Guaranteed Returns Form
                                                </button>
                                                <button
                                                    onClick={() => setShowGuaranteedReturnsBulkUpload(true)}
                                                    className="text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l4-4m0 0l4 4m-4-4v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </>
                                        )}
                                        {activeInsuranceType === 'child-saving-insurance' && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCreateChildSavingInsurancePolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Child Saving Insurance Form
                                                </button>
                                                <button
                                                    onClick={() => setShowChildSavingBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </div>
                                        )}
                                        {activeInsuranceType === 'retirement-insurance' && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCreateRetirementInsurancePolicy}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Retirement Insurance Form
                                                </button>
                                                <button
                                                    onClick={() => setShowRetirementBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </div>
                                        )}
                                        {activeInsuranceType === 'group-health-insurance' && (
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleCreateGHIPlan}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Add Group Health Insurance Plan
                                                </button>
                                                <button
                                                    onClick={() => setShowGroupHealthBulkUpload(true)}
                                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    Bulk Upload
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Insurance Type Navigation */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Insurance Types</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {insuranceTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setActiveInsuranceType(type.id)}
                                            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${activeInsuranceType === type.id
                                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                                }`}
                                        >
                                            <div className="text-2xl mb-2">{type.icon}</div>
                                            <div className="text-sm font-medium text-gray-900">{type.name}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Insurance Management Content */}
                            <div className="flex h-[calc(100vh-300px)]">
                                {/* Sidebar */}
                                {showSidebar && activeInsuranceType === 'term-insurance' && (
                                    <TermInsuranceSidebar
                                        onPolicySelect={handlePolicySelect}
                                        selectedPolicyId={selectedPolicy?._id}
                                    />
                                )}

                                {/* Main Content */}
                                <div className={`flex-1 ${showSidebar && activeInsuranceType === 'term-insurance' ? 'ml-4' : ''}`}>
                                    {activeInsuranceType === 'term-insurance' || activeInsuranceType === 'term-women-insurance' ? (
                                        <div className="h-full">
                                            <TermInsurancePolicyList
                                                onEditPolicy={handleEditPolicy}
                                                onViewPolicy={setSelectedPolicy}
                                                refreshTrigger={termInsuranceRefreshTrigger}
                                                fixedPolicyType={activeInsuranceType === 'term-women-insurance' ? 'term-women' : ''}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'health-insurance' ? (
                                        <div className="h-full">
                                            <HealthInsuranceList
                                                onEditPolicy={handleEditHealthPolicy}
                                                onViewPolicy={(policy) => console.log('View health policy:', policy)}
                                                refreshTrigger={healthInsuranceRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'family-health-insurance' ? (
                                        <div className="h-full">
                                            <FamilyHealthInsuranceList
                                                onEditPolicy={handleEditFamilyHealthPolicy}
                                                onViewPolicy={(policy) => console.log('View family health policy:', policy)}
                                                refreshTrigger={familyHealthInsuranceRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'travel-insurance' ? (
                                        <div className="h-full">
                                            <TravelInsuranceList
                                                onEdit={handleEditTravelPolicy}
                                                onDelete={(policyId) => console.log('Delete travel policy:', policyId)}
                                                onViewPolicy={(policy) => console.log('View travel policy:', policy)}
                                                refreshTrigger={travelInsuranceRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'motor-insurance' ? (
                                        <div className="h-full">
                                            <CarInsuranceList
                                                onEditPolicy={handleEditCarPolicy}
                                                onViewPolicy={(policy) => console.log('View car policy:', policy)}
                                                refreshTrigger={carInsuranceRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'bike-insurance' ? (
                                        <div className="h-full">
                                            <BikeInsuranceList
                                                onEditPolicy={handleEditBikePolicy}
                                                onViewPolicy={(policy) => console.log('View bike policy:', policy)}
                                                refreshTrigger={bikeInsuranceRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'free-of-cost-insurance' ? (
                                        <div className="h-full">
                                            <FreeOfCostInsuranceList
                                                onEditPolicy={handleEditFreeOfCostPolicy}
                                                onViewPolicy={(policy) => console.log('View free of cost policy:', policy)}
                                                refreshTrigger={freeOfCostInsuranceRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'guaranteed-returns' ? (
                                        <div className="h-full">
                                            <GuaranteedReturnsList
                                                onEditPlan={handleEditGuaranteedReturnsPolicy}
                                                refreshTrigger={guaranteedReturnsRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'child-saving-insurance' ? (
                                        <div className="h-full">
                                            <ChildSavingInsuranceList
                                                onEditPolicy={handleEditChildSavingInsurancePolicy}
                                                onViewPolicy={(policy) => console.log('View child saving insurance policy:', policy)}
                                                refreshTrigger={childSavingInsuranceRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'retirement-insurance' ? (
                                        <div className="h-full">
                                            <RetirementInsuranceList
                                                onEditPolicy={handleEditRetirementInsurancePolicy}
                                                onViewPolicy={(policy) => console.log('View retirement insurance policy:', policy)}
                                                refreshTrigger={retirementInsuranceRefreshTrigger}
                                            />
                                        </div>
                                    ) : activeInsuranceType === 'group-health-insurance' ? (
                                        <div className="h-full">
                                            <AdminGHPlanList
                                                onEditPlan={handleEditGHIPlan}
                                                refreshTrigger={ghiRefreshTrigger}
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full">
                                            <div className="text-center py-12">
                                                <div className="text-6xl mb-4">
                                                    {insuranceTypes.find(t => t.id === activeInsuranceType)?.icon}
                                                </div>
                                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                                    {insuranceTypes.find(t => t.id === activeInsuranceType)?.name}
                                                </h4>
                                                <p className="text-gray-600 mb-6">
                                                    Management for {insuranceTypes.find(t => t.id === activeInsuranceType)?.name.toLowerCase()} is coming soon.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <h5 className="font-semibold text-gray-900 mb-2">Policy Management</h5>
                                                        <p className="text-sm text-gray-600">Create, edit, and manage insurance policies</p>
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <h5 className="font-semibold text-gray-900 mb-2">Claims Processing</h5>
                                                        <p className="text-sm text-gray-600">Handle customer claims and settlements</p>
                                                    </div>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <h5 className="font-semibold text-gray-900 mb-2">Customer Data</h5>
                                                        <p className="text-sm text-gray-600">Manage customer information and documents</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inquiries' && (
                        <div className="space-y-6">
                            {/* Inquiry Header */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            Customer Inquiries
                                        </h2>
                                        <p className="text-gray-600 mt-1">Manage and respond to customer inquiries</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setActiveInquiryTab('list')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeInquiryTab === 'list'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            All Inquiries
                                        </button>

                                        <button
                                            onClick={() => setActiveInquiryTab('tata-aia')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeInquiryTab === 'tata-aia'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            TataAIA Inquiries
                                        </button>
                                        <button
                                            onClick={() => setActiveInquiryTab('stats')}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeInquiryTab === 'stats'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            Statistics
                                        </button>

                                    </div>
                                </div>
                            </div>

                            {/* Inquiry Content */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                                {activeInquiryTab === 'list' ? (
                                    <InquiryList />
                                ) : activeInquiryTab === 'tata-aia' ? (
                                    <TataAIAInquiryList />
                                ) : (
                                    <InquiryStats />
                                )}
                            </div>
                        </div>
                    )}



                    {activeTab === 'claim-assistance' && (
                        <div className="space-y-6">
                            {/* Claim Assistance Header */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            Claim Assistance Management
                                        </h2>
                                        <p className="text-gray-600 mt-1">Manage and process claim assistance requests from customers</p>
                                    </div>
                                </div>
                            </div>

                            {/* Claim Assistance Content */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                                <ClaimAssistanceList />
                            </div>
                        </div>
                    )}

                    {activeTab === 'call-us' && (
                        <div className="space-y-6">
                            {/* Call Us Header */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            Call Us Management
                                        </h2>
                                        <p className="text-gray-600 mt-1">Manage and process call assistance requests from customers</p>
                                    </div>
                                </div>
                            </div>

                            {/* Call Us Content */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                                <CallList />
                            </div>
                        </div>
                    )}

                    {activeTab === 'resumes' && (
                        <div className="space-y-6">
                            {/* Resumes Header */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            Resume Management
                                        </h2>
                                        <p className="text-gray-600 mt-1">Manage and review resume submissions from job applicants</p>
                                    </div>
                                </div>
                            </div>

                            {/* Resumes Content */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                                <ResumeList />
                            </div>
                        </div>
                    )}

                    {activeTab === 'tata-aia' && (
                        <div className="space-y-6">
                            <TataAIAProducts />
                        </div>
                    )}

                    {activeTab === 'contact-us' && (
                        <div className="space-y-6">
                            {/* Contact Us Header */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                            Contact Us Messages
                                        </h2>
                                        <p className="text-gray-600 mt-1">Manage and respond to contact us form submissions from customers</p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Us Content */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                                <ContactUsList />
                            </div>
                        </div>
                    )}


                </main>
            </div>

            {/* Plan Form Modal */}
            {showPlanForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                            <InvestmentPlanForm
                                plan={editingPlan}
                                onClose={handleCloseForm}
                                onSaved={handlePlanSaved}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Policy Form Modal */}
            {showPolicyForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingPolicy ? 'Edit Term Insurance Policy' : 'Create New Term Insurance Policy'}
                                    </h3>
                                    <p className="text-blue-100 mt-1">Configure your term insurance policy details</p>
                                </div>
                                <button
                                    onClick={handleClosePolicyForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                            <TermInsurancePolicyForm
                                policy={editingPolicy}
                                onClose={handleClosePolicyForm}
                                onSaved={handlePolicySaved}
                                defaultPolicyType={activeInsuranceType === 'term-women-insurance' ? 'term-women' : undefined}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Term Bulk Upload Modal */}
            {showTermBulkUpload && (
                <TermInsuranceBulkUpload
                    onClose={() => setShowTermBulkUpload(false)}
                    onSuccess={() => {
                        setShowTermBulkUpload(false);
                        setTermInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                    defaultPolicyType={activeInsuranceType === 'term-women-insurance' ? 'term-women' : 'term-life'}
                />
            )}

            {/* Health Insurance Bulk Upload Modal */}
            {showHealthBulkUpload && (
                <HealthInsuranceBulkUpload
                    onClose={() => setShowHealthBulkUpload(false)}
                    onSuccess={() => {
                        setShowHealthBulkUpload(false);
                        setHealthInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                    defaultPolicyType="individual"
                />
            )}

            {/* Family Health Insurance Bulk Upload Modal */}
            {showFamilyHealthBulkUpload && (
                <FamilyHealthInsuranceBulkUpload
                    onClose={() => setShowFamilyHealthBulkUpload(false)}
                    onSuccess={() => {
                        setShowFamilyHealthBulkUpload(false);
                        setFamilyHealthInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {/* Travel Insurance Bulk Upload Modal */}
            {showTravelBulkUpload && (
                <TravelInsuranceBulkUpload
                    onClose={() => setShowTravelBulkUpload(false)}
                    onSuccess={() => {
                        setShowTravelBulkUpload(false);
                        setTravelInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {/* Car Insurance Bulk Upload Modal */}
            {showCarBulkUpload && (
                <CarInsuranceBulkUpload
                    onClose={() => setShowCarBulkUpload(false)}
                    onSuccess={() => {
                        setShowCarBulkUpload(false);
                        setCarInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {/* Bike Insurance Bulk Upload Modal */}
            {showBikeBulkUpload && (
                <BikeInsuranceBulkUpload
                    onClose={() => setShowBikeBulkUpload(false)}
                    onSuccess={() => {
                        setShowBikeBulkUpload(false);
                        setBikeInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {/* Free of Cost Insurance Bulk Upload Modal */}
            {showFreeOfCostBulkUpload && (
                <FreeOfCostInsuranceBulkUpload
                    onClose={() => setShowFreeOfCostBulkUpload(false)}
                    onSuccess={() => {
                        setShowFreeOfCostBulkUpload(false);
                        setFreeOfCostInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {/* Group Health Insurance Bulk Upload Modal */}
            {showGroupHealthBulkUpload && (
                <GroupHealthInsuranceBulkUpload
                    onClose={() => setShowGroupHealthBulkUpload(false)}
                    onSuccess={() => {
                        setShowGroupHealthBulkUpload(false);
                        toast.success('Group health insurance plans uploaded successfully!');
                        setTimeout(() => {
                            setGhiRefreshTrigger(prev => prev + 1);
                        }, 500);
                    }}
                />
            )}

            {/* Child Saving Insurance Bulk Upload Modal */}
            {showChildSavingBulkUpload && (
                <ChildSavingInsuranceBulkUpload
                    onClose={() => setShowChildSavingBulkUpload(false)}
                    onSuccess={() => {
                        setShowChildSavingBulkUpload(false);
                        setChildSavingInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {/* Retirement Insurance Bulk Upload Modal */}
            {showRetirementBulkUpload && (
                <RetirementInsuranceBulkUpload
                    onClose={() => setShowRetirementBulkUpload(false)}
                    onSuccess={() => {
                        setShowRetirementBulkUpload(false);
                        setRetirementInsuranceRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {/* Guaranteed Returns Bulk Upload Modal */}
            {showGuaranteedReturnsBulkUpload && (
                <GuaranteedReturnsBulkUpload
                    onClose={() => setShowGuaranteedReturnsBulkUpload(false)}
                    onSuccess={() => {
                        setShowGuaranteedReturnsBulkUpload(false);
                        setGuaranteedReturnsRefreshTrigger(prev => prev + 1);
                    }}
                />
            )}

            {/* Health Insurance Form Modal */}
            {showHealthInsuranceForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-5xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingHealthPolicy ? 'Edit Health Insurance Policy' : 'Create New Health Insurance Policy'}
                                    </h3>
                                    <p className="text-white/90 mt-1">Configure your health insurance policy details</p>
                                </div>
                                <button
                                    onClick={handleCloseHealthInsuranceForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <HealthInsuranceForm
                                policy={editingHealthPolicy}
                                onClose={handleCloseHealthInsuranceForm}
                                onSaved={handleHealthPolicySaved}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Family Health Insurance Form Modal */}
            {showFamilyHealthInsuranceForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-5xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingFamilyHealthPolicy ? 'Edit Family Health Insurance Policy' : 'Create New Family Health Insurance Policy'}
                                    </h3>
                                    <p className="text-white/90 mt-1">Configure your family health insurance policy details</p>
                                </div>
                                <button
                                    onClick={handleCloseFamilyHealthInsuranceForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <FamilyHealthInsuranceForm
                                policy={editingFamilyHealthPolicy}
                                onClose={handleCloseFamilyHealthInsuranceForm}
                                onSaved={handleFamilyHealthPolicySaved}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Travel Insurance Form Modal */}
            {showTravelInsuranceForm && (
                <TravelInsuranceForm
                    policy={editingTravelPolicy}
                    onSave={handleTravelPolicySaved}
                    onCancel={handleCloseTravelInsuranceForm}
                />
            )}

            {/* Car Insurance Form Modal */}
            {showCarInsuranceForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-5xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingCarPolicy ? 'Edit Car Insurance Policy' : 'Create New Car Insurance Policy'}
                                    </h3>
                                    <p className="text-white/90 mt-1">Configure your car insurance policy details</p>
                                </div>
                                <button
                                    onClick={handleCloseCarInsuranceForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <CarInsuranceForm
                                policy={editingCarPolicy}
                                onClose={handleCloseCarInsuranceForm}
                                onSaved={handleCarPolicySaved}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Bike Insurance Form Modal */}
            {showBikeInsuranceForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-5xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingBikePolicy ? 'Edit Bike Insurance Policy' : 'Create New Bike Insurance Policy'}
                                    </h3>
                                    <p className="text-white/90 mt-1">Configure your bike insurance policy details</p>
                                </div>
                                <button
                                    onClick={handleCloseBikeInsuranceForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <BikeInsuranceForm
                                policy={editingBikePolicy}
                                onClose={handleCloseBikeInsuranceForm}
                                onSaved={handleBikePolicySaved}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Free of Cost Insurance Form Modal */}
            {showFreeOfCostInsuranceForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-5xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingFreeOfCostPolicy ? 'Edit Free of Cost Insurance Policy' : 'Create New Free of Cost Insurance Policy'}
                                    </h3>
                                    <p className="text-white/90 mt-1">Configure your free of cost insurance policy details</p>
                                </div>
                                <button
                                    onClick={handleCloseFreeOfCostInsuranceForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <FreeOfCostInsuranceForm
                                policy={editingFreeOfCostPolicy}
                                onClose={handleCloseFreeOfCostInsuranceForm}
                                onSaved={handleFreeOfCostPolicySaved}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Guaranteed Returns Form Modal */}
            {showGuaranteedReturnsForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-5xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingGuaranteedReturnsPolicy ? 'Edit Guaranteed Returns Plan' : 'Create New Guaranteed Returns Plan'}
                                    </h3>
                                    <p className="text-white/90 mt-1">Configure your guaranteed returns plan details</p>
                                </div>
                                <button
                                    onClick={handleCloseGuaranteedReturnsForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <GuaranteedReturnsForm
                                plan={editingGuaranteedReturnsPolicy}
                                onClose={handleCloseGuaranteedReturnsForm}
                                onSaved={handleGuaranteedReturnsPolicySaved}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Child Saving Insurance Form Modal */}
            {showChildSavingInsuranceForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-5xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingChildSavingInsurancePolicy ? 'Edit Child Saving Insurance Policy' : 'Create New Child Saving Insurance Policy'}
                                    </h3>
                                    <p className="text-white/90 mt-1">Configure your child saving insurance policy details</p>
                                </div>
                                <button
                                    onClick={handleCloseChildSavingInsuranceForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <ChildSavingInsuranceForm
                                policy={editingChildSavingInsurancePolicy}
                                onSave={handleChildSavingInsurancePolicySaved}
                                onCancel={handleCloseChildSavingInsuranceForm}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Retirement Insurance Form Modal */}
            {showRetirementInsuranceForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-5xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {editingRetirementInsurancePolicy ? 'Edit Retirement Insurance Policy' : 'Create New Retirement Insurance Policy'}
                                    </h3>
                                    <p className="text-white/90 mt-1">Configure your retirement insurance policy details</p>
                                </div>
                                <button
                                    onClick={handleCloseRetirementInsuranceForm}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <RetirementInsuranceForm
                                policy={editingRetirementInsurancePolicy}
                                onClose={handleCloseRetirementInsuranceForm}
                                onSaved={handleRetirementInsurancePolicySaved}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Group Health Insurance Form Modal */}
            {showGHIForm && (
                <AdminGHIForm
                    editingPlan={editingGHIPlan}
                    onClose={handleCloseGHIForm}
                    onSuccess={handleCloseGHIForm}
                />
            )}

            {/* Tata AIA Products Modal */}
            {showTataAIAProducts && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-4 py-8">
                    <div className="relative w-full max-w-7xl min-h-[95vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold">Tata AIA Products Management</h3>
                                    <p className="text-white/90 mt-1">Manage and monitor Tata AIA insurance products</p>
                                </div>
                                <button
                                    onClick={() => setShowTataAIAProducts(false)}
                                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <TataAIAProducts />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard; 