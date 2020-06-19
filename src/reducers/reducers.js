import Cookies from "universal-cookie";
import { combineReducers } from 'redux';

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id") || null,
  isAuth: false,
  favorite: [],
  watchlist: [],
  showModal: false,
};

const reducerAuth = (state = initialState, action) => {

  //console.log("state", state);

  switch (action.type) {
    case "UPDATEAUTH":
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000,
      });
      
      const returnState = 
       {
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
    default:
      return state;
  }
};
const reducerToggleShowLogin = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLESHOWLOGIN":
      return {
        ...state,
        showModal: !state.showModal
      };
    default:
      return state;
  }
};
const reducerFavorite = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATEFAVORITE":
      return {
        ...state,
        favorite: action.payload.favorite
      };
    default:
      return state;
  }
};
const reducerWatchlist = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATEWATCHLIST":
      return {
        ...state,
        watchlist: action.payload.watchlist
      };
    default:
      return state;
  }
};

//const reducerApp = () => , reducerFavorite, reducerWatchlist
const reducerApp = () => {
  return combineReducers(reducerAuth, reducerToggleShowLogin, reducerFavorite, reducerWatchlist);
}
export default reducerApp;
