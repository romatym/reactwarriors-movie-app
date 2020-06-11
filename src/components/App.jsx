import React from "react";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import { BrowserRouter, Route } from "react-router-dom";
import { actionCreatorUpdateAuth, actionCreatorLogout } from "../actions/actions";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      favorite: [],
      watchlist: [],
      showModal: false,
      // user: null,
      // session_id: cookies.get("session_id") || null,
      // isAuth: false,
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const { store } = this.props;
    const { session_id } = store.getState();

    store.subscribe(() => {
      console.log("change", store.getState());
      this.forceUpdate();
    });

    if (session_id) {
      CallApi.get("/account", {
        params: { session_id },
      }).then((user) => {
        this.updateAuth(user, session_id);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, session_id } = this.state;

    if (!prevState.user && user) {
      this.getFavoriteMovies(user, session_id);
      this.getWatchlistMovies(user, session_id);
    }
  }

  updateAuth = (user, session_id) => {
    this.props.store.dispatch(
      actionCreatorUpdateAuth({
        user,
        session_id,
      })
    );

    console.log("updateAuth", user, session_id);

    // cookies.set("session_id", session_id, {
    //   path: "/",
    //   maxAge: 2592000,
    // });
    // this.setState({
    //   user,
    //   session_id,
    //   isAuth: true
    // });
  };

  onLogOut = () => {
    this.props.store.dispatch(actionCreatorLogout());

    console.log("onLogOut getState", this.props.store.getState());

    this.forceUpdate();

    // cookies.remove("session_id");
    // this.setState({
    //   session_id: null,
    //   user: null,
    //   isAuth: false,
    //   favorite: [],
    //   watchlist: [],
    // });
  };

  toggleShowLogin = () => {
    this.setState((prevState) => ({
      //isAuth: !prevState.isAuth,
      showModal: !prevState.showModal,
    }));
  };

  getFavoriteMovies = (user, session_id) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU",
      },
    }).then((data) => {
      this.setState({
        favorite: data.results,
      });
    });
  };

  getWatchlistMovies = (user, session_id) => {
    //const { session_id, user } = this.state;

    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU",
      },
    }).then((data) => {
      this.setState({
        watchlist: data.results,
      });
    });
  };

  render() {
    const {
      favorite,
      watchlist,
      // user,
      // session_id,
      // isAuth,
      showModal,
    } = this.state;

    const { user, session_id, isAuth } = this.props.store.getState();

    // console.log("this.props.store.getState()", this.props.store.getState());
    console.log("render user", user);

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            session_id: session_id,
            favorite: favorite,
            watchlist: watchlist,
            updateAuth: this.updateAuth,
            // updateUser: this.updateUser,
            // updateSessionId: this.updateSessionId,
            isAuth: isAuth,
            onLogOut: this.onLogOut,
            showModal: showModal,
            toggleShowLogin: this.toggleShowLogin,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchlistMovies: this.getWatchlistMovies,
          }}
        >
          <div>
            <Header
              user={user}
              updateAuth={this.updateAuth}
              //updateSessionId={this.updateSessionId}
            />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
