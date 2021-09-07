import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCityName } from "../../core/reducers/useWeatherReducer";
import {
  getchWeather,
  getGeoCity,
  getInfoStation,
} from "../../service/fetchWeather";
import Weather from "../Weather/Weather";
import { Input } from "antd";
import "./WeatherInfo.css";

const { Search }: any = Input;

const WeatherInfo: FC = () => {
  const dispatch = useDispatch();
  const geoCity: any = useSelector((state: any) => state.weather.geoInfo);
  const forecast: any = useSelector((state: any) => state.weather.infoStaition);
  const [errorValidation, setErrorValidaion] = useState<boolean>(false);
  const [cityName, setNameCity] = useState<string>("");

  useEffect(() => {
    if (cityName) {
      dispatch(getGeoCity(cityName));
    }
  }, [cityName, dispatch]);

  useEffect(() => {
    if (geoCity !== []) {
      dispatch(getInfoStation(geoCity));
    }
  }, [geoCity, dispatch]);

  useEffect(() => {
    if (forecast !== []) dispatch(getchWeather(forecast));
  }, [forecast, dispatch]);

  const onSearch: any = (value: any) => {
    const isValid = /^[a-zA-Z ]+$/.test(value);
    if (isValid) {
      setErrorValidaion(false);
      setNameCity(value);
      dispatch(addCityName(value));
    } else {
      setErrorValidaion(true);
    }
  };

  return (
    <div className="input">
      {errorValidation && (
        <div className="input__valid">
          Please enter a valid or correctly name's city
        </div>
      )}
      <Search
        placeholder="Input USA's city for getting weather"
        onSearch={onSearch}
        enterButton
      />

      {cityName ? (
        <Weather data={cityName} />
      ) : (
        <div className="input__info">Input USA's city for getting weather</div>
      )}
    </div>
  );
};

export default WeatherInfo;
