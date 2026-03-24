import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiRequest, getApiUrl } from '../../utils/apiUtils';

const AdminUserManager = () => {
    const [adminUsers, setAdminUsers] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin'
    });

    useEffect(() => {
        fetchAdminUsers();
    }, []);

    const fetchAdminUsers = async () => {
        try {
            setLoading(true);
            const response = await apiRequest('/api/admin/users', {
                method: 'GET'
            });
            
            if (response.success) {
                setAdminUsers(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch admin users:', error);
            // If API doesn't exist, show default admin info
            setAdminUsers([
                {
                    id: 1,
                    name: 'Default Admin',
                    email: 'admin@cgpe.com',
                    role: 'admin',
                    status: 'active',
                    createdAt: new Date().toISOString()
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return false;
        }
        if (!formData.email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!formData.email.includes('@')) {
            toast.error('Please enter a valid email');
            return false;
        }
        if (!formData.password) {
            toast.error('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            
            // Try to create admin user via API
            const response = await apiRequest('/api/admin/users', {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                })
            });

            if (response.success) {
                toast.success('Admin user created successfully!');
                setShowCreateForm(false);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    role: 'admin'
                });
                fetchAdminUsers();
            } else {
                toast.error(response.message || 'Failed to create admin user');
            }
        } catch (error) {
            console.error('Error creating admin user:', error);
            
            // If API doesn't support admin creation, show manual instructions
            toast.error('Admin creation not supported by backend. Please contact administrator.');
            
            // Show the credentials that would be created
            const newAdmin = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            
            setAdminUsers(prev => [...prev, newAdmin]);
            setShowCreateForm(false);
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'admin'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        if (!window.confirm('Are you sure you want to delete this admin user?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await apiRequest(`/api/admin/users/${adminId}`, {
                method: 'DELETE'
            });

            if (response.success) {
                toast.success('Admin user deleted successfully!');
                fetchAdminUsers();
            } else {
                toast.error(response.message || 'Failed to delete admin user');
            }
        } catch (error) {
            console.error('Error deleting admin user:', error);
            toast.error('Failed to delete admin user');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Admin User Management</h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                    Create New Admin
                </button>
            </div>

            {/* Admin Users List */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Existing Admin Users</h3>
                {loading ? (
                    <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {adminUsers.map((admin) => (
                            <div key={admin.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{admin.name}</h4>
                                        <p className="text-gray-600">{admin.email}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                admin.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {admin.status}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                Role: {admin.role}
                                            </span>
                                        </div>
                                        {admin.password && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-600">
                                                    Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                                        {admin.password}
                                                    </span>
                                                    <button
                                                        onClick={() => copyToClipboard(admin.password)}
                                                        className="ml-2 text-blue-600 hover:text-blue-800 text-xs"
                                                    >
                                                        Copy
                                                    </button>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => copyToClipboard(`${admin.email} / ${admin.password || 'password'}`)}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Copy Credentials
                                        </button>
                                        {admin.status === 'pending' && (
                                            <button
                                                onClick={() => handleDeleteAdmin(admin.id)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Admin Form Modal */}
            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Create New Admin User</h3>
                        
                        <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirm password"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Creating...' : 'Create Admin'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Instructions</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use the "Create New Admin" button to add new admin users</li>
                    <li>• Copy credentials to clipboard for easy access</li>
                    <li>• Admin users with "pending" status need backend setup</li>
                    <li>• Contact backend administrator to activate new admin accounts</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminUserManager;
