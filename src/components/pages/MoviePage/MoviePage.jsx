import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
import MovieDetails from "./MovieDetails";
import MovieVideo from "./MovieVideo";
import MovieCast from "./MovieCast";
import { Route } from "react-router-dom";
import {
  TabContent,
  Nav,
  NavItem,
  NavLink,
  // Card,
  // CardImg,
  // CardSubtitle,
  // CardTitle,
  // CardText,
  // Row,
  // Col,
} from "reactstrap";
import classnames from "classnames";

function MoviePage(props) {
  const movieId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("1");
  const [movie, setMovie] = useState();
  // const [videos, setVideos] = useState([]);
  // const [videosLoaded, setVideosLoaded] = useState(false);
  // const [creditsCast, setCreditsCast] = useState([]);
  // const [creditsLoaded, setCreditsLoaded] = useState(false);

  useEffect(() => {
    CallApi.get(`/movie/${movieId}`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setMovie(data);
    });
  }, [movieId]);

  // const uploadVideos = () => {
  //   CallApi.get(`/movie/${movieId}/videos`, {
  //     params: {
  //       language: "ru-RU",
  //     },
  //   }).then((data) => {
  //     setVideos(data.results);
  //     setVideosLoaded(true);
  //   });
  // };

  // const uploadCredits = () => {
  //   CallApi.get(`/movie/${movieId}/credits`, {
  //     params: {
  //       language: "ru-RU",
  //     },
  //   }).then((data) => {
  //     setCreditsCast(data.cast);
  //     //setCreditsCrew(data.crew);
  //     setCreditsLoaded(true);
  //   });
  // };

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
                    Детали
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Видео
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    // href={`/movie/${movieId}/cast`}
                    // innerRef={`/movie/${movieId}/cast`}
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    Актеры
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <Route exact path="/movie/:id" component={MovieDetails} />
                {/* <Route exact path="/movie/:id/details" component={MovieDetails} /> */}
                <Route exact path="/movie/:id/video" component={MovieVideo} />
                {/* <Route exact path="/movie/:id/video" component={MovieVideo} /> */}
                <Route exact path="/movie/:id/cast" component={MovieCast} />
                {/* <Route exact path="/movie/:id/cast" component={MovieCast} /> */}

                {/* <TabPane tabId="1">
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
                          </tr>{" "}
                          <tr>
                            <th>Статус</th>
                            <td>{movie.status}</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                </TabPane>
                
                <TabPane tabId="2">
                  <Row>
                    {!videosLoaded && (
                      <div className="loader text-center"></div>
                    )}
                    {videos.map((video) => {
                      return (
                        <Card body>
                          <a
                            href={`https://www.youtube.com/watch?v=${video.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <CardImg
                              top
                              width="100%"
                              src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                              alt=""
                            />
                          </a>

                          <CardTitle className="text-center">
                            {video.name}
                          </CardTitle>
                        </Card>
                      );
                    })}
                  </Row>
                </TabPane> 
                <TabPane tabId="3">
                  <Row>
                    {/* <Col sm="12">
                      <h4>Tab 3 Contents</h4>
                    </Col> 
                    {!creditsLoaded && (
                      <div className="loader text-center"></div>
                    )}
                    {creditsCast.map((actor) => {
                      return (
                        <Col sm="4" key={actor.id}>
                          <Card body className="cast-img--height">
                            <CardTitle className="text-center">
                              Роль: {actor.character}
                            </CardTitle>
                            <CardTitle className="text-center">
                              Актер: {actor.name}
                            </CardTitle>
                            <CardImg
                              src={
                                actor.profile_path
                                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                  : ""
                              }
                              alt=""
                            />
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </TabPane>*/}
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
