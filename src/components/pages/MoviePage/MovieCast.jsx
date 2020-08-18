import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import Image from "../../ImageCard/Image";
import { Card, Row, Col } from "reactstrap";

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
    return (
      <Row>
        <div className="loader text-center" />
      </Row>
    );
  }

  return (
    <Row>
      {cast
        .filter((actor) => actor.profile_path)
        .map((actor) => {
          return (
            <Col className="col-3" key={actor.id}>
              <Card className="cast-card">
                <Image
                  imagePath={actor.profile_path}
                  notAvailablePath="/images/no photo.png"
                  className="cast-img--height"
                />
                <div className="actors-name">
                  <h3>{actor.name}</h3>
                  <span>{actor.character}</span>
                </div>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}

export default MovieCast;
