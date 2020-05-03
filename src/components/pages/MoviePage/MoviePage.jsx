import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Movies/FavoriteIcon";
import WatchlistIcon from "../../Movies/WatchlistIcon";
// import { AppContext } from "../../App";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

function MoviePage(props) {
  const movieId = props.match.params.id;
  const [activeTab, setActiveTab] = useState("1");
  const [movie, setMovie] = useState();

  useEffect(
    (movie) => {
      CallApi.get(`/movie/${movieId}`, {
        params: {
          language: "ru-RU",
        },
      }).then((data) => {
        movie = data;
        setMovie(data);
      });
    },
    [movieId]
  );

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (!movie) {
    return <div className="loader"></div>;
  }

  const imagePath = movie.backdrop_path || movie.poster_path;
  const releaseYear = movie.release_date.slice(0, 4);
  const genresList = movie.genres.map((genre) => {
    return <span className="badge badge-primary badge-pill">{genre.name}</span>;
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
              <div className="text-muted">{movie.tagline}</div>
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

            <div>
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
                    Похожие фильмы
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
                      <table class="table">
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
                  </Row>
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
