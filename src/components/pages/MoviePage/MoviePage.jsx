import React from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
// import { AppContext } from "../../App";

export default class MoviePage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: null,
    };
  }
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      console.log("data", data);
      this.setState({
        movie: data,
      });
    });
  }

  render() {
    console.log("this.state", this.state);
    const { movie } = this.state;

    if (!movie) {
      return <div className="loader"></div>;
    }

    const imagePath = movie.backdrop_path || movie.poster_path;

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
              <h2 className="card-title">{movie.title}</h2>
              <p className="card-text">
                <p className="text-muted">{movie.tagline}</p>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
