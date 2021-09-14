import { FC } from "react";
import { useSelector } from "react-redux";
import Preloaded from "../Preloader/Preloader";
import Cards from "../Cards/Cards";
import "./Weather.css";

const Weather: FC = () => {
  const weather = useSelector((state: any) => state.weather.weatherInfo);
  const isLoaded = useSelector((state: any) => state.weather.isLoaded);  

  // For sessionStorage

  // const cityInfoFromStorage = Object.entries(sessionStorage).map(
  //   (el: Array<any>) => [el[0], JSON.parse(el[1])]
  // );

  const itemWeather = weather.map((arrInfo: any, index: any) => (
    <div key={arrInfo.icon} className="wrapper__card">
      <Cards arrInfo={arrInfo} />
    </div>
  ));

  return (
    <>
      {isLoaded ? (
        <div className="preloaded">
          <Preloaded />
        </div>
      ) : (
        <div className="wrapper">{itemWeather}</div>
      )}
    </>
  );
};

export default Weather;
