import axios from 'axios';

/**
 * Axios instance configured for the Express backend.
 * The backend base URL defaults to http://localhost:5000/api
 * You can also set VITE_API_URL in a .env file inside /frontend if your port changes.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 seconds timeout
});

// Response interceptor to format errors nicely for frontend display
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend is not running or network dropped
    if (!error.response) {
      return Promise.reject({
        isNetworkError: true,
        message: 'Cannot connect to Express backend at http://localhost:5000. Is your backend server running?',
        originalError: error,
      });
    }

    // Pass through backend response error (e.g. 400, 404, 500)
    return Promise.reject({
      status: error.response.status,
      data: error.response.data,
      message: error.response.data?.message || error.message || 'An unexpected error occurred',
    });
  }
);

export default api;
