import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCityName } from "../../core/reducers/useWeatherReducer";
import {
  getchWeather,
  getGeoCity,
  getInfoStation,
} from "../../service/fetchWeather";
import Weather from "../Weather/Weather";
import Error from "../Error/Error";
import { Input } from "antd";
import "./WeatherInfo.css";

const { Search }: any = Input;

const WeatherInfo: FC = () => {
  const dispatch = useDispatch();

  const city = useSelector((state: any) => state.weather.cities);
  const geoCity: any = useSelector((state: any) => state.weather.geoInfo);
  const forecast: any = useSelector((state: any) => state.weather.infoStaition);
  const [errorValidation, setErrorValidaion] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");

  useEffect(() => {
    if (cityName) {
      dispatch(getGeoCity(cityName));
    }
  }, [cityName, dispatch]);

  useEffect(() => {
    if (geoCity !== [] && cityName !== "") {
      dispatch(getInfoStation(geoCity));
    }
  }, [geoCity]);

  useEffect(() => {
    if (forecast !== [] && cityName !== "") {
      dispatch(addCityName(cityName.toUpperCase()));
      dispatch(getchWeather(forecast));
    }
  }, [forecast]);

  const onSearch: any = (value: any) => {
    const isValid = /^[a-zA-Z ]+$/.test(value);
    const filter = city.filter(
      (name: string) => name.toUpperCase() === value.toUpperCase()
    ).length;
    if (isValid) {
      setErrorValidaion(false);
      if (!filter && geoCity !== []) {
        setCityName(value.toUpperCase());
      }
    } else {
      setErrorValidaion(true);
    }
  };

  return (
    <div className="input">
      {errorValidation && <Error />}
      <Search
        placeholder="Input USA's city for getting weather"
        onSearch={onSearch}
        enterButton
      />
      {cityName ? (
        <Weather />
      ) : (
        <div className="input__info">Input USA's city for getting weather</div>
      )}
    </div>
  );
};

export default WeatherInfo;
