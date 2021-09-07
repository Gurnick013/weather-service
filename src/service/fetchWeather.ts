import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { dayToday } from "../core/constants/constants";

export const getGeoCity: AsyncThunk<any, any, any> = createAsyncThunk(
  "geoCity",
  async (cityName) => {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=bb7a5e128aff50a249f8ae11f0e66f9a`
    );
    return response.data.map((item: any) => ({
      lat: item.lat,
      lon: item.lon,
    }));
  }
);

export const getInfoStation: AsyncThunk<any, any, any> = createAsyncThunk(
  "infoStation",
  async (geo) => {
    const response = await axios.get(
      `https://api.weather.gov/points/${geo[0].lat},${geo[0].lon}`
    );
    return response.data.properties.forecast;
  }
);

export const getchWeather: AsyncThunk<any, any, any> = createAsyncThunk(
  "weather",
  async (forecast) => {
    const response = await axios.get(`${forecast}`);    
    return response.data.properties.periods
      .filter(
        (el: any) =>
          el.name === dayToday() ||
          el.name === "Today" ||
          el.name === "Labor Day"
      )
      .reduce(
        (_: any, item: any) => ({
          icon: item.icon,
          name: item.name,
          shortForecast: item.shortForecast,
          temperature: item.temperature,
          temperatureUnit: item.temperatureUnit,
          windSpeed: item.windSpeed,
        }),
        {}
      );
  }
);
