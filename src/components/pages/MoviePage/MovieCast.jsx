import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

function MovieCast(props) {
  const movieId = props.match.params.movieId;
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

  if (!castLoaded) {
    return <div className="loader text-center"/>;
  }

  return (
    <Row>
      {/* {!castLoaded && <div className="loader text-center"></div>} */}
      {cast.map((actor) => {
        return (
          <Col className="col-sm" key={actor.id}>
            <Card className="cast-card">
              <CardImg
                className="cast-img--height"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : `/images/no photo.png`
                }
                alt=""
              />
              <CardBody className="cast-text--height">
                <CardTitle className="text-center">{actor.character}</CardTitle>
                <CardTitle className="text-center cast-text--bold">
                  {actor.name}
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default MovieCast;
