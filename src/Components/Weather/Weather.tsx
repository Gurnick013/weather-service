import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Preloaded from "../Preloader/Preloader";
import Cards from "../Cards/Cards";
import { IGetInfo } from "../../core/constants/constants";
import "./Weather.css";

const Weather: FC<IGetInfo> = ({ data }) => {
 
  const weather = useSelector((state: any) => state.weather.WeatherInfo);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // For sessionStorage

  // const arrayCityInfoFromStorage = Object.entries(sessionStorage);
  // const filterArrayCityInfoFromStorage = arrayCityInfoFromStorage.map(
  //   (el: Array<any>) => [el[0], JSON.parse(el[1])]
  // );

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);    
    return () => {
      setIsLoaded(false); 
    }
  }, [data]); 
  
  const itemWeather = weather.map(
    (arrInfo: any, index: any) => (
      <div key={index.toString()} className="wrapper__card">
        <Cards arrInfo={arrInfo} />
      </div>
    )
  );

  return (
    <>
      {!isLoaded ? (
        <div className="preloaded">
          <Preloaded/>
        </div>
      ) : (
        <div className="wrapper">{itemWeather}</div>
      )}
    </>
  );
};

export default Weather;
