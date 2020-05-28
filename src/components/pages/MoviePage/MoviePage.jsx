import React from "react";
import MovieHeader from "./MovieHeader";
import MovieTabs from "./MovieTabs";


function MoviePage(props) {
  const movieId = props.match.params.id;

  return (
    <div className="container">
      <div className="row no-gutters">
        <MovieHeader movieId={movieId} />
      </div>
      <MovieTabs movieId={movieId} />
    </div>
  );
}

export default MoviePage;
