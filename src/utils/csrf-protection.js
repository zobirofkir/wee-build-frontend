import { getCSRFToken } from './cookie-utils';

/**
 * Higher-order function to protect sensitive actions with CSRF verification
 * @param {Function} actionCreator - The Redux action creator to protect
 * @returns {Function} - Protected action creator that verifies CSRF token
 */
export const protectWithCSRF = (actionCreator) => {
  return (...args) => {
    return (dispatch, getState) => {
      const csrfToken = getCSRFToken();
      
      if (!csrfToken) {
        // If no CSRF token is found, this could be a CSRF attack or the user's session has expired
        console.error('CSRF token missing. This could be a security issue.');
        return dispatch({ 
          type: 'CSRF_VALIDATION_FAILED',
          payload: 'Security validation failed. Please refresh the page and try again.'
        });
      }
      
      // If CSRF token exists, proceed with the original action
      return dispatch(actionCreator(...args));
    };
  };
};

/**
 * Verify that a form submission includes the correct CSRF token
 * @param {Event} event - Form submission event
 * @returns {boolean} - Whether the CSRF token is valid
 */
export const verifyCSRFToken = (event) => {
  const formToken = event.target.querySelector('input[name="csrf_token"]')?.value;
  const cookieToken = getCSRFToken();
  
  if (!formToken || !cookieToken || formToken !== cookieToken) {
    console.error('CSRF token validation failed');
    return false;
  }
  
  return true;
};

/**
 * Component to include a hidden CSRF token in forms
 * @returns {JSX.Element} - Hidden input with CSRF token
 */
export const CSRFTokenInput = () => {
  const token = getCSRFToken();
  return <input type="hidden" name="csrf_token" value={token || ''} />;
}; 