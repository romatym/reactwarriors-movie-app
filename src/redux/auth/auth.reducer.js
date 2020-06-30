import * as types from "./auth.types";
import { cookies } from "../../components/utils/cookies";

const initialState = {
  user: null,
  session_id: cookies.get("session_id") || null,
  isAuth: false,
  favorite: [],
  watchlist: [],
  showModal: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS_AUTH:
      return {
        ...state,
        session_id: action.payload.session_id,
        user: action.payload.user
      };
    case types.UPDATE_AUTH:
      const returnState = {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true,
      };
      return returnState;
    case types.LOGOUT:
      
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
