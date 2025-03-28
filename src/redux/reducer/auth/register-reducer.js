import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../../action/auth/register-action";

const initialState = {
    loading: false, 
    user: null, 
    error: "",
    validationErrors: null
};

const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: "",
                validationErrors: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: "",
                validationErrors: null
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload.message,
                validationErrors: action.payload.validationErrors
            };
        default:
            return state;
    }
} 

export default RegisterReducer;