// FOR PRACTICES

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetchCityName = createApi({
  reducerPath: "cityName",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.openweathermap.org/geo/1.0/",
  }),
  endpoints: (builder) => ({
    getCityName: builder.query({
      query: (name) =>
        `direct?q=${name}&appid=bb7a5e128aff50a249f8ae11f0e66f9a`,
    }),
  }),
});

export const { useGetCityNameQuery } = fetchCityName;

export const fetchWeatherInfoForCity = createApi({
  reducerPath: "weatherInfo",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.weather.gov",
  }),
  endpoints: (builder) => ({
    getGeoLocation: builder.query({
      query: ({ lat, lon }) => `/points/${lat},${lon}`,
    }),
    getWeatherInfo: builder.query({
      query: (cwa, gridX, gridY) =>
        `/gridpoints/${cwa}/${gridX},${gridY}/forecast/`,
    }),
  }),
});

export const { useGetGeoLocationQuery, useGetWeatherInfoQuery } =
  fetchWeatherInfoForCity;
