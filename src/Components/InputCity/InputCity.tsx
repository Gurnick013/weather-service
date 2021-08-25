import { FC, useState, useEffect } from "react";
import { Input } from "antd";
import { IGeo, IInfoForStaition } from "../constants/constants";
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
        .then((response) =>
          serInfoForStaition({
            cwa: response.properties.cwa,
            gridX: response.properties.gridX,
            gridY: response.properties.gridY,
          })
        )
        .catch((err) => log(err));
  }, [geoInfo]);

  return (
    <div>
      <Search placeholder="input City" onSearch={onSearch} enterButton />
      <Weather getInfo={infoForStaition} nameCity={nameCity} />
    </div>
  );
};

export default InputCity;
