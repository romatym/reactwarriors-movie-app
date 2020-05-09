import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import MovieDetails from "./MovieDetails";
import MovieVideo from "./MovieVideo";
import MovieCast from "./MovieCast";
import { Route, Link } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";

function MoviePage(props) {
  const movieId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("1");
  const [movie, setMovie] = useState();

  useEffect(() => {
    CallApi.get(`/movie/${movieId}`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setMovie(data);
    });
  }, [movieId]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (!movie) {
    return <div className="loader"></div>;
  }

  const imagePath = movie.backdrop_path || movie.poster_path;
  const releaseYear = movie.release_date.slice(0, 4);

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
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    <Link to={`/movie/${movieId}`}>Детали</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    <Link to={`/movie/${movieId}/video`}>Видео</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    <Link to={`/movie/${movieId}/cast`}>Актеры</Link>
                  </NavLink>
                </NavItem>
              </Nav>
              <Route exact path="/movie/:movieId" component={MovieDetails} />
              <Route
                exact
                path="/movie/:movieId/details"
                component={MovieDetails}
              />
              <Route
                exact
                path="/movie/:movieId/video"
                component={MovieVideo}
              />
              <Route exact path="/movie/:movieId/cast" component={MovieCast} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
