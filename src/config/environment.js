// Environment configuration with multiple fallback strategies
const getApiBaseUrl = () => {
  // Strategy 1: Check runtime configuration (highest priority)
  if (typeof window !== 'undefined' && window.REACT_APP_CONFIG && window.REACT_APP_CONFIG.API_BASE_URL) {
    console.log('Using API_BASE_URL from runtime config:', window.REACT_APP_CONFIG.API_BASE_URL);
    return window.REACT_APP_CONFIG.API_BASE_URL;
  }

  // Strategy 2: Check process.env (standard React way)
  if (process.env.REACT_APP_API_BASE) {
    console.log('Using REACT_APP_API_BASE from process.env:', process.env.REACT_APP_API_BASE);
    return process.env.REACT_APP_API_BASE;
  }

  // Strategy 3: Check window environment (for runtime configuration)
  if (typeof window !== 'undefined' && window.REACT_APP_API_BASE) {
    console.log('Using REACT_APP_API_BASE from window:', window.REACT_APP_API_BASE);
    return window.REACT_APP_API_BASE;
  }

  // Strategy 4: Check for build-time injected variables
  if (typeof REACT_APP_API_BASE !== 'undefined') {
    console.log('Using REACT_APP_API_BASE from build-time:', REACT_APP_API_BASE);
    return REACT_APP_API_BASE;
  }

  // Strategy 5: Fallback to production URL
  const fallbackUrl = 'https://walrus-app-2zz3w.ondigitalocean.app';
  console.log('Using fallback API URL:', fallbackUrl);
  return fallbackUrl;
};

// Export the API base URL
export const API_BASE_URL = getApiBaseUrl();

// Export a function to get the API URL with endpoint
export const getApiUrl = (endpoint) => {
  if (endpoint.startsWith('http')) {
    return endpoint;
  }
  const baseUrl = API_BASE_URL;
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

// Debug function to check environment
export const debugEnvironment = () => {
  console.log('Environment Debug Info:');
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
  console.log('process.env.REACT_APP_API_BASE:', process.env.REACT_APP_API_BASE);
  console.log('Final API_BASE_URL:', API_BASE_URL);
  console.log('All REACT_APP_ variables:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));
};

export default {
  API_BASE_URL,
  getApiUrl,
  debugEnvironment
};
