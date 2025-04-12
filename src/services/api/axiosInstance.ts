import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url && !config.url.includes('/auth/login')) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Response Interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle token expiration globally
    if (error.response?.status === 401) {
      // Token might be invalid or expired
      console.error('Unauthorized. Logging out...');
      // Optionally redirect to login page or dispatch logout
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
