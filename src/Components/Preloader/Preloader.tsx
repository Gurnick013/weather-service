import { FC } from "react";
import { Spin } from "antd";

const  Preloader: FC = () => {
  return (
    <>
      <Spin size="large" />
    </>
  );
};

export default Preloader;
