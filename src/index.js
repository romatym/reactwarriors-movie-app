import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.scss";
//import { createStore } from "redux";
//import Cookies from "universal-cookie";
import store from "./store/store";
import { Provider } from "react-redux";

//const cookies = new Cookies();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
