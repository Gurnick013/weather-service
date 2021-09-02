import { FC } from "react";
import "./GlobalWeatherService.css";
import WeatherInfo from "./WeatherInfo/WeatherInfo";


const GlobalWeatherService: FC = () => {
  return (
    <div className="Globalweather">
      <WeatherInfo />
    </div>
  );
};

export default GlobalWeatherService;
