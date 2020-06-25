import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

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

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
