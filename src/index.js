import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.scss";
import { createStore } from "redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const actionCreatorUpdateAuth = (payload) => {
  return {
    type: "UPDATEAUTH",
    payload,
  };
};

const initialState = {
  user: null,
  session_id: cookies.get("session_id") || null,
  isAuth: false,
  favorite: [],
  watchlist: [],
  showModal: false,
};

const reducerApp = (state = initialState, action) => {
  //console.log("reducerApp", state, action);
  switch (action.type) {
    case "UPDATEAUTH":
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000,
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true,
      };
    default:
      return state;
  }
};

const store = createStore(reducerApp);

// store.dispatch(
//   actionCreatorUpdateAuth({
//     user: {
//       name: "Roman",
//     },
//     session_id: "text",
//   })
// );

// store.dispatch(
//   actionCreatorUpdateAuth({
//     user: {
//       name: "Roman1",
//     },
//     session_id: "text1",
//   })
// );

ReactDOM.render(<App store={store} />, document.getElementById("root"));
