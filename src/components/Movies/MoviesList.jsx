import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({ movies, loaded }) => {
  return (
    <div className="row">
      {!loaded && <div className="loader-list"></div>}

      {movies.map((item) => {
        return (
          <div key={item.id} className="col-6 ">
            <MovieItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesHOC(MoviesList);
