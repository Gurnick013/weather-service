import { createSlice } from "@reduxjs/toolkit";
import {
  getchWeather,
  getGeoCity,
  getInfoStation,
} from "../../service/fetchWeather";

const useWeatherReducer = createSlice({
  name: "weather",
  initialState: {
    cities: [],
    isLoaded: false,
    geoInfo: [],
    infoStaition: [],
    weatherInfo: [],
    error: [],
  },
  reducers: {
    addCityName: (state, action) => {
      state.cities = [...state.cities, action.payload];
    },
  },
  extraReducers: {
    [getGeoCity.pending]: (state, action) => {
      state.isLoaded = true;
    },
    [getGeoCity.fulfilled]: (state, action) => {
      state.geoInfo = action.payload;
    },
    [getGeoCity.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [getInfoStation.pending]: (state, action) => {
      state.isLoaded = true;
    },
    [getInfoStation.fulfilled]: (state, action) => {
      state.isLoaded = false;
      state.infoStaition = action.payload;
    },
    [getInfoStation.rejected]: (state, action) => {
      state.isLoaded = false;
      state.error = action.payload;
    },
    [getchWeather.pending]: (state, action) => {
      state.isLoaded = true;
    },
    [getchWeather.fulfilled]: (state, action) => {
      state.isLoaded = false;
      state.weatherInfo = [...state.weatherInfo, action.payload];
    },
    [getchWeather.rejected]: (state, action) => {
      state.isLoaded = false;
      state.error = action.payload;
    },
  },
});

export const { addCityName } = useWeatherReducer.actions;

export default useWeatherReducer.reducer;
