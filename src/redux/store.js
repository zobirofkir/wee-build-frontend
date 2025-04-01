import { configureStore } from "@reduxjs/toolkit";
import currentThemeReducer from "./reducer/store/get-current-theme-reducer";
import customizeCurrentThemeReducer from "./reducer/store/customize-current-theme-reducer";
import customizeThemeFileReducer from "./reducer/store/customize-theme-file-reducer";

export const store = configureStore({
  reducer: {
    currentTheme: currentThemeReducer,
    customizeCurrentTheme: customizeCurrentThemeReducer,
    customizeThemeFile: customizeThemeFileReducer,
  },
});
