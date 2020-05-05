import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardImg,
  //CardSubtitle,
  CardTitle,
  //CardText,
  Row,
  Col,
} from "reactstrap";

function MovieCast(props) {
  const movieId = props.match.params.id;
  const [movie, setMovie] = useState();
  const [videos, setVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [cast, setCast] = useState([]);
  const [castLoaded, setCastLoaded] = useState(false);

  useEffect(() => {
    CallApi.get(`/movie/${movieId}/credits`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setCast(data.cast);
      setCastLoaded(true);
    });
  }, [movieId]);

  return (
    <TabPane tabId="3">
      <Row>
        <Col sm="12">
          <h4>Tab 3 Contents</h4>
        </Col>
        {!castLoaded && <div className="loader text-center"></div>}
        {cast.map((actor) => {
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
    </TabPane>
  );
}

export default MovieCast;
