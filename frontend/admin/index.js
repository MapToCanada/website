import "@babel/polyfill";
import ReactDOM from "react-dom";
import React from "react";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import App from "./app";

import { Provider } from "react-redux";
import storeCreator from "@admin/store/index";
let store = storeCreator();

let lang = "en-US";

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConfigProvider locale={lang == "en-us" ? enUS : zhCN}>
        <Component />
      </ConfigProvider>
    </Provider>,
    document.getElementById("app")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./app", () => {
    render(App);
  });
}
