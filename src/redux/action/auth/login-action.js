import axios from "axios";

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
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_APP_URL}/auth/login`, {
                email,
                password
            });

            const data = response.data.data;

            localStorage.setItem('accessToken', data.accessToken);
            
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            dispatch(loginSuccess(data));

            window.location.href = '/auth/dashboard';
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            dispatch(loginFailure(errorMessage));
        }
    }
}