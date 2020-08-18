import React from "react";
import Header from "./Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";

import { withAuth } from "../hoc/withAuth";

class App extends React.Component {
  componentDidMount() {
    const { auth, authActions } = this.props;

    if (auth.session_id) {
      authActions.fetchAuth(auth.session_id);
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    const { auth, authActions } = this.props;

    return (
      <BrowserRouter>
        <div>
          <Header user={auth.user} updateAuth={authActions.updateAuth} />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:movieId" component={MoviePage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default withAuth(App);
