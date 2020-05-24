import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import MovieDetails from "./MovieDetails";
import MovieVideo from "./MovieVideo";
import MovieCast from "./MovieCast";
import { Route, NavLink as NavLinkRouter, Redirect, Switch } from "react-router-dom";
import { TabPane, Nav, NavItem, NavLink } from "reactstrap";

function MoviePage(props) {
  const movieId = props.match.params.id;
  // const [activeTab, setActiveTab] = useState("1");
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    CallApi.get(`/movie/${movieId}`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setMovie(data);
      setLoading(false);
    });
  }, [movieId]);

  // const toggleTab = (tab) => {
  //   if (activeTab !== tab) setActiveTab(tab);
  // };

  if (isLoading) {
    return <div className="loader" />;
  }

  const imagePath = movie.backdrop_path || movie.poster_path;
  const releaseYear = movie.release_date && movie.release_date.slice(0, 4);

  return (
    <div className="card mb-3" style={{ maxWidth: "70%" }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            className="card-img"
            src={
              imagePath
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : ""
            }
            alt=""
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">
              {movie.title} ({releaseYear})
            </h2>
            <p className="card-text">
              <span className="text-muted">{movie.tagline}</span>
            </p>
            <h5 className="card-text">Обзор</h5>
            <p className="card-text">{movie.overview}</p>
            <div className="d-flex justify-content-between">
              <div className="card-text">Рейтинг: {movie.vote_average}</div>
              <div>
                <FavoriteIcon item={movie} />
                <WatchlistIcon item={movie} />
              </div>
            </div>

            <div className="top-indent">
              <Nav tabs>
                <NavItem>
                  <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/details`}>
                    Детали
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/video`}>
                    Видео
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/cast`}>
                    Актеры
                  </NavLink>
                </NavItem>
              </Nav>
              <TabPane>
                <Switch>
                  <Route
                    path="/movie/:movieId/details"
                    component={MovieDetails}
                  />
                  <Route path="/movie/:movieId/video" component={MovieVideo} />
                  <Route path="/movie/:movieId/cast" component={MovieCast} />
                  <Redirect to={`/movie/${movieId}/details`} />
                </Switch>
              </TabPane>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
