import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
// import NoPhoto from "../../../images/no photo.png";
import {
  Card,
  CardImg,
  CardBody,
  CardFooter,
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

  // console.log("NoPhoto", NoPhoto);

  return (
    <Row 
    // className="no-gutters"
    >
      {!castLoaded && <div className="loader text-center"></div>}
      {cast.map((actor) => {
        // console.log("actor.profile_path", actor.profile_path);

        return (
          <Col className="col-sm" 
          // sm="3" 
          key={actor.id}>
            <Card className="cast-card">
              <CardImg
              className="cast-img--height"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    // : `https://century21agcoplus.com/wp-content/uploads/2019/10/no-photo-available-male.jpg`
                    // : { NoPhoto }
                    : `/images/no photo.png`
                }
                alt=""
              />
              <CardBody className="cast-text--height">
                <CardTitle className="text-center">{actor.character}</CardTitle>
                <CardTitle
                  className="text-center"
                  style={{ fontWeight: "bold" }}
                >
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
