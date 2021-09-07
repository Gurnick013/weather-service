import { FC } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";

const  Preloader: FC = () => {
  return (
    <>
      <Spin size="large" />
    </>
  );
};

export default Preloader;
