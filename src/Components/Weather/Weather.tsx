import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { FC } from "react";
import { changeTemtTocelsius, IGetInfo } from "../constants/constants";
import "antd/dist/antd.css";
import "./Weather.css";

// const { log } = console;

const Weather: FC<IGetInfo> = (props) => {

const dataInfo: any = props.getInfo

  return (
    <>
      <div className="wrapper__card">
        <Card title='' hoverable style={{ width: 300 }}>
          <h5>Forecast</h5>
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="img" src={dataInfo[0].icon} />}
        >
          <Meta
            title={`${dataInfo[0].temperature} ${
              dataInfo[0].temperatureUnit
            } ${changeTemtTocelsius(dataInfo[0].temperature)} C`}
            description={dataInfo[0].shortForecast}
          />
        </Card>
      </div>
    </>
  );
};

export default Weather;
