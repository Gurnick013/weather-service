// import {
//   useGetCityNameQuery,
//   useGetGeoLocationQuery,
// } from "../service/useQuery";
import "./GlobalWeatherService.css";
import WeatherInfo from "./WeatherInfo/WeatherInfo";

const GlobalWeatherService = () => {
  // const { data } = useGetCityNameQuery("texas");

  return (
    <div className="Globalweather">
      <WeatherInfo />
    </div>
  );
};

export default GlobalWeatherService;
