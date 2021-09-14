import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./core/store";
import GlobalWeatherService from "./Components/GlobalWeatherService";

ReactDOM.render(
  <Provider store={store}>
    <GlobalWeatherService />
  </Provider>,
  document.getElementById("root")
);
