import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import RegisterReducer from '../reducer/auth/register-reducer';
import LoginReducer from '../reducer/auth/login-reducer';
import LogoutReducer from '../reducer/auth/logout-reducer';
import ForgetPasswordReducer from '../reducer/auth/forget-password-reducer';
import GetCurrentAuthenticatedUserReducer from '../reducer/auth/get-current-authenticated-user-reducer';
import { updateCurrentAuthenticatedUser } from '../action/auth/update-current-authenticated-user-action';

const rootReducer = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  logout: LogoutReducer,
  forgotPassword: ForgetPasswordReducer,
  getCurrentAuthenticatedUser: GetCurrentAuthenticatedUserReducer,
  updateCurrentAuthenticatedUser: updateCurrentAuthenticatedUser
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;