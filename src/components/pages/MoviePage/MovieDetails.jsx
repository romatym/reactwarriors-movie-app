import React from "react";
import { Row, Col } from "reactstrap";

function MovieDetails(props) {
  const { movie } = props;

  const GenresBadges = movie.genres.map((genre) => {
    return (
      <span key={genre.id} className="badge badge-primary badge-pill">
        {genre.name}
      </span>
    );
  });

  return (
    <Row>
      <Col>
        <table className="table top-indent table-borderless ">
          <tbody>
            <tr>
              <th>Жанры:</th>
              <td colSpan="3">{GenresBadges}</td>
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
            <tr>
              <th>Сборы</th>
              <td>{movie.revenue} $</td>
              <th>Бюджет</th>
              <td>{movie.budget} $</td>
            </tr>
            <tr>
              <th>Голосов</th>
              <td>{movie.vote_count}</td>
              <th>Популярность</th>
              <td>{movie.popularity}</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  );
}

export default MovieDetails;
