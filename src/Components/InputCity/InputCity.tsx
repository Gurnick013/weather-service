import { FC, useState, useEffect } from "react";
import { Input, Spin } from "antd";
import {
  dayToday,
  IGeo,
  IInfoForStaition,  
} from "../constants/constants";
import Weather from "../Weather/Weather";
import "antd/dist/antd.css";

const { log } = console;
const { Search } = Input;

const InputCity: FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [nameCity, setNameCity] = useState<string>("");
  const [geoInfo, setGeoInfo] = useState<IGeo>({ lat: 0, lon: 0 });
  const [infoForStaition, serInfoForStaition] = useState<IInfoForStaition>({
    cwa: "",
    gridX: 0,
    gridY: 0,
  });
  const [weatherInfo, setWeatherInfo] = useState<any>([]);  
  
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
          response.map((geo: any) =>
            setGeoInfo({
              lat: geo.lat,
              lon: geo.lon,
            })
          );
        })
        .catch((err) => log(err));
    }
  }, [nameCity]);

  useEffect(() => {
    if (geoInfo.lat && geoInfo.lon)
      fetch(`https://api.weather.gov/points/${geoInfo.lat},${geoInfo.lon}`)
        .then((data) => data.json())
        .then((response) => {
          serInfoForStaition({
            cwa: response.properties.cwa,
            gridX: response.properties.gridX,
            gridY: response.properties.gridY,
          });
        })
        .catch((err) => {
          log(err);
        });
  }, [geoInfo]);

  useEffect(() => {
    if (infoForStaition.cwa && infoForStaition.gridX && infoForStaition.gridY) {
      fetch(
        `https://api.weather.gov/gridpoints/${infoForStaition.cwa}/${infoForStaition.gridX},${infoForStaition.gridY}/forecast/`
      )
        .then((data) => data.json())
        .then((response) => {
          const result: any = response.properties.periods
            .filter((el: any) => el.name === dayToday() || el.name === "Today")
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
          setWeatherInfo( (prevState: any) => { return  [ ...prevState, [nameCity, result]] } );
          setIsLoaded(true);
          sessionStorage.setItem(nameCity.toLowerCase(), JSON.stringify(result));
        })
        .catch((err) => {
          log(err);
        });
    }
  }, [infoForStaition, nameCity]);
  
  return (
    <div>
      <Search placeholder="Input USA's city for getting weather" onSearch={onSearch} enterButton />
      {sessionStorage.length ? (
        <Weather getInfo={weatherInfo} />
      ) : (
        <div> Input USA's city for getting weather </div>
      )}
    </div>
  );
};

export default InputCity;
