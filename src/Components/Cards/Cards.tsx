import { FC } from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { changeTemtTocelsius, IArrayInfo } from "../constants/constants";
import "antd/dist/antd.css";
import "./Cards.css";

const Cards: FC<IArrayInfo> = ({ arrInfo }) => { 
  return (
    <>
      <Card title={arrInfo[0][0]} hoverable style={{ width: 250 }}>
        <h5 className="card__title">{arrInfo[0][1].name}</h5>
      </Card>
      <Card
        hoverable
        style={{ width: 250 }}
        cover={<img alt="img" src={arrInfo[0][1].icon} />}
      >
        <Meta
          title={`${arrInfo[0][1].temperature} ${
            arrInfo[0][1].temperatureUnit
          } ${changeTemtTocelsius(arrInfo[0][1].temperature)} C`}
          description={arrInfo[0][1].shortForecast}
        />
      </Card>
    </>
  );
};

export default Cards;
