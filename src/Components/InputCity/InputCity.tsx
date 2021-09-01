import { FC, useState, useEffect } from "react";
import { Input } from "antd";
import {
  dayToday,
  IGeo,
  IInfoForStaition,
  IResponse,
  IResponseGeo,
} from "../constants/constants";
import Weather from "../Weather/Weather";
import "antd/dist/antd.css";

const { log } = console;
const { Search } = Input;

const InputCity: FC = () => {
  const [nameCity, setNameCity] = useState<string>("");
  const [geoInfo, setGeoInfo] = useState<IGeo>({ lat: 0, lon: 0 });
  const [infoForStaition, serInfoForStaition] = useState<IInfoForStaition>({
    cwa: "",
    gridX: 0,
    gridY: 0,
  });
  const [weatherInfo, setWeatherInfo] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  
  useEffect(() => {
    if (nameCity) {      
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${nameCity}&appid=bb7a5e128aff50a249f8ae11f0e66f9a`
      )
        .then((data) => data.json())
        .then((response) => {
          response.map((geo: IResponseGeo) =>
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
    if (geoInfo.lat && geoInfo.lon) {      
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
    }
  }, [geoInfo.lat, geoInfo.lon]);

  useEffect(() => {
    if (infoForStaition.cwa) {      
      fetch(
        `https://api.weather.gov/gridpoints/${infoForStaition.cwa}/${infoForStaition.gridX},${infoForStaition.gridY}/forecast/`
      )
        .then((data) => data.json())
        .then((response) => {
          const result: Array<IResponse> = response.properties.periods
            .filter(
              (el: IResponse) => el.name === dayToday() || el.name === "Today"
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
          setWeatherInfo(result);
        })
        .catch((err) => {
          log(err);
        });
    }
  }, [infoForStaition]);

  useEffect(() => {
    const arrInfoCity: any = [];
    if (nameCity) {
      arrInfoCity.push([nameCity.toUpperCase(), weatherInfo]);
      sessionStorage.setItem(
        nameCity.toUpperCase(),
        JSON.stringify(weatherInfo)
      );
    }
    setData((prev: any) => {
      return !prev.length ? arrInfoCity : [...prev, ...arrInfoCity];
    });
  }, [weatherInfo]);

  console.log(data);

  return (
    <div>
      <Search
        placeholder="Input USA's city for getting weather"
        onSearch={(e: string) => setNameCity(e)}
        enterButton
      />
      { sessionStorage.length ? (
        <Weather data={data} />
      ) : (
        <div> Input USA's city for getting weather </div>
      )}
    </div>
  );
};

export default InputCity;
