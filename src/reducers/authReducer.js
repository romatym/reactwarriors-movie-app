import Cookies from "universal-cookie";
//import { combineReducers } from "redux";

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id") || null,
  isAuth: false,
  favorite: [],
  watchlist: [],
  showModal: false,
};

const authReducer = (state = initialState, action) => {
  //console.log("state", state);

  switch (action.type) {
    case "UPDATEAUTH":
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000,
      });

      const returnState = {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true,
      };
      console.log("return state", returnState);
      return returnState;
    case "LOGOUT":
      cookies.remove("session_id");
      return {
        ...state,
        session_id: null,
        user: null,
        isAuth: false,
        favorite: [],
        watchlist: [],
      };
    case "TOGGLE_SHOWLOGIN":
      return {
        ...state,
        showModal: !state.showModal,
      };
    case "UPDATE_FAVORITE":
      return {
        ...state,
        favorite: action.payload,
      };
    case "UPDATE_WATCHLIST":
      return {
        ...state,
        watchlist: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
