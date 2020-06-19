import React from "react";
//import { bindActionCreators } from "redux";
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
} from "../actions/actions";
import { connect } from "react-redux";

export const AppContext = React.createContext();
class App extends React.Component {
  // constructor() {
  //   super();

  //   this.initialState = {
  //     favorite: [],
  //     watchlist: [],
  //     showModal: false,
  //     // user: null,
  //     // session_id: cookies.get("session_id") || null,
  //     // isAuth: false,
  //   };

  //   this.state = this.initialState;
  // }

  componentDidMount() {
    const { session_id } = this.props;

    if (session_id) {
      CallApi.get("/account", {
        params: { session_id },
      }).then((user) => {
        this.props.updateAuth(user, session_id);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // const { user, session_id } = this.state;
    // if (!prevState.user && user) {
    //   this.getFavoriteMovies(user, session_id);
    //   this.getWatchlistMovies(user, session_id);
    // }
  }

  // toggleShowLogin = () => {
  //   this.setState((prevState) => ({
  //     //isAuth: !prevState.isAuth,
  //     showModal: !prevState.showModal,
  //   }));
  // };

  getFavoriteMovies = (user, session_id) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU",
      },
    }).then((data) => {
      this.props.updateFavorite(data.results);
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
      this.props.updateWatchlist(data.results);
    });
  };

  render() {
    // const {
    //   favorite,
    //   watchlist,
    //   // user,
    //   // session_id,
    //   // isAuth,
    //   showModal,
    // } = this.state;

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

    console.log("watchlist", watchlist);

    console.log("this.props", this.props);

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
            // updateAuth: this.updateAuth,
            // updateUser: this.updateUser,
            // updateSessionId: this.updateSessionId,
            isAuth: isAuth,
            // onLogOut: this.onLogOut,
            showModal: showModal,
            toggleShowLogin: toggleShowLogin,
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    isAuth: state.auth.isAuth,
    showModal: state.auth.showModal,
  };
};

const mapDispatchToProps = { updateAuth, onLogOut, toggleShowLogin, updateFavorite, updateWatchlist };
// (dispatch) => {
//   //console.log("mapDispatchToProps user, session_id", user, session_id);

//   return bindActionCreators(
//     { updateAuth, onLogOut, toggleShowLogin, updateFavorite, updateWatchlist },
//     dispatch
//   );
  // updateAuth: bindActionCreators(updateAuth, dispatch),
  // onLogOut: () => bindActionCreators(onLogOut, dispatch),
  // toggleShowLogin: bindActionCreators(toggleShowLogin, dispatch),
  // updateFavorite: bindActionCreators(updateFavorite, dispatch),
  // updateWatchlist: bindActionCreators(updateWatchlist, dispatch),
  // };
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
