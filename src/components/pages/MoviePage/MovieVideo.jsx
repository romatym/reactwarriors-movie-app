import React, { useState, useEffect } from "react";
import CallApi from "../../../api/api";
import NoVideo from "../../../images/no video.jpg";
import { Container, Row, Col } from "reactstrap";

function MovieVideo(props) {
  const movieId = props.match.params.movieId;
  const [videos, setVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);
  //const [videoIsOpen, setVideoIsOpen] = useState(false);

  useEffect(() => {
    CallApi.get(`/movie/${movieId}/videos`, {
      params: {
        language: "ru-RU",
      },
    }).then((data) => {
      setVideos(data.results);
      setVideosLoaded(true);
    });
  }, [movieId]);

  if (!videosLoaded) {
    return <div className="loader text-center" />;
  }
  if (Boolean(videosLoaded & (videos.length === 0))) {
    return (
      <img className="card-img-top card-img--height" src={NoVideo} alt="" />
    );
  }
  return (
    <Container>
      {videos.map((video, index) => {
        let videoContainer = "";
        if (video.site === "YouTube") {
          videoContainer = (
            <iframe
              title={video.name}
              frameBorder="0"
              src={`https://www.youtube.com/embed/${video.key}?controls=0`}
            />
          );
        } else if (video.site === "Vimeo") {
          videoContainer = (
            <iframe
              title={video.name}
              className="videoWrapper iframe"
              frameBorder="0"
              webkitallowfullscreen
              mozallowfullscreen
              src={`https://vimeo.com/video/${video.key}?title=0&byline=0`}
            />
          );
        } else {
          videoContainer = (
            <img
              className="card-img-top card-img--height"
              src={NoVideo}
              alt=""
            />
          );
        }

        return (
          <Row key={index}>
            <Col className="videoWrapper">{videoContainer}</Col>
          </Row>
        );
      })}
    </Container>
  );
}

export default MovieVideo;
