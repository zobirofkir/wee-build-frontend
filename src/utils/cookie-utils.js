/**
 * 
 * @param {Set a cookie with options} name 
 * @param {*} value 
 * @param {*} days 
 * @param {*} path 
 */
export const setCookie = (name, value, days = 7, path = '/') => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}; SameSite=Strict`;
};

/**
 * 
 * @param {Get a cookie by name} name 
 * @returns 
 */
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
};

/**
 * 
 * @param {Delete a cookie by name} name 
 * @param {*} path 
 */
export const deleteCookie = (name, path = '/') => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; SameSite=Strict`;
};

/**
 * 
 * @param {Set authentication token in cookie} token 
 */
export const setAuthToken = (token) => {
  setCookie('authToken', token);
};

/**
 * 
 * @returns Get authentication token from cookie
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
 * 
 * @param {Store user data in cookies} userData 
 */
export const setUserData = (userData) => {
  if (userData.name) setCookie('userName', userData.name);
  if (userData.email) setCookie('userEmail', userData.email);
};

/**
 * 
 * @returns Get user data from cookies
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
}; 