// Runtime Configuration - This file can be updated without rebuilding
window.REACT_APP_CONFIG = {
  // API Configuration
  API_BASE_URL: 'https://walrus-app-2zz3w.ondigitalocean.app',
  
  // Environment
  NODE_ENV: 'production',
  ENVIRONMENT: 'production',
  
  // Feature flags
  ENABLE_DEBUG: false,
  ENABLE_LOGGING: true,
  
  // API Endpoints
  ENDPOINTS: {
    ADMIN_LOGIN: '/api/admin/login',
    ADMIN_DASHBOARD: '/api/admin/dashboard',
    INQUIRIES: '/api/inquiries',
    CONTACT_US: '/api/contact-us',
    CAREERS: '/api/careers'
  }
};

// Log configuration for debugging
console.log('🔧 Runtime Configuration Loaded:', window.REACT_APP_CONFIG);
