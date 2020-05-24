import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import { Row, Col } from "reactstrap";

function MovieDetails(props) {
  const movieId = props.match.params.movieId;
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

  if (!movie) {
    return <div className="loader"></div>;
  }

  const genresList = movie.genres.map((genre) => {
    return (
      <span key={genre.id} className="badge badge-primary badge-pill">
        {genre.name}
      </span>
    );
  });

  return (
    <Row>
      <Col sm="12">
        <table className="table">
          <tbody>
            <tr>
              <th>Дата выхода</th>
              <td>{movie.release_date}</td>
            </tr>
            <tr>
              <th>Длительность</th>
              <td>{movie.runtime} минут</td>
            </tr>
            <tr>
              <th>Жанры</th>
              <td>{genresList}</td>
            </tr>
            <tr>
              <th>Бюджет</th>
              <td>{movie.budget} $</td>
            </tr>
            <tr>
              <th>Сборы</th>
              <td>{movie.revenue} $</td>
            </tr>
            <tr>
              <th>Популярность</th>
              <td>{movie.popularity}</td>
            </tr>
            <tr>
              <th>Голосов</th>
              <td>{movie.vote_count}</td>
            </tr>
            <tr>
              <th>Статус</th>
              <td>{movie.status}</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  );
}

export default MovieDetails;
