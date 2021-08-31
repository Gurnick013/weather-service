import { FC } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";

const Preloaded: FC = () => {
  return (
    <div>
      <Spin size="large" />
    </div>
  );
};

export default Preloaded;
