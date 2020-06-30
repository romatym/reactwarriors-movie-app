import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import { BrowserRouter, Route } from "react-router-dom";
import {
  updateAuth,
  onLogOut,
  toggleShowLogin,
  updateFavorite,
  updateWatchlist,
  fetchAuth,
  fetchFavorite,
} from "../redux/auth/auth.actions";
import { connect } from "react-redux";

export const AppContext = React.createContext();
class App extends React.Component {


  componentDidMount() {
    const { session_id, fetchAuth } = this.props;

    if (session_id) {
      fetchAuth(session_id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // const { user, session_id } = this.state;
    // if (!prevState.user && user) {
    //   this.getFavoriteMovies(user, session_id);
    //   this.getWatchlistMovies(user, session_id);
    // }
  }

  getWatchlistMovies = (user, session_id) => {
    //const { session_id, user } = this.state;

    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU",
      },
    }).then((data) => {
      this.props.updateWatchlist(data.results);
    });
  };

  render() {


    const {
      user,
      session_id,
      isAuth,
      favorite = [],
      watchlist = [],
      showModal = false,
      updateAuth,
      onLogOut,
      toggleShowLogin,
    } = this.props;

    //console.log("watchlist", watchlist);
    //console.log("this.props", this.props);

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            favorite,
            watchlist,
            updateAuth,
            onLogOut,
            isAuth: isAuth,
            showModal: showModal,
            toggleShowLogin: toggleShowLogin,
            getFavoriteMovies: this.getFavoriteMovies,
            getWatchlistMovies: this.getWatchlistMovies,
          }}
        >
          <div>
            <Header
              user={user}
              updateAuth={updateAuth}
            />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    isAuth: state.auth.isAuth,
    showModal: state.auth.showModal,
  };
};

const mapDispatchToProps = {
  updateAuth,
  fetchAuth,
  fetchFavorite,
  onLogOut,
  toggleShowLogin,
  updateFavorite,
  updateWatchlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
