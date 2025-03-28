import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import RegisterReducer from '../reducer/auth/register-reducer';
import LoginReducer from '../reducer/auth/login-reducer';
import LogoutReducer from '../reducer/auth/logout-reducer';

const rootReducer = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  logout: LogoutReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;