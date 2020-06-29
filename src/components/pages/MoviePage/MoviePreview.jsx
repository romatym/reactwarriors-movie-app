import React from "react";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import Image from "../../ImageCard/Image";

function MovieHeader(props) {
  const { movie } = props;

  if (!movie) {
    return <div className="loader"></div>;
  }

  const releaseYear = movie.release_date && movie.release_date.slice(0, 4);

  return (
    <div className="row no-gutters">
      <div className="col-md-4">
        <Image imagePath={movie.poster_path} className="card-img" />
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
        </div>
      </div>
    </div>
  );
}

export default MovieHeader;
