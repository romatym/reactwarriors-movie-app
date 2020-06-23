import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// const logger = (store) => (next) => (action) => {
// //   console.log("store", store.getState());
// //   console.log("type", action.type);
// //   console.log("payload", action.payload);
//   return next(action);
// };

const thunk = (store) => (next) => (action) => {
    console.log("action", action);
    
      return next(action);
    };

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
