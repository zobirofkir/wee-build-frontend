import axios from "axios";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";


export const registerRequest = () => ({
    type: REGISTER_REQUEST
});


export const registerSuccess = (userData) => ({
    type: REGISTER_SUCCESS,
    payload: userData
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
});


export const RegisterAction = (name, email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_APP_URL}/auth/register`, {
                name,
                email,
                password
            });
            
            const data = response.data.data;
            if (response.status === 201) {
                window.location.href = '/auth/login';
            }


            dispatch(registerSuccess(data));
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            dispatch(registerFailure(errorMessage));
        }
    }
}