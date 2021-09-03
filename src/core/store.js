import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  fetchCityName,
  fetchWeatherInfoForCity,
} from "../service/useQuery";

export const store = configureStore({
  reducer: {
    [fetchCityName.reducerPath]: fetchCityName.reducer,
    [fetchWeatherInfoForCity.reducerPath]: fetchWeatherInfoForCity.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(fetchCityName.middleware)
      .concat(fetchWeatherInfoForCity.middleware),
});

setupListeners(store.dispatch);
