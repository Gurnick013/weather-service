import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import useWeatherReducer from "./reducers/useWeatherReducer";

export const store = configureStore({
  reducer: {
    weather: useWeatherReducer,
  },
  middleware: [...getDefaultMiddleware()],
});
