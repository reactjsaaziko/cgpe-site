import { toast } from 'react-hot-toast';

// Import environment configuration
import { API_BASE_URL, getApiUrl as getApiUrlFromConfig, debugEnvironment } from '../config/environment';

// Export the functions for backward compatibility
export const getApiBaseUrl = () => API_BASE_URL;
export const getApiUrl = getApiUrlFromConfig;
export { debugEnvironment };

// Helper function to make API requests with proxy fallback
const makeApiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Helper function to handle axios errors
export const handleAxiosError = (error, defaultMessage = 'An error occurred') => {
  console.error('Axios error:', error);
  
  let errorMessage = defaultMessage;
  
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    errorMessage = data?.message || data?.error || `Server error (${status})`;
  } else if (error.request) {
    // Request was made but no response received
    errorMessage = 'No response from server. Please check your connection.';
  } else {
    // Something else happened
    errorMessage = error.message || defaultMessage;
  }
  
  toast.error(errorMessage);
  throw new Error(errorMessage);
};

// Helper function to handle contact us specific errors
export const handleContactUsError = (error, setError) => {
  console.error('Contact Us API Error:', error);
  
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        setError('Authentication failed. Please login again.');
        // Clear invalid token
        localStorage.removeItem('adminToken');
        break;
      case 403:
        setError('Access denied. You do not have permission to view contact messages.');
        break;
      case 404:
        setError('Contact messages endpoint not found. Please check the API configuration.');
        break;
      case 429:
        setError('Too many requests. Please wait a moment and try again.');
        break;
      case 500:
        setError('Server error. Please try again later.');
        break;
      default:
        setError(data?.message || `Server error (${status})`);
    }
  } else if (error.request) {
    // Network error
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
      setError('Network error. Please check your internet connection.');
    } else if (error.message.includes('timeout')) {
      setError('Request timeout. Please try again.');
    } else {
      setError('No response from server. Please check your connection.');
    }
  } else {
    // Other errors
    setError(error.message || 'An unexpected error occurred.');
  }
};

// Helper function to make authenticated API requests
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    // Try using the proxy first (relative URL)
    const proxyUrl = endpoint.startsWith('http') ? endpoint : `/api${endpoint}`;
    const response = await fetch(proxyUrl, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // If not JSON, the proxy probably failed, try direct URL
      throw new Error('Proxy returned non-JSON response, trying direct URL');
    }

    return response.json();
  } catch (proxyError) {
    console.log('Proxy request failed, trying direct URL...', proxyError);
    
    // Fallback to direct URL if proxy fails
    return makeApiRequest(endpoint, {
      ...defaultOptions,
      ...options,
    });
  }
};

// Helper function to handle API responses
export const handleApiResponse = (response, successMessage = null) => {
  if (response.success) {
    if (successMessage) {
      toast.success(successMessage);
    }
    return response;
  } else {
    const errorMessage = response.message || 'Operation failed';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  try {
    // Try using the proxy first (relative URL)
    const proxyUrl = endpoint.startsWith('http') ? endpoint : `/api${endpoint}`;
    const response = await fetch(proxyUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // If not JSON, the proxy probably failed, try direct URL
      throw new Error('Proxy returned non-JSON response, trying direct URL');
    }

    return response.json();
  } catch (proxyError) {
    console.log('Proxy request failed, trying direct URL...', proxyError);
    
    // Fallback to direct URL if proxy fails
    return makeApiRequest(endpoint, options);
  }
};

// Product endpoints configuration
export const PRODUCT_ENDPOINTS = [
  { url: '/tata-aia-products', category: 'Tata AIA Products' },
  { url: '/term-insurance-policies', category: 'Term Insurance' },
  { url: '/health-insurance', category: 'Health Insurance' },
  { url: '/family-health-insurance', category: 'Family Health Insurance' },
  { url: '/travel-insurance', category: 'Travel Insurance' },
  { url: '/car-insurance', category: 'Car Insurance' },
  { url: '/bike-insurance', category: 'Bike Insurance' },
  { url: '/free-of-cost-insurance', category: 'Free of Cost Insurance' },
  { url: '/guaranteed-returns', category: 'Guaranteed Returns' },
  { url: '/child-saving-insurance', category: 'Child Saving Insurance' },
  { url: '/retirement-insurance', category: 'Retirement Insurance' },
  { url: '/group-health-insurance', category: 'Group Health Insurance' },
  { url: '/investment-plans', category: 'Investment Plans' }
];

// Helper function to get product path for navigation
export const getProductPath = (category) => {
  const pathMap = {
    'Tata AIA Products': '/tata-aia-fortune-guarantee-plus',
    'Term Insurance': '/term-insurance',
    'Health Insurance': '/health-insurance',
    'Family Health Insurance': '/family-health-insurance',
    'Travel Insurance': '/travel-insurance',
    'Car Insurance': '/car-insurance',
    'Bike Insurance': '/bike-insurance',
    'Free of Cost Insurance': '/free-term-plan',
    'Guaranteed Returns': '/guaranteed-returns-plan',
    'Child Saving Insurance': '/child-saving-insurance',
    'Retirement Insurance': '/retirement-insurance',
    'Group Health Insurance': '/group-health-insurance',
    'Investment Plans': '/investment-landing'
  };
  return pathMap[category] || '/services';
};

// Helper function to fetch all products
export const fetchAllProducts = async () => {
  const allProducts = [];

  for (const endpoint of PRODUCT_ENDPOINTS) {
    try {
      const data = await apiCall(endpoint.url);
      
      if (data.success && data.data && Array.isArray(data.data)) {
        const transformedProducts = data.data
          .filter(product => product.status === 'active' || !product.status)
          .map(product => ({
            name: product.name || product.title || product.productName || 'Unnamed Product',
            path: getProductPath(endpoint.category),
            id: product._id,
            category: endpoint.category,
            originalData: product
          }));
        
        allProducts.push(...transformedProducts);
      }
    } catch (error) {
      console.warn(`Failed to fetch ${endpoint.category}:`, error);
    }
  }

  return allProducts;
};

// Helper function to group products by category
export const groupProductsByCategory = (products) => {
  const grouped = {};
  
  products.forEach(product => {
    if (!grouped[product.category]) {
      grouped[product.category] = [];
    }
    grouped[product.category].push(product);
  });

  return Object.entries(grouped).map(([category, categoryProducts]) => ({
    category,
    products: categoryProducts
  }));
};
