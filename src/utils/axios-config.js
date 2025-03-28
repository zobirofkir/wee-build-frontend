import axios from 'axios';
import { getAuthToken, getCSRFToken, setCSRFToken } from './cookie-utils';

/**
 * Configure axios to include credentials with all requests
 */
axios.defaults.withCredentials = true;

/**
 * Ensure we have a CSRF token
 */
if (!getCSRFToken()) {
  setCSRFToken();
}

/**
 * Add an interceptor to include the auth token and CSRF token in all requests
 */
axios.interceptors.request.use(
  (config) => {
    // Add Authorization header with token if available
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add CSRF token to headers for non-GET requests
    if (config.method !== 'get') {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios; 