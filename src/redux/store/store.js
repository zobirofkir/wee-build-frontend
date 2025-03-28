import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import RegisterReducer from '../reducer/auth/register-reducer';

const rootReducer = combineReducers({
  register: RegisterReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;