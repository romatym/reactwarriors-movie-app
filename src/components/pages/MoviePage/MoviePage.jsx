import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import MovieDetails from "./MovieDetails";
import MovieVideo from "./MovieVideo";
import MovieCast from "./MovieCast";
import {
  Route,
  NavLink as NavLinkRouter,
  Redirect,
  Switch,
} from "react-router-dom";
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

  if (isLoading) {
    return <div className="loader" />;
  }

  const imagePath = movie.backdrop_path || movie.poster_path;
  const releaseYear = movie.release_date && movie.release_date.slice(0, 4);
  const genresList = movie.genres.map((genre) => {
    return (
      <span key={genre.id} className="badge badge-primary badge-pill">
        {genre.name}
      </span>
    );
  });

  return (
    <div className="container">
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
              {/* <div className="card-text">Рейтинг: {movie.vote_average}</div> */}
              <div>
                <FavoriteIcon item={movie} />
                <WatchlistIcon item={movie} />
              </div>
            </div>

            {/* <div className="card-text">Длительность: {movie.runtime} минут</div> */}
            <table className="table top-indent">
              <tbody>
                <tr>
                  <th>Жанры</th>
                  <td>{genresList}</td>
                </tr>
                <tr>
                  <th>Рейтинг:</th>
                  <td>{movie.vote_average}</td>
                  <th>Длительность</th>
                  <td>{movie.runtime}</td>
                </tr>
                <tr>
                  <th>Статус</th>
                  <td>{movie.status}</td>
                  <th>Дата выхода</th>
                  <td>{movie.release_date}</td>
                </tr>
                {/* <tr>
              <th>Длительность</th>
              <td>{movie.runtime} минут</td>
            </tr> */}
                <tr>
                  <th>Сборы</th>
                  <td>{movie.revenue} $</td>
                  <th>Бюджет</th>
                  <td>{movie.budget} $</td>
                </tr>
                {/* <tr>
              <th>Бюджет</th>
              <td>{movie.budget} $</td>
            </tr> */}

                {/* <tr>
              <th>Популярность</th>
              <td>{movie.popularity}</td>
            </tr> */}
                <tr>
                  <th>Голосов</th>
                  <td>{movie.vote_count}</td>
                  <th>Популярность</th>
                  <td>{movie.popularity}</td>
                </tr>
                {/* <tr>
              <th>Статус</th>
              <td>{movie.status}</td>
            </tr> */}
              </tbody>
            </table>
          </div>
        </div>

        <div className="top-indent">
          <Nav tabs>
            {/* <NavItem>
              <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/details`}>
                Детали
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/cast`}>
                Актеры
              </NavLink>
            </NavItem>            
            <NavItem>
              <NavLink tag={NavLinkRouter} to={`/movie/${movieId}/video`}>
                Видео
              </NavLink>
            </NavItem>

          </Nav>
          <TabPane>
            <Switch>
              {/* <Route path="/movie/:movieId/details" component={MovieDetails} /> */}
              <Route path="/movie/:movieId/video" component={MovieVideo} />
              <Route path="/movie/:movieId/cast" component={MovieCast} />
              <Redirect to={`/movie/${movieId}/cast`} />
            </Switch>
          </TabPane>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
