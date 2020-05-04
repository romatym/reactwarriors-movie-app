import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
//import MovieItem from "../../Movies/MovieItem";
// import { AppContext } from "../../App";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardImg,
  //Button,
  CardTitle,
  //CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

function MoviePage(props) {
  const movieId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("1");
  const [movie, setMovie] = useState();
  const [videos, setVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);

  useEffect(() => {
    CallApi.get(`/movie/${movieId}`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setMovie(data);
    });
  }, [movieId]);

  const uploadRelatedVideos = () => {
    CallApi.get(`/movie/${movieId}/videos`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setVideos(data.results);
      setVideosLoaded(true);
    });
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // console.log("movie", movie);
  // console.log("videos", videos);

  if (!movie) {
    return <div className="loader"></div>;
  }

  const imagePath = movie.backdrop_path || movie.poster_path;
  const releaseYear = movie.release_date.slice(0, 4);
  const genresList = movie.genres.map((genre) => {
    return (
      <span key={genre.id} className="badge badge-primary badge-pill">
        {genre.name}
      </span>
    );
  });

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
                      uploadRelatedVideos();
                    }}
                  >
                    Видео
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
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
                <TabPane tabId="1">
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


                    {/* {videos.map((video) => {
                      return (
                        <div key={video.id} className="col-6 mb-4">
                          <a
                            href={`https://www.youtube.com/watch?v=${video.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              className="card-img-top card-img--height"
                              src={
                                imagePath
                                  ? `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`
                                  : ""
                              }
                              alt=""
                            />
                          </a>
                          <CardTitle className="text-center">
                            {video.name}
                          </CardTitle>
                        </div>
                      );
                    })} */}

                  </Row>
                  {/* <Row>
                    <Col sm="6">
                      <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </CardText>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
                    <Col sm="6">
                      <Card body>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </CardText>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
                  </Row> */}
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <h4>Tab 3 Contents</h4>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
