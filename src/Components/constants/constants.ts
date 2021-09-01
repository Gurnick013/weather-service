export interface IData {
  info: Array<IObj>;
}

export interface IObj {
  name: string;
  cwa: string;
  observationStations: string;
}
export interface IGeo {
  lat: number;
  lon: number;
}

export interface IGetInfo {
  data: any;
  // nameCity: string
}

export interface IInfoForStaition {
  cwa: string;
  gridX: number;
  gridY: number;
}

export interface IWeather {
  icon: string;
  name: string;
  shortForecast: string;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
}

export interface IArrayInfo {
  arrInfo: any;
}

export interface IResponse {
  icon: string;
  isDaytime: boolean;
  name: string;
  number: number;
  shortForecast: string;
  startTime: string;
  temperature: number;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}

export interface IResponseGeo {
  country: string;
  lat: number;
  local_names: any;
  lon: number;
  name: string;
}

export const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const dayToday = (): string => {
  const data = new Date();
  const day = WEEK.filter((_, index) => index === data.getDay() - 1);
  return day[0];
};

export const changeTemtTocelsius = (value: number) => {
  return Math.floor((value - 32) * (5 / 9));
};
