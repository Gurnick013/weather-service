import { Input } from "antd";
import "antd/dist/antd.css";
import { FC, useEffect, useState } from "react";
import { useGetGeoLocationQuery } from "../../service/useQuery";
import {
  dayToday,
  IGeo,
  IInfoForStaition,
  IResponse,
  IResponseGeo,
} from "../constants/constants";
import Weather from "../Weather/Weather";
import "./WeatherInfo.css";

const { log } = console;
const { Search }: any = Input;

const WeatherInfo: FC = () => {
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorValidation, setErrorValidaion] = useState<boolean>(false);
  const [nameCity, setNameCity] = useState<string>("");
  const [currentNameCity, setCurrentNameCity] = useState<string>("");
  const [geoInfo, setGeoInfo] = useState<IGeo>({ lat: 0, lon: 0 });
  const [infoForStaition, setInfoForStaition] = useState<IInfoForStaition>({
    cwa: "",
    gridX: 0,
    gridY: 0,
  });
  const [weatherInfo, setWeatherInfo] = useState<any>([]);
  const [dataIn, setData] = useState<any>([]);

  // const { data, error, isLoading, isSuccess, isError } = useGetGeoLocationQuery(
  //   { lat: 31.2504, lon: -99.2506 }
  // );

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
          setInfoForStaition({
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
      setCurrentNameCity(nameCity);
      setErrorName(false);
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
    if (currentNameCity) {
      arrInfoCity.push([currentNameCity.toUpperCase(), weatherInfo]);
      sessionStorage.setItem(
        currentNameCity.toUpperCase(),
        JSON.stringify(weatherInfo)
      );
    }
    setData((prev: any) => {
      return !prev.length ? arrInfoCity : [...prev, ...arrInfoCity];
    });
  }, [weatherInfo]);

  const onSearch: any = (value: any) => {
    const isValid = /^[a-zA-Z ]+$/.test(value);
    if (isValid) {
      setErrorValidaion(false);
      setNameCity(value);
    } else {
      setErrorValidaion(true);
    }
  };

  return (
    <div className="input">
      {(errorName || errorValidation) && (
        <div className="input__valid">
          Please enter a valid or correctly name's city
        </div>
      )}
      <Search
        placeholder="Input USA's city for getting weather"
        onSearch={onSearch}
        enterButton
      />

      {sessionStorage.length ? (
        <Weather data={dataIn} />
      ) : (
        <div className="input__info">Input USA's city for getting weather</div>
      )}
    </div>
  );
};

export default WeatherInfo;
