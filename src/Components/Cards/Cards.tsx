import { FC } from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { changeTemtTocelsius } from "../constants/constants";
import "antd/dist/antd.css";

interface IArrayInfo {
  arrInfo: any
}

const Cards: FC<IArrayInfo> = ({arrInfo}) => {
  return (
    <>
      <Card title={arrInfo[0]} hoverable style={{ width: 200 }}>
        <h5 className="card__title">{arrInfo[1].name}</h5>
      </Card>
      <Card
        hoverable
        style={{ width: 200 }}
        cover={<img alt="img" src={arrInfo[1].icon} />}
      >
        <Meta
          title={`${arrInfo[1].temperature} ${
            arrInfo[1].temperatureUnit
          } ${changeTemtTocelsius(arrInfo[1].temperature)} C`}
          description={arrInfo[1].shortForecast}
        />
      </Card>
    </>
  );
};

export default Cards;
