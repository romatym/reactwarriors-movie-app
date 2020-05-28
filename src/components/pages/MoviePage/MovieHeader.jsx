import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import MovieDetails from "./MovieDetails";

function MovieHeader(props) {
  const { movieId } = props;
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

  return (
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
            <div>
              <FavoriteIcon item={movie} />
              <WatchlistIcon item={movie} />
            </div>
          </div>
          <MovieDetails movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default MovieHeader;
