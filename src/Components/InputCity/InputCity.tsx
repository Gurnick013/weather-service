import { FC, useState, useEffect } from "react";
import { Input } from "antd";
import {
  dayToday,
  IGeo,
  IInfoForStaition,
  IWeather,
} from "../constants/constants";
import Weather from "../Weather/Weather";
import "antd/dist/antd.css";


const { log } = console;
const { Search } = Input;

const InputCity: FC = () => {
  const [nameCity, setNameCity] = useState<string>("");
  const [geoInfo, setGeoInfo] = useState<Array<IGeo>>([{ lat: 0, lon: 0 }]);
  const [infoForStaition, serInfoForStaition] = useState<Array<IInfoForStaition>>([{
    cwa: "",
    gridX: 0,
    gridY: 0,
  }]);
  const [weatherInfo, setWeatherInfo] = useState<Array<IWeather>>([{
    icon: "",
    name: "",
    shortForecast: "",
    temperature: 0,
    temperatureUnit: "",
    windSpeed: "",
  }]);

  const onSearch = (value: string) => {
    setNameCity(value);
  };

  useEffect(() => {
    if (nameCity) {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${nameCity}&appid=bb7a5e128aff50a249f8ae11f0e66f9a`
      )
        .then((data) => data.json())
        .then((response) => {
          log(response);
          response.map((geo: any) =>
            setGeoInfo([{
              lat: geo.lat,
              lon: geo.lon,
            }])
          );
        })
        .catch((err) => log(err));
    }
  }, [nameCity]);

  useEffect(() => {
    if (geoInfo[0].lat && geoInfo[0].lon)
      fetch(`https://api.weather.gov/points/${geoInfo[0].lat},${geoInfo[0].lon}`)
        .then((data) => data.json())
        .then((response) => {
          log(response);
          serInfoForStaition([{
            cwa: response.properties.cwa,
            gridX: response.properties.gridX,
            gridY: response.properties.gridY,
          }]);
        })
        .catch((err) => {
          log(err);
        });
  }, [geoInfo]);

  useEffect(() => {
    if (infoForStaition[0].cwa && infoForStaition[0].gridX && infoForStaition[0].gridY) {
      fetch(
        `https://api.weather.gov/gridpoints/${infoForStaition[0].cwa}/${infoForStaition[0].gridX},${infoForStaition[0].gridY}/forecast/`
      )
        .then((data) => data.json())
        .then((response) => {
          log(response);
          const result: any = response.properties.periods
            .filter((el: any) => el.name === dayToday() || el.name === 'Today')
            .map((item: any) => ({
              icon: item.icon,
              name: item.name,
              shortForecast: item.shortForecast,
              temperature: item.temperature,
              temperatureUnit: item.temperatureUnit,
              windSpeed: item.windSpeed,
            }));
          setWeatherInfo(result);
        })
        .catch((err) => {
          log(err);
        });
    }
  }, [infoForStaition]);
  log(weatherInfo[0].icon)
  return (
    <div>
      <Search placeholder="input City" onSearch={onSearch} enterButton />
      {weatherInfo[0].icon ? (
        <Weather getInfo={weatherInfo} />
      ) : (
        <div> Черкани город и получи прогноз </div>
      )}
    </div>
  );
};

export default InputCity;
