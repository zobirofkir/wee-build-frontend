import axios from 'axios';
import { getAuthToken } from './cookie-utils';

/**
 * Configure axios to include credentials with all requests
 */
axios.defaults.withCredentials = true;

/**
 * Add an interceptor to include the auth token in all requests
 */
axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios; 