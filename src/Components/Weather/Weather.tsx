import { FC } from "react";
import { IGetInfo } from "../constants/constants";
import "antd/dist/antd.css";
import "./Weather.css";
import Cards from "../Cards/Cards";

const { log } = console;

const Weather: FC<IGetInfo> = ({ getInfo }) => {
  log(getInfo);

  const arrayCityInfoFromStorage = Object.entries(sessionStorage);
  const filterArrayCityInfoFromStorage = arrayCityInfoFromStorage.map(
    (el: Array<any>) => [el[0], JSON.parse(el[1])]
  );

  const itemWeather = filterArrayCityInfoFromStorage.map(
    (arrInfo: any, index: any) => (
      <div key={index.toString()} className="wrapper__card">
        <Cards arrInfo={[arrInfo]} />
      </div>
    )
  );

  return (
    <>
      <div className="wrapper">{itemWeather}</div>
    </>
  );
};

export default Weather;
