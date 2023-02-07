import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import App from "./app/App";
import Appl from "./Appl";
import "./i18n";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter basename="/demo/purple-react-free/template/demo_1/preview">
    <Appl />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
