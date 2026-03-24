// API Configuration
const API_CONFIG = {
  // Backend API base URL - uses REACT_APP_API_BASE environment variable
  BASE_URL: process.env.REACT_APP_API_BASE || 'https://walrus-app-2zz3w.ondigitalocean.app',
  
  // API endpoints
  ENDPOINTS: {
    CAREERS: {
      SUBMIT_RESUME: '/api/careers/submit-resume'
    }
  }
};

export default API_CONFIG;
