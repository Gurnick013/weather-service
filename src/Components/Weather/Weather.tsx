import { useEffect, useState } from "react";
import { FC } from "react";
import { IGetInfo } from "../constants/constants";

const { log } = console;

const Weather: FC<IGetInfo> = (props) => {
  const [weather, setWeather] = useState("");
  log(weather);
  useEffect(() => {
    fetch(
      `https://api.weather.gov/gridpoints/${props.getInfo.cwa}/${props.getInfo.gridX},${props.getInfo.gridY}/forecast/hourly`
    )
      .then((data) => data.json())
      .then((response) => setWeather(response.properties))
      .catch((err) => log(err));
  }, [props.getInfo]);

  return <>HOOOT!</>;
};

export default Weather;
