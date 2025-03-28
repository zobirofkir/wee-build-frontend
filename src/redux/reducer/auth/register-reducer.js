import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../../action/auth/register-action";

const initialState = {
    loading: false, 
    user: null, 
    error: "",
};

const RegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: "",
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
} 

export default RegisterReducer;