import { FC } from "react";
import {
  changeTemtTocelsius,
  IArrayInfo,
} from "../../core/constants/constants";
import Meta from "antd/lib/card/Meta";
import { Card } from "antd";
import "./Cards.css";

const Cards: FC<IArrayInfo> = ({ arrInfo }) => {
  return (
    <>
      <Card title={arrInfo.name} hoverable className="card-main">
        <h5 className="card-main__title">{arrInfo.name}</h5>
      </Card>
      <Card
        className="card-img"
        hoverable
        cover={<img alt="img" src={arrInfo.icon} />}
      >
        <Meta
          title={`${arrInfo.temperature} ${
            arrInfo.temperatureUnit
          } ${changeTemtTocelsius(arrInfo.temperature)} C`}
          description={arrInfo.shortForecast}
        />
      </Card>
    </>
  );
};

export default Cards;
