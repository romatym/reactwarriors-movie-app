import React from "react";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import { BrowserRouter, Route } from "react-router-dom";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      favorite: [],
      watchlist: [],
      user: null,
      session_id: cookies.get("session_id") || null,
      showLoginModal: false,
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const { session_id } = this.state;
    if (session_id) {
      CallApi.get("/account", {
        params: { session_id },
      }).then((user) => {
        this.updateUser(user, session_id);
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

  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  updateSessionId = (session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      favorite: [],
      watchlist: [],
    });
  };

  toggleShowLogin = () => {
    this.setState((prevState) => ({
      showLoginModal: !prevState.showLoginModal,
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
      user,
      favorite,
      watchlist,
      session_id,
      showLoginModal,
    } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            session_id: session_id,
            favorite: favorite,
            watchlist: watchlist,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            showLoginModal: showLoginModal,
            toggleShowLogin: this.toggleShowLogin,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchlistMovies: this.getWatchlistMovies,
          }}
        >
          <div>
            <Header
              user={user}
              updateUser={this.updateUser}
              updateSessionId={this.updateSessionId}
            />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
