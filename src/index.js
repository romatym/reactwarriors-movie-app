import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.scss";
import { createStore } from "redux";

const actionCreatorUpdateAuth = (payload) => {
  return {
    type: "UPDATEAUTH",
    payload,
  };
};

const initialState = {
  user: null,
  session_id: null,
  isAuth: false,
};
const reducerApp = (state = initialState, action) => {
  console.log("reducerApp", state, action);
  switch (action.type) {
    case "UPDATEAUTH":
      return { 
        ...state, 
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true};
    default:
      return state;
  }
};

const store = createStore(reducerApp);
console.log("store", store);
console.log("getstate", store.getState());

store.dispatch(
  actionCreatorUpdateAuth({
    user: {
      name: "Roman",
    },
    session_id: "text",
  })
);

console.log("after update auth", store.getState());

ReactDOM.render(<App />, document.getElementById("root"));
