import { combineReducers } from "redux";
import GetGithubThemesReducer from "./store/get-github-themes-reducer";
import ApplyThemeReducer from "./store/apply-theme-reducer";

const rootReducer = combineReducers({
  githubThemes: GetGithubThemesReducer,
  applyTheme: ApplyThemeReducer,
});

export default rootReducer;
