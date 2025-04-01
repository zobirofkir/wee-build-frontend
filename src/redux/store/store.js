import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import RegisterReducer from "../reducer/auth/register-reducer";
import LoginReducer from "../reducer/auth/login-reducer";
import LogoutReducer from "../reducer/auth/logout-reducer";
import ForgetPasswordReducer from "../reducer/auth/forget-password-reducer";
import GetCurrentAuthenticatedUserReducer from "../reducer/auth/get-current-authenticated-user-reducer";
import { updateCurrentAuthenticatedUser } from "../action/auth/update-current-authenticated-user-action";
import GetGithubThemesReducer from "../reducer/store/get-github-themes-reducer";
import ApplyThemeReducer from "../reducer/store/apply-theme-reducer";
import GetCurrentThemeReducer from "../reducer/store/get-current-theme-reducer";
import CustomizeCurrentThemeReducer from "../reducer/store/customize-current-theme-reducer";
import CustomizeThemeFileReducer from "../reducer/store/customize-theme-file-reducer";

const rootReducer = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  logout: LogoutReducer,
  forgotPassword: ForgetPasswordReducer,
  getCurrentAuthenticatedUser: GetCurrentAuthenticatedUserReducer,
  updateCurrentAuthenticatedUser: updateCurrentAuthenticatedUser,
  githubThemes: GetGithubThemesReducer,
  applyTheme: ApplyThemeReducer,
  currentTheme: GetCurrentThemeReducer,
  customizeCurrentTheme: CustomizeCurrentThemeReducer,
  customizeThemeFile: CustomizeThemeFileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
