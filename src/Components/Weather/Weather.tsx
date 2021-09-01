import { FC, useState } from "react";
import { IGetInfo } from "../constants/constants";
import "antd/dist/antd.css";
import "./Weather.css";
import Cards from "../Cards/Cards";
import { Spin } from "antd";
import { useEffect } from "react";

const { log } = console;

const Weather: FC<IGetInfo> = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const arrayCityInfoFromStorage = Object.entries(sessionStorage);
  const filterArrayCityInfoFromStorage = arrayCityInfoFromStorage.map(
    (el: Array<any>) => [el[0], JSON.parse(el[1])]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, [data]);

  useEffect(() => {
    setIsLoaded(false);
  }, [data]);

  const itemWeather = filterArrayCityInfoFromStorage.map(
    (arrInfo: any, index: any) => (
      <div key={index.toString()} className="wrapper__card">
        <Cards arrInfo={[arrInfo]} />
      </div>
    )
  );

  return (
    <>
      {!isLoaded ? (
        <div className="preloaded">
          <Spin size="large" />
        </div>
      ) : (
        <div className="wrapper">{itemWeather}</div>
      )}
    </>
  );
};

export default Weather;
