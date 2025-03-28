/**
 * Set a cookie with options
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Cookie expiration in days
 * @param {string} path - Cookie path
 */
export const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}; SameSite=Strict`;
};

/**
 * Get a cookie by name
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null if not found
 */
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
};

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 * @param {string} path - Cookie path
 */
export const deleteCookie = (name, path = '/') => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; SameSite=Strict`;
};

/**
 * Set authentication token in cookie
 * @param {string} token - Authentication token
 */
export const setAuthToken = (token) => {
  setCookie('authToken', token);
};

/**
 * Get authentication token from cookie
 * @returns {string|null} - Authentication token or null if not found
 */
export const getAuthToken = () => {
  return getCookie('authToken');
};

/**
 * Remove authentication token
 */
export const removeAuthToken = () => {
  deleteCookie('authToken');
};

/**
 * Store user data in cookies
 * @param {Object} userData - User data object
 */
export const setUserData = (userData) => {
  if (userData.name) setCookie('userName', userData.name);
  if (userData.email) setCookie('userEmail', userData.email);
};

/**
 * Get user data from cookies
 * @returns {Object} - User data object
 */
export const getUserData = () => {
  return {
    name: getCookie('userName'),
    email: getCookie('userEmail')
  };
};

/**
 * Clear all auth-related cookies
 */
export const clearAuthCookies = () => {
  removeAuthToken();
  deleteCookie('userName');
  deleteCookie('userEmail');
  deleteCookie('csrfToken');
};

/**
 * Generate a random CSRF token
 * @returns {string} - Random CSRF token
 */
export const generateCSRFToken = () => {
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Set CSRF token in cookie and return it
 * @returns {string} - Generated CSRF token
 */
export const setCSRFToken = () => {
  const token = generateCSRFToken();
  setCookie('csrfToken', token);
  return token;
};

/**
 * Get CSRF token from cookie
 * @returns {string|null} - CSRF token or null if not found
 */
export const getCSRFToken = () => {
  return getCookie('csrfToken');
}; 