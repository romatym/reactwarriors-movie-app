import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { FETCH_SUCCESS_AUTH, LOGOUT } from "./auth/auth.types";
import { cookies } from "../components/utils/cookies";

// const logger = (store) => (next) => (action) => {
// //   console.log("store", store.getState());
// //   console.log("type", action.type);
// //   console.log("payload", action.payload);
//   return next(action);
// };

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//   console.log("action", action);

//   if (typeof action === "function") {
//     return action(dispatch, getState);
//   }
//   return next(action);
// };

const updateCookies = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === FETCH_SUCCESS_AUTH) {
    cookies.set("session_id", action.payload.session_id, {
      path: "/",
      maxAge: 2592000,
    });
  }
  if (action.type === LOGOUT) {
    cookies.remove("session_id");
  }
  return next(action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, updateCookies))
);

export default store;
