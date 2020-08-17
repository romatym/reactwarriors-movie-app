import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import Image from "../../ImageCard/Image";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

function MovieCast(props) {
  console.log("MovieCast props", props);

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

  console.log("MovieCast -> data.cast", cast);

  return (
    <Row>
      {/* {!castLoaded && <div className="loader text-center"></div>} */}
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

                {/* <CardBody className="cast-text--height">
                <CardTitle className="text-center">{actor.character}</CardTitle>
                <CardTitle className="text-center cast-text--bold">
                  {actor.name}
                </CardTitle>
              </CardBody> */}
              </Card>
            </Col>
          );
        })}
    </Row>
  );
}

export default MovieCast;
