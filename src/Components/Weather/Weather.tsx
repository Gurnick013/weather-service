import { FC } from "react";
import { IGetInfo } from "../constants/constants";
import "antd/dist/antd.css";
import "./Weather.css";
import Cards from "../Cards/Cards";

const Weather: FC<IGetInfo> = (props) => {
  const filterArrayCityFromProps = Array.from(new Set(props.getInfo));

  const arrayCityInfoFromStorage = Object.entries(sessionStorage);
  const filterArrayCityInfoFromStorage = arrayCityInfoFromStorage.map(
    (el: Array<any>) => [el[0], JSON.parse(el[1])]
  );

  const totalArrayCity = Array.from(
    new Set([...filterArrayCityInfoFromStorage, ...filterArrayCityFromProps])
  );

  const itemWeather = !sessionStorage.length
    ? filterArrayCityFromProps.map((arrInfo: any, index: any) => (
        <div key={index.toString()} className="wrapper__card">
          <Cards arrInfo={arrInfo} />
        </div>
      ))
    : totalArrayCity.map((arrInfo: any, index: any) => (
        <div key={index.toString()} className="wrapper__card">
          <Cards arrInfo={arrInfo} />
        </div>
      ));

  return (
    <>
      <div className="wrapper">{itemWeather}</div>
    </>
  );
};

export default Weather;
