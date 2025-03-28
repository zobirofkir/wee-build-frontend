import axios from "axios";
import { setAuthToken, setUserData } from "../../../utils/cookie-utils";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData
});

const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const LoginAction = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest());
            
            /**
             * Use the existing API endpoint without withCredentials
             */
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_APP_URL}/auth/login`, 
                { email, password }
            );

            const data = response.data.data;
            
            /**
             * Store the token in a cookie instead of localStorage
             */
            if (data.accessToken) {
                setAuthToken(data.accessToken);
                
                /**
                 * Store non-sensitive user data in cookies
                 */
                setUserData({
                    name: data.name,
                    email: data.email
                });
            }
            
            /**
             * Still store user data in Redux state
             */
            dispatch(loginSuccess(data));

            window.location.href = '/auth/dashboard';
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            dispatch(loginFailure(errorMessage));
        }
    }
}