import Cookies from "universal-cookie";
import * as types from "./auth.types";

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
    case types.UPDATE_AUTH:
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
      //console.log("return state", returnState);
      return returnState;
    case types.LOGOUT:
      cookies.remove("session_id");
      return {
        ...state,
        session_id: null,
        user: null,
        isAuth: false,
        favorite: [],
        watchlist: [],
      };
    case types.TOGGLE_SHOWLOGIN:
      return {
        ...state,
        showModal: !state.showModal,
      };
    case types.UPDATE_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
      };
    case types.UPDATE_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
